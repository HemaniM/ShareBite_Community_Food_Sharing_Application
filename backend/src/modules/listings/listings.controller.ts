import { Response } from 'express';
import { AuthRequest } from '../../common/middleware/auth.middleware';
import { ListingService } from './listings.service';
import { createListingSchema } from './listings.schema';
import { logger } from '../../config/logger';
import mongoose from 'mongoose';
import { IListing } from './listings.model';

export class ListingsController {
    /**
     * Route: POST /api/listings
     * Creates a new food listing.
     */
    static async create(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // 1. Validate payload
            const validatedData = createListingSchema.parse(req.body);

            // 2. Pass donorId and validated data to service. 
            // User ID attached by auth middleware
            const donorId = req.user.id as string;

            const payload = {
                ...validatedData,
                expiresAt: new Date(validatedData.expiresAt)
            };

            const listing = await ListingService.createListing(donorId, payload as any);

            // 3. Respond
            res.status(201).json({
                message: 'Listing created successfully',
                listing,
            });

            logger.info(`Listing Created: ${listing._id} by User: ${donorId}`);
        } catch (error: any) {
            if (error.name === 'ZodError') {
                logger.warn(`Listing Creation Validation Error: ${error.message}`);
                return res.status(400).json({ errors: error.errors });
            }

            logger.error(`Listing Creation Error: ${error.message}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    /**
     * Route: GET /api/listings
     * Gets a paginated list of food listings.
     */
    static async getAll(req: AuthRequest, res: Response) {
        try {
            // 1. Validate query parameters
            const { page, limit, id, title } = require('./listings.schema').getPaginatedListingsSchema.parse(req.query);

            const filter: mongoose.QueryFilter<IListing> = {};
            if (id) {
                filter._id = id;
            }
            if (title) {
                // Case-insensitive regex search for the title
                filter.title = { $regex: title, $options: 'i' };
            }

            // 2. Fetch from service
            const result = await ListingService.getAllListings(filter, { page, limit });

            // 3. Respond
            res.status(200).json(result);
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ errors: error.errors });
            }
            logger.error(`Get All Listings Error: ${error.message}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
