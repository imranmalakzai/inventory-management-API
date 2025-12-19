import { z } from "zod";

export const addItemToStocSchema = z.object({
  product_id: z.number().int().positive(),
  quantity: z.number().int().positive(),
  cost_price: z.number().int().positive(),
});

export const updateItemToStocSchema = z.object({
  product_id: z.number().int().positive().optional(),
  quantity: z.number().int().positive().optional(),
  cost_price: z.number().int().positive().optional(),
});
