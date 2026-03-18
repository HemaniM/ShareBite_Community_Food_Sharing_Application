import { z } from "zod";

const nullableTrimmedString = z
  .string()
  .trim()
  .optional()
  .transform((value) => value ?? "");

const optionalUrlOrEmpty = z
  .string()
  .trim()
  .optional()
  .refine((value) => !value || /^https?:\/\//.test(value), {
    message: "Profile image must be a valid URL",
  })
  .transform((value) => (value ? value : undefined));

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .optional(),
  phone: nullableTrimmedString,
  gender: nullableTrimmedString,
  email: z.string().trim().email("Invalid email address").optional(),
  about: nullableTrimmedString,
  address: nullableTrimmedString,
  city: nullableTrimmedString,
  district: nullableTrimmedString,
  state: nullableTrimmedString,
  pincode: nullableTrimmedString,
  profileImage: optionalUrlOrEmpty,
});

export const uploadProfileImageSchema = z.object({
  imageData: z.string().trim().min(1, "imageData is required"),
  mimeType: z
    .string()
    .trim()
    .regex(
      /^image\/[a-zA-Z0-9.+-]+$/,
      "mimeType must be a valid image mime type",
    ),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
export type UploadProfileImageDto = z.infer<typeof uploadProfileImageSchema>;
