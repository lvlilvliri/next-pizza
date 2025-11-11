import {z} from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Incorrect phone number" }),
  address: z.string().min(5, { message: "Incorrect address" }),
  note: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;