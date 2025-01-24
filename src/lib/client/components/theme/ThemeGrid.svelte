<script lang="ts">
	import { Theme, themeStore } from '$lib/client/store/theme';

	let themes = Object.values(Theme);

	function changeTheme(theme: Theme) {
		themeStore.set(theme);
	}
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
	{#each themes as theme}
		<div
			class="cursor-pointer flex flex-col items-center justify-center p-4 border rounded-lg hover:shadow-md transition-all"
			on:click={() => changeTheme(theme)}
			on:keydown={(e) => e.key === 'Enter' && changeTheme(theme)}
			data-theme={theme}
			role="button"
			tabindex="0"
		>
			<div class="flex gap-1">
				<div class="w-6 h-6 rounded bg-primary"></div>
				<div class="w-6 h-6 rounded bg-secondary"></div>
				<div class="w-6 h-6 rounded bg-accent"></div>
				<div class="w-6 h-6 rounded bg-neutral"></div>
			</div>
			<span class="mt-2 font-bold text-center capitalize font-sans">{theme}</span>
		</div>
	{/each}
</div>
