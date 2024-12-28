import mongoose, { Model } from 'mongoose';
import type { ArticleModelType } from '$lib/types/types';

const ArticleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		tags: {
			type: String,
			required: true
		},
		authorId: {
			type: String,
			required: true
		},
		excerpt: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

export const ArticleModel: Model<ArticleModelType> =
	mongoose.models.Article ?? mongoose.model<ArticleModelType>('Article', ArticleSchema);
