<script lang="ts">
	import Markdown from '$lib/components/Markdown.svelte';
	import type { ArticleModelType, AuthorModelType } from '$lib/types/types.js';
	import { onMount } from 'svelte';

	export let data;
	let id = data.id;
	let article: ArticleModelType;
	let author: AuthorModelType;

	// Load the article & author
	onMount(async () => {
		// Fetch article
		let res = await fetch(`/api/article/fetch/${id}`);

		// Article error checking
		if (!res.ok) {
			// TODO: add better notifications
			console.error(`Error fetching article ${id}.`);
		} else {
			article = (await res.json()).data[0];

			// Fetch author
			res = await fetch(`/api/author/fetch/${article.authorId}`);

			// Author error checking
			if (!res.ok) {
				console.error(`Error fetching author for article ${article.title}`);
			} else {
				author = (await res.json()).data[0];
			}
		}
	});
</script>

{#if article && author}
	<div class="px-4 lg:max-w-[calc(100vw-640px)] mx-auto flex w-full pb-20">
		<Markdown
			content={article.content}
			title={article.title}
			author={author.name}
			date={article.createdAt ?? new Date()}
		/>
	</div>
{/if}
