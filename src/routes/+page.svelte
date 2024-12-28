<script lang="ts">
	import ArticleHome from '$lib/components/ArticleHome.svelte';
	import type { ArticleModelType } from '$lib/types/types';
	import { onMount } from 'svelte';

	let articles: Array<ArticleModelType>;

	onMount(async () => {
		// Fetches top 10 articles from the DB
		const res = await fetch('/api/article/fetch/home');
		// TODO: Show UI indication for this like a Toast maybe
		if (!res.ok) {
			console.log('Problem Fetching Articles');
		} else {
			articles = (await res.json()).data;
		}
	});
</script>

<div class="mx-48 flex flex-col gap-8">
	{#if articles}
		{#each articles as article}
			<ArticleHome
				title={article.title}
				date={article.createdAt?.toString() ?? '0000-00-00'}
				excerpt={article.excerpt}
				authorId={article.authorId}
			/>
			<hr class="border border-secondary" />
		{/each}
	{/if}
</div>
