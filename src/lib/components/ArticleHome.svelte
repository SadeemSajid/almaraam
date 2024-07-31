<!-- This component corresponds to the home page article listing -->

<script lang="ts">
	export let title: string = '';
	export let author: string = '';
	export let date: string;
	// TODO: set a word limit for excerpts.
	export let excerpt: string = '';
</script>

<div class="flex flex-col gap-6">
	<div class="flex gap-9">
		<h3 class="text-accent">{author}</h3>
		<h3 class="text-accent">{date}</h3>
	</div>
	<!-- TODO: Don't forget to update the hrefs -->
	<h1 class="text-[48px] w-[80%]"><a href="/">{title}</a></h1>
	<p>{excerpt}</p>
</div>
