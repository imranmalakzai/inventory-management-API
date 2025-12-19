import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export const updateProfileSchema = z.object({
  username: z.string().min(5).optional(),
  email: z.string().email().optional(),
});
