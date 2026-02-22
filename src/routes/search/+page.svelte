<script lang="ts">
	import { formatDate } from '$lib/utils/formatDate';
	import type { ArticleWithAuthor } from '$lib/types/types';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let query = $page.url.searchParams.get('q') || '';
	let loading = false;
	let searched = false;

	let articles: ArticleWithAuthor[] = [];

	async function handleSearch() {
		if (!query.trim()) return;
		loading = true;
		searched = true;
		await goto(`/search?q=${encodeURIComponent(query)}`);
		const res = await fetch(`/api/article/search?q=${encodeURIComponent(query)}`);
		if (res.ok) {
			const data = (await res.json()).data || [];
			articles = await Promise.all(
				data.map(async (article: ArticleWithAuthor) => {
					const authorRes = await fetch(`/api/author/fetch/${article.author_id}`);
					if (authorRes.ok) {
						const authorData = await authorRes.json();
						article.authorName = authorData.data?.name || '';
					}
					return article;
				})
			);
		}
		loading = false;
	}

	onMount(() => {
		if (query) {
			handleSearch();
		}
	});
</script>

<div class="xl:mx-80 mx-4 flex flex-col gap-4 md:gap-6 lg:gap-8">
	<form on:submit|preventDefault={handleSearch} class="w-full">
		<input
			type="text"
			bind:value={query}
			placeholder="Search for an article"
			class="input w-full rounded-none bg-transparent border-b-2 border-x-0 border-t-0 border-dashed border-secondary
			placeholder:text-accent focus:outline-none text-lg font-georgia text-secondary"
		/>
	</form>

	{#if loading}
		<div class="skeleton h-24 bg-secondary/10"></div>
		<div class="skeleton h-6 bg-secondary/10"></div>
		<div class="skeleton h-6 bg-secondary/10"></div>
	{:else if searched && articles.length === 0}
		<p>No articles found.</p>
	{:else if articles.length > 0}
		{#each articles as article}
			<div class="flex flex-col gap-4 md:gap-6">
				<h1>
					<a href={`/article/${article.id}`}>{article.title}</a>
				</h1>
				<div class="flex gap-4 md:gap-6 lg:gap-9">
					<h3>
						<a href={`/author/${article.author_id}`} class="text-accent"
							>{article.authorName || ''}.</a
						>
					</h3>
					<h3 class="text-accent">
						{formatDate(article.created_at?.toString() ?? '0000-00-00')}.
					</h3>
				</div>
			</div>
			<hr class="border border-secondary" />
		{/each}
	{/if}
</div>
