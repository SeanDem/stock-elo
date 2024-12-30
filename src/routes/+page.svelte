<script lang="ts">
	import StockCard from '$lib/components/cards/StockCard.svelte';
	import type { StockData } from '$lib';
	let { data } = $props();

	const handleStockClick = (stock: StockData) =>  {
	}
</script>

<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
	{#each data.stocks as stock}
		<StockCard {stock} onClick={handleStockClick} />
	{/each}
</div>
