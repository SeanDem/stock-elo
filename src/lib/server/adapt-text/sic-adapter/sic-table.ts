export type IndustryCategory = {
	name: string;
	industries: string;
	sicCodes: { low: number; high: number }[];
};

export const SIC_CATEGORIES: IndustryCategory[] = [
	{
		name: 'Hardware',
		industries:
			'Electronic components, electrical equipment, computers, semiconductors, and related fields',
		sicCodes: [
			{ low: 3570, high: 3579 },
			{ low: 3600, high: 3699 }
		]
	},
	{
		name: 'Technology Services',
		industries: 'Software, IT services, data processing, and telecommunications',
		sicCodes: [
			{ low: 7370, high: 7379 },
			{ low: 7380, high: 7389 }
		]
	},
	{
		name: 'Finance',
		industries: 'Banking, investment, insurance, and real estate',
		sicCodes: [
			{ low: 6000, high: 6499 },
			{ low: 6500, high: 6599 },
			{ low: 6798, high: 6798 }
		]
	},
	{
		name: 'Services',
		industries: 'Retail, food services, entertainment, and personal services',
		sicCodes: [
			{ low: 7000, high: 7299 },
			{ low: 7340, high: 7349 },
			{ low: 8100, high: 8399 },
			{ low: 7990, high: 7999 }
		]
	},
	{
		name: 'Durables',
		industries: 'Home furnishings, appliances, vehicles, and other long-lasting consumer goods',
		sicCodes: [
			{ low: 2500, high: 2599 },
			{ low: 3630, high: 3659 },
			{ low: 3710, high: 3799 }
		]
	},
	{
		name: 'Retail',
		industries: 'Department stores, food stores, apparel, auto dealers, and other retail sectors',
		sicCodes: [{ low: 5200, high: 5999 }]
	},
	{
		name: 'Mining',
		industries: 'Coal, oil, gas, and mineral extraction for energy production',
		sicCodes: [
			{ low: 1000, high: 1399 },
			{ low: 2900, high: 2999 }
		]
	},
	{
		name: 'Utilities',
		industries: 'Electric, gas, water, and sanitary services',
		sicCodes: [{ low: 4900, high: 4999 }]
	},
	{
		name: 'Healthcare',
		industries: 'Hospitals, nursing care, home healthcare, and outpatient services',
		sicCodes: [
			{ low: 8000, high: 8099 },
			{ low: 2830, high: 2836 },
			{ low: 3840, high: 3851 },
			{ low: 8731, high: 8731 }
		]
	},
	{
		name: 'Manufacturing',
		industries: 'Chemical manufacturing, industrial equipment, and related processes',
		sicCodes: [
			{ low: 2800, high: 2899 },
			{ low: 3500, high: 3599 },
			{ low: 1500, high: 1799 },
			{ low: 3400, high: 3499 },
			{ low: 2000, high: 3999 }
		]
	},
	{
		name: 'Communications',
		industries: 'Telecommunications, broadcasting, and cable services',
		sicCodes: [{ low: 4800, high: 4899 }]
	},
	{
		name: 'Transport',
		industries: 'Air, rail, water, and trucking services',
		sicCodes: [{ low: 4000, high: 4799 }]
	},
	{
		name: 'Distribution',
		industries: 'Wholesale and logistics for various industries',
		sicCodes: [{ low: 5000, high: 5199 }]
	},
	{
		name: 'Non-Energy Minerals',
		industries: 'Mining and processing of minerals unrelated to energy',
		sicCodes: [
			{ low: 1400, high: 1499 },
			{ low: 3200, high: 3299 }
		]
	},
	{
		name: 'Business Services',
		industries: 'Consulting, credit reporting, and miscellaneous business services',
		sicCodes: [
			{ low: 7320, high: 7329 },
			{ low: 7380, high: 7389 },
			{ low: 8741, high: 8741 }
		]
	},
	{
		name: 'Uncategorized',
		industries: 'Unclassified or missing industry data',
		sicCodes: [{ low: 0, high: 0 }]
	}
];
