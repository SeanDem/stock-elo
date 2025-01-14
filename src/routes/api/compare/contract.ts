export interface TickerCompDetails {
	elo: number;
	description: string;
	homepageUrl: string;
	logoUrl: string;
	marketCap: number;
	name: string;
	ticker: string;
	price: number;
	todaysChange: number;
	todaysChangePerc: number;
	volume: number;
	sector: string;
	peRatio?: number;
	industry?: string;
	dividendYield?: number;
}
