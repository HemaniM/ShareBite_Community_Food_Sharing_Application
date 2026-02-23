import Listing, { IListing } from './listings.model';
import { BaseRepository } from '../../common/repositories/base.repositories';

export class ListingRepository extends BaseRepository<IListing> {
    constructor() {
        super(Listing);
    }
}