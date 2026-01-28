<script lang="ts">
  import { goto } from "$app/navigation";
  import Table from "$lib/components/common/app-table.svelte";
  import type { TableColumn } from "$lib/types/common/TableColumn";
  import { PaymentMethod } from "$lib/types/enums/PaymentMethod";
  import type { Expense } from "$lib/types/Expense";
  import { getPaymentMethodLabel } from "$lib/utils";
  import ConfirmDeleteDialog from "$lib/components/common/app-dialog.svelte";

  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  const columns: TableColumn<Expense>[] = [
    {
      key: "category",
      header: "Category",
      class: "cursor-pointer text-blue-600 hover:underline",
      headerClass: "w-1/4",
    },
    {
      key: "amount",
      header: "Amount",
      headerClass: "w-1/6",
      render: (value) => `₱${value}.00`,
    },
    {
      key: "payment",
      header: "Payment Method",
      headerClass: "w-1/6",
      render: (value, _row) => getPaymentMethodLabel(value as PaymentMethod),
    },
    {
      key: "description",
      header: "Description",
      headerClass: "w-1/6",
    },
    {
      key: "expenseDate",
      header: "Expense Date",
      headerClass: "w-1/6",
      render: (value) => new Date(value ? value : "").toLocaleDateString(),
    },
    {
      key: "id",
      header: "Action",
      headerClass: "w-1/6 text-center",
      class: "text-center",
      render: (_value, row) => ({
        component: ConfirmDeleteDialog,
        props: {
          title: "Delete Expense",
          description: "Are you sure you want to delete this expense?",
          triggerText: "Delete",
          triggerVariant: "destructive",
          confirmText: "Delete",
          action: "?/delete",
          name: "id",
          value: row.id,
        },
      }),
    },
  ];
</script>

<div class="flex flex-1 flex-col p-10">
  <Table
    caption="A list of your recent expenses."
    {columns}
    data={data.response.data}
    rowKey={(data) => data.id}
    onCellClick={(row, column) => {
      if (column.key === "category") {
        goto(`/expenses/${row.id}`);
      }
    }}
  />
</div>
