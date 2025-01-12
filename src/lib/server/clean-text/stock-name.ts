import { CleanerStrategy } from '$lib/server/clean-text/cleaner-strategy';

const keyTerms = [
	'Class A',
	'Class B',
	'Class C',
	'Common Stock',
	'Ordinary Shares',
	'Ordinary Stock',
	'Preferred Stock',
	'Shares',
	'Stock',
	'Trust Units',
	'Units',
	'Limited Corporation',
	'Limited Partnership',
	'Limited Liability Company'
];

export class StockNameCleaner extends CleanerStrategy {
	clean(text: string): string {
		const regex = new RegExp(`\\b(${keyTerms.join('|')})\\b.*`, 'i');
		return text.replace(regex, '').trim();
	}
}

export const STOCK_NAME_CLEANER = new StockNameCleaner();
