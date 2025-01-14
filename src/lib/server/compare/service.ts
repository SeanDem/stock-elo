import { TICKER_SELECTION_SERVICE } from '$lib/server/selection/service';
import { fetchTickerDetails } from '$lib/server/polygon/ticker-details';
import { fetchTickerSnapshot } from '$lib/server/polygon/ticker-snapshot';
import type { TickerCompDetails } from '../../../routes/api/compare/contract';
import { ELO_SERVICE } from '$lib/server/elo/service';
import { polygonDataToStockCardData } from '$lib/server/compare/adapter';
import { TEMP_DB } from '$lib/server/redis/dbTemp';

class CompareService {
	async getTwoCompareList(): Promise<TickerCompDetails[]> {
		try {
			const tickers = await TICKER_SELECTION_SERVICE.getTwoTickers();
			const compareList = await Promise.all(tickers.map((ticker) => this.processTicker(ticker)));
			return compareList.filter(Boolean) as TickerCompDetails[];
		} catch (error) {
			console.error('Error fetching compare list:', error);
			return [];
		}
	}

	private async processTicker(ticker: string): Promise<TickerCompDetails | null> {
		try {
			const [tickerData, tickerSnapshot, elo] = await Promise.all([
				fetchTickerDetails(ticker),
				fetchTickerSnapshot(ticker),
				ELO_SERVICE.getElo(ticker)
			]);

			if (!tickerData || !tickerSnapshot) return null;

			const polygonData = polygonDataToStockCardData(tickerData, tickerSnapshot);
			polygonData.elo = elo ?? 0;

			if (tickerData.market_cap) {
				await TEMP_DB.updateMarketCapRank(ticker, tickerData.market_cap);
			}

			console.log(`Ticker details: ${ticker}:`, polygonData);
			return polygonData;
		} catch (error) {
			console.error(`Error processing ticker ${ticker}:`, error);
			return null;
		}
	}
}

export const COMPARE_SERVICE = new CompareService();
