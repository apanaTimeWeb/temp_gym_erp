"use client";
// RESPONSIBILITY: Exposes the role-owned realtime subscription API to descendants without creating or disconnecting host sockets.
// DATA FLOW: Feature subscription request -> TrainerNavigationSocketProvider context -> host-owned socket listener -> unsubscribe cleanup.
import { useContext } from 'react';

import { TrainerNavigationSocketContext } from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationSocketProvider';

import type { TrainerNavigationSocketContextValue } from '@/app/frontend_trainer/trainer_navigation/types/TrainerNavigationSocketTypes';

/**
 * @description Returns the centralized Trainer socket subscription API for a descendant feature.
 * @dependencies TrainerNavigationSocketProvider and the host-owned Socket.IO adapter.
 * @edge-case Throws a clear integration error when consumed outside the role shell provider; unsubscribe removes only this listener and never disconnects the shared transport.
 */
export function useTrainerNavigationSocket(): TrainerNavigationSocketContextValue {
  const context = useContext(TrainerNavigationSocketContext);
  if (!context) throw new Error('useTrainerNavigationSocket must be used within TrainerNavigationSocketProvider');
  return context;
}
