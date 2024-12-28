export type ArticleModelType = {
	_id: string;
	title: string;
	content: string;
	tags: string;
	authorId: string;
	excerpt: string;
	createdAt?: Date;
	updatedAt?: Date;
};

export type AuthorModelType = {
	_id: string;
	name: string;
	email: string;
	contact: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;
};
