import { z } from "zod";
export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Product Name must be at least 1 character")
    .max(255, "Product Name must not be greater than 255 characters"),
  categoryId: z.string().min(1, { message: "Please select a category" }),
  brandId: z.string().min(1, { message: "Please select a brand" }),
  price: z.string().min(1, "Price must be at least 1"),
  description: z.string().optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
