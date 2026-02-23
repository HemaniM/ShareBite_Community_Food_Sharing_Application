import { z } from 'zod';
import { ListingCategory } from './listings.model';

export const createListingSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    quantity: z.string().min(1, "Quantity is required"),
    price: z.number().min(0).default(0),
    category: z.nativeEnum(ListingCategory),
    isNonVeg: z.boolean().default(false),
    allergens: z.array(z.string()).optional().default([]),
    ingredients: z.array(z.string()).optional().default([]),
    locationOverride: z.string().optional(),
    contactOverride: z.string().optional(),
    images: z.array(z.string().url("Must be valid image URLs")).min(1, "At least one image is required"),

    // Frontend should calculate the Date object (e.g., Date.now() + 10 hours) and send as ISO string
    expiresAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
});

export const getPaginatedListingsSchema = z.object({
    page: z.preprocess((val) => Number(val), z.number().min(1).default(1)),
    limit: z.preprocess((val) => Number(val), z.number().min(1).max(100).default(10)),
    id: z.string().optional(),
    title: z.string().optional()
});

export type CreateListingDto = z.infer<typeof createListingSchema>;
export type GetPaginatedListingsDto = z.infer<typeof getPaginatedListingsSchema>;