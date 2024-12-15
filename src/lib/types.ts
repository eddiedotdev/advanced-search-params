import type { Parser } from "./parsers";

export type RouterProvider = "next" | "react" | "react-router" | "server";

export interface SearchParamsConfig {
  provider?: RouterProvider;
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
    values: string | string[],
    options?: ParamOptions
  ) => void;
  add: (
    key: string,
    values: string | string[],
    options?: ParamOptions
  ) => void;
  toggle: (key: string, value?: string, options?: ParamOptions) => void;
  matches: (key: string, value: string, options?: ParamOptions) => boolean;
  remove: (
    key: string,
    values: string | string[],
    options?: ParamOptions
  ) => void;
  update: (
    key: string,
    oldValue: string,
    newValue: string,
    options?: ParamOptions
  ) => void;
  clear: (key: string) => void;
  resetAllParams: () => void;
  getAll: (options?: ParamOptions) => Record<string, string | string[]>;
  setMany: (
    params: Record<string, string | string[]>,
    options?: ParamOptions
  ) => void;
  getWithDefault: <T>(
    key: string,
    defaultValue: T,
    options?: ParamOptions
  ) => T;
  params: URLSearchParams;
}
