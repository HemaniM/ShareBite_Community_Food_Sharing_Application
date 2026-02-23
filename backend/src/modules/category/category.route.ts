import { Router } from 'express';
import { CategoryController } from './category.controller';
import { protect } from '../../common/middleware/auth.middleware';

const categoryRouter = Router();

// Endpoint for creating a new category
// Protected path: user must be authenticated (in future, possibly restricted to ADMIN only)
categoryRouter.post('/', protect, CategoryController.create);

// Endpoint for fetching all categories for dropdown menus
// Public path (or decide if it should be protected based on requirement)
categoryRouter.get('/', CategoryController.getAll);

export { categoryRouter };
