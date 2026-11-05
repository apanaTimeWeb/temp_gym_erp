"use client";
// RESPONSIBILITY: URL-owned Branch P&L filters; preserve consecutive edits and browser history.
// DATA FLOW: Next.js route query -> canonical filters; explicit user actions -> router.push.

import { useCallback, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PnlUrlFilterKey = 'period' | 'status';

/** URL remains canonical. Pending writes merge clicks before the router acknowledges navigation. */
export function useAdminFinancePnlUrlQuerySync() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeQuery = searchParams.toString();
  const observedQueryRef = useRef(routeQuery);
  const pendingWriteRef = useRef<string | null>(null);

  // Only an actual route snapshot change (acknowledgment, Back, Forward, external link)
  // invalidates staged writes. An unchanged router snapshot never discards a rapid user edit.
  useEffect(() => {
    if (observedQueryRef.current !== routeQuery) {
      observedQueryRef.current = routeQuery;
      pendingWriteRef.current = null;
    }
  }, [routeQuery]);

  const readQuery = () => routeQuery === observedQueryRef.current
    ? pendingWriteRef.current ?? routeQuery
    : routeQuery;
  const getValue = (key: PnlUrlFilterKey) => new URLSearchParams(readQuery()).get(key);
  const setValue = useCallback((key: PnlUrlFilterKey, value: string, defaultValue: string) => {
    const base = routeQuery === observedQueryRef.current
      ? pendingWriteRef.current ?? routeQuery
      : routeQuery;
    const next = new URLSearchParams(base);
    if (value === defaultValue) next.delete(key);
    else next.set(key, value);
    const queryString = next.toString();
    // Duplicate clicks must not generate redundant history entries.
    if (queryString === base) return;
    pendingWriteRef.current = queryString;
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, [pathname, router, routeQuery]);

  return { getValue, setValue };
}
