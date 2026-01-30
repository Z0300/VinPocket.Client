<script lang="ts">
  import { goto } from "$app/navigation";
  import Table from "$lib/components/common/app-table.svelte";
  import { getPaymentMethodLabel } from "$lib/utils";
  import ConfirmDeleteDialog from "$lib/components/common/app-dialog.svelte";
  import * as CellTable from "$lib/components/ui/table";
  import type { PageProps } from "./$types";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";

  let { data }: PageProps = $props();
</script>

<div class="flex flex-1 flex-col p-10 gap-4">
  <div class="flex items-center justify-between">
    <Button onclick={() => goto("/expenses/new")}>Add Expense</Button>
    <Input
      type="text"
      placeholder="Search expenses..."
      class="h-9 w-64 rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>
  <div class="rounded-md border">
    <Table
      columns={[
        { header: "Category", headerClass: "w-1/4" },
        { header: "Amount", headerClass: "w-1/6" },
        { header: "Payment Method", headerClass: "w-1/6" },
        { header: "Description", headerClass: "w-1/6" },
        { header: "Expense Date", headerClass: "w-1/6" },
        { header: "Action", headerClass: "w-1/6 text-center" },
      ]}
      data={data.response.data}
      rowKey={(row) => row.id}
    >
      {#snippet row({ row })}
        <CellTable.Cell onclick={() => goto(`/expenses/${row.id}`)}>
          <span class="cursor-pointer text-blue-600 hover:underline">
            {row.category}
          </span>
        </CellTable.Cell>
        <CellTable.Cell>₱{row.amount}.00</CellTable.Cell>
        <CellTable.Cell>
          {getPaymentMethodLabel(row.payment)}
        </CellTable.Cell>
        <CellTable.Cell class="truncate max-w-xs"
          >{row.description}</CellTable.Cell
        >
        <CellTable.Cell>
          {new Date(
            row.expenseDate ? row.expenseDate : "",
          ).toLocaleDateString()}
        </CellTable.Cell>
        <CellTable.Cell>
          <ConfirmDeleteDialog
            title="Delete Expense"
            description="Are you sure you want to delete this expense?"
            confirmText="Confirm"
            action="?/delete"
            name="id"
            value={row.id}
          />
        </CellTable.Cell>
      {/snippet}
    </Table>
  </div>
</div>
