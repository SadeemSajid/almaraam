<script lang="ts">
	// Article Listing
	import ArticleListing from '$lib/components/ArticleListing.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import type { Article } from '$lib/types/types';
	import { onMount } from 'svelte';

	let articles: Array<Article>;
	let alertController = false;
	let loading = true;

	onMount(async () => {
		const res = await fetch('/api/article/fetch/home');
		if (!res.ok) {
			alertController = true;
		} else {
			articles = (await res.json()).data;
		}
		loading = false;
	});

	function closeAlert() {
		alertController = false;
	}
</script>

{#if alertController}
	<Alert
		message="Articles could not be fetched. Please refresh the page."
		error={true}
		on:close={closeAlert}
	/>
{/if}

<div class="xl:mx-80 mx-4 flex flex-col gap-4 md:gap-6 lg:gap-8">
	{#if loading}
		<div class="skeleton h-24 bg-secondary/10"></div>
		<div class="skeleton h-6 bg-secondary/10"></div>
		<div class="skeleton h-6 bg-secondary/10"></div>
	{:else if articles}
		{#each articles as article}
			<ArticleListing
				title={article.title}
				date={article.created_at?.toString() ?? '0000-00-00'}
				excerpt={article.excerpt}
				authorId={article.author_id}
				id={article.id}
			/>
			<hr class="border border-secondary" />
		{/each}
	{/if}
</div>
