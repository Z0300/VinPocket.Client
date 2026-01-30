<script lang="ts">
  import * as Field from "$lib/components/ui/field/index";
  import { Button } from "$lib/components/ui/button/index.js";
  import { goto } from "$app/navigation";
  import type { PageProps } from "./$types";
  import { getPaymentMethodLabel } from "$lib/utils";
  let { data }: PageProps = $props();
</script>

<div class="flex flex-col items-center p-10">
  <div
    class="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200"
  >
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Expense Details</h2>
      <p class="text-sm text-gray-500">View information about this expense</p>
    </div>

    <Field.Group>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field.Field>
          <Field.Label>Category</Field.Label>
          <div class="text-sm text-gray-900">
            {data.expense.category.name}
          </div>
        </Field.Field>
        <Field.Field>
          <Field.Label>Payment Method</Field.Label>
          <div class="text-sm text-gray-900">
            {getPaymentMethodLabel(data.expense.payment)}
          </div>
        </Field.Field>
        <Field.Field>
          <Field.Label>Amount</Field.Label>
          <div class="text-sm font-semibold text-gray-900">
            ${data.expense.amount}
          </div>
        </Field.Field>
        <Field.Field>
          <Field.Label>Expense Date</Field.Label>
          <div class="text-sm text-gray-900">
            {new Date(data.expense.expenseDate).toLocaleDateString()}
          </div>
        </Field.Field>
        <Field.Field class="md:col-span-2">
          <Field.Label>Description</Field.Label>
          <div class="text-sm text-gray-700 whitespace-pre-wrap">
            {data.expense.description || "—"}
          </div>
        </Field.Field>
      </div>
      <Field.Field orientation="horizontal" class="justify-end gap-3 pt-4">
        <Button variant="outline" onclick={() => goto("/expenses")}>
          Back
        </Button>

        <Button onclick={() => goto(`/expenses/${data.expense.id}/edit`)}>
          Edit
        </Button>

        <Button variant="destructive">Delete</Button>
      </Field.Field>
    </Field.Group>
  </div>
</div>
