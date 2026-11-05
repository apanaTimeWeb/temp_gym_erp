"use client";
// RESPONSIBILITY: Synchronizes shareable Admin list UI state with Next.js URL query parameters.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/hooks/useAdminNavigationLayoutUrlQuerySync.ts)

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { AdminUrlQueryBinding } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutTypes';

/** Synchronizes module-owned filter/page state with the current search query while preserving latest setters. */
export function useAdminNavigationLayoutUrlQuerySync(bindings: readonly AdminUrlQueryBinding[]) {
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
