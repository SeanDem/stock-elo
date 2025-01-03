import { POLYGON_API_KEY } from '$lib/env/polygon';

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

interface LastTrade {
	p: number;
	s: number;
	x: number;
	c: number[];
	t: number;
	i?: string;
}

interface LastQuote {
	p: number;
	s: number;
	P: number;
	S: number;
	t: number;
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
	const url = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=${POLYGON_API_KEY}`;

	const response = await fetch(url);
	if (!response.ok) {
		console.error(`Failed to fetch snapshot for ${ticker}:`, response.status, response.statusText);
		return null;
	}
	const data: SnapshotResponse = await response.json();
	return data.ticker;
}
