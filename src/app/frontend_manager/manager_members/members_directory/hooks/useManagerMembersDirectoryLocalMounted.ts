// DATA FLOW: React hydration snapshot → members-local mounted gate → browser-only receipt rendering.
'use client';

import { useSyncExternalStore } from 'react';

const subscribeToMountedState = (): (() => void) => () => undefined;
const getClientMountedSnapshot = (): boolean => true;
const getServerMountedSnapshot = (): boolean => false;

/** Mirrors the stable SSR/client snapshot contract without effect-driven state updates. */
export function useManagerMembersDirectoryLocalMounted(): boolean {
  return useSyncExternalStore(subscribeToMountedState, getClientMountedSnapshot, getServerMountedSnapshot);
}
