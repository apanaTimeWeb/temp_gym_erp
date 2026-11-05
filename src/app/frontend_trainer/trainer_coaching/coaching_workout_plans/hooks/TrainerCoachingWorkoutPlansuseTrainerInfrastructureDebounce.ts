// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Generic debounce hook shared across all TRAINER modules.
// Prevents excessive API calls by delaying a value update until the user stops typing.
// Use this for all search inputs and filter inputs that trigger backend calls (Rule 15).
// DATA FLOW: Input value + debounce delay → useTrainerInfrastructureDebounce → debounced value consumed by feature queries.
import { useState, useEffect } from 'react';

/**
 * @description Generic debounce hook shared across all TRAINER modules.
 * @dependencies Input value + debounce delay → useTrainerInfrastructureDebounce → debounced value consumed by feature queries.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerInfrastructureDebounce state and data flow for the infrastructure feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerInfrastructureDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

// Effect contract: reset the pending timer whenever value or delay changes so only the latest value is published.
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

