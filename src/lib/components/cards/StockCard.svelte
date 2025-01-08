<script lang="ts">
	 import type { StockCardData } from '$lib/components/cards/StockCardTypes';
	 import { Format } from '$lib/utils/format';

	 export let stock: StockCardData = {
		 elo: 0,
		 dividendYield: 0,
		 peRatio: 0,
		 sector: '',
		 volume: 0,
		 description: '',
		 homepageUrl: '',
		 todaysChange: 0,
		 todaysChangePerc: 0,
		 ticker: '',
		 name: '',
		 logoUrl: '',
		 price: 0,
		 marketCap: 0
	 };
	 export let onClick: (symbol: string) => void;

</script>

<div
	role="button"
	tabindex="0"
	class="flex card w-72 h-72
	bg-base-100 shadow-md border border-base-200
	cursor-pointer hover:shadow-2xl"
	on:keydown={(e) => e.key === 'Enter' && onClick(stock.ticker)}
	on:click={() => onClick(stock.ticker)}
>
	<div class="card-body space-y-4">
		<div class="flex items-center">
			<img
				src={stock.logoUrl}
				alt={stock.name}
				class="w-12 h-12 object-contain"
			/>
			<div class="ml-4">
				<h2 class="card-title text-lg font-semibold ">
					{stock.ticker}
				</h2>
				<p class="text-sm text-base-content/70">{stock.name}</p>
			</div>
			<div class="text-3xl font-bold ml-auto">
					{Format.round(stock.elo)}
			</div>
		</div>
		<div class="flex flex-col space-y-1">
			<p class="text-base-content">
				<span class="font-semibold">Price:</span> {Format.currency(stock.price)}
			</p>
			<p class="text-base-content">
				<span class="font-semibold">Market Cap:</span> {Format.marketCap(stock.marketCap)}
			</p>
			{#if stock.volume}
				<p class="text-base-content">
					<span class="font-semibold">Volume:</span> {Format.currency(stock.volume)}
				</p>
			{/if}
			{#if stock.todaysChangePerc}
				<p class="text-base-content">
					<span class="font-semibold">Change (24h):</span> {Format.percentage(stock.todaysChangePerc)}
				</p>
			{/if}
		</div>
	</div>
</div>
