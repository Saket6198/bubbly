import * as z from "zod";
export const registerSchema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(18, "Username cannot exceed 18 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(24, "Password cannot exceed 24 characters"),
  email: z.email("Invalid email address"),
});

export const loginSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(24, "Password cannot exceed 24 characters"),
  email: z.email("Invalid email address"),
});


export type LoginSchemaProps = z.infer<typeof loginSchema>;
export type RegisterSchemaProps = z.infer<typeof registerSchema>;