import { RankType, TEMP_DB } from '$lib/server/redis/dbTemp';

class RankingService {
	async getStockRanking(
		rankType: RankType = RankType.ELO,
		limit: number = 100,
		offset: number = 0,
		ascending: boolean = false
	): Promise<{ ticker: string; elo: string; logoUrl: string; eloRank: number }[]> {
		const tickersWithScores = await TEMP_DB.getStockList(rankType, limit, offset, ascending);
		console.log(tickersWithScores);
		const res = [];
		for (let i = 0; i < tickersWithScores.length; i += 2) {
			const ticker = tickersWithScores[i];
			const score = parseFloat(tickersWithScores[i + 1]);
			res.push({
				ticker,
				elo: score.toString(),
				logoUrl: `/api/stock/logo?ticker=${ticker}`,
				eloRank: i / 2 + 1
			});
		}
		return res;
	}
}
export const RANKING_SERVICE = new RankingService();
