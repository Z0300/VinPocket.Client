<script lang="ts">
  import "./layout.css";
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import AppSidebar from "$lib/components/app-sidebar.svelte";

  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Sidebar.Provider>
  <AppSidebar />
  <main>
    <Sidebar.Trigger />
    {@render children?.()}
  </main>
</Sidebar.Provider>
