import type { PageServerLoad } from './$types';
import { fetchTickerDetails, type TickerDetails } from '$lib/services/polygon/TickerDetails';
import { fetchTickerSnapshot } from '$lib/services/polygon/TickerSnapshot';
import type { TickerPolygon } from '$lib/services/polygon';
import { fetchElo } from '$lib';
import { TICKER_SELECTION_SERVICE } from '$lib/server/selection/service';

export const load: PageServerLoad = async ({ fetch }) => {
	let tickerDetails: TickerPolygon[] = [];
	const tickers = await TICKER_SELECTION_SERVICE.getTwoTickers();
	for (const ticker of tickers) {
		const [tickerData, tickerSnapshot, tickerElo] = await Promise.all([
			fetchTickerDetails(ticker),
			fetchTickerSnapshot(ticker),
			fetchElo(ticker, fetch)
		]);
		if (tickerData && tickerSnapshot)
			tickerDetails.push({ ...tickerData, ...tickerSnapshot, ...tickerElo });
	}
	return { tickerDetails };
};
