<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/store/theme';
	import ThemeDropdown from '$lib/components/theme/ThemeDropdown.svelte';
	import { injectSpeedInsights } from '@vercel/speed-insights';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	onMount(() => {
		injectAnalytics();
		injectSpeedInsights()
	});
	
</script>

<div
	class="min-h-screen pt-20
	flex justify-center
	bg-gradient-to-r from-primary to-secondary"
	data-theme={$themeStore}
>
	<ThemeDropdown />
	<slot />
</div>
