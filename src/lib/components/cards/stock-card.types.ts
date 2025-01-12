import type { TickerDetails } from '$lib/server/polygon/TickerDetails';
import type { TickerCompDetails } from '../../../routes/api/compare/contract';

export interface StockCardProps extends TickerCompDetails {}

function calculateDividendYield(tickerDetails: TickerDetails): number {
	const annualDividendsPerShare = 0;
	return tickerDetails.market_cap ? (annualDividendsPerShare / tickerDetails.market_cap) * 100 : 0;
}
