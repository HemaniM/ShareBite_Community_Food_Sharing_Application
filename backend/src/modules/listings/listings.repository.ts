import Listing, { IListing } from './listings.model';
import { BaseRepository } from '../../common/repositories/base.repositories';
import mongoose from 'mongoose';

export class ListingRepository extends BaseRepository<IListing> {
    constructor() {
        super(Listing);
    }

    async findPaginated(filter: mongoose.QueryFilter<IListing> = {}, options: any = {}) {
        const page = Math.max(1, options.page || 1);
        const limit = Math.max(1, options.limit || 10);
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.model.find(filter)
                .populate('category', 'name slug imageUrl')
                .skip(skip)
                .limit(limit)
                .exec(),
            this.model.countDocuments(filter).exec()
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data,
            total,
            page,
            limit,
            totalPages
        };
    }
}