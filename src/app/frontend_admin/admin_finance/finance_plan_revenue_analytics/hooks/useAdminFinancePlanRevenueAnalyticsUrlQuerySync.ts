"use client";
// RESPONSIBILITY: Synchronizes shareable Admin list UI state with Next.js URL query parameters.
// DATA FLOW: component event → feature hook → API client/query cache or UI state → component state and feedback (admin_finance/finance_plan_revenue_analytics/hooks/useAdminFinancePlanRevenueAnalyticsUrlQuerySync.ts)

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { AdminPlansRevenueUrlQueryBinding } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/types/AdminFinancePlanRevenueAnalyticsUrlQueryTypes';

/** Synchronizes module-owned filter/page state with the current search query while preserving latest setters. @description Coordinates useAdminPlansRevenueUrlQuerySync for the owning finance_plan_revenue_analytics feature. @dependencies Uses the API, query cache, state, and router dependencies explicitly imported by this hook. @param bindings - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. @edge-case Preserves contract-defined pending, empty, error, validation, and retry behavior. */
export function useAdminPlansRevenueUrlQuerySync(bindings: readonly AdminPlansRevenueUrlQueryBinding[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeQuery = searchParams.toString();
  const [isHydrated, setIsHydrated] = useState(false);
  const latestBindingsRef = useRef(bindings);
  latestBindingsRef.current = bindings;
  const observedRouteRef = useRef<string | null>(null);
  const pendingWriteRef = useRef<string | null>(null);
  const skipWriteRef = useRef(false);
  const deps = JSON.stringify(bindings.map(({ key, value, defaultValue }) => ({ key, value, defaultValue })));
  const stableBindings = useMemo(() => bindings, [deps]);

  // A new URL snapshot is an external navigation unless it acknowledges our latest write.
  // Do not rehydrate from an unchanged router snapshot when the user edits local controls.
  useEffect(() => {
    if (observedRouteRef.current === routeQuery) return;
    observedRouteRef.current = routeQuery;
    const acknowledgesLocalWrite = pendingWriteRef.current === routeQuery;
    pendingWriteRef.current = null;
    skipWriteRef.current = true;
    if (!acknowledgesLocalWrite) {
      for (const { key, value, defaultValue, setValue } of latestBindingsRef.current) {
        // Missing query params must restore the default, including browser Back navigation.
        const raw = searchParams.get(key);
        const incoming = raw === null ? defaultValue : raw;
        if (setValue && String(incoming ?? '') !== String(value ?? '')) setValue(String(incoming ?? ''));
      }
    }
    setIsHydrated(true);
  }, [routeQuery, searchParams]);

  useEffect(() => {
    if (!isHydrated) return;
    // Navigation hydration must win over the prior render's local state.
    if (skipWriteRef.current) { skipWriteRef.current = false; return; }
    const base = pendingWriteRef.current ?? routeQuery;
    const next = new URLSearchParams(base);
    for (const { key, defaultValue } of stableBindings) {
      const latest = latestBindingsRef.current.find((binding) => binding.key === key);
      if (!latest) continue;
      const normalized = String(latest.value ?? '');
      const normalizedDefault = String(defaultValue ?? '');
      if (!normalized || normalized === normalizedDefault) next.delete(key);
      else next.set(key, normalized);
    }
    const query = next.toString();
    if (query === base) return;
    pendingWriteRef.current = query;
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [isHydrated, pathname, router, routeQuery, stableBindings]);
}
