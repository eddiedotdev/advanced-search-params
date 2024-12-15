import { useState, useCallback, useEffect } from "react";

export function useReactAdapter() {
  const [searchParams, setSearchParams] = useState(
    () =>
      new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : ""
      )
  );

  // Update searchParams when URL changes
  useEffect(() => {
    const handleURLChange = () => {
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener("popstate", handleURLChange);
    return () => window.removeEventListener("popstate", handleURLChange);
  }, []);

  const navigate = useCallback((url: string) => {
    window.history.pushState({}, "", url);
    setSearchParams(new URLSearchParams(url.split("?")[1] || ""));
  }, []);

  return {
    pathname: typeof window !== "undefined" ? window.location.pathname : "/",
    searchParams,
    navigate,
  };
}
