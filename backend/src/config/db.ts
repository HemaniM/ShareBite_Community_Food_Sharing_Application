import mongoose from 'mongoose';
import { logger } from './logger';

export async function connectDB(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection failed');
    logger.error((error as Error).message);
    process.exit(1);
  }
}
