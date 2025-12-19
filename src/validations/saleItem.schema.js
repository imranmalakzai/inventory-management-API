import { z } from "zod";

export const createSaleItemSchema = z.object({
  sale_id: z.number().int().positive(),
  product_id: z.number().int().positive(),
  quantity: z.number().int().positive(),
  selling_price: z.number().positive(),
  cost_price: z.number().positive(),
});

export const updateSaleItemSchema = z.object({
  sale_id: z.number().int().positive().optional(),
  product_id: z.number().int().positive().optional(),
  quantity: z.number().int().positive().optional(),
  selling_price: z.number().positive().optional(),
  cost_price: z.number().positive().optional(),
});
