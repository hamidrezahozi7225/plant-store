import z from "zod";

export const AddProductToBasketSchema = z.object({
  userId: z.string(),
  productId: z.string(),
});

export type AddProductToBasketType = z.infer<typeof AddProductToBasketSchema>;

export const DeleteProductToBasketSchema = z.object({
  userId: z.string(),
  productId: z.string(),
});

export type DeleteProductToBasketType = z.infer<
  typeof DeleteProductToBasketSchema
>;
