<script lang="ts">
	import { slide } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let hidden: boolean;
	function hideDrawer() {
		dispatch('hide', { value: true });
	}
</script>

<!-- The drawer -->

<!-- Add this transition if need be -->
<!-- transition:slide={{ easing: expoOut, axis: 'x' }} -->
{#if !hidden}
	<div class="h-full w-full z-10 fixed bg-primary overflow-y-scroll">
		<div class="px-4 md:px-24 md:pt-16 pt-8 w-full bg-primary">
			<!-- Header -->
			<button class="btn btn-circle btn-sm btn-secondary mb-24" on:click={hideDrawer}></button>

			<!-- Menu -->
			<div class="mx-4 md:mx-24 flex flex-col md:flex-row justify-between items-center">
				<!-- Links -->
				<div class="flex flex-col pr-16 pb-8 gap-8 border-b-2 border-b-secondary">
					<h1><a href="/">Home.</a></h1>
					<h1><a href="/search">Search.</a></h1>
					<h1><a href="/explore">Explore By Tag.</a></h1>
					<h1><a href="/about">About & Donate.</a></h1>
				</div>
				<!-- TODO: Responsive Art -->
				<!-- <p class="font-arabic font-bold text-[5rem] lg:text-[12rem] mx-0 lg:mx-8">.المرام</p> -->
			</div>
		</div>
	</div>
{/if}
