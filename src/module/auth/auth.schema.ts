import z from "zod";

const iranMobileRegex = /^09[0-9]{9}$/;

export const UserModelSchema = z.object({
  userName: z.string().optional(),
  password: z.string().min(8).optional(),
  mobile: z.string().regex(iranMobileRegex, "Invalid Iranian mobile number"),
  addresses: z
    .array(
      z.object({
        address: z.string(),
        plate: z.coerce.number(),
        postalCode: z.coerce.number().gte(1000000000).lte(9999999999),
      }),
    )
    .optional(),
});

export type UserModelTypes = z.infer<typeof UserModelSchema>;

export const SendOtpModelSchema = z.object({
  mobile: z.string().regex(iranMobileRegex, "Invalid Iranian mobile number"),
});

export type SendOtpModelTypes = z.infer<typeof SendOtpModelSchema>;

export const CheckOtpModelSchema = z.object({
  mobile: z.string().regex(iranMobileRegex, "Invalid Iranian mobile number"),
  code: z.coerce
    .number()
    .gte(10000, "باید ۵ رقم باشه")
    .lte(99999, "باید ۵ رقم باشه"),
});

export type CheckOtpModelTypes = z.infer<typeof CheckOtpModelSchema>;

export const SignInModelSchema = z.object({
  userName: z.string(),
  password: z.string().min(8),
});

export type SignInModelTypes = z.infer<typeof SignInModelSchema>;
