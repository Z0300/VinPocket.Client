<script lang="ts" generics="T">
  import * as Table from "$lib/components/ui/table";

  export let columns: {
    header: string;
    headerClass?: string;
  }[];

  export let data: T[];
  export let rowKey: (row: T) => string | number;

  export let row: (props: { row: T }) => any;
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      {#each columns as column}
        <Table.Head class={column.headerClass}>
          {column.header}
        </Table.Head>
      {/each}
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {#each data as rowData (rowKey(rowData))}
      <Table.Row>
        {@render row({ row: rowData })}
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
