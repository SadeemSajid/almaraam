import mongoose from 'mongoose';
import { MONGO_URI, DB_NAME } from '$env/static/private';

// Allows us to limit number of connections
const connectionState = { isConnected: 0 };

export const dbConnect = async () => {
	if (connectionState.isConnected == 1) {
		console.log('MongoDB connection is already established.');
		return;
	}

	try {
		await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
		connectionState.isConnected = 1;
		console.log('New MongoDB connection established.');
		console.log('Available Models:', mongoose.modelNames());
	} catch (error) {
		console.error('MongoDB connection error:', error);
	}
};

export const dbDisconnect = async () => {
	if (connectionState.isConnected == 0) return;
	await mongoose.disconnect();
	connectionState.isConnected = 0;
	console.log('MongoDB disconnected.');
};
