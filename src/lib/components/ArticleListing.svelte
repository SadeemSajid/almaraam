<!-- This component corresponds to the home page article listing -->

<script lang="ts">
	import { cutExcerpt } from '$lib/utils/cutExcerpt';
	import { formatDate } from '$lib/utils/formatDate';
	import { onMount } from 'svelte';
	export let title: string = '';
	export let authorId: string = '';
	export let date: string;
	export let id: string;

	let author = '';

	onMount(async () => {
		// Fetch author's name
		let res = await fetch(`/api/author/fetch/${authorId}`);
		if (!res.ok) {
			// TODO: Replace this with a UI update
			console.error('Error fetching author');
		} else {
			author = (await res.json()).data[0].name;
		}
	});

	const excerpt_limit: number = 50;
	export let excerpt: string = '';
</script>

<div class="flex flex-col gap-6">
	<div class="flex gap-9">
		<h3 class="text-accent">{author}.</h3>
		<h3 class="text-accent">{formatDate(date)}.</h3>
	</div>
	<!-- TODO: Don't forget to update the hrefs -->
	<h1 class="text-[48px] w-[80%]"><a href={`/article/${id}`}>{title}</a></h1>
	<p>{cutExcerpt(excerpt, excerpt_limit)}</p>
</div>
