export function useVanillaAdapter() {
  const pathname = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  const navigate = (url: string) => {
    window.history.pushState({}, "", url);
    window.dispatchEvent(new Event("urlchange"));
  };

  return {
    pathname,
    searchParams,
    navigate,
  };
}
