"use client";
// RESPONSIBILITY: Synchronize this leaf's shareable filters with the canonical URL without overwriting pending local edits.
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { AdminUrlQueryBinding } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementShellContractTypes';

/** A queued local URL write is not external navigation. Treat actual browser navigation as authoritative. */
export function useAdminNavigationLayoutUrlQuerySync(bindings: readonly AdminUrlQueryBinding[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const [hydrated, setHydrated] = useState(false);
  const bindingsRef = useRef(bindings);
  bindingsRef.current = bindings;
  const signature = JSON.stringify(bindings.map(({ key, value, defaultValue }) => [key, value, defaultValue]));
  const lastObservedUrlRef = useRef<string | null>(null);
  const pendingQueryRef = useRef<string | null>(null);
  const sentQueriesRef = useRef<string[]>([]);
  const applyingNavigationRef = useRef(false);

  useEffect(() => {
    const observed = `${pathname}?${query}`;
    if (lastObservedUrlRef.current === observed) return;
    lastObservedUrlRef.current = observed;
    const acknowledgedIndex = sentQueriesRef.current.indexOf(query);
    if (acknowledgedIndex >= 0) {
      sentQueriesRef.current.splice(0, acknowledgedIndex + 1);
      if (pendingQueryRef.current === query) pendingQueryRef.current = null;
      return;
    }
    // First hydration and true external navigation (Back/Forward or shared URL).
    pendingQueryRef.current = null;
    sentQueriesRef.current = [];
    applyingNavigationRef.current = true;
    const params = new URLSearchParams(query);
    for (const { key, value, defaultValue, setValue } of bindingsRef.current) {
      const raw = params.get(key);
      const next = raw === null ? defaultValue : raw;
      if (String(value ?? '') !== String(next ?? '')) setValue(next);
    }
    setHydrated(true);
  }, [pathname, query]);

  useEffect(() => {
    if (!hydrated) return;
    if (applyingNavigationRef.current) {
      applyingNavigationRef.current = false;
      return;
    }
    const base = pendingQueryRef.current ?? query;
    const next = new URLSearchParams(base);
    for (const { key, value, defaultValue } of bindingsRef.current) {
      const normalized = String(value ?? '');
      if (!normalized || normalized === String(defaultValue ?? '')) next.delete(key);
      else next.set(key, normalized);
    }
    const nextQuery = next.toString();
    if (nextQuery === base) return;
    pendingQueryRef.current = nextQuery;
    sentQueriesRef.current.push(nextQuery);
    // Avoid an unbounded queue if a host navigation is cancelled rather than acknowledged.
    if (sentQueriesRef.current.length > 20) sentQueriesRef.current.shift();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }, [hydrated, pathname, query, signature, router]);
}
