import Listing, { IListing, ListingStatus } from "./listings.model";
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

  static async getMyListings(userId: string): Promise<IListing[]> {
    await ListingsService.syncListingStatuses();
    return Listing.find({ donor: userId }).sort({ createdAt: -1 });
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
