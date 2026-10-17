import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().min(2).max(100).trim(),
  email: z.string().email().max(200).trim().toLowerCase(),
  company: z.string().max(100).optional().or(z.literal('')),
  service: z.string().min(1).max(100),
  message: z.string().min(10).max(2000).trim(),
  website: z.string().max(0).optional().or(z.literal('')), // honeypot
});

export type ContactFormData = z.infer<typeof contactSchema>;