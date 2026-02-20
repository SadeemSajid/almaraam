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
			author = (await res.json()).data.name;
		}
	});

	const excerpt_limit: number = 50;
	export let excerpt: string = '';
</script>

<div class="flex flex-col gap-4 md:gap-6">
	<div class="flex gap-4 md:gap-6 lg:gap-9">
		{#if author != ''}
			<h3 class="text-accent lg:text-2xl md:text-lg text-sm">{author}.</h3>
		{:else}
			<div class="skeleton h-6 w-12 bg-secondary/10"></div>
		{/if}
		<h3 class="text-accent lg:text-2xl md:text-lg text-sm">{formatDate(date)}.</h3>
	</div>
	<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] w-[90%] sm:w-[85%] md:w-[80%]">
		<a href={`/article/${id}`} class="leading-normal">{title}</a>
	</h1>
	<p class="text-sm sm:text-base md:text-lg">{cutExcerpt(excerpt, excerpt_limit)}</p>
</div>
