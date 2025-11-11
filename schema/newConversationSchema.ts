import * as z from "zod";
export const newGroupSchema = z.object({
  name: z
    .string()
    .min(3, "Group name must be at least 3 characters")
    .max(24, "Group name cannot exceed 24 characters"),
  avatar: z.string().optional().nullable(),
});

export type NewGroupSchemaProps = z.infer<typeof newGroupSchema>;
