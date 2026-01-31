<script lang="ts">
  import * as Pagination from "$lib/components/ui/pagination";

  export let pageNumber: number = 1;
  export let pageSize: number = 10;
  export let totalCount: number = 0;
  export let onPageChange: ((page: number) => void) | null = null;
</script>

<Pagination.Root count={totalCount} perPage={pageSize} page={pageNumber}>
  {#snippet children({ pages, currentPage })}
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous onclick={() => onPageChange?.(currentPage - 1)} />
      </Pagination.Item>

      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link
              {page}
              isActive={currentPage === page.value}
              onclick={() => onPageChange?.(page.value)}
            >
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}

      <Pagination.Item>
        <Pagination.Next onclick={() => onPageChange?.(currentPage + 1)} />
      </Pagination.Item>
    </Pagination.Content>
  {/snippet}
</Pagination.Root>
