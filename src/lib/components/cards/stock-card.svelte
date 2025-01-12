<script lang="ts">
	import { Format } from '$lib/utils/format';
	import type { StockCardProps } from '$lib/components/cards/stock-card.types';
	import { stockCardSkeleton } from '$lib/components/cards/skeleton';

	export let stock: StockCardProps = stockCardSkeleton;
	export let onClick: (symbol: string) => void;

	function getChangeClass(change: number | string): string {
		if (typeof change === 'string') {
			change = parseFloat(change);
		}
		return change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : '';
	}
</script>

<div
	class="card w-96 h-72
	bg-base-100 shadow-md border border-base-200
	cursor-pointer hover:shadow-2xl"
	on:click={() => onClick(stock.ticker)}
	on:keydown={(e) => e.key === 'Enter' && onClick(stock.ticker)}
	role="button"
	tabindex="0"
>
	<div class="card-body gap-y-4">
		<div class="flex items-start h-32">
			<img alt={stock.ticker} class="h-32 w-auto max-w-40 object-contain" src={stock.logoUrl} />
			<div class="w-2/3 ml-4 overflow-hidden">
				<h2 class="card-title text-xl font-semibold truncate">
					{stock.ticker}
				</h2>
				<p class="text-base-content/70 line-clamp-3">
					{stock.name}
				</p>
			</div>
		</div>
		<div class="flex justify-between">
			<div class="flex flex-col">
				<p class="text-base-content">
					<span class="font-semibold">Price:</span>
					{Format.currency(stock.price)}
				</p>
				<p class="text-base-content">
					<span class="font-semibold">Market Cap:</span>
					{Format.marketCap(stock.marketCap)}
				</p>
				{#if stock.volume}
					<p class="text-base-content">
						<span class="font-semibold">Volume:</span>
						{Format.currency(stock.volume)}
					</p>
				{/if}
				{#if stock.todaysChangePerc}
					<p class="text-base-content">
						<span class="font-semibold">Change (24h):</span>
						<span class={getChangeClass(stock.todaysChangePerc)}>
							{Format.percentage(stock.todaysChangePerc)}</span
						>
					</p>
				{/if}
			</div>
			<div class="text-4xl font-bold text-right">
				{Format.round(stock.elo)}
			</div>
		</div>
	</div>
</div>
