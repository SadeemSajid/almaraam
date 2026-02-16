import MarkdownIt from 'markdown-it';
import footnote from 'markdown-it-footnote';

const md = new MarkdownIt({
	html: true,
	linkify: true
}).use(footnote);

export const load = async (rawMarkdown: string) => {
	const htmlContent = md.render(rawMarkdown);

	return {
		htmlContent
	};
};
