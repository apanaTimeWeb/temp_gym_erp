// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Provides centralized Trainer Socket.IO subscriptions, connection lifecycle, cleanup, and reconnect-safe ownership.
import { createContext, useCallback, useMemo } from 'react';

import { getTrainerInfrastructureSocket, releaseTrainerInfrastructureSocket, retainTrainerInfrastructureSocket } from '@/app/frontend_trainer/trainer_account/account_notifications/api/TrainerAccountNotificationsTrainerInfrastructureSocketClient';

import type { TrainerInfrastructureSocketProviderProps } from '@/app/frontend_trainer/trainer_account/account_notifications/types/TrainerAccountNotificationsTrainerInfrastructureSocketProviderProps';

import type { TrainerInfrastructureSocketContextValue, TrainerInfrastructureSocketSubscription } from '@/app/frontend_trainer/trainer_account/account_notifications/types/TrainerAccountNotificationsTrainerInfrastructureSocketTypes';






/**
 * @description Owns the infrastructure feature UI responsibility represented by TrainerInfrastructureSocketContext, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export /**
 * @description Provides the application-scoped Socket.IO connection required for approved realtime UI updates.
 * @dependencies TrainerInfrastructureSocketClient; no feature business behavior.
 * @edge-case Disconnects must be recoverable without allowing feature components to instantiate their own sockets.
 */
const TrainerInfrastructureSocketContext = createContext<TrainerInfrastructureSocketContextValue | null>(null);

/**
 * @description Owns TrainerInfrastructureSocketProvider behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Owns centralized realtime connection lifecycle for Trainer infrastructure so feature modules subscribe without instantiating sockets directly.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerInfrastructureSocketProvider({ children }: TrainerInfrastructureSocketProviderProps) {
  const subscribe = useCallback((subscription: TrainerInfrastructureSocketSubscription) => {
    const socket = getTrainerInfrastructureSocket(subscription.path);
    retainTrainerInfrastructureSocket(subscription.path);
    socket.on(subscription.eventName, subscription.listener);
    return () => {
      socket.off(subscription.eventName, subscription.listener);
      releaseTrainerInfrastructureSocket(subscription.path);
    };
  }, []);

  const value = useMemo(() => ({ subscribe }), [subscribe]);
  return <TrainerInfrastructureSocketContext.Provider value={value}>{children}</TrainerInfrastructureSocketContext.Provider>;
}
