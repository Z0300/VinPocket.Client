import type { Component } from "svelte";

export type CellRender =
  | string
  | number
  | null
  | undefined
  | {
      component: Component<any>;
      props?: Record<string, unknown>;
    };

export type TableColumn<T, K extends keyof T = keyof T> = {
  key: K;
  header: string;
  class?: string;
  headerClass?: string;
  render?: (value: T[K], row: T) => CellRender;
};
