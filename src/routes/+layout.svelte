<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { inject } from '@vercel/analytics';
	import { themeStore } from '$lib/store/theme';
	import ThemeDropdown from '$lib/components/theme/ThemeDropdown.svelte';

	onMount(() => {
		inject();
	});
</script>

<div
	data-theme={$themeStore}
	class="min-h-screen pt-20
	flex justify-center
	bg-gradient-to-r from-primary to-secondary"
>
	<ThemeDropdown />
	<slot />
</div>
