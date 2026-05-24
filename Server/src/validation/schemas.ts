import { z } from 'zod'

// ========== Auth Schemas ==========

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),

  email: z
    .string()
    .email('Invalid email address'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),

  role: z
    .enum(['Sales User', 'Admin'])
    .optional()
    .default('Sales User'),
})

export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address'),

  password: z
    .string()
    .min(1, 'Password is required'),
})

// ========== Lead Schemas ==========

export const createLeadSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters'),

  email: z
    .string()
    .email('Invalid email address'),

  status: z
    .enum(['New', 'Contacted', 'Qualified', 'Closed'])
    .optional()
    .default('New'),

  source: z
    .enum(['Website', 'Referral', 'Instagram', 'Facebook', 'LinkedIn'])
    .optional()
    .default('Website'),

  paid: z
    .number()
    .min(0, 'Paid amount cannot be negative')
    .optional()
    .default(0),

  date: z
    .string()
    .optional(),

  time: z
    .string()
    .optional(),
})

export const updateLeadSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Closed']).optional(),
  source: z.enum(['Website', 'Referral', 'Instagram', 'Facebook', 'LinkedIn']).optional(),
  paid: z.number().min(0).optional(),
  date: z.string().optional(),
  time: z.string().optional(),
})
