"use client";
// RESPONSIBILITY: Owns feature-local query, mutation, or interaction orchestration for gym_health_alerts_monitoring; it does not render the page UI.
// DATA FLOW: component event → feature hook → API client/query cache or UI state → component state and feedback (admin_gym_health_alerts/gym_health_alerts_monitoring/hooks/useAdminGymsHealthAlertsMonitoringDebounce.ts)

import { useEffect, useState } from 'react';

/** @description Coordinates useAdminGymHealthAlertsDebounce for the owning gym_health_alerts_monitoring feature. @dependencies Uses the API, query cache, state, and router dependencies explicitly imported by this hook. @param value - Input consumed by this hook as declared by its TypeScript signature. @param delay - Input consumed by this hook as declared by its TypeScript signature. @returns The hook’s typed data, state, actions, and recovery handlers. @edge-case Preserves contract-defined pending, empty, error, validation, and retry behavior. */
export function useAdminGymHealthAlertsDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [delay, value]);
  return debounced;
}
