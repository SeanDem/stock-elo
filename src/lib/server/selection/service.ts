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

		return TEMP_DB.getTickerByIndex(rankType, index);
	}

	private async pickTicker(): Promise<string> {
		const rankType = this.pickRandomRankType();
		return this.pickTickerByType(rankType);
	}

	async getTwoTickers(): Promise<string[]> {
		return await this.getTwoRandomTickers();
	}

	async getTwoRandomTickers(): Promise<string[]> {
		const total = await TEMP_DB.getTotalTickers();
		const index1 = Math.floor(Math.random() * total);
		let index2 = Math.floor(Math.random() * total);

		while (index1 === index2) {
			index2 = Math.floor(Math.random() * total);
		}

		const [ticker1, ticker2] = await Promise.all([
			TEMP_DB.getTickerByIndex(RankType.ELO, index1),
			TEMP_DB.getTickerByIndex(RankType.ELO, index2)
		]);

		return [ticker1, ticker2];
	}

	private getTwoTrendingTickers() {
		//get two trending compare
	}
	private getTwoEloTickers() {
		//get two elo compare with similar elo
	}
	private getTwoMarketCapTickers() {
		//get two market cap compare with similar market cap
	}
}

export const TICKER_SELECTION_SERVICE = new TickerSelectionService();
