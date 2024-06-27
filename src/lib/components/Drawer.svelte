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
{#if !hidden}
	<div
		class="h-full w-full z-10 fixed bg-primary"
		transition:slide={{ easing: expoOut, axis: 'x' }}
	>
		<div class="px-4 md:px-24 md:pt-16 pt-8 w-full bg-primary">
			<!-- Header -->
			<button class="btn btn-circle btn-sm btn-secondary mb-24" on:click={hideDrawer}></button>

			<!-- Menu -->
			<div class="md:mx-24 flex">
				<!-- Links -->
				<div class="flex flex-col pr-16 pb-8 gap-8 border-b-2 border-b-secondary">
					<h1><a href="/">Home.</a></h1>
					<h1><a href="/search">Search.</a></h1>
					<h1><a href="/explore">Explore By Tag.</a></h1>
					<h1><a href="/about">About, Contact, & Donate.</a></h1>
				</div>
				<!-- Art -->
			</div>
		</div>
	</div>
{/if}
