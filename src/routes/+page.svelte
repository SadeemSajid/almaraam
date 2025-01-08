<script lang="ts">
	// Allows routing
	import { goto } from '$app/navigation';

	// Article Listing
	import ArticleListing from '$lib/components/ArticleListing.svelte';
	import Alert from '$lib/components/Alert.svelte';

	import type { ArticleModelType } from '$lib/types/types';
	import { onMount } from 'svelte';

	// Articles fetched from DB
	let articles: Array<ArticleModelType>;

	// Controls displaying of alert
	let alertController = false;

	// Fetches articles
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

<!-- Shows alerts -->
{#if alertController}
	<Alert
		message="Articles could not be fetched. Please refresh the page."
		error={true}
		on:close={() => (alertController = false)}
	/>
{/if}

<!-- Main Page Content -->
<div class="mx-48 flex flex-col gap-8">
	{#if articles}
		{#each articles as article}
			<ArticleListing
				title={article.title}
				date={article.createdAt?.toString() ?? '0000-00-00'}
				excerpt={article.excerpt}
				authorId={article.authorId}
				id={article._id}
			/>
			<hr class="border border-secondary" />
		{/each}
	{/if}
</div>
