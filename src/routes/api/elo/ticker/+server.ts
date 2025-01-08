import { ELO_SERVICE } from '$lib/server/elo/service';
import { json } from '@sveltejs/kit';
import { fetchTickerDetails } from '$lib/services/polygon/TickerDetails';
import { fetchTickerSnapshot } from '$lib/services/polygon/TickerSnapshot';
import { fetchElo } from '$lib';
import { TICKER_SELECTION_SERVICE } from '$lib/server/selection/service';

export async function GET({ url }: { url: URL }) {
	const ticker = url.searchParams.get('ticker');
	if (!ticker) {
		return json({ error: 'Ticker parameter is required' }, { status: 400 });
	}
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
	try {
		const elo = await ELO_SERVICE.getElo(ticker);
		if (elo === null) {
			return json({ error: 'ELO not found' }, { status: 404 });
		}

		return json({ elo });
	} catch (error) {
		console.error('Error fetching ELO:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}
