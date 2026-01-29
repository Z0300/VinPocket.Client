<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Field from "$lib/components/ui/field/index";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index";
  import { PaymentMethod } from "$lib/types/enums/PaymentMethod";
  import { getPaymentMethodLabel } from "$lib/utils";
  import toast from "svelte-french-toast";

  const categories = [
    { value: "c_019be4c9-4432-782d-8f50-6eb0bb2e516f", label: "Food" },
  ];

  let categoryValue = $state("");
  let paymentMethodValue = $state("");

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

  let { form } = $props();
</script>

<div class="flex flex-col items-center p-10">
  <div
    class="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200"
  >
    <form
      method="POST"
      use:enhance={() => {
        return async ({ result, formElement }) => {
          if (result.type === "success") {
            toast.success("Expense created successfully!");
            formElement.reset();
          }
        };
      }}
    >
      <Field.Group>
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
          {#if form?.categoryId}
            <Field.Error>{form?.categoryId.errors}</Field.Error>
          {/if}
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
          {#if form?.payment}
            <Field.Error>{form?.payment.errors}</Field.Error>
          {/if}
        </Field.Field>
        <Field.Field data-invalid={!!form?.amount}>
          <Field.Label for="amount">Amount</Field.Label>
          <Input
            id="amount"
            type="number"
            aria-invalid={!!form?.amount}
            placeholder="0.00"
            name="amount"
          />
          {#if form?.amount}
            <Field.Error>{form?.amount.errors}</Field.Error>
          {/if}
        </Field.Field>
        <Field.Field data-invalid={!!form?.description}>
          <Field.Label for="description">Description</Field.Label>
          <Textarea
            id="description"
            aria-invalid={!!form?.description}
            name="description"
            placeholder="Enter description"
          />
        </Field.Field>
        <Field.Field data-invalid={!!form?.expenseDate}>
          <Field.Label for="expense-date">Expense Date</Field.Label>
          <Input
            id="expense-date"
            type="date"
            aria-invalid={!!form?.expenseDate}
            name="expenseDate"
            class="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {#if form?.expenseDate}
            <Field.Error>{form?.expenseDate.errors}</Field.Error>
          {/if}
        </Field.Field>
        <Field.Field orientation="horizontal" class="justify-end gap-3">
          <Button variant="outline" onclick={() => goto("/expenses")}
            >Cancel</Button
          >
          <Button type="submit">Create</Button>
        </Field.Field>
      </Field.Group>
    </form>
  </div>
</div>
