import { z } from "zod";

export const createSupplierSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Supplier Name must be at least 1 character")
    .max(255, "Supplier Name must not be greater than 255 characters"),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, "Phone Number must be at least 10 digits")
    .max(15, "Phone Number must not be greater than 15 digits"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address must not be greater than 255 characters"),
});
