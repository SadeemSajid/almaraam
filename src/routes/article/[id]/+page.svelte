<script lang="ts">
	import Markdown from '$lib/components/Markdown.svelte';
	import type { Article, Author } from '$lib/types/types';
	import { onMount } from 'svelte';

	export let data;
	let id = data.id;
	let article: Article;
	let author: Author;
	let loading = true;

	// Load the article & author
	onMount(async () => {
		// Fetch article
		let res = await fetch(`/api/article/fetch/${id}`);

		// Article error checking
		if (!res.ok) {
			// TODO: add better notifications
			console.error(`Error fetching article ${id}.`);
		} else {
			article = (await res.json()).data;

			// Fetch author
			res = await fetch(`/api/author/fetch/${article.author_id}`);

			// Author error checking
			if (!res.ok) {
				console.error(`Error fetching author for article ${article.title}`);
			} else {
				author = (await res.json()).data;
			}
		}
		loading = false;
	});
</script>

{#if loading}
	<div class="px-4 lg:max-w-[calc(100vw-640px)] mx-auto flex w-full pb-20 flex flex-col gap-6">
		<div class="flex md:flex-row flex-col md:gap-20 gap-4 md:items-center">
			<div class="skeleton h-6 w-24 bg-secondary/10"></div>
			<div class="skeleton h-6 w-32 bg-secondary/10"></div>
		</div>
		<div class="skeleton h-12 w-full bg-secondary/10"></div>
		<div class="flex flex-col gap-4">
			<div class="skeleton h-6 w-full bg-secondary/10"></div>
			<div class="skeleton h-6 w-5/6 bg-secondary/10"></div>
			<div class="skeleton h-6 w-4/6 bg-secondary/10"></div>
			<div class="skeleton h-6 w-full bg-secondary/10"></div>
			<div class="skeleton h-6 w-3/4 bg-secondary/10"></div>
		</div>
	</div>
{:else if article && author}
	<div class="px-4 lg:max-w-[calc(100vw-640px)] mx-auto flex w-full pb-20">
		<Markdown
			content={article.content}
			title={article.title}
			author={author.name}
			date={new Date(article.created_at ?? new Date())}
		/>
	</div>
{/if}
