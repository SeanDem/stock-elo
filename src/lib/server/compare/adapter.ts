import type { TickerCompDetails } from '$lib';
import type { TickerDetails } from '$lib/server/polygon/TickerDetails';
import type { TickerSnapshot } from '$lib/server/polygon/TickerSnapshot';

export function polygonDataToStockCardData(
	tickerDetails: TickerDetails,
	tickerSnapshot: TickerSnapshot
): Omit<TickerCompDetails, 'elo'> {
	return {
		name: tickerDetails.name,
		ticker: tickerDetails.ticker,
		logoUrl: `/api/stock/logo?ticker=${tickerDetails.ticker}`,
		marketCap: tickerDetails.market_cap,
		price: tickerSnapshot.day.c || tickerSnapshot.prevDay.c,
		description: tickerDetails.description || '',
		homepageUrl: tickerDetails.homepage_url || '',
		todaysChange: tickerSnapshot.todaysChange,
		todaysChangePerc: tickerSnapshot.todaysChangePerc / 100,
		volume: tickerSnapshot.day.v || tickerSnapshot.prevDay.v,
		sector: tickerDetails.sic_description || ''
	};
}
