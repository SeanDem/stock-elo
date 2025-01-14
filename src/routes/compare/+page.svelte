<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import StockCard from '$lib/client/components/cards/stock-card.svelte';
	import { themeStore } from '$lib/client/store/theme';
	import { updateElo } from '$lib/client/client-services/elo/updateElo';
	import { onMount } from 'svelte';
	import type { TickerCompDetails } from '../api/compare/contract';

	let { data } = $props();
	let nextDataQueue: { tickerComp: TickerCompDetails[] }[] = [];

	onMount(async () => {
		await prefetchNextData(2);
	});

	const fetchNextData = async () => {
		const response = await fetch('/api/compare');
		return await response.json();
	};

	const prefetchNextData = async (count: number) => {
		for (let i = 0; i < count; i++) {
			const nextData = await fetchNextData();
			nextDataQueue.push(nextData);
		}
	};

	const handleStockClick = async (ticker: string) => {
		const selectedStock = data.tickerComp.find((stock) => stock.ticker === ticker);
		const nonSelectedStock = data.tickerComp.find((stock) => stock.ticker !== ticker);

		if (!selectedStock || !nonSelectedStock) throw new Error('Invalid compare or stocks data');

		await updateElo(selectedStock.ticker, nonSelectedStock.ticker);

		if (nextDataQueue.length === 0) {
			await prefetchNextData(1);
		}

		data = nextDataQueue.shift()!;
		await prefetchNextData(1);
	};
</script>

<div class="flex justify-center items-center">
	<div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4 content-center">
		{#each data.tickerComp as ticker}
			<StockCard stock={ticker} onClick={() => handleStockClick(ticker.ticker)} />
		{/each}
	</div>
</div>
