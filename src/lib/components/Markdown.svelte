<script lang="ts">
	import { marked } from 'marked';
	import { formatDate } from '$lib/utils/formatDate';

	export let content = '';
	export let title = '';
	export let author = '';
	export let date: Date;
	let htmlContent = marked(content);

	// Parse the Markdown into HTML
	$: htmlContent = marked(content);
</script>

<div class="flex flex-col w-full gap-6">
	<div class="flex md:flex-row flex-col md:gap-20 gap-4">
		<h3 class="text-accent font-normal">{author}</h3>
		<h3 class="text-accent font-normal">{formatDate(date)}</h3>
	</div>
	<h1>{title}</h1>
	<div
		class="prose prose-p:font-georgia prose-p:text-xl prose-p:leading-7
		prose-li:font-georgia prose-li:text-xl
		prose-headings:font-normal
		prose-h2:font-bitter prose-h2:text-3xl prose-h2:font-bold
		prose-h3:font-bitter prose-h3:text-2xl prose-h3:font-bold
		text-secondary min-w-full"
	>
		{@html htmlContent}
	</div>
</div>
