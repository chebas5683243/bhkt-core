import { z } from "zod";

export class PreferencesValidator {
  static findByUserId = z.object({
    user: z.strictObject({
      id: z.string().min(1),
    }),
  });

  static update = z
    .object({
      user: z.strictObject({
        id: z.string(),
      }),
      q1: z.string().optional(),
      q2: z.string().optional(),
      q3: z.string().optional(),
      q4: z.string().optional(),
      q5: z.string().optional(),
      q6: z.string().optional(),
      q7: z.string().optional(),
      q8: z.string().optional(),
      q9: z.string().optional(),
      q10: z.string().optional(),
      q11: z.string().optional(),
      q12: z.string().optional(),
      q13: z.string().optional(),
      q14: z.string().optional(),
      q15: z.string().optional(),
      q16: z.string().optional(),
      q17: z.string().optional(),
      q18: z.string().optional(),
      q19: z.string().optional(),
      q20: z.string().optional(),
    })
    .refine((data) => Object.keys(data).length > 1, {
      message: "Question number missing",
    });
}

export type PreferencesValidatorMethods = Exclude<
  keyof typeof PreferencesValidator,
  "prototype"
>;
