<script lang="ts">
	import { Format } from '$lib/client/utils/format';
	import type { StockCardProps } from '$lib/client/components/cards/stock-card.types';
	import { stockCardSkeleton } from '$lib/client/components/cards/skeleton';

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
			<img
				alt={stock.ticker}
				class="h-32 w-32 rounded-lg border object-contain"
				src={stock.logoUrl}
			/>
			<div class="w-2/3 ml-4 overflow-hidden">
				<h2 class="card-title text-xl font-semibold truncate ml-1">
					{stock.ticker}
				</h2>
				{#if stock.industry}
					<div class="badge badge-primary text-sm">{stock.industry}</div>
				{/if}
				<p class="text-base-content/70 line-clamp-3 ml-1">
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
						<span class="font-semibold">Volume (24h):</span>
						{Format.currency(stock.volume, 0)}
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
