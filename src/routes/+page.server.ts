import type { StockData } from '$lib/components/cards/stockTypes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const stocks: StockData[] = [
		{
			name: 'Apple Inc.',
			symbol: 'AAPL',
			logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
			price: 178.89,
			marketCap: '2.8T',
			volume: '68M',
			changePercent: '1.24',
			current_elo: 1500,

		},
		{
			name: 'Tesla, Inc.',
			symbol: 'TSLA',
			logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg',
			price: 250.10,
			marketCap: '790B',
			volume: '47M',
			changePercent: '-0.63',
			current_elo: 1500,
		}
	];

	return { stocks };
};
