export async function fetchElo(
	ticker: string,
	fetch: typeof globalThis.fetch
): Promise<{ elo: number } | { error: string }> {
	const response = await fetch(`/api/elo/ticker?ticker=${encodeURIComponent(ticker)}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});

	if (!response.ok) {
		const errorData = await response.json();
		return { error: errorData.error || 'Failed to fetch ELO' };
	}

	const data = await response.json();

	if (typeof data.elo !== 'number') {
		return { error: 'Invalid ELO format received' };
	}

	return { elo: data.elo };
}
