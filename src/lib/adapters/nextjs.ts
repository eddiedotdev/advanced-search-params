import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function useNextAdapter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return {
    router,
    pathname,
    searchParams,
    navigate: (url: string) => router.replace(url),
  };
}
