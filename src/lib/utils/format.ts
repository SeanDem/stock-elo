const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
});

const percentageFormatter = new Intl.NumberFormat('en-US', {
	style: 'percent',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

const numberFormatter = new Intl.NumberFormat('en-US', {
	useGrouping: true
});

export class Format {
	static currency(value: number): string {
		return currencyFormatter.format(value);
	}

	static percentage(value: number): string {
		return percentageFormatter.format(value);
	}

	static number(value: number): string {
		return numberFormatter.format(value);
	}

	static marketCap(value: number): string {
		switch (true) {
			case value >= 1_000_000_000_000:
				return `${(value / 1_000_000_000_000).toFixed(2)} Trillion`;
			case value >= 1_000_000_000:
				return `${(value / 1_000_000_000).toFixed(2)} Billion`;
			case value >= 1_000_000:
				return `${(value / 1_000_000).toFixed(2)} Million`;
			default:
				return numberFormatter.format(value);
		}
	}
}
