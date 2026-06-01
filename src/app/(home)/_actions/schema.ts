import { isMatch } from "date-fns";
import z from "zod";

export const generateReportSchema = z.object({
  month: z.string().refine((value) => isMatch(value, "MM")),
});

export type GenerateReportSchema = z.infer<typeof generateReportSchema>;
