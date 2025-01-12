import { ELO_SERVICE } from '$lib/server/elo/service';
import { json } from '@sveltejs/kit';

export async function GET({ url }: { url: URL }) {
	const ticker = url.searchParams.get('ticker');
	if (!ticker) {
		return json({ error: 'Ticker parameter is required' }, { status: 400 });
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
