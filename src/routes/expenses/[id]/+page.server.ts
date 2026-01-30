import { get } from "$lib/client";
import type { ExpenseWithCategory } from "$lib/types/ExpenseWithCategory";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const expense = await get<ExpenseWithCategory>(`api/expenses/${params.id}`);
  return { expense };
};
