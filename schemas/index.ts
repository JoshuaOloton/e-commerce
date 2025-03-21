import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8)
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

export const LoginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export type LoginFormFields = z.infer<typeof LoginSchema>;


export const RegisterSchema = z
  .object({
    name: z.string().min(6),
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormFields = z.infer<typeof RegisterSchema>;

export const MakeOfferSchema = z.object({
  offerPrice: z.coerce.number({ invalid_type_error: "Amount must be a number" }).min(1000),
});
