import { get, remove } from "$lib/client";
import type { ExpenseWithCategory } from "$lib/types/ExpenseWithCategory";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const expense = await get<ExpenseWithCategory>(`api/expenses/${params.id}`);
  return { expense };
};

export const actions = {
  delete: async ({ params }) => {
    await remove(`/api/expenses/${params.id}`);
  },
} satisfies Actions;
