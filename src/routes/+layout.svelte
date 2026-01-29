<script lang="ts">
  import "./layout.css";
  import AppSidebar from "$lib/components/common/app-sidebar.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb";
  import { Separator } from "$lib/components/ui/separator";
  import { getBreadcrumbs } from "$lib/breadcrumbs";
  import { Toaster } from "svelte-french-toast";

  let { children } = $props();

  const crumbs = $derived(getBreadcrumbs());
</script>

<Sidebar.Provider>
  <AppSidebar />
  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center gap-2 border-b">
      <div class="flex items-center gap-2 px-3">
        <Sidebar.Trigger />
        <Separator orientation="vertical" class="h-4" />

        <Breadcrumb.Root>
          <Breadcrumb.List>
            {#each crumbs as crumb, index}
              <Breadcrumb.Item>
                {#if index < crumbs.length - 1}
                  <Breadcrumb.Link href={crumb.href}>
                    {crumb.label}
                  </Breadcrumb.Link>
                  <Breadcrumb.Separator />
                {:else}
                  <Breadcrumb.Page>
                    {crumb.label}
                  </Breadcrumb.Page>
                {/if}
              </Breadcrumb.Item>
            {/each}
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </div>
    </header>

    {@render children()}
    <Toaster />
  </Sidebar.Inset>
</Sidebar.Provider>
