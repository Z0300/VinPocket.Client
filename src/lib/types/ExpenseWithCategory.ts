import type { Category } from "./Category";
import type { PaymentMethod } from "./enums/PaymentMethod";

export type ExpenseWithCategory = {
  id: string;
  category: Category;
  amount: number;
  payment: PaymentMethod;
  description?: string;
  expenseDate: string;
};
