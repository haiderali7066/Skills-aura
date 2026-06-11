import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const consultationSchema = z.object({
  title: z.string().min(5, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  scheduled_at: z.string().datetime('Invalid date'),
  duration_minutes: z.number().min(15).max(120),
});

export const paymentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  payment_method: z.string().optional(),
  transaction_reference: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ConsultationInput = z.infer<typeof consultationSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
