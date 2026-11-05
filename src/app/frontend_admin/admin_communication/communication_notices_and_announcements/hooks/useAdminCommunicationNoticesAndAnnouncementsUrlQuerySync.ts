"use client";
// RESPONSIBILITY: Synchronizes shareable Admin list UI state with Next.js URL query parameters.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/hooks/useAdminNavigationLayoutUrlQuerySync.ts)

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { AdminUrlQueryBinding } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/types/AdminCommunicationNoticesAndAnnouncementsShellContractTypes';

/** Synchronizes module-owned filter/page state with the current search query while preserving latest setters. */
export function useAdminNavigationLayoutUrlQuerySync(bindings: readonly AdminUrlQueryBinding[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.toString();
  const [hydratedQuery, setHydratedQuery] = useState<string | null>(null);
  const [hydrationTick, setHydrationTick] = useState(0);
  const hydrationAttempts = useRef(0);
  const lastObservedQuery = useRef<string | null>(null);
  const needsHydration = useRef(true);
  const latestBindingsRef = useRef(bindings);
  latestBindingsRef.current = bindings;
  const dependencyKey = JSON.stringify(bindings.map(({ key, value, defaultValue }) => ({ key, value, defaultValue })));
  const stableBindings = useMemo(() => bindings, [dependencyKey]);

  useEffect(() => {
    if (lastObservedQuery.current !== urlQuery) {
      lastObservedQuery.current = urlQuery;
      needsHydration.current = true;
      hydrationAttempts.current = 0;
    }
    if (!needsHydration.current) return;
    const params = new URLSearchParams(urlQuery);
    let correctionsNeeded = false;
    for (const binding of stableBindings) {
      const latest = latestBindingsRef.current.find((entry) => entry.key === binding.key);
      if (!latest) continue;
      const raw = params.get(binding.key);
      const desired = raw === null ? binding.defaultValue : raw;
      const actual = latest.value == null ? '' : String(latest.value);
      const normalizedDesired = desired == null ? '' : String(desired);
      if (actual !== normalizedDesired) {
        latest.setValue(desired);
        correctionsNeeded = true;
      }
    }
    if (correctionsNeeded && hydrationAttempts.current < 1) {
      hydrationAttempts.current += 1;
      setHydrationTick((tick) => tick + 1);
      return;
    }
    needsHydration.current = false;
    setHydratedQuery(urlQuery);
  }, [urlQuery, stableBindings, hydrationTick]);

  useEffect(() => {
    // Never overwrite a new browser-history URL with old module state.
    if (needsHydration.current || hydratedQuery !== urlQuery) return;
    const next = new URLSearchParams(urlQuery);
    for (const binding of stableBindings) {
      const latest = latestBindingsRef.current.find((entry) => entry.key === binding.key);
      if (!latest) continue;
      const value = latest.value == null ? '' : String(latest.value);
      const defaultValue = binding.defaultValue == null ? '' : String(binding.defaultValue);
      if (!value || value === defaultValue) next.delete(binding.key);
      else next.set(binding.key, value);
    }
    if (next.toString() !== urlQuery) {
      router.replace(next.toString() ? `${pathname}?${next.toString()}` : pathname, { scroll: false });
    }
  }, [hydratedQuery, pathname, router, stableBindings, urlQuery]);
}
