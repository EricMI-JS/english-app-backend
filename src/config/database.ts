import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/english-app';

export const connectDB = async (): Promise<void> => {
  try {
    let uri = MONGODB_URI;
    if (!uri.endsWith('/english-app')) {
      if (uri.endsWith('/')) {
        uri += 'english-app';
      } else {
        uri += '/english-app';
      }
    }
    
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully to english-app database');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
}; 