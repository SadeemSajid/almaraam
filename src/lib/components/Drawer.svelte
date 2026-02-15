<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let hidden = false;

	const dispatch = createEventDispatcher();

	function hideDrawer() {
		dispatch('hide', { value: true });
	}
</script>

<!-- The drawer -->

<!-- Add this transition if need be -->
<!-- transition:slide={{ easing: expoOut, axis: 'x' }} -->
{#if !hidden}
	<div class="h-full w-full z-10 fixed bg-primary overflow-y-scroll">
		<div class="px-4 xl:px-80 md:pt-16 pt-8 w-full bg-primary">
			<!-- Header -->
			<button class="btn btn-circle btn-sm btn-secondary mb-24" on:click={hideDrawer}></button>

			<!-- Menu -->
			<div class="mx-4 md:mx-24 flex flex-col md:flex-row justify-between items-center">
				<!-- Links -->
				<div
					class="flex flex-col border-b-2 border-b-secondary md:border-r-2 md:border-r-secondary md:border-b-0 pr-0 md:pr-16 pb-8 md:gap-8"
				>
					<h1>
						<a href="/" on:click={hideDrawer} class="text-2xl sm:text-3xl md:text-5xl">Home.</a>
					</h1>
					<h1>
						<a href="/search" on:click={hideDrawer} class="text-2xl sm:text-3xl md:text-5xl"
							>Search.</a
						>
					</h1>
					<h1>
						<a href="/explore" on:click={hideDrawer} class="text-2xl sm:text-3xl md:text-5xl"
							>Explore By Tag.</a
						>
					</h1>
					<h1>
						<a href="/about" on:click={hideDrawer} class="text-2xl sm:text-3xl md:text-5xl"
							>About & Donate.</a
						>
					</h1>
					<h1>
						<a href="/about" on:click={hideDrawer} class="text-2xl sm:text-3xl md:text-5xl"
							>Suggestions.</a
						>
					</h1>
				</div>
				<p class="font-arabic font-bold text-[4rem] text-[5rem] lg:text-[12rem] mx-0 lg:mx-8">
					.المرام
				</p>
			</div>
		</div>
	</div>
{/if}
