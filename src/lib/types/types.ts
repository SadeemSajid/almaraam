export type Article = {
	id: string;
	title: string;
	content: string;
	tags: string;
	author_id: string;
	excerpt: string;
	created_at?: string;
	updated_at?: string;
};

export type Author = {
	id: string;
	name: string;
	email: string;
	contact: string;
	description: string;
	created_at?: string;
	updated_at?: string;
};
