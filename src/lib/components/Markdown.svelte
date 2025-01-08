<script>
	import { marked } from 'marked';
	export let content = '';
	export let title = '';
	let htmlContent = marked(content);

	// Parse the Markdown into HTML
	$: htmlContent = marked(content);
</script>

<div class="flex flex-col w-full gap-6">
	<h1>{title}</h1>
	<div
		class="prose prose-p:font-georgia prose-p:text-xl prose-p:leading-8
		prose-li:font-georgia prose-li:text-xl
		prose-headings:font-normal
		prose-h2:font-bitter prose-h2:text-3xl
		prose-h3:font-bitter prose-h3:text-2xl
		text-secondary min-w-full"
	>
		{@html htmlContent}
	</div>
</div>
