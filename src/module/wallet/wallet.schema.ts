import z from "zod";

export const AddChargeWalletSchema = z.object({
  amount: z.coerce.number(),
});

export type AddChargeWalletType = z.infer<typeof AddChargeWalletSchema>;
