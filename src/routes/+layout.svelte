<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/client/store/theme';
	import { injectSpeedInsights } from '@vercel/speed-insights';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import NavBar from '$lib/client/components/navbar/nav-bar.svelte';
	onMount(() => {
		injectAnalytics();
		injectSpeedInsights();
	});
</script>

<div class="min-h-screen" data-theme={$themeStore}>
	<NavBar />
	<slot />
</div>
