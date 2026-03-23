import { z } from "zod";

export const createReviewSchema = z.object({
  requestId: z.string().min(1, "Request id is required"),
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating cannot exceed 5"),
  comment: z
    .string()
    .trim()
    .min(3, "Review comment must be at least 3 characters long")
    .max(500, "Review comment must be 500 characters or fewer"),
});

export type CreateReviewDto = z.infer<typeof createReviewSchema>;
