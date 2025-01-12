<script lang="ts">
	import { updateElo } from '$lib';
	import { invalidateAll } from '$app/navigation';
	import StockCard from '$lib/components/cards/StockCard.svelte';

	let { data } = $props();

	let isThrottled = false;
	const handleStockClick = async (ticker: string) => {
		if (isThrottled) return;
		isThrottled = true;
		try {
			const selectedStock = data.tickerComp.find((stock) => stock.ticker === ticker);
			const nonSelectedStock = data.tickerComp.find((stock) => stock.ticker !== ticker);

			if (!selectedStock || !nonSelectedStock) throw new Error('Invalid compare or stocks data');
			await updateElo(selectedStock.ticker, nonSelectedStock.ticker);
			await invalidateAll();
		} catch (error) {
			console.error(error);
		} finally {
			isThrottled = false;
		}
	};

</script>

<div>
	<div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4 content-center">
		{#each data.tickerComp as ticker}
			<StockCard stock={ticker} onClick={handleStockClick} />
		{/each}
	</div>
</div>