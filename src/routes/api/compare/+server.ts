import { json } from '@sveltejs/kit';
import { COMPARE_SERVICE } from '$lib/server/compare/service';

export async function GET(): Promise<Response> {
	const tickerComp = await COMPARE_SERVICE.getTwoCompareList();
	return json({ tickerComp });
}
