<script lang="ts">
	import { NAV_ITEMS } from '$lib/client/components/navbar/navbar.const';

	const navItems = NAV_ITEMS;
</script>

<div class="navbar mb-2">
	<ul class="menu menu-horizontal flex justify-center w-full">
		{#each navItems as item}
			<li>
				<a
					class="text-3xl font-extrabold text-base-content"
					href={item.link || '#'}
					data-sveltekit-preload-data="hover">{item.display}</a
				>
			</li>
		{/each}
	</ul>
</div>
