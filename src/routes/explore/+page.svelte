<script lang="ts">
	import type { Tag } from '$lib/types/types';
	import { onMount } from 'svelte';

	let tags: Tag[] = [];
	let loading = true;

	onMount(async () => {
		const res = await fetch('/api/tag/fetch/all');
		if (res.ok) {
			tags = (await res.json()).data || [];
		}
		loading = false;
	});
</script>

<div class="xl:mx-80 mx-4 flex flex-col gap-4 md:gap-6 lg:gap-8">
	<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-[48px]">Explore Tags</h1>
	{#if loading}
		<div class="skeleton h-6 w-full bg-secondary/10"></div>
		<div class="skeleton h-6 w-5/6 bg-secondary/10"></div>
		<div class="skeleton h-6 w-4/6 bg-secondary/10"></div>
	{:else if tags.length > 0}
		<div class="flex flex-wrap gap-3">
			{#each tags as tag}
				<p>
					<a
						href={`/tag/${tag.id}`}
						class="text-lg sm:text-xl md:text-2xl underline underline-offset-4 transition-colors"
					>
						{tag.name}
					</a>
				</p>
			{/each}
		</div>
	{:else}
		<p class="text-secondary">No tags found.</p>
	{/if}
</div>
