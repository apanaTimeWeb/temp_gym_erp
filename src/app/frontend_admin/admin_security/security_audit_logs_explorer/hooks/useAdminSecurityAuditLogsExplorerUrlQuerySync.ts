"use client";
// RESPONSIBILITY: Synchronizes this leaf's shareable filter and page state without losing pending local edits.
// DATA FLOW: Next.js URL ↔ feature-local Zustand bindings; unknown query parameters are preserved.

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { AdminUrlQueryBinding } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerShellContractTypes';

/** Preserve the latest local filter edits until router acknowledgments; external history wins. */
export function useAdminNavigationLayoutUrlQuerySync(bindings: readonly AdminUrlQueryBinding[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const [isHydrated, setIsHydrated] = useState(false);
  const bindingsRef = useRef(bindings);
  bindingsRef.current = bindings;
  const serialized = JSON.stringify(bindings.map(({ key, value, defaultValue }) => ({ key, value, defaultValue })));
  const stableBindings = useMemo(() => bindings, [serialized]);
  const observedQueryRef = useRef<string | null>(null);
  const pendingQueryRef = useRef<string | null>(null);
  const issuedQueriesRef = useRef<string[]>([]);
  const skipWriteRef = useRef(false);

  useEffect(() => {
    if (observedQueryRef.current === query) return;
    observedQueryRef.current = query;
    const acknowledgment = issuedQueriesRef.current.indexOf(query);
    if (acknowledgment >= 0) {
      issuedQueriesRef.current.splice(0, acknowledgment + 1);
      if (pendingQueryRef.current === query) pendingQueryRef.current = null;
      // Acknowledging an intermediate router write must not overwrite newer local edits.
      return;
    }
    pendingQueryRef.current = null;
    issuedQueriesRef.current = [];
    skipWriteRef.current = true;
    const incoming = new URLSearchParams(query);
    // Apply page last because filter setters reset page to 1.
    const ordered = [...bindingsRef.current].sort((a, b) => Number(a.key === 'page') - Number(b.key === 'page'));
    for (const binding of ordered) {
      const raw = incoming.get(binding.key);
      const next = raw === null ? binding.defaultValue : raw;
      if (String(binding.value ?? '') !== String(next ?? '')) binding.setValue(next);
    }
    setIsHydrated(true);
  }, [query]);

  useEffect(() => {
    if (!isHydrated) return;
    if (skipWriteRef.current) { skipWriteRef.current = false; return; }
    const next = new URLSearchParams(pendingQueryRef.current ?? query);
    for (const { key, value, defaultValue } of stableBindings) {
      const normalized = String(value ?? '');
      if (!normalized || normalized === String(defaultValue ?? '')) next.delete(key);
      else next.set(key, normalized);
    }
    const target = next.toString();
    if (target === (pendingQueryRef.current ?? query)) return;
    pendingQueryRef.current = target;
    issuedQueriesRef.current.push(target);
    if (issuedQueriesRef.current.length > 20) issuedQueriesRef.current.shift();
    router.replace(target ? `${pathname}?${target}` : pathname, { scroll: false });
  }, [isHydrated, pathname, query, router, stableBindings]);
}
