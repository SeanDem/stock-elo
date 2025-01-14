import { AdapterStrategy } from '$lib/server/adapt-text/cleaner-strategy';

const keyTerms = [
	'class a',
	'class b',
	'class c',
	'common stock',
	'ordinary shares',
	'ordinary stock',
	'preferred stock',
	'shares',
	'stock',
	'trust units',
	'units',
	'corporation',
	'company',
	'incorporated',
	'corp',
	'limited corporation',
	'limited partnership',
	'limited liability company',
	', inc.',
	'inc',
	', ltd.'
];

export class StockNameCleaner extends AdapterStrategy {
	adapt(text: string): string {
		text = this.removeKeyTerms(text);
		text = this.removeTrailingPunctuation(text);
		return this.toTitleCase(text);
	}

	private removeKeyTerms(text: string): string {
		const regex = new RegExp(`\\b(${keyTerms.join('|')})\\b.*`, 'i');
		return text.replace(regex, '').trim();
	}

	private removeTrailingPunctuation(text: string): string {
		return text.replace(/[,.\s]+$/, '').trim();
	}

	private toTitleCase(text: string): string {
		return text.replace(/\b\w+/g, (word) => {
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		});
	}
}

export const STOCK_NAME_CLEANER = new StockNameCleaner();
