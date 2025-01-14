const percentageFormatter = new Intl.NumberFormat('en-US', {
	style: 'percent',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
});

const numberFormatter = new Intl.NumberFormat('en-US', {
	useGrouping: true
});

export class Format {
	static currency(value: number, decimals: number = 2): string {
		const currencyFormatter = new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		});
		return currencyFormatter.format(value);
	}

	static percentage(value: number): string {
		return percentageFormatter.format(value);
	}

	static number(value: number): string {
		return numberFormatter.format(value);
	}

	static round(value: number | undefined, decimals: number = 0): string {
		if (!value) return '';
		return numberFormatter.format(Number(value.toFixed(decimals)));
	}

	static marketCap(value: number): string {
		switch (true) {
			case value >= 1_000_000_000_000:
				return `${(value / 1_000_000_000_000).toFixed(2)} T`;
			case value >= 1_000_000_000:
				return `${(value / 1_000_000_000).toFixed(2)} B`;
			case value >= 1_000_000:
				return `${(value / 1_000_000).toFixed(2)} M`;
			default:
				return numberFormatter.format(value);
		}
	}
	static maxChars(value: string, max: number): string {
		if (value.length > max) {
			return value.slice(0, max) + '...';
		}
		return value;
	}
}
