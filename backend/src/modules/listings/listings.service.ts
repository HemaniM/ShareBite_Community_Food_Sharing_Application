import { IListing } from './listings.model';
import { ListingRepository } from './listings.repository';
import mongoose from 'mongoose';

export class ListingService {
    private static repository = new ListingRepository();

    /**
     * Creates a new listing in the database.
     * @param donorId The user ID creating the listing.
     * @param payload The validated listing data.
     */
    static async createListing(donorId: string, payload: Partial<IListing>): Promise<IListing> {
        const listingData: Partial<IListing> = {
            ...payload,
            donor: new mongoose.Types.ObjectId(donorId),
        };
        return this.repository.create(listingData);
    }
    /**
     * Gets all listings with pagination and optional filtering
     * @param filter Mongoose filter query
     * @param options Pagination options (page, limit)
     */
    static async getAllListings(filter: mongoose.QueryFilter<IListing>, options: { page: number; limit: number }) {
        return this.repository.findPaginated(filter, options);
    }
}
