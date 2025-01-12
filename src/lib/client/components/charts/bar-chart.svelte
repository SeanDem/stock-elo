<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, LineController, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

	// Register Chart.js components
	Chart.register(LineController, LineElement, CategoryScale, LinearScale, PointElement);

	let chart: Chart | null = null;

	// Sample data
	const data = {
		results: [
			{
				c: 75.0875,
				h: 75.15,
				l: 73.7975,
				n: 1,
				o: 74.06,
				t: 1577941200000,
				v: 135647456,
				vw: 74.6099,
			},
			{
				c: 74.3575,
				h: 75.145,
				l: 74.125,
				n: 1,
				o: 74.2875,
				t: 1578027600000,
				v: 146535512,
				vw: 74.7026,
			},
		],
	};

	// Parse data for the line chart
	const labels = data.results.map((result) =>
		new Date(result.t).toLocaleDateString()
	);
	const closingPrices = data.results.map((result) => result.c);

	onMount(() => {
		// Ensure the canvas is available
		const ctx = document.getElementById('myChart') as HTMLCanvasElement;

		if (ctx) {
			chart = new Chart(ctx, {
				type: 'line', // Changed to "line"
				data: {
					labels: labels,
					datasets: [
						{
							label: 'Closing Prices',
							data: closingPrices,
							backgroundColor: 'rgba(0, 128, 0, 0.2)', // Light green background
							borderColor: 'rgba(0, 128, 0, 1)', // Solid green line
							pointBackgroundColor: 'rgba(0, 128, 0, 1)', // Green points
							pointBorderColor: 'rgba(0, 128, 0, 1)',
							borderWidth: 2, // Line thickness
							fill: true, // Fill area under the line
						},
					],
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							display: true,
							position: 'top',
						},
					},
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			});
		}

		return () => {
			chart?.destroy(); // Cleanup when the component is unmounted
		};
	});
</script>

<canvas id="myChart" width="400" height="200"></canvas>
