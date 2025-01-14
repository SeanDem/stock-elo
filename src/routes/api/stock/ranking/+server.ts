import { RankType } from '$lib/server/redis/dbTemp';
import { RANKING_SERVICE } from '$lib/server/ranking /ranking-service';

export async function GET({ url }: { url: URL }) {
	try {
		const rankType = (url.searchParams.get('rankType') as RankType) || RankType.ELO;
		const limit = parseInt(url.searchParams.get('limit') || '100', 10);
		const offset = parseInt(url.searchParams.get('offset') || '0', 10);
		const ascending = url.searchParams.get('ascending') === 'false';

		const stockList = await RANKING_SERVICE.getStockRanking(rankType, limit, offset, ascending);

		return new Response(JSON.stringify(stockList), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Failed to fetch stock rankings:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch stock rankings' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
