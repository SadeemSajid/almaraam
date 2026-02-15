<script lang="ts">
	import { formatDate } from '$lib/utils/formatDate';
	import { load } from '$lib/utils/markdownGen';

	export let content = '';
	export let title = '';
	export let author = '';
	export let date: Date;

	let html: string;

	$: {
		const getMD = async () => {
			const { htmlContent } = await load(content);
			html = htmlContent;
		};
		getMD();
	}
</script>

<div class="flex flex-col w-full gap-6">
	<div class="flex md:flex-row flex-col md:gap-20 gap-4 md:items-center">
		<h3 class="text-accent font-normal">{author}</h3>
		<h3 class="text-accent text-[20px] font-normal">{formatDate(date)}</h3>
	</div>
	<h1>{title}</h1>
	<div
		class="prose prose-p:font-georgia prose-p:text-xl prose-p:leading-7
		prose-li:font-georgia prose-li:text-xl
		prose-headings:font-normal
		prose-h2:font-bitter prose-h2:text-3xl
		prose-h3:font-bitter prose-h3:text-2xl
		prose-a:text-accent
		prose-hr:my-8
     	[&_.footnotes]:text-base [&_.footnotes_ol]:list-decimal [&_.footnotes_li]:font-sans
		text-secondary min-w-full"
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html html}
	</div>
</div>
