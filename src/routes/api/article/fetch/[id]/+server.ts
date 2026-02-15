import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	const { id } = params;
	try {
		const { data, error } = await supabase.from('articles').select('*').eq('id', id).single();
		if (error) throw error;
		return json({ data });
	} catch (error) {
		console.log(`Error fetching article ${id}:`, error);
		return json({ data: null });
	}
};
