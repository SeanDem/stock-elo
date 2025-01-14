import type { TickerCompDetails } from '$lib';

export const load = async ({ fetch }): Promise<{ tickerComp: TickerCompDetails[] }> => {
	const response = await fetch('/api/compare');
	if (!response.ok) {
		throw new Error('Failed to fetch compare data');
	}
	return await response.json();
};
