<script lang="ts" generics="T">
  import * as Table from "$lib/components/ui/table";
  import type { TableColumn } from "$lib/types/common/TableColumn";

  export let caption: string | undefined;

  export let columns: TableColumn<T>[];
  export let data: T[];
  export let rowKey: (row: T) => string | number;
  export let onCellClick: (row: T, column: TableColumn<T>) => void | undefined;
</script>

<Table.Root>
  {#if caption}
    <Table.Caption>{caption}</Table.Caption>
  {/if}

  <Table.Header>
    <Table.Row class="">
      {#each columns as column}
        <Table.Head class={column.headerClass}>
          {column.header}
        </Table.Head>
      {/each}
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {#each data as row (rowKey(row))}
      <Table.Row>
        {#each columns as column}
          <Table.Cell
            class={column.class}
            onclick={() => onCellClick?.(row, column)}
          >
            {#if column.render}
              {@html column.render(row[column.key], row)}
            {:else}
              {row[column.key] as any}
            {/if}
          </Table.Cell>
        {/each}
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
