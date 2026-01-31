import type { Actions, PageServerLoad } from "./$types";
import { get, remove } from "$lib/client";
import type { Expense } from "$lib/types/Expense";
import type { PaginatedResponse } from "$lib/types/Paginated";

export const load: PageServerLoad = async ({ url }) => {
  const expenseDate = url.searchParams.get("expense_date") ?? "";
  const sort = url.searchParams.get("sort");
  const fields = String(url.searchParams.get("fields") ?? "");
  const page = Number(url.searchParams.get("page") ?? 1);
  const pageSize = Number(url.searchParams.get("page_size") ?? 10);

  const response = await get<PaginatedResponse<Expense>>("/api/expenses", {
    params: {
      expenseDate,
      sort,
      fields,
      page,
      pageSize,
    },
  });

  return { response };
};

export const actions = {
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    await remove(`/api/expenses/${id}`);
  },
} satisfies Actions;
