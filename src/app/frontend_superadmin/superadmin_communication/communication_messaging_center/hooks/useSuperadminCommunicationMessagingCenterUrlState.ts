'use client';



import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type UrlStateUpdates = Record<string, string | null>;

/**
 * @description Owns query-string reads and atomic updates for the Messaging Center feature.
 * @dependencies Uses only Next.js App Router primitives; no shared application hook is required.
 * @edge-case Preserves unrelated query keys and deletes keys only when the update value is null.
 */
export function useSuperadminCommunicationMessagingCenterUrlState() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParam = useCallback((key: string, fallback = ''): string => searchParams.get(key) ?? fallback, [searchParams]);
  const setParams = useCallback((updates: UrlStateUpdates): void => {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === null) next.delete(key);
      else next.set(key, value);
    }
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return { getParam, setParams };
}
