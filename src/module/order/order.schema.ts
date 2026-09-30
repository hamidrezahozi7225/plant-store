import z from "zod";

export const statusEnum = z.enum([
  "pending",
  "in-progress",
  "deliver",
  "cancel",
]);
export type statusEnumType = z.infer<typeof statusEnum>;

export const UpdateOrderStatusSchema = z.object({
  status: statusEnum,
});

export type UpdateOrderStatusType = z.infer<typeof UpdateOrderStatusSchema>;

export const GetAllOrdersSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  status: statusEnum.optional(),
});

export type GetAllOrdersType = z.infer<typeof GetAllOrdersSchema>;
