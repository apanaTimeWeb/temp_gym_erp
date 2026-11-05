"use client";
// RESPONSIBILITY: Synchronizes shareable Admin list UI state with Next.js URL query parameters.
// DATA FLOW: component event → feature hook → API client/query cache or UI state → component state and feedback (admin_hr/hr_performance_analytics/hooks/useAdminHrPerformanceAnalyticsUrlQuerySync.ts)

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { AdminHrPerformanceUrlQueryBinding } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/types/AdminHrPerformanceAnalyticsUrlQueryTypes';

/** Synchronizes module-owned filter/page state with the current search query while preserving latest setters. @description Coordinates useAdminHrPerformanceUrlQuerySync for the owning hr_performance_analytics feature. @dependencies Uses the API, query cache, state, and router dependencies explicitly imported by this hook. @param bindings - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. @edge-case Preserves contract-defined pending, empty, error, validation, and retry behavior. */
export function useAdminHrPerformanceUrlQuerySync(bindings: readonly AdminHrPerformanceUrlQueryBinding[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isHydrated, setIsHydrated] = useState(false);
  const latestBindingsRef = useRef(bindings);
  latestBindingsRef.current = bindings;
  const deps = JSON.stringify(bindings.map(({ key, value, defaultValue }) => ({ key, value, defaultValue })));
  const stableBindings = useMemo(() => bindings, [deps]);

  useEffect(() => {
    stableBindings.forEach(({ key, value }) => {
      const latestBinding = latestBindingsRef.current.find((binding) => binding.key === key);
      const setValue = latestBinding?.setValue;
      if (!setValue) return;
      const raw = searchParams.get(key);
      if (raw !== null && raw !== String(value)) setValue(raw);
    });
    setIsHydrated(true);
  }, [searchParams, stableBindings]);

  useEffect(() => {
    if (!isHydrated) return;
    const next = new URLSearchParams(searchParams.toString());
    stableBindings.forEach(({ key, defaultValue }) => {
      const latestBinding = latestBindingsRef.current.find((binding) => binding.key === key);
      if (!latestBinding) return;
      const normalized = latestBinding.value === null || latestBinding.value === undefined ? '' : String(latestBinding.value);
      const normalizedDefault = defaultValue === null || defaultValue === undefined ? '' : String(defaultValue);
      if (!normalized || normalized === normalizedDefault) next.delete(key);
      else next.set(key, normalized);
    });
    const query = next.toString();
    const current = searchParams.toString();
    if (query !== current) router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [isHydrated, pathname, router, searchParams, stableBindings]);
}
