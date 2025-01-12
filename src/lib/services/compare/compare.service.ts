import type { TickerCompDetails } from '../../../routes/api/compare/contract';

export async function fetchCompareList(
	fetch: typeof globalThis.fetch
): Promise<TickerCompDetails[] | { error: string }> {
	const response = await fetch(`/api/compare`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});

	if (!response.ok) {
		const errorData = await response.json();
		return { error: errorData.error || 'Failed to fetch ELO' };
	}

	const res = await response.json();
	return res.data;
}
