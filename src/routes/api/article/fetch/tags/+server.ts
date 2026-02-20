import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

import type { RequestEvent } from '@sveltejs/kit';

export const GET = async ({ url }: RequestEvent) => {
	const articleId = url.searchParams.get('article_id');
	if (!articleId) {
		return json({ data: null });
	}
	try {
		const { data, error } = await supabase
			.from('article_tag')
			.select('tag_id, tags(id, name)')
			.eq('article_id', articleId);

		if (error) throw error;
		const tags = data?.map((item) => item.tags).filter(Boolean) || [];
		return json({ data: tags });
	} catch (error) {
		console.log(`Error fetching tags for article ${articleId}:`, error);
		return json({ data: null });
	}
};
