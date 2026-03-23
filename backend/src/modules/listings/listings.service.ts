import mongoose from "mongoose";
import Listing, { IListing, ListingStatus } from "./listings.model";
import Request from "../request/request.model";
import { CreateListingDto } from "./listings.schema";

export class ListingsService {
  static getDerivedStatus(
    listing: Pick<IListing, "expiresAt" | "stock">,
  ): ListingStatus {
    if (new Date(listing.expiresAt) <= new Date()) {
      return ListingStatus.EXPIRED;
    }

    if (listing.stock.quantity <= 0) {
      return ListingStatus.NOT_AVAILABLE;
    }

    return ListingStatus.AVAILABLE;
  }

  static async syncListingStatuses(): Promise<void> {
    const now = new Date();

    await Listing.updateMany(
      { expiresAt: { $lte: now }, status: { $ne: ListingStatus.EXPIRED } },
      { $set: { status: ListingStatus.EXPIRED } },
    );

    await Listing.updateMany(
      {
        expiresAt: { $gt: now },
        "stock.quantity": { $lte: 0 },
        status: { $ne: ListingStatus.NOT_AVAILABLE },
      },
      { $set: { status: ListingStatus.NOT_AVAILABLE } },
    );

    await Listing.updateMany(
      {
        expiresAt: { $gt: now },
        "stock.quantity": { $gt: 0 },
        status: { $ne: ListingStatus.AVAILABLE },
      },
      { $set: { status: ListingStatus.AVAILABLE } },
    );
  }

  static async createListing(
    userId: string,
    data: CreateListingDto,
  ): Promise<IListing> {
    const status = ListingsService.getDerivedStatus({
      expiresAt: data.expiresAt,
      stock: data.stock,
    } as Pick<IListing, "expiresAt" | "stock">);

    const listing = await Listing.create({
      ...data,
      donor: userId,
      status,
      price: {
        isFree: data.price.isFree,
        amount: data.price.isFree ? 0 : data.price.amount,
      },
    });

    return listing;
  }

  static async getMyListings(userId: string): Promise<any[]> {
    await ListingsService.syncListingStatuses();

    const listings = await Listing.find({ donor: userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!listings.length) {
      return [];
    }

    const listingIds = listings.map((listing) => listing._id);
    const requestCounts = await Request.aggregate([
      {
        $match: {
          donor: new mongoose.Types.ObjectId(userId),
          listingId: { $in: listingIds },
        },
      },
      {
        $group: {
          _id: "$listingId",
          requestCount: { $sum: 1 },
          pendingRequestCount: {
            $sum: {
              $cond: [{ $eq: ["$status", "pending"] }, 1, 0],
            },
          },
        },
      },
    ]);

    const requestCountByListingId = new Map(
      requestCounts.map((item) => [String(item._id), item]),
    );

    return listings.map((listing) => {
      const counts = requestCountByListingId.get(String(listing._id));

      return {
        ...listing,
        requestCount: counts?.requestCount || 0,
        pendingRequestCount: counts?.pendingRequestCount || 0,
      };
    });
  }

  static async getActiveListings(): Promise<IListing[]> {
    const now = new Date();

    await ListingsService.syncListingStatuses();

    return Listing.find({
      status: ListingStatus.AVAILABLE,
      expiresAt: { $gt: now },
      "stock.quantity": { $gt: 0 },
    })
      .populate("donor", "name isTrusted")
      .sort({
        createdAt: -1,
      });
  }

  static async deleteMyListing(
    userId: string,
    listingId: string,
  ): Promise<IListing | null> {
    return Listing.findOneAndDelete({ _id: listingId, donor: userId });
  }
}
