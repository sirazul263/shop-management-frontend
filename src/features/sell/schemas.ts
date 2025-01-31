import { z } from "zod";
export const createSellSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    discount_type: z.string().optional(),
    discount_amount: z.number().optional(),
    total_discount: z.number().optional(),
    total_paid: z.number(),
    due: z.number().optional(),
    payment_method: z
      .string()
      .min(1, { message: "Please select a payment method" }),
    payment_status: z
      .string()
      .min(1, { message: "Please select a payment status" }),
    notes: z.string().optional(),
    products: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          quantity: z
            .number()
            .positive({ message: "Quantity must be greater than 0" }),
          unit_amount: z
            .number()
            .positive({ message: "Product Price is required" }),
          total_amount: z.number().optional(),
        })
      )
      .min(1, { message: "At least one product is required" }),
  })
  .refine(
    (data) => {
      // If `discount_type` is provided, `discount_amount` must be provided as well
      if (data.discount_type && data.discount_amount === undefined) {
        return false;
      }
      return true;
    },
    {
      message: "Discount amount is required when a discount type is provided",
      path: ["discount_amount"],
    }
  );
