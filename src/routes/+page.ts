import type { TickerCompDetails } from './api/compare/contract';
import { redirect } from '@sveltejs/kit';

export const load = async (): Promise<{ tickerComp: TickerCompDetails[] }> => {
	throw redirect(302, '/compare');
};
