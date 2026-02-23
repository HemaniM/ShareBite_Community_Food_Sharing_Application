import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
    imageUrl: z.string().url("Must be a valid URL").optional(),
    isActive: z.boolean().optional().default(true),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
