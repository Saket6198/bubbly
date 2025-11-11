import * as z from "zod";
export const userProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(18, "Username cannot exceed 18 characters"),
  avatar: z.string().optional(),
});
