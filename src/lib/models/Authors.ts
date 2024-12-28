import mongoose, { Model } from 'mongoose';
import type { AuthorModelType } from '$lib/types/types';

const AuthorSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		contact: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

export const AuthorModel: Model<AuthorModelType> =
	mongoose.models.Author ?? mongoose.model<AuthorModelType>('Author', AuthorSchema);
