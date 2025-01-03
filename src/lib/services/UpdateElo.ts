export async function updateElo(winner: string, loser: string) {
	return fetch('/api/elo', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			winner,
			loser
		})
	});
}