import mongoose from "mongoose";
import { logger } from "./logger";

async function dropLegacyListingExpiryIndex() {
  try {
    const db = mongoose.connection.db;

    if (!db) {
      return;
    }

    const collections = await db
      .listCollections({ name: "listings" })
      .toArray();

    if (!collections.length) {
      return;
    }

    const indexName = "expiresAt_1";
    const indexes = await db.collection("listings").indexes();
    const hasLegacyTtlIndex = indexes.some((index) => index.name === indexName);

    if (!hasLegacyTtlIndex) {
      return;
    }

    await db.collection("listings").dropIndex(indexName);
    logger.info("Removed legacy listings TTL index to prevent auto-deletion");
  } catch (error) {
    logger.warn(
      `Skipping legacy listings TTL index cleanup: ${(error as Error).message}`,
    );
  }
}

export async function connectDB(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri);
    await dropLegacyListingExpiryIndex();
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error("MongoDB connection failed");
    logger.error((error as Error).message);
    process.exit(1);
  }
}
