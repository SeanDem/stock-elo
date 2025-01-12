import { fetchCompareList } from '$lib/services/compare/compare.service';

export const load = async ({ fetch }) => {
	const res = fetchCompareList(fetch);
	return { res };
};
