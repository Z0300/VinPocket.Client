import type { PaymentMethod } from "./enums/PaymentMethod";

export type Expense = {
  id: string;
  category: string;
  amount: number;
  payment: PaymentMethod;
  description?: string;
  expenseDate: string;
};
