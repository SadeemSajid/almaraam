<script lang="ts">
	import ArticleHome from '$lib/components/ArticleHome.svelte';

	// TODO: Get this from the database.
	let dummyArticles = [
		{
			title: 'The Kalam Cosmological Arguments.',
			author: 'Sadeem Sajid',
			date: 'January 21, 2024.',
			excerpt:
				' Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem...'
		},
		{
			title: "Exploring The Arguments for God's Existence.",
			author: 'Sadeem Sajid',
			date: 'January 21, 2024.',
			excerpt:
				' Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem...'
		}
	];
</script>

<div class="mx-48 flex flex-col gap-8">
	<!-- TODO: Load Top 10 recent articles from backend -->
	{#each dummyArticles as article}
		<ArticleHome {...article} />
		<hr class="border border-secondary" />
	{/each}
</div>
