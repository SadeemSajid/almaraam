<script lang="ts">
	import Markdown from '$lib/components/Markdown.svelte';
	import type { ArticleModelType } from '$lib/types/types.js';
	import { onMount } from 'svelte';

	export let data;
	let id = data.id;
	let article: ArticleModelType;

	// Load the article
	onMount(async () => {
		const res = await fetch(`/api/article/fetch/${id}`);

		if (!res.ok) {
			console.error(`Error fetching article ${id}.`);
		} else {
			article = (await res.json()).data[0];
		}
	});
</script>

{#if article}
	<div class="px-4 lg:px-48 flex w-full">
		<Markdown content={article.content} title={article.title} />
	</div>
{/if}
