import type { TickerDetails } from '$lib/server/polygon/ticker-details';
import type { TickerSnapshot } from '$lib/server/polygon/ticker-snapshot';
import { STOCK_NAME_CLEANER } from '$lib/server/adapt-text/stock-name';
import type { TickerCompDetails } from '../../../routes/api/compare/contract';

export function polygonDataToStockCardData(
	tickerDetails: TickerDetails,
	tickerSnapshot: TickerSnapshot
): TickerCompDetails {
	return {
		elo: 0,
		name: STOCK_NAME_CLEANER.adapt(tickerDetails.name),
		ticker: tickerDetails.ticker,
		logoUrl: `/api/stock/logo?ticker=${tickerDetails.ticker}`,
		marketCap: tickerDetails.market_cap,
		price: tickerSnapshot.day.c || tickerSnapshot.prevDay.c,
		description: tickerDetails.description || '',
		homepageUrl: tickerDetails.homepage_url || '',
		todaysChange: tickerSnapshot.todaysChange,
		todaysChangePerc: tickerSnapshot.todaysChangePerc / 100,
		volume: tickerSnapshot.day.v || tickerSnapshot.prevDay.v,
		industry: undefined,
		sector: tickerDetails.sic_description || ''
	};
}
