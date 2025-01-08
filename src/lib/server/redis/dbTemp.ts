import redis from '$lib/server/redis/redis';

export enum RankType {
	ELO = 'elo',
	MARKET_CAP = 'market_cap'
}

export class TempDB {
	static readonly TICKER_PREFIX = 'ticker:';
	static readonly ELO_RANK = 'elo_rank';
	static readonly MARKET_CAP_RANK = 'market_cap_rank';

	private static getTickerKey(symbol: string): string {
		return `${this.TICKER_PREFIX}${symbol}`;
	}

	private static getRankKey(rankType: RankType): string {
		return rankType === RankType.ELO ? this.ELO_RANK : this.MARKET_CAP_RANK;
	}

	async setStockData(ticker: string, elo: number, marketCap?: number): Promise<void> {
		try {
			const pipeline = redis.pipeline();

			pipeline.hset(TempDB.getTickerKey(ticker), {
				[RankType.ELO]: elo,
				[RankType.MARKET_CAP]: marketCap ?? 0
			});
			pipeline.zadd(TempDB.ELO_RANK, { score: elo, member: ticker });
			if (marketCap !== undefined) {
				pipeline.zadd(TempDB.MARKET_CAP_RANK, { score: marketCap, member: ticker });
			}

			await pipeline.exec();
		} catch (error) {
			console.error('Failed to set stock data:', error);
			throw error;
		}
	}

	async getStockELO(ticker: string): Promise<number> {
		try {
			const data = await redis.hget<number>(TempDB.getTickerKey(ticker), RankType.ELO);
			return data ?? 1500; // Default ELO if not found
		} catch (error) {
			console.error(`Failed to get ELO for ticker ${ticker}:`, error);
			throw error;
		}
	}

	async getStockMarketCap(ticker: string): Promise<number | null> {
		try {
			const data = await redis.hget<number>(TempDB.getTickerKey(ticker), RankType.MARKET_CAP);
			return data ?? null;
		} catch (error) {
			console.error(`Failed to get market cap for ticker ${ticker}:`, error);
			throw error;
		}
	}

	async updateStocksELO(
		winnerSymbol: string,
		newWinnerELO: number,
		loserSymbol: string,
		newLoserELO: number
	): Promise<void> {
		try {
			const pipeline = redis.pipeline();

			pipeline.zadd(TempDB.ELO_RANK, { score: newWinnerELO, member: winnerSymbol });
			pipeline.zadd(TempDB.ELO_RANK, { score: newLoserELO, member: loserSymbol });

			await pipeline.exec();
		} catch (error) {
			console.error('Failed to update ELO for stocks:', error);
			throw error;
		}
	}

	async getTickerByRank(rankType: RankType, rank: number): Promise<string> {
		try {
			const rankKey = TempDB.getRankKey(rankType);
			const result = (await redis.zrange(rankKey, rank, rank)) as string[];
			if (result.length === 0) {
				console.error(`Failed to get ticker by rank for ${rankType} at rank ${rank}`);
				return '';
			}
			return result[0];
		} catch (error) {
			console.error(`Failed to get ticker by rank for ${rankType}:`, error);
			throw error;
		}
	}

	async getTotalTickers(): Promise<number> {
		try {
			const eloCount = await redis.zcard(TempDB.ELO_RANK);
			const marketCapCount = await redis.zcard(TempDB.MARKET_CAP_RANK);

			return Math.max(eloCount, marketCapCount); // Return the maximum count from both sorted sets
		} catch (error) {
			console.error('Failed to get total tickers:', error);
			throw error;
		}
	}
}

export const TEMP_DB = new TempDB();
