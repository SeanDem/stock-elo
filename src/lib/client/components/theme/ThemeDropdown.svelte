<script lang="ts">
	import { Theme, themeStore } from '$lib/client/store/theme';

	let themes = Object.values(Theme);

	function changeTheme(event: Event & { currentTarget: EventTarget & HTMLSelectElement }) {
		themeStore.set(event.currentTarget.value as Theme);
	}
</script>

<select
	bind:value={$themeStore}
	on:change={changeTheme}
	class="p-2 m-2 rounded-md bg-primary text-primary-content border-2 accent"
>
	{#each themes as theme}
		<option value={theme}>{theme[0].toUpperCase() + theme.slice(1)} Theme</option>
	{/each}
</select>
