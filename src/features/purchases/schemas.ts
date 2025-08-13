import { z } from "zod";

export const createPurchaseSchema = z
  .object({
    purchase_date: z.coerce.date(),
    supplier_id: z.string().min(1, { message: "Please select a supplier" }),
    discount_type: z.string().optional(),
    discount_amount: z.number().optional(),
    total_discount: z.number().optional(),
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
          price: z.number().positive({ message: "Product Price is required" }),
          profit: z.number().optional(),
          sell: z.number().optional(),
          imei: z
            .array(z.string().min(1, { message: "IMEI/SN number is required" }))
            .optional(),
        })
      )
      .min(1, { message: "At least one product is required" }),
  })
  .refine(
    (data) => {
      // Discount type validation
      if (data.discount_type && data.discount_amount === undefined) {
        return false;
      }
      return true;
    },
    {
      message: "Discount amount is required when a discount type is provided",
      path: ["discount_amount"],
    }
  )
  .refine(
    (data) => {
      // IMEI count must match quantity for each product
      return data.products.every(
        (p) => Array.isArray(p.imei) && p.imei.length === p.quantity
      );
    },
    {
      message: "Number of IMEI/SN entries must match product quantity",
      path: ["products"],
    }
  );
