import { string, z } from "zod";

export const createNewProductShema = z.object({
  name: z.string(),
  selling_price: z.number().int().positive(),
  quantity: z.number().int().positive(),
});
export const updateProductSchema = z.object({
  name: z.string().optional(),
  selling_price: z.number().int().positive().optional(),
  quantity: z.number().int().positive().optional(),
});
