import { page } from "$app/state";

type Crumb = {
  label: string;
  href: string;
};

const titleMap: Record<string, string> = {
  "": "Home",
  expenses: "Expenses",
  budgets: "Budgets",
  incomes: "Incomes",
  categories: "Categories",
  create: "Create",
};

export function getBreadcrumbs(): Crumb[] {
  const segments = page.url.pathname.split("/").filter(Boolean);

  let path = "";

  return segments.map((segment) => {
    path += `/${segment}`;

    return {
      label: page.data?.breadcrumb ?? titleMap[segment] ?? segment,
      href: path,
    };
  });
}
