import Listing, { IListing } from './listings.model';
import { CreateListingDto } from './listings.schema';

export class ListingsService {
  static async createListing(userId: string, data: CreateListingDto): Promise<IListing> {
    const listing = await Listing.create({
      ...data,
      donor: userId,
      price: {
        isFree: data.price.isFree,
        amount: data.price.isFree ? 0 : data.price.amount
      }
    });

    return listing;
  }

  static async getMyListings(userId: string): Promise<IListing[]> {
    return Listing.find({ donor: userId }).sort({ createdAt: -1 });
  }
}