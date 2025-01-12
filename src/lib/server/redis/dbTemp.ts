import redis from '$lib/server/redis/redis';

export enum RankType {
	ELO = 'elo_rank',
	MARKET_CAP = 'market_cap_rank'
}

export class TempDB {
	async getStockELO(ticker: string): Promise<number> {
		try {
			const score = await redis.zscore(RankType.ELO, ticker);
			if (score === null) {
				console.error(`ELO not found for ticker: ${ticker}`);
				return 1500;
			}
			return score;
		} catch (error) {
			console.error(`Failed to get ELO for ticker ${ticker}:`, error);
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

			pipeline.zadd(RankType.ELO, { score: newWinnerELO, member: winnerSymbol });
			pipeline.zadd(RankType.ELO, { score: newLoserELO, member: loserSymbol });

			await pipeline.exec();
		} catch (error) {
			console.error('Failed to update ELO for stocks:', error);
			throw error;
		}
	}

	async getTickerByRank(rankType: RankType, rank: number): Promise<string> {
		try {
			const result = (await redis.zrange(rankType, rank, rank)) as string[];
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
			const eloCount = await redis.zcard(RankType.ELO);
			const marketCapCount = await redis.zcard(RankType.MARKET_CAP);

			return Math.max(eloCount, marketCapCount);
		} catch (error) {
			console.error('Failed to get total compare:', error);
			throw error;
		}
	}
}

export const TEMP_DB = new TempDB();
