import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export const GET = async ({ url }: RequestEvent) => {
	const tagId = url.searchParams.get('tag_id');
	if (!tagId) {
		return json({ data: null });
	}
	try {
		const { data, error } = await supabase
			.from('article_tag')
			.select('articles(id, title, excerpt, author_id, created_at)')
			.eq('tag_id', tagId);

		if (error) throw error;
		const articles = data?.map((item) => item.articles).filter(Boolean) || [];
		return json({ data: articles });
	} catch (error) {
		console.log(`Error fetching articles for tag ${tagId}:`, error);
		return json({ data: null });
	}
};
