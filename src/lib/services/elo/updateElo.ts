export async function updateElo(winner: string, loser: string) {
	return fetch('/api/elo/update', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			winner,
			loser
		})
	});
}
