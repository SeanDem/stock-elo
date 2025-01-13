import { POLYGON_API_KEY } from '$lib/server/env/polygon';

interface Address {
	address1: string;
	city: string;
	state: string;
	postal_code: string;
}

interface Branding {
	logo_url: string;
	icon_url: string;
}

export interface TickerDetails {
	ticker: string;
	name: string;
	market: string;
	locale: string;
	primary_exchange: string;
	type: string;
	active: boolean;
	currency_name: string;
	cik: string;
	composite_figi: string;
	share_class_figi: string;
	market_cap: number;
	phone_number: string;
	address: Address;
	description: string;
	sic_code: string;
	sic_description: string;
	ticker_root: string;
	homepage_url: string;
	total_employees: number;
	list_date: string;
	branding: Branding;
	share_class_shares_outstanding: number;
	weighted_shares_outstanding: number;
	round_lot: number;
}
interface TickerResponse {
	request_id: string;
	results: TickerDetails;
	status: string;
}

export async function fetchTickerDetails(ticker: string = 'AAPL'): Promise<TickerDetails | null> {
	console.log('Fetching ticker details for', ticker);
	const url = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${POLYGON_API_KEY}`;

	const response = await fetch(url);
	if (!response.ok) {
		console.error('Failed to fetch compare details:', response.status, response.statusText);
		return null;
	}
	const data: TickerResponse = await response.json();
	console.log('Successfully fetched ticker details for', ticker);
	console.log(JSON.stringify(data.results));
	return data.results;
}
