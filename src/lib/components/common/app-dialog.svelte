<script lang="ts">
  import { enhance } from "$app/forms";
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import DeleteIcon from "@lucide/svelte/icons/trash-2";

  export let title: string = "Are you absolutely sure?";

  export let description: string =
    "This action cannot be undone. This will permanently delete your account and remove your data from our servers.";

  export let confirmText: string = "Confirm";
  export let cancelText: string = "Cancel";

  export let action = "?/delete";
  export let name = "id";
  export let value: string | number;
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger
    ><DeleteIcon
      class="w-4 h-4 cursor-pointer text-red-700"
    /></AlertDialog.Trigger
  >
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>{title}</AlertDialog.Title>
      <AlertDialog.Description>
        {description}
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>{cancelText}</AlertDialog.Cancel>
      <form {action} method="post" use:enhance>
        <input type="hidden" {name} {value} />
        <AlertDialog.Action type="submit">{confirmText}</AlertDialog.Action>
      </form>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
