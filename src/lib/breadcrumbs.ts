import { page } from "$app/state";

type Crumb = {
  label: string;
  href: string;
};

const titleMap: Record<string, string> = {
  "": "Home",
  expenses: "Expenses",
  "expenses/new": "Add New Expense",
  "expenses/[id]": "Details",
  budgets: "Budgets",
  incomes: "Incomes",
  categories: "Categories",
  create: "Create",
};

function isId(segment: string) {
  return /^\d+$/.test(segment);
}

export function getBreadcrumbs(): Crumb[] {
  const segments = page.url.pathname.split("/").filter(Boolean);

  let path = "";
  const crumbs: Crumb[] = [];

  segments.forEach((segment, i) => {
    path += `/${segment}`;

    let key = path;

    if (i > 0 && isId(segment)) {
      key = segments.slice(0, i).join("/") + "/[id]";
    }

    if (segment === "new") {
      key = segments.slice(0, i).join("/") + "/new";
    }

    crumbs.push({
      label: page.data?.breadcrumb ?? titleMap[key] ?? capitalize(segment),
      href: path,
    });
  });

  return crumbs;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
