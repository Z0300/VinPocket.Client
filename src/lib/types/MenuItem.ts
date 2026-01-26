import type { ComponentIcon, Icon } from "@lucide/svelte";
import type { Component } from "svelte";

export type MenuItem = {
  title: string;
  url?: string;
  icon?: Component<ComponentIcon>;
  children?: MenuItem[];
};
