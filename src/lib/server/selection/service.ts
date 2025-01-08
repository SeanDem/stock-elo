import { RankType, TEMP_DB } from '$lib/server/redis/dbTemp';

export class TickerSelectionService {
	private readonly PROB_ELO_VS_MKT = 0.5;
	private readonly TREND_POWER = 2;

	private pickRandomRankType(): RankType {
		return Math.random() < this.PROB_ELO_VS_MKT ? RankType.ELO : RankType.MARKET_CAP;
	}

	private async pickTickerByType(rankType: RankType): Promise<string> {
		const total = await TEMP_DB.getTotalTickers();
		const rand = Math.pow(Math.random(), this.TREND_POWER);
		const index = Math.floor(rand * total);

		return TEMP_DB.getTickerByRank(rankType, index);
	}

	private async pickTicker(): Promise<string> {
		const rankType = this.pickRandomRankType();
		return this.pickTickerByType(rankType);
	}

	async getTwoTickers(): Promise<string[]> {
		const ticker1 = await this.pickTicker();
		const ticker2 = await this.pickTicker();
		if (ticker1 === ticker2) {
			return await this.getTwoTickers();
		}
		return [ticker1, ticker2];
	}

	private getTwoRandomTickers() {
		//get two random tickers
	}
	private getTwoTrendingTickers() {
		//get two trending tickers
	}
	private getTwoEloTickers() {
		//get two elo tickers with similar elo
	}
	private getTwoMarketCapTickers() {
		//get two market cap tickers with similar market cap
	}
}

export const TICKER_SELECTION_SERVICE = new TickerSelectionService();
