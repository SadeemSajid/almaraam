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
	<h1>Explore Tags</h1>
	{#if loading}
		<div class="skeleton h-6 w-full bg-secondary/10"></div>
		<div class="skeleton h-6 w-5/6 bg-secondary/10"></div>
		<div class="skeleton h-6 w-4/6 bg-secondary/10"></div>
	{:else if tags.length > 0}
		<div class="flex flex-wrap gap-3">
			{#each tags as tag}
				<p>
					<a href={`/tag/${tag.id}`} class="underline underline-offset-4">
						{tag.name}
					</a>
				</p>
			{/each}
		</div>
	{:else}
		<p>No tags found.</p>
	{/if}
</div>
