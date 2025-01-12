import { fetchCompareList } from '$lib/client/client-services/compare/compare.service';

export const load = async ({ fetch }) => {
	const res = fetchCompareList(fetch);
	return { res };
};
