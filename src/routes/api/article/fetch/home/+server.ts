import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	try {
		const { data, error } = await supabase
			.from('articles')
			.select('*')
			.order('created_at', { ascending: false })
			.limit(10);
		if (error) throw error;
		return json({ data });
	} catch (error) {
		console.log('Error fetching recent articles:', error);
		return json({ data: [] });
	}
};
