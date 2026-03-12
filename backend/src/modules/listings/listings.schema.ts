import { z } from 'zod';

export const createListingSchema = z.object({
  title: z.string().min(2, 'Food name must be at least 2 characters'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  ingredients: z.array(z.string()).default([]),
  images: z.array(z.string().url()).default([]),
  stock: z.object({
    quantity: z.number().min(0),
    unit: z.string().min(1, 'Stock measure is required')
  }),
  price: z.object({
    isFree: z.boolean(),
    amount: z.number().min(0)
  }),
  contactInfo: z.object({
    phoneNumber: z.string().min(7),
    alternatePhoneNumber: z.string().optional(),
    email: z.string().email()
  }),
  location: z.object({
    addressLineOne: z.string().min(1),
    addressLineTwo: z.string().optional(),
    city: z.string().min(1),
    district: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    pincode: z.string().min(1)
  }),
  expiresAt: z.coerce.date()
}).superRefine((data, ctx) => {
  if (data.price.isFree && data.price.amount !== 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Price amount must be 0 when listing is free',
      path: ['price', 'amount']
    });
  }

  if (!data.price.isFree && data.price.amount <= 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Price amount must be greater than 0 for paid listings',
      path: ['price', 'amount']
    });
  }
});

export type CreateListingDto = z.infer<typeof createListingSchema>;