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

export type ArticleWithAuthor = {
	id: string;
	title: string;
	excerpt: string;
	author_id: string;
	created_at?: string;
	authorName?: string;
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

export type Tag = {
	id: string;
	name: string;
	created_at?: string;
	updated_at?: string;
};
