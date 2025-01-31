import { z } from "zod";

export const createCategorySchema = z.object({
  store_id: z.string(),
  name: z
    .string()
    .trim()
    .min(1, "Category Name must be at least 1 character")
    .max(255, "Category Name must not be greater than 255 characters"),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
});
