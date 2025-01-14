import { POLYGON_API_KEY } from '$lib/server/env/polygon';

interface Aggregate {
	o: number;
	h: number;
	l: number;
	c: number;
	v: number;
	vw: number;
	t?: number;
	n?: number;
}

export interface TickerSnapshot {
	ticker: string;
	todaysChange: number;
	todaysChangePerc: number;
	updated: number;
	day: Aggregate;
	min: Aggregate;
	prevDay: Aggregate;
}

interface SnapshotResponse {
	request_id: string;
	status: string;
	ticker: TickerSnapshot;
}

export async function fetchTickerSnapshot(ticker: string): Promise<TickerSnapshot | null> {
	console.log('Fetching ticker snapshot for', ticker);
	const url = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=${POLYGON_API_KEY}`;
	const maxRetries = 10;
	const retryDelay = 10;

	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		const response = await fetch(url);
		if (!response.ok) {
			console.error(
				`Failed to fetch snapshot for ${ticker}:`,
				response.status,
				response.statusText
			);
			return null;
		}
		const data: SnapshotResponse = await response.json();
		console.log('Successfully fetched ticker snapshot for', ticker);
		return data.ticker;
		// retry if failed
		// await new Promise((resolve) => setTimeout(resolve, retryDelay));
	}

	console.error(`Failed to fetch valid snapshot for ${ticker} after ${maxRetries} attempts.`);
	return null;
}
