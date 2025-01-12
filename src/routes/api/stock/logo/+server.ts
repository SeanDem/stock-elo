import { POLYGON_API_KEY } from '$lib/server/env';
import { error } from '@sveltejs/kit';
import { fetchTickerDetails } from '$lib/server/polygon/TickerDetails';

export async function GET({ url, fetch }: { url: URL; fetch: typeof globalThis.fetch }) {
	const ticker = url.searchParams.get('ticker');
	if (!ticker) {
		throw error(400, 'Ticker parameter is required');
	}

	try {
		const tickerDetails = await fetchTickerDetails(ticker);
		if (!tickerDetails) {
			throw error(404, `Ticker not found: ${ticker}`);
		}
		const logoUrl = tickerDetails.branding?.icon_url || tickerDetails.branding?.logo_url;

		if (!logoUrl) {
			throw error(404, `Logo not found for ticker: ${ticker}`);
		}

		const imageResponse = await fetch(`${logoUrl}?apiKey=${POLYGON_API_KEY}`);
		if (!imageResponse.ok) {
			console.error(
				imageResponse.status,
				`Failed to fetch logo image: ${imageResponse.statusText}`
			);
		}

		return new Response(imageResponse.body, {
			headers: {
				'Content-Type': imageResponse.headers.get('Content-Type') || 'image/png',
				'Cache-Control': 'public, max-age=3600'
			}
		});
	} catch (error) {
		console.error(500, `An error occurred: ${error}`);
	}
}
