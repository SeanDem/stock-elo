import type { TickerDetails } from '$lib/services/polygon/TickerDetails';
import type { TickerSnapshot } from '$lib/services/polygon/TickerSnapshot';

export interface TickerPolygon extends TickerDetails, TickerSnapshot {
	elo?: number;
}
