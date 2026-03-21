import { z } from "zod";

export const createRequestSchema = z.object({
  listingId: z.string().min(1, "Listing id is required"),
  requestedQuantity: z.number().min(1, "Requested quantity must be at least 1"),
  message: z.string().optional(),
});

export const requestActionSchema = z.object({
  requestId: z.string().min(1, "Request id is required"),
});

export type CreateRequestDto = z.infer<typeof createRequestSchema>;
export type RequestActionDto = z.infer<typeof requestActionSchema>;
