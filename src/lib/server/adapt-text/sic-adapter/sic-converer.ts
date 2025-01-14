import { type IndustryCategory } from '$lib/server/adapt-text/sic-adapter/sic-table';
import type { AdapterStrategy } from '$lib/server/adapt-text/cleaner-strategy';
import { SIC_CATEGORIES_SIMPLE } from '$lib/server/adapt-text/sic-adapter/sic-table-simpe';

class Sic_Adapter implements AdapterStrategy {
	private readonly industryCategories: IndustryCategory[] = [];

	constructor() {
		this.industryCategories = SIC_CATEGORIES_SIMPLE;
	}

	public adapt(sicCodeInput: string | number): string {
		const sicCode = typeof sicCodeInput === 'string' ? parseInt(sicCodeInput) : sicCodeInput;

		if (isNaN(sicCode)) {
			throw new Error('Invalid SIC code input');
		}
		return this.findCategoryNameBySicCode(sicCode);
	}

	private findCategoryNameBySicCode(sicCode: number): string {
		let foundCategory: string = '';

		this.industryCategories.forEach((category) => {
			if (this.isSicCodeInCategory(sicCode, category.sicCodes)) {
				foundCategory = category.name;
			}
		});
		if (!foundCategory) {
			console.error(`SIC code ${sicCode} not found in any category`);
		}
		return foundCategory;
	}

	private isSicCodeInCategory(
		sicCode: number,
		sicCodeRanges: { low: number; high: number }[]
	): boolean {
		return sicCodeRanges.some((range) => sicCode >= range.low && sicCode <= range.high);
	}
}

export const SIC_ADAPTER = new Sic_Adapter();
