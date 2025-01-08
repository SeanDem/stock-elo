import type { TickerDetails } from '$lib/services/polygon/TickerDetails';
import { POLYGON_API_KEY } from '$lib/env/polygon';
import type { TickerPolygon } from '$lib/services/polygon';

export interface StockCardData {
	elo?: number;
	name: string;
	ticker: string;
	logoUrl: string;
	marketCap: number;
	price: number;
	description: string;
	homepageUrl: string;
	todaysChange: number;
	todaysChangePerc: number;
	volume: number;
	sector: string;
	peRatio?: number;
	dividendYield?: number;
}

function calculateDividendYield(tickerDetails: TickerDetails): number {
	const annualDividendsPerShare = 0;
	return tickerDetails.market_cap ? (annualDividendsPerShare / tickerDetails.market_cap) * 100 : 0;
}

export function polygonDataToStockCardData(tickerDetails: TickerPolygon): StockCardData {
	return {
		elo: tickerDetails.elo,
		name: tickerDetails.name,
		ticker: tickerDetails.ticker,
		logoUrl: `${tickerDetails.branding.icon_url}?apiKey=${POLYGON_API_KEY}`,
		marketCap: tickerDetails.market_cap,
		price: tickerDetails.day.c || tickerDetails.prevDay.c, //todo move up
		description: tickerDetails.description || '',
		homepageUrl: tickerDetails.homepage_url || '',
		todaysChange: tickerDetails.todaysChange,
		todaysChangePerc: tickerDetails.todaysChangePerc,
		volume: tickerDetails.day.v || tickerDetails.prevDay.v, //todo move up
		sector: tickerDetails.sic_description || '',
		dividendYield: calculateDividendYield(tickerDetails)
	};
}
