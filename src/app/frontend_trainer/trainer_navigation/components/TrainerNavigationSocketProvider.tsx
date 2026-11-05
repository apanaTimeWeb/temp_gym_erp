"use client";
// RESPONSIBILITY: Provides centralized Trainer Socket.IO subscriptions, connection lifecycle, cleanup, and reconnect-safe ownership.
import { createContext, useCallback, useMemo } from 'react';

import { getTrainerNavigationSocket, releaseTrainerNavigationSocket, retainTrainerNavigationSocket } from '@/app/frontend_trainer/trainer_navigation/api/TrainerNavigationSocketClient';

import type { TrainerNavigationSocketProviderProps } from '@/app/frontend_trainer/trainer_navigation/types/TrainerNavigationSocketProviderProps';

import type { TrainerNavigationSocketContextValue, TrainerNavigationSocketSubscription } from '@/app/frontend_trainer/trainer_navigation/types/TrainerNavigationSocketTypes';






/**
 * @description Owns the infrastructure feature UI responsibility represented by TrainerNavigationSocketContext, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export /**
 * @description Provides the application-scoped Socket.IO connection required for approved realtime UI updates.
 * @dependencies TrainerNavigationSocketClient; no feature business behavior.
 * @edge-case Disconnects must be recoverable without allowing feature components to instantiate their own sockets.
 */
const TrainerNavigationSocketContext = createContext<TrainerNavigationSocketContextValue | null>(null);

/**
 * @description Owns TrainerNavigationSocketProvider behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Owns centralized realtime connection lifecycle for Trainer infrastructure so feature modules subscribe without instantiating sockets directly.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerNavigationSocketProvider({ children }: TrainerNavigationSocketProviderProps) {
  const subscribe = useCallback((subscription: TrainerNavigationSocketSubscription) => {
    const socket = getTrainerNavigationSocket(subscription.path);
    retainTrainerNavigationSocket(subscription.path);
    socket.on(subscription.eventName, subscription.listener);
    return () => {
      socket.off(subscription.eventName, subscription.listener);
      releaseTrainerNavigationSocket(subscription.path);
    };
  }, []);

  const value = useMemo(() => ({ subscribe }), [subscribe]);
  return <TrainerNavigationSocketContext.Provider value={value}>{children}</TrainerNavigationSocketContext.Provider>;
}
