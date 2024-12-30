<script lang="ts">
	 import type { StockData } from '$lib/components/cards/stockTypes';

	 export let stock: StockData;
	 export let onClick: (stockData: StockData) => void;

</script>

<div
	class="card bg-base-100 shadow-xl border border-base-200 w-full"
	on:click={() => onClick(stock)}
>
	<div class="card-body space-y-4">
		<div class="flex items-center space-x-3">
			<img
				src={stock.logoUrl}
				alt={stock.name}
				class="w-8 h-8 object-contain"
			/>
			<div>
				<h2 class="card-title text-lg font-semibold">
					{stock.symbol}
				</h2>
				<p class="text-sm text-base-content/70">{stock.name}</p>
			</div>
		</div>

		<div class="flex flex-col space-y-1">
			<p class="text-base-content">
				<span class="font-semibold">Price:</span> ${stock.price}
			</p>
			<p class="text-base-content">
				<span class="font-semibold">Market Cap:</span> {stock.marketCap}
			</p>
			{#if stock.volume}
				<p class="text-base-content">
					<span class="font-semibold">Volume:</span> {stock.volume}
				</p>
			{/if}
			{#if stock.changePercent}
				<p class="text-base-content">
					<span class="font-semibold">Change (24h):</span> {stock.changePercent}%
				</p>
			{/if}
		</div>
	</div>
</div>
