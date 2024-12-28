import { ArticleModel } from '$lib/models/Article';
import { json } from '@sveltejs/kit';

// Fetches top ten recent articles from the DB

export const GET = async () => {
	try {
		const articles = await ArticleModel.find().sort({ createdAt: -1 }).limit(10);
		return json({ data: articles });
	} catch (error) {
		console.log('Error fetching recent articles:', error);
	}
};
