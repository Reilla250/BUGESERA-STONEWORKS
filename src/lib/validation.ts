import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  password: z.string().min(8, "Use at least 8 characters"),
});

export const quoteSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a phone number we can call or WhatsApp"),
  company: z.string().optional(),
  location: z.string().min(2, "Enter the delivery location"),
  message: z.string().max(2000).optional(),
  items: z
    .array(z.object({ productId: z.string().min(1), quantity: z.number().int().positive() }))
    .default([]),
  attachments: z
    .array(z.object({ url: z.string().url(), publicId: z.string(), filename: z.string() }))
    .max(5)
    .optional(),
});

export const orderSchema = z.object({
  deliveryAddr: z.string().min(5, "Enter the delivery address"),
  items: z
    .array(z.object({ productId: z.string().min(1), quantity: z.number().int().positive() }))
    .min(1, "Choose at least one product"),
});
