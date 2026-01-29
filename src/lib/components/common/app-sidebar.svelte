<script lang="ts" module>
  const data = {
    navMain: [
      {
        title: "Using VinPocket",
        url: "#",
        items: [
          {
            title: "Expense Tracking",
            url: "/expenses",
          },
          {
            title: "Income Management",
            url: "/incomes",
          },
          {
            title: "Budgeting",
            url: "/budgets",
          },
        ],
      },
      {
        title: "File Maintenance",
        url: "#",
        items: [
          {
            title: "Categories",
            url: "/categories",
          },
        ],
      },
    ],
  };
</script>

<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import PhilippinePesoIcon from "@lucide/svelte/icons/philippine-peso";
  import type { ComponentProps } from "svelte";
  import { page } from "$app/state";

  let {
    ref = $bindable(null),
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> = $props();

  function isSubActive(url: string) {
    const current = page.url.pathname;
    return current === url || current.startsWith(`${url}/`);
  }

  function isGroupActive(items?: { url: string }[]) {
    if (!items) return false;
    return items.some((item) => isSubActive(item.url));
  }
</script>

<Sidebar.Root {...restProps} bind:ref>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg">
          {#snippet child({ props })}
            <a href="/" {...props}>
              <div
                class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
              >
                <PhilippinePesoIcon class="size-4" />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">VinPocket</span>
                <span class="text-xs">v1.0.0</span>
              </div>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>

  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.Menu>
        {#each data.navMain as item (item.title)}
          <Sidebar.MenuItem>
            <Sidebar.MenuButton
              class="font-medium"
              isActive={isGroupActive(item.items)}
            >
              {#snippet child({ props })}
                <span {...props}>{item.title}</span>
              {/snippet}
            </Sidebar.MenuButton>

            {#if item.items?.length}
              <Sidebar.MenuSub>
                {#each item.items as subItem (subItem.title)}
                  <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton isActive={isSubActive(subItem.url)}>
                      {#snippet child({ props })}
                        <a href={subItem.url} {...props}>
                          {subItem.title}
                        </a>
                      {/snippet}
                    </Sidebar.MenuSubButton>
                  </Sidebar.MenuSubItem>
                {/each}
              </Sidebar.MenuSub>
            {/if}
          </Sidebar.MenuItem>
        {/each}
      </Sidebar.Menu>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Rail />
</Sidebar.Root>
