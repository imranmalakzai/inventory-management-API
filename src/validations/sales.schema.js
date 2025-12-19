import { z } from "zod";

export const createSelasSchema = z.object({
  product_id: z.number().int().positive(),
  quantity: z.number().int().positive(),
  selling_price: z.number().int().positive(),
});

export const updateSelasSchema = z.object({
  product_id: z.number().int().positive().optional(),
  quantity: z.number().int().positive().optional(),
  selling_price: z.number().int().positive().optional(),
});
