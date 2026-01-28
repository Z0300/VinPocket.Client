import type { PageServerLoad } from "./$types";
import { get } from "$lib/client";
import type { Expense } from "$lib/types/Expense";
import type { PaginatedResponse } from "$lib/types/Paginated";

export const load: PageServerLoad = async ({ url }) => {
  const expenseDate = url.searchParams.get("date") ?? "";
  const sort = url.searchParams.get("sort");
  const fields = String(url.searchParams.get("fields") ?? "");
  const pageNumber = Number(url.searchParams.get("page") ?? 1);
  const pageSize = Number(url.searchParams.get("pageSize") ?? 10);

  const response = await get<PaginatedResponse<Expense>>(
    `/api/expenses?
      expenseDate=${expenseDate}&
      sort=${sort}&fields=${fields}&
      page=${pageNumber}&
      pageSize=${pageSize}`,
  );

  return { response };
};
