import { z } from 'zod';
import { UserRole } from '../user/user.model';

export const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  // Default to INDIVIDUAL if not provided
  role: z.nativeEnum(UserRole).optional().default(UserRole.INDIVIDUAL),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;