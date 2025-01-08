import { Redis } from '@upstash/redis';

const redis = new Redis({
	url: '',
	token: ''
});

const POLYGON_API_KEY = '';
const BASE_URL = 'https://api.polygon.io/v3/reference/tickers';
const DEFAULT_ELO = 1500;
const MARKET_CAP_THRESHOLD = 30_000_000_000;

async function fetchTickers() {
	let tickers = [];
	let nextUrl = `${BASE_URL}?market=stocks&locale=us&active=true&type=CS&limit=1000&apiKey=${POLYGON_API_KEY}`;

	while (nextUrl) {
		const response = await fetch(nextUrl);
		if (!response.ok) {
			throw new Error(`Failed to fetch tickers: ${response.statusText}`);
		}
		const data = await response.json();
		tickers = tickers.concat(data.results);
		nextUrl = data.next_url ? `${data.next_url}&apiKey=${POLYGON_API_KEY}` : null;
	}

	return tickers;
}

async function fetchTickerDetails(ticker) {
	const retries = 10;
	const delay = 10;
	const url = `${BASE_URL}/${ticker}?apiKey=${POLYGON_API_KEY}`;

	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Failed to fetch details for ${ticker}: ${response.statusText}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(`Attempt ${attempt} failed: ${error.message}`);
			if (attempt < retries) {
				await new Promise((resolve) => setTimeout(resolve, delay));
			} else {
				console.error(`All ${retries} attempts failed for ${ticker}.`);
				return null;
			}
		}
	}
}

async function seedDatabase(dryRun = true) {
	try {
		console.log('Fetching list of tickers...');
		const tickers = await fetchTickers();
		console.log(`Fetched ${tickers.length} tickers.`);

		if (!dryRun) {
			console.log('Clearing existing Redis database...');
			await redis.flushdb();
			console.log('Redis database cleared.');
		}

		console.log('Processing tickers...');
		const pipeline = redis.pipeline();

		for (const ticker_data of tickers) {
			const ticker = ticker_data.ticker;
			const details = await fetchTickerDetails(ticker);
			if (!details) continue;
			const marketCap = details.results.market_cap;

			if (marketCap && marketCap >= MARKET_CAP_THRESHOLD) {
				const tickerKey = `ticker:${ticker}`;

				if (dryRun) {
					console.log(`Would set elo_rank for ${tickerKey} to ${DEFAULT_ELO}`);
					console.log(`Would set market_cap_rank for ${tickerKey} to ${marketCap}`);
				} else {
					pipeline.zadd('elo_rank', { score: 1500, member: ticker });
					console.log(`set elo_rank for ${tickerKey} to ${DEFAULT_ELO}`);
					pipeline.zadd('market_cap_rank', { score: marketCap, member: ticker.ticker });
					console.log(`set market_cap_rank for ${tickerKey} to ${marketCap}`);
				}
			} else {
			}
		}

		if (dryRun) {
			console.log('Dry Run Mode: No changes have been made to the database.');
		} else {
			await pipeline.exec();
			console.log('Redis database seeded successfully.');
		}
	} catch (error) {
		console.error('Failed to seed Redis database:', error);
	}
}

seedDatabase(false);
