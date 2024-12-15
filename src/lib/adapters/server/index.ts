import { headers } from "next/headers";
import { ReadonlyURLSearchParams } from "next/navigation";

export function createServerAdapter(pathname?: string) {
  // Get URL from headers during SSR
  const headersList = headers();
  const url = new URL(
    headersList.get("x-url") || headersList.get("referer") || "/"
  );

  // Create readonly search params from URL
  const searchParams = new ReadonlyURLSearchParams(new URLSearchParams(url.search));

  return {
    pathname: pathname || url.pathname,
    searchParams,
    // No-op navigate function for server
    navigate: (url: string) => {
      console.warn(url, "Navigation attempted on server side");
    },
  };
} 