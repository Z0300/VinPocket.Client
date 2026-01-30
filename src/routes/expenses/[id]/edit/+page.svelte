<script lang="ts">
  import { enhance } from "$app/forms";
  import toast from "svelte-french-toast";
  import * as Field from "$lib/components/ui/field/index";
  import * as Select from "$lib/components/ui/select/index";
  import { PaymentMethod } from "$lib/types/enums/PaymentMethod.js";
  import { getPaymentMethodLabel } from "$lib/utils.js";
  import { Input } from "$lib/components/ui/input/index";
  import { Textarea } from "$lib/components/ui/textarea/index";
  import { Button } from "$lib/components/ui/button/index";
  import { goto } from "$app/navigation";
  import type { PageProps } from "./$types";

  const categories = [
    { value: "c_019be4c9-4432-782d-8f50-6eb0bb2e516f", label: "Food" },
  ];

  let categoryValue = $state("");
  let paymentMethodValue = $state("");

  let { form, data }: PageProps = $props();

  $effect(() => {
    if (data.expense) {
      categoryValue = data.expense.category.id.toString();
      paymentMethodValue = data.expense.payment.toString();
    }
  });

  const triggerContent = $derived(
    categories.find((c) => c.value === categoryValue)?.label ??
      "Select a category",
  );

  const methods = Object.values(PaymentMethod).filter(
    (v): v is PaymentMethod => typeof v === "number",
  );

  const methodTriggerContent = $derived(
    paymentMethodValue
      ? getPaymentMethodLabel(Number(paymentMethodValue) as PaymentMethod)
      : "Select a payment method",
  );
</script>

<div class="flex flex-col p-10">
  <div class="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      class="md:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <form
        method="POST"
        use:enhance={() => {
          return async ({ result, update }) => {
            if (result.type === "success") {
              toast.success("Expense updated successfully!");
              await update();
            } else {
              await update();
            }
          };
        }}
      >
        <Field.Group class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field.Field data-invalid={!!form?.categoryId}>
            <Field.Label>Category</Field.Label>
            <Select.Root
              type="single"
              name="categoryId"
              bind:value={categoryValue}
            >
              <Select.Trigger aria-invalid={!!form?.categoryId}>
                {triggerContent}
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Label>Categories</Select.Label>
                  {#each categories as category (category.value)}
                    <Select.Item
                      value={category.value}
                      label={category.label}
                      disabled={category.value === ""}
                    >
                      {category.label}
                    </Select.Item>
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Field.Field>

          <Field.Field data-invalid={!!form?.payment}>
            <Field.Label>Payment Method</Field.Label>
            <Select.Root
              type="single"
              name="payment"
              bind:value={paymentMethodValue}
            >
              <Select.Trigger aria-invalid={!!form?.payment}>
                {methodTriggerContent}
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Label>Payment Methods</Select.Label>
                  {#each methods as method (method)}
                    <Select.Item
                      value={method.toString()}
                      label={getPaymentMethodLabel(method)}
                    >
                      {getPaymentMethodLabel(method)}
                    </Select.Item>
                  {/each}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Field.Field>

          <Field.Field data-invalid={!!form?.amount}>
            <Field.Label for="amount">Amount</Field.Label>
            <Input
              id="amount"
              type="number"
              aria-invalid={!!form?.amount}
              placeholder="0.00"
              value={data.expense.amount}
              name="amount"
            />
          </Field.Field>

          <Field.Field data-invalid={!!form?.expenseDate}>
            <Field.Label for="expense-date">Expense Date</Field.Label>
            <Input
              id="expense-date"
              type="date"
              aria-invalid={!!form?.expenseDate}
              name="expenseDate"
              value={new Date(data.expense.expenseDate)
                .toISOString()
                .split("T")[0]}
              class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </Field.Field>

          <Field.Field class="md:col-span-2" data-invalid={!!form?.description}>
            <Field.Label for="description">Description</Field.Label>
            <Textarea
              id="description"
              aria-invalid={!!form?.description}
              name="description"
              placeholder="Enter description"
              value={data.expense.description}
              class="w-full"
            />
          </Field.Field>

          <Field.Field
            orientation="horizontal"
            class="md:col-span-2 justify-end gap-3 pt-4"
          >
            <Button variant="outline" onclick={() => goto("/expenses")}
              >Cancel</Button
            >
            <Button type="submit">Update</Button>
          </Field.Field>
        </Field.Group>
      </form>
    </div>

    {#if (form?.id?.errors?.length ?? 0) + (form?.categoryId?.errors?.length ?? 0) + (form?.payment?.errors?.length ?? 0) + (form?.amount?.errors?.length ?? 0) + (form?.expenseDate?.errors?.length ?? 0) + (form?.description?.errors?.length ?? 0) > 0}
      <div
        class="bg-red-50 border border-gray-200 p-4 rounded-lg shadow-md w-fit h-fit"
      >
        <h3 class="font-semibold text-red-700 mb-2">Errors</h3>
        <ul class="list-disc list-inside text-xs text-red-700 space-y-1">
          {#if form?.id?.errors?.length}
            {#each form.id.errors as error}
              <li>{error}</li>
            {/each}
          {/if}
          {#if form?.categoryId?.errors?.length}
            {#each form.categoryId.errors as error}
              <li>{error}</li>
            {/each}
          {/if}
          {#if form?.payment?.errors?.length}
            {#each form.payment.errors as error}
              <li>{error}</li>
            {/each}
          {/if}
          {#if form?.amount?.errors?.length}
            {#each form.amount.errors as error}
              <li>{error}</li>
            {/each}
          {/if}
          {#if form?.expenseDate?.errors?.length}
            {#each form.expenseDate.errors as error}
              <li>{error}</li>
            {/each}
          {/if}
          {#if form?.description?.errors?.length}
            {#each form.description.errors as error}
              <li>{error}</li>
            {/each}
          {/if}
        </ul>
      </div>
    {/if}
  </div>
</div>
