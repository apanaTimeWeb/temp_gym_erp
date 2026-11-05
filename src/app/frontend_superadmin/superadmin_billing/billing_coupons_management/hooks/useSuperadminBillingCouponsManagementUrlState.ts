'use client';



import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

/**
 * @description Owns query-string reads and updates for this feature without a cross-feature hook dependency.
 * @dependencies Uses only Next.js App Router primitives and feature-local callers.
 * @edge-case Preserves unrelated query keys and removes a key only when its value is null.
 */
export function useSuperadminBillingCouponsManagementUrlState() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParam = useCallback((key: string, fallback = ''): string => searchParams.get(key) ?? fallback, [searchParams]);
  const setParam = useCallback((key: string, value: string | null): void => {
    const next = new URLSearchParams(searchParams.toString());
    if (value === null) next.delete(key);
    else next.set(key, value);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return { getParam, setParam };
}
