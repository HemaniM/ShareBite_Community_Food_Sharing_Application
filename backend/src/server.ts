import { app } from './app';
import { ENV } from './config/env';
import { connectDB } from './config/db';
import mongoose from 'mongoose';
import { logger } from './config/logger';

let server: any;

async function startServer() {
  await connectDB(process.env.MONGODB_URI as string);

  app.listen(ENV.PORT, () => {
    logger.info(`HTTP server running on port localhost:${ENV.PORT}`);
  });
}

async function shutdown(signal: string) {
  logger.info(`Received ${signal}. Shutting down gracefully...`);

  // Stop accepting new requests
  if (server) {
    server.close(() => {
      logger.info('HTTP server closed');
    });
  }

  // Close MongoDB connection
  try {
    await mongoose.connection.close(false);
    logger.info('MongoDB connection closed');
  } catch (err) {
    logger.error('Error closing MongoDB connection');
  }

  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception');
  logger.error(err.stack || err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection');
  logger.error(String(reason));
  process.exit(1);
});



startServer();