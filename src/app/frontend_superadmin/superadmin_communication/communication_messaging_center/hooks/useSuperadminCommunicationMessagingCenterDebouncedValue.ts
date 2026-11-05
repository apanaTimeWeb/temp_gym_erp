'use client';



import { useEffect, useState } from 'react';

/**
 * @description Debounces a Messaging Center value before it enters server-query parameters.
 * @dependencies Uses React state/effect primitives only.
 * @edge-case Cancels the previous timer whenever the value or delay changes and on unmount.
 */
export function useSuperadminCommunicationMessagingCenterDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timeoutId);
  }, [delayMs, value]);

  return debouncedValue;
}
