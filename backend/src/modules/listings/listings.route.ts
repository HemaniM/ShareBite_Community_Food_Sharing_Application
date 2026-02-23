import { Router } from 'express';
import { ListingsController } from './listings.controller';
import { protect } from '../../common/middleware/auth.middleware';

export const listingsRouter = Router();

// Endpoint for creating a new food listing
// Protected path: user must be authenticated
listingsRouter.post('/', protect, ListingsController.create);

// Endpoint for fetching paginated listings
// Public path (or decide if it should be protected based on requirement)
listingsRouter.get('/', ListingsController.getAll);
