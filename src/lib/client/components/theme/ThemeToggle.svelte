<script>
	import { Theme, themeStore } from '$lib/client/store/theme.js';

	export let theme1 = Theme.Light;
	export let theme2 = Theme.Dark;

	function getThemeName() {
		const currentTheme = $themeStore;
		return currentTheme === theme1 ? theme2 : theme1;
	}

	function toggleTheme() {
		themeStore.update((currentTheme) => {
			return currentTheme === theme1 ? theme2 : theme1;
		});
	}
</script>

<button
	class="absolute top-5 right-5 p-2 px-3 rounded-md
	text-base-300 bg-base-content"
	on:click={toggleTheme}
>
	{getThemeName()}
</button>
