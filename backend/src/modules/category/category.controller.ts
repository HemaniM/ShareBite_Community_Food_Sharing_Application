import { Response } from 'express';
import { AuthRequest } from '../../common/middleware/auth.middleware';
import { CategoryService } from './category.service';
import { createCategorySchema } from './category.schema';
import { logger } from '../../config/logger';

export class CategoryController {
    /**
     * Route: POST /api/categories
     * Creates a new category.
     */
    static async create(req: AuthRequest, res: Response) {
        try {
            // Validate payload
            const validatedData = createCategorySchema.parse(req.body);

            // Call Service
            const category = await CategoryService.createCategory(validatedData);

            res.status(201).json({
                message: 'Category created successfully',
                category,
            });

            logger.info(`Category Created: ${category._id} by User: ${req.user?.id}`);
        } catch (error: any) {
            if (error.name === 'ZodError') {
                return res.status(400).json({ errors: error.errors });
            }
            // Check for duplicate key error (11000 is MongoDB's duplicate code)
            if (error.code === 11000) {
                return res.status(409).json({ message: 'Category name or slug already exists' });
            }

            logger.error(`Category Creation Error: ${error.message}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    /**
     * Route: GET /api/categories
     * Gets all categories.
     */
    static async getAll(req: AuthRequest, res: Response) {
        try {
            const result = await CategoryService.getAllCategories();
            res.status(200).json({ data: result });
        } catch (error: any) {
            logger.error(`Get All Categories Error: ${error.message}`);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
