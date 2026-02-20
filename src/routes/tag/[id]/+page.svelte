<script lang="ts">
	import { formatDate } from '$lib/utils/formatDate';
	import type { ArticleWithAuthor, Tag } from '$lib/types/types';
	import { onMount } from 'svelte';

	export let data;
	let tagId = data.id;
	let tag: Tag;
	let articles: ArticleWithAuthor[] = [];
	let loading = true;

	onMount(async () => {
		const res = await fetch(`/api/article/fetch/by-tag?tag_id=${tagId}`);
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

		const tagRes = await fetch('/api/tag/fetch/all');
		if (tagRes.ok) {
			const allTags = (await tagRes.json()).data || [];
			tag = allTags.find((t: Tag) => t.id === tagId);
		}

		loading = false;
	});
</script>

<div class="xl:mx-80 mx-4 flex flex-col gap-4 md:gap-6 lg:gap-8">
	{#if loading}
		<div class="skeleton h-12 w-full bg-secondary/10"></div>
		<div class="skeleton h-24 bg-secondary/10"></div>
		<div class="skeleton h-6 w-full bg-secondary/10"></div>
	{:else}
		<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-[48px]">
			Tag: <span class="text-accent">{tag?.name ?? 'Unknown'}</span>
		</h1>
		{#if articles.length > 0}
			{#each articles as article}
				<div class="flex flex-col gap-4 md:gap-6">
					<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] w-[90%] sm:w-[85%] md:w-[80%]">
						<a href={`/article/${article.id}`} class="leading-normal">{article.title}</a>
					</h1>
					<div class="flex gap-4 md:gap-6 lg:gap-9">
						<h3 class="text-accent lg:text-2xl md:text-lg text-sm">{article.authorName || ''}.</h3>
						<h3 class="text-accent lg:text-2xl md:text-lg text-sm">
							{formatDate(article.created_at?.toString() ?? '0000-00-00')}.
						</h3>
					</div>
				</div>
				<hr class="border border-secondary" />
				<!-- <ArticleListing
					title={article.title}
					date={article.created_at?.toString() ?? '0000-00-00'}
					excerpt={article.excerpt}
					authorId={article.author_id}
					id={article.id}
				/>
				<hr class="border border-secondary" /> -->
			{/each}
		{:else}
			<p class="text-secondary">No articles found for this tag.</p>
		{/if}
	{/if}
</div>
