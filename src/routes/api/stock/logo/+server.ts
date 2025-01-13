import { POLYGON_API_KEY } from '$lib/server/env';
import { error } from '@sveltejs/kit';
import { fetchTickerDetails } from '$lib/server/polygon/ticker-details';

export async function GET({ url, fetch }) {
	const ticker = url.searchParams.get('ticker');
	if (!ticker) {
		throw error(400, 'Ticker parameter is required');
	}
	const defaultImage = `https://placehold.co/600x600/808080/000000.png?text=${ticker}`;

	try {
		const tickerDetails = await fetchTickerDetails(ticker);
		if (!tickerDetails) {
			throw error(404, `Ticker not found: ${ticker}`);
		}
		const logoUrl = tickerDetails.branding?.icon_url || tickerDetails.branding?.logo_url;
		let imageResponse;

		if (logoUrl) {
			imageResponse = await fetch(`${logoUrl}?apiKey=${POLYGON_API_KEY}`);
			if (!imageResponse.ok) {
				console.error(
					imageResponse.status,
					`Failed to fetch logo image: ${imageResponse.statusText}`
				);
				imageResponse = await fetch(defaultImage);
			}
		} else {
			imageResponse = await fetch(defaultImage);
		}

		const imageBuffer = await imageResponse.arrayBuffer();
		return new Response(imageBuffer, {
			headers: {
				'Content-Type': imageResponse.headers.get('Content-Type') || 'image/png',
				'Cache-Control': 'public, max-age=36000'
			}
		});
	} catch (err) {
		console.error(`An error occurred: ${err}`);
		throw error(500, 'Internal Server Error');
	}
}
