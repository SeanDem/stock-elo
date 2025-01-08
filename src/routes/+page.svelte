<script lang="ts">
	import StockCard from '$lib/components/cards/StockCard.svelte';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { polygonDataToStockCardData, updateElo } from '$lib';
	let { data } = $props();

	const stocks = $derived(
		data.tickerDetails.length > 0
			? data.tickerDetails.map((stock) => polygonDataToStockCardData(stock))
			: new Array(2)
	);

	let isThrottled = false;
	const handleStockClick = async (ticker: string) => {
		if (isThrottled) return;
		isThrottled = true;
		try {
			const selectedStock = data.tickerDetails.find((stock) => stock.ticker === ticker);
			const nonSelectedStock = data.tickerDetails.find((stock) => stock.ticker !== ticker);

			if (!selectedStock || !nonSelectedStock) throw new Error('Invalid ticker or stocks data');
			await updateElo(selectedStock.ticker, nonSelectedStock.ticker);
			await invalidateAll();
		} catch (error) {
			console.error(error);
		} finally {
			isThrottled = false;
		}
	};

</script>

<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
	{#each stocks as stock}
		<StockCard {stock} onClick={handleStockClick} />
	{/each}
</div>
