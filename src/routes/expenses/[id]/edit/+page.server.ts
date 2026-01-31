import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import type { PaymentMethod } from "$lib/types/enums/PaymentMethod";
import { updateExpenseSchema } from "$lib/schemas/UpdateExpense";
import z from "zod";
import { get, put, remove } from "$lib/client";
import type { ExpenseWithCategory } from "$lib/types/ExpenseWithCategory";

export const load: PageServerLoad = async ({ params }) => {
  const expense = await get<ExpenseWithCategory>(`api/expenses/${params.id}`);

  return { expense };
};

export const actions = {
  edit: async ({ request, params }) => {
    const rawData = Object.fromEntries(await request.formData());

    const parsedData = {
      ...rawData,
      id: params.id,
      amount: Number(rawData.amount),
      payment: Number(rawData.payment) as PaymentMethod,
    };

    const result = updateExpenseSchema.safeParse(parsedData);

    if (!result.success) {
      const errors = z.treeifyError(result.error);
      return fail(400, errors.properties);
    }

    const expense = result.data;

    await put(`/api/expenses/${expense.id}`, expense);
  },
} satisfies Actions;
