import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	try {
		const { data, error } = await supabase.from('authors').select('*').eq('id', params.id).single();
		if (error) throw error;
		return json({ data });
	} catch (error) {
		console.error('Error fetching author:', error);
		return json({ data: null });
	}
};
