import * as z from "zod";
export const userProfileSchema = z.object({
  name: z.string(),
});
