import z from "zod";

export const PaymentRequestSchema = z.object({
  amount: z.coerce.number(),
  userId: z.string(),
});

export type PaymentRequestSchema = z.infer<typeof PaymentRequestSchema>;

export const PaymentViaWalletSchema = z.object({
  amount: z.coerce.number(),
});

export type PaymentViaWalletType = z.infer<typeof PaymentViaWalletSchema>;
