import { supabase } from '$lib/supabaseClient';

export const load = async ({ params }) => {
	const { data: author } = await supabase.from('authors').select('*').eq('id', params.id).single();

	return {
		id: params.id,
		author
	};
};
