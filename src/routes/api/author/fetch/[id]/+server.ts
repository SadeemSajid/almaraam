import { AuthorModel } from '$lib/models/Authors.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ params }) => {
	try {
		const author = await AuthorModel.find({ _id: `${params.id}` });
		return json({ data: author });
	} catch (error) {
		console.error('Error fetching author:', error);
		return json({ data: [] });
	}
};
