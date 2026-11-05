"use client";
// RESPONSIBILITY: Synchronizes AttendanceDashboard filter state bidirectionally with URL history without stale-state re-insertion.
// DATA FLOW: URL navigation -> store hydration -> local state updates -> router.replace (retaining unrelated query parameters).

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { AdminUrlQueryBinding, AdminUrlQueryValue } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/types/AdminAttendanceDashboardShellContractTypes';

function normalized(value: AdminUrlQueryValue): string {
  return value === null || value === undefined ? '' : String(value);
}

/** Resolve missing keys to the owning filter default, including browser Back/Forward removals. */
export function resolveAdminUrlQueryValue(
  params: Pick<URLSearchParams, 'get'>, key: string, defaultValue: AdminUrlQueryValue,
): string {
  return params.get(key) ?? normalized(defaultValue);
}

/** Never write an obsolete store snapshot over an externally navigated URL. */
export function useAdminNavigationLayoutUrlQuerySync(bindings: readonly AdminUrlQueryBinding[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchString = searchParams.toString();
  const [hydrated, setHydrated] = useState(false);
  const bindingsRef = useRef(bindings);
  bindingsRef.current = bindings;
  const lastSeenUrlRef = useRef<string | null>(null);
  const awaitingHydrationRef = useRef(false);
  const pendingLocalWritesRef = useRef<string[]>([]);
  const latestLocalUrlRef = useRef<string | null>(null);
  // Key/default changes require hydration; local input changes do not.
  const keyDefaults = JSON.stringify(bindings.map(({ key, defaultValue }) => [key, normalized(defaultValue)]));
  const valueSnapshot = JSON.stringify(bindings.map(({ key, value, defaultValue }) => [key, normalized(value), normalized(defaultValue)]));

  useEffect(() => {
    if (lastSeenUrlRef.current === searchString) return;
    lastSeenUrlRef.current = searchString;
    // A delayed Next.js replace acknowledgement is not browser Back/Forward navigation.
    if (pendingLocalWritesRef.current.includes(searchString)) {
      pendingLocalWritesRef.current = pendingLocalWritesRef.current.filter((url) => url !== searchString);
      if (latestLocalUrlRef.current === searchString) latestLocalUrlRef.current = null;
      setHydrated(true);
      return;
    }
    pendingLocalWritesRef.current = [];
    latestLocalUrlRef.current = null;
    const params = new URLSearchParams(searchString);
    let mismatch = false;
    bindingsRef.current.forEach(({ key, value, defaultValue, setValue }) => {
      const urlValue = resolveAdminUrlQueryValue(params, key, defaultValue);
      if (normalized(value) !== urlValue) {
        mismatch = true;
        setValue(urlValue);
      }
    });
    awaitingHydrationRef.current = mismatch;
    setHydrated(true);
  }, [searchString, keyDefaults]);

  useEffect(() => {
    if (!hydrated) return;
    const current = new URLSearchParams(searchString);
    if (awaitingHydrationRef.current) {
      const synced = bindingsRef.current.every(({ key, value, defaultValue }) =>
        normalized(value) === resolveAdminUrlQueryValue(current, key, defaultValue));
      if (!synced) return; // Store's asynchronous React render has not reflected navigation yet.
      awaitingHydrationRef.current = false;
    }
    const next = new URLSearchParams(latestLocalUrlRef.current ?? searchString);
    bindingsRef.current.forEach(({ key, value, defaultValue }) => {
      const normalizedValue = normalized(value);
      if (!normalizedValue || normalizedValue === normalized(defaultValue)) next.delete(key);
      else next.set(key, normalizedValue);
    });
    const query = next.toString();
    if (query !== (latestLocalUrlRef.current ?? searchString)) {
      latestLocalUrlRef.current = query; // Pending navigation; physical URL is still searchString.
      pendingLocalWritesRef.current.push(query);
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    }
  }, [hydrated, pathname, router, searchString, valueSnapshot]);
}
