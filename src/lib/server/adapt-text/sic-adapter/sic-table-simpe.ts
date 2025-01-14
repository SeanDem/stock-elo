import type { IndustryCategory } from '$lib/server/adapt-text/sic-adapter/sic-table';

export const SIC_CATEGORIES_SIMPLE: IndustryCategory[] = [
	{
		name: 'Agriculture,',
		industries: 'Farming, forestry, fishing, and related activities',
		sicCodes: [{ low: 100, high: 999 }]
	},
	{
		name: 'Mining',
		industries: 'Extraction of minerals, ores, and energy resources',
		sicCodes: [{ low: 1000, high: 1499 }]
	},
	{
		name: 'Construction',
		industries: 'Building construction, heavy construction, and special trade contractors',
		sicCodes: [{ low: 1500, high: 1799 }]
	},
	{
		name: 'Manufacturing',
		industries:
			'Production of goods in factories, including machinery, equipment, and consumer products',
		sicCodes: [{ low: 2000, high: 3999 }]
	},
	{
		name: 'Utilities',
		industries:
			'Services related to transportation, communication, utilities, and waste management',
		sicCodes: [{ low: 4000, high: 4999 }]
	},
	{
		name: 'Wholesale',
		industries: 'Wholesale distribution of durable and non-durable goods',
		sicCodes: [{ low: 5000, high: 5199 }]
	},
	{
		name: 'Retail',
		industries: 'Retail sale of goods and services to consumers',
		sicCodes: [{ low: 5200, high: 5999 }]
	},
	{
		name: 'Finance',
		industries: 'Banking, insurance, real estate, and related financial services',
		sicCodes: [{ low: 6000, high: 6799 }]
	},
	{
		name: 'Services',
		industries:
			'A wide range of services including business, health, legal, educational, and social services',
		sicCodes: [{ low: 7000, high: 8999 }]
	},
	{
		name: 'Government',
		industries: 'Government agencies and public sector organizations',
		sicCodes: [{ low: 9000, high: 9999 }]
	},
	{
		name: 'Unclassified',
		industries: 'Establishments not elsewhere classified',
		sicCodes: [{ low: 0, high: 0 }]
	}
];
