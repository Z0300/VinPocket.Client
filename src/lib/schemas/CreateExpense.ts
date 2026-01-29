import { PaymentMethod } from "$lib/types/enums/PaymentMethod";
import { z } from "zod";

export const createExpenseSchema = z.object({
  categoryId: z.string().nonempty("Please select a valid category"),
  payment: z.enum(PaymentMethod, {
    error: "Please select a valid payment method",
  }),
  amount: z
    .number("Amount must be a number")
    .positive("Amount must be a positive number"),
  description: z.string().max(512).optional(),
  expenseDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
});

export type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;
