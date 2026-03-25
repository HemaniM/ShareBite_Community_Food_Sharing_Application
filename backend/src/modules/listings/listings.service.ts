import mongoose from "mongoose";
import Listing, { IListing, ListingStatus } from "./listings.model";
import Request from "../request/request.model";
import { CreateListingDto } from "./listings.schema";

export interface FoodNearYouFilters {
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  pincode?: string;
  limit?: number;
}

export interface RecentlyUploadedFilters {
  hours?: number;
}

const normalizeLocationValue = (value?: string): string =>
  String(value || "")
    .trim()
    .toLowerCase();

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

  static async getFoodNearYouListings(
    filters: FoodNearYouFilters = {},
  ): Promise<{
    listings: IListing[];
    totalCount: number;
    matchedCount: number;
  }> {
    const normalizedFilters = {
      city: normalizeLocationValue(filters.city),
      district: normalizeLocationValue(filters.district),
      state: normalizeLocationValue(filters.state),
      country: normalizeLocationValue(filters.country),
      pincode: normalizeLocationValue(filters.pincode),
    };

    const activeListings = await ListingsService.getActiveListings();

    const scoredListings = activeListings
      .map((listing) => {
        const listingLocation = {
          city: normalizeLocationValue(listing.location?.city),
          district: normalizeLocationValue(listing.location?.district),
          state: normalizeLocationValue(listing.location?.state),
          country: normalizeLocationValue(listing.location?.country),
          pincode: normalizeLocationValue(listing.location?.pincode),
        };

        let locationScore = 0;

        if (normalizedFilters.pincode && listingLocation.pincode) {
          locationScore +=
            normalizedFilters.pincode === listingLocation.pincode ? 5 : 0;
        }

        if (normalizedFilters.city && listingLocation.city) {
          locationScore +=
            normalizedFilters.city === listingLocation.city ? 4 : 0;
        }

        if (normalizedFilters.district && listingLocation.district) {
          locationScore +=
            normalizedFilters.district === listingLocation.district ? 3 : 0;
        }

        if (normalizedFilters.state && listingLocation.state) {
          locationScore +=
            normalizedFilters.state === listingLocation.state ? 2 : 0;
        }

        if (normalizedFilters.country && listingLocation.country) {
          locationScore +=
            normalizedFilters.country === listingLocation.country ? 1 : 0;
        }

        return { listing, locationScore };
      })
      .filter(({ locationScore }) => {
        const hasAnyLocationFilter =
          Object.values(normalizedFilters).some(Boolean);

        if (!hasAnyLocationFilter) {
          return true;
        }

        return locationScore > 3;
      })
      .sort((a, b) => {
        if (b.locationScore !== a.locationScore) {
          return b.locationScore - a.locationScore;
        }

        return (
          new Date(b.listing.createdAt).getTime() -
          new Date(a.listing.createdAt).getTime()
        );
      });

    return {
      listings: scoredListings.map((item) => item.listing),
      totalCount: activeListings.length,
      matchedCount: scoredListings.length,
    };
  }

  static async getRecentlyUploadedListings(
    filters: RecentlyUploadedFilters = {},
  ): Promise<{ listings: IListing[]; totalCount: number; matchedCount: number }> {
    const activeListings = await ListingsService.getActiveListings();
    const hoursWindow =
      Number.isFinite(Number(filters.hours)) && Number(filters.hours) > 0
        ? Number(filters.hours)
        : 12;
    const thresholdTime = Date.now() - hoursWindow * 60 * 60 * 1000;

    const recentListings = activeListings
      .filter((listing) => {
        const createdAtTime = new Date(listing.createdAt).getTime();
        return Number.isFinite(createdAtTime) && createdAtTime >= thresholdTime;
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    return {
      listings: recentListings,
      totalCount: activeListings.length,
      matchedCount: recentListings.length,
    };
  }

  static async deleteMyListing(
    userId: string,
    listingId: string,
  ): Promise<IListing | null> {
    return Listing.findOneAndDelete({ _id: listingId, donor: userId });
  }
}
