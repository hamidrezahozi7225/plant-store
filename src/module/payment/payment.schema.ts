import z from "zod";

export const PaymentRequestSchema = z.object({
  amount: z.coerce.number(),
  userId: z.string(),
});

export type PaymentRequestSchema = z.infer<typeof PaymentRequestSchema>;
