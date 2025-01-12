import { TICKER_SELECTION_SERVICE } from '$lib/server/selection/service';
import { fetchTickerDetails } from '$lib/server/polygon/TickerDetails';
import { fetchTickerSnapshot } from '$lib/server/polygon/TickerSnapshot';
import type { TickerCompDetails } from '../../../routes/api/compare/contract';
import { ELO_SERVICE } from '$lib/server/elo/service';
import { polygonDataToStockCardData } from '$lib/server/compare/adapter';

class CompareService {
	async getTwoCompareList(): Promise<TickerCompDetails[]> {
		const compareList: TickerCompDetails[] = [];
		const tickers = await TICKER_SELECTION_SERVICE.getTwoTickers();
		for (const ticker of tickers) {
			const [tickerData, tickerSnapshot, elo] = await Promise.all([
				fetchTickerDetails(ticker),
				fetchTickerSnapshot(ticker),
				ELO_SERVICE.getElo(ticker)
			]);
			if (tickerData && tickerSnapshot) {
				const polygonData = polygonDataToStockCardData(tickerData, tickerSnapshot);
				compareList.push({ ...polygonData, elo: elo ?? 0 });
			}
		}
		return compareList;
	}
}
export const COMPARE_SERVICE = new CompareService();
