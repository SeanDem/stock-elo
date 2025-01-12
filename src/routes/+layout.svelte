<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/client/store/theme';
	import { injectSpeedInsights } from '@vercel/speed-insights';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import ThemeDropdown from '$lib/client/components/theme/ThemeDropdown.svelte';

	onMount(() => {
		injectAnalytics();
		injectSpeedInsights();
	});
</script>

<div
	class="min-h-screen pt-20
	flex justify-center
	bg-gradient-to-r from-primary to-secondary"
	data-theme={$themeStore}
>
	<!--	<ThemeDropdown />-->
	<slot />
</div>
