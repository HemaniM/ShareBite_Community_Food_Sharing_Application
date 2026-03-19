import mongoose from "mongoose";
import Listing from "../modules/listings/listings.model";
import { logger } from "./logger";

async function removeListingsExpiryTtlIndex(): Promise<void> {
  const indexes = await Listing.collection.indexes();
  const ttlIndexesOnExpiresAt = indexes.filter(
    (index) =>
      index.key &&
      index.key.expiresAt === 1 &&
      typeof index.expireAfterSeconds === "number",
  );

  await Promise.all(
    ttlIndexesOnExpiresAt.map(async (index) => {
      if (!index.name) {
        return;
      }

      await Listing.collection.dropIndex(index.name);
      logger.info(
        `Dropped TTL index "${index.name}" from listings collection to keep expired food posts in MongoDB.`,
      );
    }),
  );
}

export async function connectDB(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri);
    await removeListingsExpiryTtlIndex();
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection failed");
    logger.error((error as Error).message);
    process.exit(1);
  }
}
