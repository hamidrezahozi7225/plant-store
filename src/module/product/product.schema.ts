import z from "zod";

export const CreateProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  amount: z.coerce.number(),
  price: z.coerce.number(),
  discount: z.coerce.number().optional(),
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
  discount: z.coerce.number().optional(),
  images: z.array(z.string()),
  categoryId: z.string(),
});

export type UpdateProductType = z.infer<typeof UpdateProductSchema>;
