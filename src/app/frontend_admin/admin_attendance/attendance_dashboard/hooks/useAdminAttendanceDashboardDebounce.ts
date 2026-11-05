"use client";
// RESPONSIBILITY: Provides feature-local debouncing for search/filter input.
// DATA FLOW: Feature input → local debounce state → owning query hook.

import { useEffect, useState } from 'react';

/** @description Delays propagation of search/filter input to reduce query churn. @dependencies Uses React local state/effect only and has no sibling business-module dependency. @edge-case Cancels the pending timer whenever the value/delay changes or the consumer unmounts. @param value - Input consumed by this hook as declared by its TypeScript signature. @param delay - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. */
export function useAdminAttendanceDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timer);
  }, [delay, value]);
  return debouncedValue;
}
