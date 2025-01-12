import { TICKER_SELECTION_SERVICE } from '$lib/server/selection/service';
import { fetchTickerDetails } from '$lib/server/polygon/TickerDetails';
import { fetchTickerSnapshot } from '$lib/server/polygon/TickerSnapshot';
import type { TickerCompDetails } from '../../../routes/api/compare/contract';
import { ELO_SERVICE } from '$lib/server/elo/service';
import { polygonDataToStockCardData } from '$lib/server/compare/adapter';
import { TEMP_DB } from '$lib/server/redis/dbTemp';

class CompareService {
	async getTwoCompareList(): Promise<TickerCompDetails[]> {
		const compareList: TickerCompDetails[] = [];
		const tickers = await TICKER_SELECTION_SERVICE.getTwoTickers();
		for (const ticker of tickers) {
			const [tickerData, tickerSnapshot, elo] = await Promise.all([
				fetchTickerDetails(ticker), //TODO convert to service
				fetchTickerSnapshot(ticker), //TODO convert to service
				ELO_SERVICE.getElo(ticker)
			]);
			if (tickerData && tickerSnapshot) {
				const polygonData = polygonDataToStockCardData(tickerData, tickerSnapshot);
				compareList.push({ ...polygonData, elo: elo ?? 0 });
			}
			if (tickerData?.market_cap) {
				await TEMP_DB.updateMarketCapRank(ticker, tickerData?.market_cap);
			}
		}
		return compareList;
	}
}
export const COMPARE_SERVICE = new CompareService();
