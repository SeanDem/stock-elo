export interface StockData {
	name: string;
	symbol: string;
	logoUrl: string;
	price: number | string;
	marketCap: number | string;
	volume?: number | string;
	changePercent?: number | string;
	current_elo?: number | string;
}