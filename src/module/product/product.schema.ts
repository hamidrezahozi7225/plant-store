import z from "zod";

export const CreateProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  amount: z.coerce.number(),
  price: z.coerce.number(),
  persentage: z.coerce.number().optional(),
  expiresIn: z.coerce.date().optional(),
  images: z.array(z.string()),
  categoryId: z.string(),
});

export type CreateProductType = z.infer<typeof CreateProductSchema>;

export const GetSearchProductSchema = z.object({
  name: z.string(),
});

export type GetSearchProduct = z.infer<typeof GetSearchProductSchema>;

export const UpdateProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  amount: z.coerce.number(),
  price: z.coerce.number(),
  persentage: z.coerce.number().optional(),
  expiresIn: z.coerce.date().optional(),
  images: z.array(z.string()),
  categoryId: z.string(),
});

export type UpdateProductType = z.infer<typeof UpdateProductSchema>;

export const DiscountSchema = z.object({
  id: z.string(),
  persentage: z.coerce.number().positive().max(100),
  expiresIn: z.coerce.date(),
});

export type DiscountType = z.infer<typeof DiscountSchema>;
