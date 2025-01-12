import { json } from '@sveltejs/kit';
import { POLYGON_API_KEY } from '$lib/server/env';

export async function GET({ url }: { url: URL }) {
	const ticker = url.searchParams.get('ticker');
	if (!ticker) {
		return json({ error: 'Ticker parameter is required' }, { status: 400 });
	}

	const apiUrl = `https://api.polygon.io/v1/ticker/${ticker}/branding/icon_url?apiKey=${POLYGON_API_KEY}`;

	try {
		const response = await fetch(apiUrl);

		if (!response.ok) {
			return json(
				{ error: 'Failed to fetch logo', statusText: response.statusText },
				{ status: response.status }
			);
		}

		const data = await response.json();

		return json(data);
	} catch (error) {
		return json(
			{ error: 'An error occurred while fetching the logo', details: error },
			{ status: 500 }
		);
	}
}
