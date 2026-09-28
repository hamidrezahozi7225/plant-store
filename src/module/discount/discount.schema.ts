import z from "zod";

export const CreateDiscountSchema = z.object({
  persentage: z.coerce.number().positive().max(100),
  expiresIn: z.coerce.date(),
  userId: z.string(),
});

export type CreateDiscountType = z.infer<typeof CreateDiscountSchema>;
