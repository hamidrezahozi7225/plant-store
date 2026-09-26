import z from "zod";

export const CreateCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  parentId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
    .optional(),
});

export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  parentId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId")
    .optional(),
});

export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>;
