import { z } from "zod";

export const createUserSchema = z.object({
  store_id: z.string().min(1, "Store is required"),
  name: z
    .string()
    .trim()
    .min(1, "Supplier Name must be at least 1 character")
    .max(255, "Supplier Name must not be greater than 255 characters"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(256, "Password must be at best 256 characters"),
  role: z.string().min(1, "Role is required"),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Supplier Name must be at least 1 character")
    .max(255, "Supplier Name must not be greater than 255 characters"),
  status: z.string().min(1, "Status is required"),
});
