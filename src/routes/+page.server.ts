import fs from 'fs/promises';
import path from 'path';
import type { StockCardData } from '$lib/components/cards/StockCardTypes';
import type { PageServerLoad } from './$types';
import { fetchTickerDetails, type TickerDetails } from '$lib/services/polygon/TickerDetails';
import { fetchTickerSnapshot } from '$lib/services/polygon/TickerSnapshot';
import type { TickerPolygon } from '$lib/services/polygon';

const tickers = ["AAPL", "TSLA"]
export const load: PageServerLoad = async () => {
	let tickerDetails: TickerPolygon[] = [];
	for (const ticker of tickers) {
		const [tickerData, tickerSnapshot] = await Promise.all([
			fetchTickerDetails(ticker),
			fetchTickerSnapshot(ticker)
		]);
		if (tickerData && tickerSnapshot) tickerDetails.push({...tickerData, ...tickerSnapshot});
	}
	return { tickerDetails };
};
