import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	try {
		const { data, error } = await supabase.from('tags').select('*').order('name');
		if (error) throw error;
		return json({ data });
	} catch (error) {
		console.log('Error fetching tags:', error);
		return json({ data: null });
	}
};
