"use client";

import { useCallback, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useAdminFinancePaymentsUrlCommit() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeQuery = searchParams.toString();
  const observedQueryRef = useRef(routeQuery);
  const pendingQueryRef = useRef<string | null>(null);

  useEffect(() => {
    if (observedQueryRef.current !== routeQuery) {
      observedQueryRef.current = routeQuery;
      pendingQueryRef.current = null;
    }
  }, [routeQuery]);

  const commitUrl = useCallback((update: (params: URLSearchParams) => void) => {
    const base = observedQueryRef.current === routeQuery ? pendingQueryRef.current ?? routeQuery : routeQuery;
    const next = new URLSearchParams(base);
    update(next);
    const query = next.toString();
    if (query === base) return;
    pendingQueryRef.current = query;
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, routeQuery, router]);

  return { commitUrl, searchParams, pathname, router };
}
