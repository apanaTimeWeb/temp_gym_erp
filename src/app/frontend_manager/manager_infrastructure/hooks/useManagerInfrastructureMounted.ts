// DATA FLOW: React hydration snapshot → useManagerInfrastructureMounted → browser-only rendering gate.
'use client';

import { useSyncExternalStore } from 'react';

const subscribeToMountedState = (): (() => void) => () => undefined;
const getClientMountedSnapshot = (): boolean => true;
const getServerMountedSnapshot = (): boolean => false;

/**
 * Reports whether hydration has reached the browser snapshot without scheduling state updates from an effect.
 * This keeps SSR output stable while avoiding an avoidable setState-in-effect lint suppression.
 */
export function useManagerInfrastructureMounted(): boolean {
  return useSyncExternalStore(subscribeToMountedState, getClientMountedSnapshot, getServerMountedSnapshot);
}
