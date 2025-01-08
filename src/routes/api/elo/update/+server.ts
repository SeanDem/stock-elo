import { ELO_SERVICE } from '$lib/server/elo/service';
import { json } from '@sveltejs/kit';

export async function POST({ request }: { request: Request }) {
	try {
		const { winner, loser }: { winner: string; loser: string } = await request.json();
		if (!winner || !loser) {
			return json({ error: 'Invalid request body' }, { status: 400 });
		}
		if (winner === loser) {
			return json({ error: 'Winner and loser cannot be the same' }, { status: 400 });
		}
		await ELO_SERVICE.updateElo(winner, loser);

		return json({
			message: 'ELO ratings updated successfully'
		});
	} catch (error) {
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}
