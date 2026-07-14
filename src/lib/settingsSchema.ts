import { z } from 'zod';

export const settingsFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().trim().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z
    .string()
    .trim()
    .transform((value) => value ?? '')
    .refine(
      (value) => value === '' || /^(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(value),
      'Password must be at least 8 characters and contain a number and a special character',
    ),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
