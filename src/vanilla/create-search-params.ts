import { createSearchParamsCore } from "../lib/core/search-params";

export function createSearchParams() {
  const searchParams = new URLSearchParams(window.location.search);

  return createSearchParamsCore({
    pathname: window.location.pathname,
    searchParams,
    navigate: (url) => {
      window.history.pushState({}, "", url);
    },
  });
}

// Expose to window for IIFE/UMD builds
if (typeof window !== "undefined") {
  (window as any).UseSearchParams = {
    createSearchParams,
  };
}
