import type { Parser } from "./parsers";

export type RouterProvider = "next" | "react" | "react-router";

export interface SearchParamsConfig {
  provider: RouterProvider;
}

export interface ParamOptions {
  serialize?: boolean;
  parse?: boolean;
  forceArray?: boolean;
  parser?: Parser<unknown>;
}

export interface UseParamsReturn {
  get: <T>(key: string, options?: ParamOptions) => T | undefined;
  set: (
    key: string,
    values: unknown | unknown[],
    options?: ParamOptions
  ) => void;
  add: (
    key: string,
    values: unknown | unknown[],
    options?: ParamOptions
  ) => void;
  toggle: (key: string, value?: unknown, options?: ParamOptions) => void;
  matches: (key: string, value: unknown, options?: ParamOptions) => boolean;
  remove: (
    key: string,
    values: unknown | unknown[],
    options?: ParamOptions
  ) => void;
  update: (
    key: string,
    oldValue: unknown,
    newValue: unknown,
    options?: ParamOptions
  ) => void;
  clear: (key: string) => void;
  resetAllParams: () => void;
  getAll: (options?: ParamOptions) => Record<string, unknown>;
  setMany: (
    params: Record<string, unknown | unknown[]>,
    options?: ParamOptions
  ) => void;
  getWithDefault: <T>(
    key: string,
    defaultValue: T,
    options?: ParamOptions
  ) => T;
  params: URLSearchParams;
}
