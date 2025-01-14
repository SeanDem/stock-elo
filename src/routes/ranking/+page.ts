import type { TickerCompDetails } from '../api/compare/contract';

export const load = async ({ fetch }): Promise<{ tickerComp: TickerCompDetails[] }> => {
	const response = await fetch('/api/stock/ranking');
	if (!response.ok) {
		throw new Error('Failed to fetch compare data');
	}
	return { tickerComp: await response.json() };
};
