// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Feature-facing socket event hook; owns subscription cleanup while transport remains centralized in TrainerInfrastructureSocketProvider.
// DATA FLOW: Feature event path/name/listener → centralized TrainerInfrastructureSocketProvider subscription → live payload callback.
import { useContext, useEffect } from 'react';

import { TrainerInfrastructureSocketContext } from '@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsTrainerInfrastructureSocketProvider';




/**
 * @description Feature-facing socket event hook; owns subscription cleanup while transport remains centralized in TrainerInfrastructureSocketProvider.
 * @dependencies Feature event path/name/listener → centralized TrainerInfrastructureSocketProvider subscription → live payload callback.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerInfrastructureSocketEvent state and data flow for the infrastructure feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export const useTrainerInfrastructureSocketEvent = (path: string, eventName: string, listener: (payload: unknown) => void): void => {
  const context = useContext(TrainerInfrastructureSocketContext);
// Effect contract: subscribe on mount/dependency changes and always unsubscribe the previous listener.
  useEffect(() => {
    if (!context) throw new Error('TrainerInfrastructureSocketProvider is required.');
    return context.subscribe({ path, eventName, listener });
  }, [context, eventName, listener, path]);
};
