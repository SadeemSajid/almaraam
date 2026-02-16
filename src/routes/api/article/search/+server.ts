import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const GET = async ({ url }: { url: URL }) => {
	try {
		const query = url.searchParams.get('q') || '';

		if (!query.trim()) {
			return json({ data: [] });
		}

		const { data, error } = await supabase
			.from('articles')
			.select('*')
			.ilike('title', `%${query}%`)
			.order('created_at', { ascending: false });

		if (error) throw error;

		return json({ data });
	} catch (error) {
		console.log('Error:', error);
		return json({ data: null });
	}
};
