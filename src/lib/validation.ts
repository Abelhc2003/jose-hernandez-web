import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  subject: z.enum(["presentation", "interview", "work", "other"]),
  message: z.string().trim().min(10).max(4000),
  consent: z.literal(true),
  locale: z.string().trim().min(2).max(5).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email().max(200),
  consent: z.literal(true),
  locale: z.string().trim().min(2).max(5).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
