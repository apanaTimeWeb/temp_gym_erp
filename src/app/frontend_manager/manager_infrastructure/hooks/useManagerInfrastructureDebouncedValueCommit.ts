// DATA FLOW: UI input value → useManagerInfrastructureDebouncedValueCommit → supplied feature commit callback.
'use client';

import { useEffect } from 'react';

import { useManagerInfrastructureDebounce } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDebounce';

/**
 * @description Commits a debounced value to an external setter without exposing React effect lifecycle logic to UI components.
 * @dependencies Uses the zero-business Manager debounce infrastructure hook and the supplied callback.
 * @edge-case Skips commits when the debounced value is already equal to the committed value.
 */
export function useManagerInfrastructureDebouncedValueCommit<T>(value: T, committedValue: T, onCommit: (nextValue: T) => void, delay = 300): void {
  const debouncedValue = useManagerInfrastructureDebounce(value, delay);
  // EFFECT: Commit only after the debounce completes so search/filter UI does not call the backend on every keystroke.
  useEffect(() => {
    if (debouncedValue !== committedValue) onCommit(debouncedValue);
  }, [committedValue, debouncedValue, onCommit]);
}
