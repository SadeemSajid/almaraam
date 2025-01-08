import { ArticleModel } from '$lib/models/Article';
import { json } from '@sveltejs/kit';

// Fetches top ten recent articles from the DB

export const GET = async ({ params }) => {
	const { id } = params;
	try {
		const article = await ArticleModel.find({ _id: id });
		return json({ data: article });
	} catch (error) {
		console.log(`Error fetching article ${id}:`, error);
	}
};
