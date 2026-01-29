import { createExpenseSchema } from "$lib/schemas/CreateExpense";
import type { Actions } from "../$types";
import { post } from "$lib/client";
import { fail } from "@sveltejs/kit";
import z from "zod";
import type { PaymentMethod } from "$lib/types/enums/PaymentMethod";

export const actions = {
  default: async ({ request }) => {
    const rawData = Object.fromEntries(await request.formData());

    const parsedData = {
      ...rawData,
      amount: Number(rawData.amount),
      payment: Number(rawData.payment) as PaymentMethod,
    };

    const result = createExpenseSchema.safeParse(parsedData);

    if (!result.success) {
      const errors = z.treeifyError(result.error);
      return fail(400, errors.properties);
    }

    const expense = result.data;

    await post("/api/expenses", expense);
  },
} satisfies Actions;
