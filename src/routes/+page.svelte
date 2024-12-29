<script lang="ts">
	import ArticleHome from '$lib/components/ArticleHome.svelte';
	import Alert from '$lib/components/Alert.svelte';

	import type { ArticleModelType } from '$lib/types/types';
	import { onMount } from 'svelte';

	// Articles fetched from DB
	let articles: Array<ArticleModelType>;

	// Controls displaying of alert
	let alertController = false;

	onMount(async () => {
		// Fetches top 10 articles from the DB
		const res = await fetch('/api/article/fetch/home');
		if (!res.ok) {
			alertController = true;
		} else {
			articles = (await res.json()).data;
		}
	});
</script>

{#if alertController}
	<Alert
		message="Articles could not be fetched. Please refresh the page"
		error={true}
		on:close={() => (alertController = false)}
	/>
{/if}

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
