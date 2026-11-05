// DATA FLOW: Manager feature UI/state → owning custom hook → approved API/query/mutation layer → observable UI state.
'use client';
// RESPONSIBILITY: Generic debounce hook shared across all MANAGER modules.
// Prevents excessive API calls by delaying a value update until the user stops typing.
// Use this for all search inputs and filter inputs that trigger backend calls (Rule 15).
import { useState, useEffect } from 'react';

/**
 * @description Debounces a value before it is consumed by Manager search/filter request flows.
 * @dependencies Uses React useState/useEffect only; consumers remain responsible for TanStack Query ownership.
 * @edge-case Cancels the pending timer on value/delay changes and unmount so stale values are never emitted after disposal.
 * @param value The value to debounce.
 * @param delay Delay in milliseconds; defaults to the documented 300ms API debounce.
 * @returns The debounced value.
 */
export function useManagerInfrastructureDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
