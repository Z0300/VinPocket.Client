<script>
  import Skeleton from "../ui/skeleton/skeleton.svelte";
</script>

<div class="w-full rounded-md border">
  <div class="flex items-center border-b bg-muted/50 px-4 py-3">
    <Skeleton class="h-4 w-32" />
    <Skeleton class="ml-auto h-4 w-20" />
  </div>

  {#each Array(5) as _}
    <div class="flex items-center px-4 py-4 space-x-4 border-b last:border-b-0">
      <Skeleton class="size-10 rounded-full" />

      <div class="flex-1 space-y-2">
        <Skeleton class="h-4 w-3/4" />
        <Skeleton class="h-4 w-1/2" />
      </div>

      <Skeleton class="h-4 w-16" />
    </div>
  {/each}
</div>
