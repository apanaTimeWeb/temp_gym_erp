"use client";
// RESPONSIBILITY: Owns feature-local query, mutation, or interaction orchestration for blacklist_management; it does not render the page UI.
// DATA FLOW: component event → feature hook → API client/query cache or UI state → component state and feedback (admin_blacklist/blacklist_management/hooks/useAdminMembersBlacklistManagementDebounce.ts)

import { useEffect, useState } from 'react';

/** Debounces module-owned search values and cancels stale timers on updates/unmount. @description Coordinates useAdminBlacklistDebounce for the owning blacklist_management feature. @dependencies Uses the API, query cache, state, and router dependencies explicitly imported by this hook. @param value - Input consumed by this hook as declared by its TypeScript signature. @param delay - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. @edge-case Preserves contract-defined pending, empty, error, validation, and retry behavior. */
export function useAdminBlacklistDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), Math.max(0, delay));
    return () => window.clearTimeout(timer);
  }, [delay, value]);
  return debouncedValue;
}
