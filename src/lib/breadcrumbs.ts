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

const staticSegments = new Set(["new", "create", "edit"]);

function isDynamicSegment(segment: string) {
  return !staticSegments.has(segment);
}

export function getBreadcrumbs(): Crumb[] {
  const segments = page.url.pathname.split("/").filter(Boolean);

  let path = "";
  const crumbs: Crumb[] = [];

  segments.forEach((segment, i) => {
    path += `/${segment}`;

    let key = path;

    if (i > 0 && isDynamicSegment(segment)) {
      key = segments.slice(0, i).join("/") + "/[id]";
    }

    if (segment === "new") {
      key = segments.slice(0, i).join("/") + "/new";
    }

    const normalizedKey = key.startsWith("/") ? key.slice(1) : key;
    const isLast = i === segments.length - 1;

    const label =
      isLast && page.data?.breadcrumb
        ? page.data.breadcrumb
        : (titleMap[normalizedKey] ?? capitalize(segment));

    crumbs.push({
      label,
      href: path,
    });
  });

  return crumbs;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
