<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let drawerHidden = true;

	const dispatch = createEventDispatcher();

	const toggleDrawer = () => {
		drawerHidden = !drawerHidden;
		dispatch('toggleDrawer', { value: drawerHidden });
	};

	// TODO: Theme selection
	let darkMode = false;
	onMount(() => {
		// TODO: Have system theme preference react to change as well (it does for me)
		// darkMode = window.matchMedia('prefers-color-scheme: dark').matches;
		darkMode = true;
	});

	// TODO: Theme persistence
</script>

<div class="flex justify-between px-4 xl:px-80 md:pt-16 pt-8 pb-24 w-full bg-primary">
	<div class="flex gap-4">
		<button class="btn btn-circle btn-sm btn-secondary" on:click={toggleDrawer}></button>
		<a href="/"><button class="btn btn-circle btn-sm btn-accent"></button></a>
	</div>
	<input type="checkbox" bind:checked={darkMode} value="light" class="theme-btn" />
</div>
