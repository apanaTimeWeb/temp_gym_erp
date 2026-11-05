"use client";
// RESPONSIBILITY: Generic debounce hook shared across all ADMIN modules.
// DATA FLOW: Centralized store/hook logic mapping API mutations and query state to UI props.

// Prevents excessive API calls by delaying a value update until the user stops typing.
// Use this for all search inputs and filter inputs that trigger backend calls (Rule 15).
import { useState, useEffect } from 'react';

/**
 * A custom hook to debounce a value (e.g., search queries)
 * to prevent excessive API calls on every keystroke.
 *
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 */
/**
 * @description Implements useDebounce for the owning Admin feature module.
 * @dependencies Uses only module-owned types/constants and approved application infrastructure.
 * @edge-case Preserves documented nullable, locale, validation, and ordering semantics.
 */
export function useAdminNavigationLayoutDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

// EFFECT: Delays propagated search/filter values to prevent API/query churn during fast typing.
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

