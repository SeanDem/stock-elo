<script lang="ts">
	import { Format } from '$lib/client/utils';

	let { data } = $props();
</script>

<ul class="space-y-4 flex flex-col items-center">
	{#each data.tickerComp as stock}
		<li class="bg-base-100 shadow-md rounded-lg p-4 w-80 hover:bg-base-200 transition">
			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<img
						alt={stock.ticker}
						class="h-12 w-12 rounded-lg object-contain border border-base-300"
						src={stock.logoUrl}
					/>
					<div class="ml-4">
						<h2 class="text-lg font-semibold truncate">
							{stock.ticker}
						</h2>
						<p class="text-sm text-base-content/70">{Format.round(stock.elo, 0)}</p>
					</div>
				</div>
				<div class="badge badge-primary text-sm font-medium">
					Rank #{stock.eloRank}
				</div>
			</div>
		</li>
	{/each}
</ul>
