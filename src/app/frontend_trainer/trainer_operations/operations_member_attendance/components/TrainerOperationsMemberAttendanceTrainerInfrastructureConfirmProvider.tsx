// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Provides the Trainer-wide programmatic confirm() API and owns only transient confirmation-dialog state; no server/API data is stored here.
// DATA FLOW: feature action handler → TrainerInfrastructureConfirmContext.confirm() → TrainerInfrastructureConfirmProvider → TrainerInfrastructureConfirmModal.
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import TrainerInfrastructureConfirmModal from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/components/TrainerOperationsMemberAttendanceTrainerInfrastructureConfirmModal';

import type { TrainerInfrastructureConfirmProviderProps } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceTrainerInfrastructureConfirmProviderProps';

import type { TrainerInfrastructureConfirmContextValue, TrainerInfrastructureConfirmOptions } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceTrainerInfrastructureConfirmTypes';






/**
 * @description Owns the infrastructure feature UI responsibility represented by TrainerInfrastructureConfirmContext, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export const TrainerInfrastructureConfirmContext = createContext<TrainerInfrastructureConfirmContextValue | undefined>(undefined);

/**
 * @description Owns TrainerInfrastructureConfirmProvider behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Owns confirmation-dialog orchestration for Trainer infrastructure and keeps destructive-action UX centralized at the approved application-infrastructure boundary.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export function TrainerInfrastructureConfirmProvider({ children }: TrainerInfrastructureConfirmProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationSequence, setConfirmationSequence] = useState(0);
  const [options, setOptions] = useState<TrainerInfrastructureConfirmOptions | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const settle = useCallback((result: boolean) => {
    const resolve = resolverRef.current;
    resolverRef.current = null;
    resolve?.(result);
    setOptions(null);
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const handleConfirm = useCallback(() => settle(true), [settle]);
  const handleCancel = useCallback(() => settle(false), [settle]);

  const confirm = useCallback((nextOptions: TrainerInfrastructureConfirmOptions) => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    return new Promise<boolean>((resolve) => {
      // A newer request must not strand the older promise. Resolve the prior dialog as cancelled.
      resolverRef.current?.(false);
      resolverRef.current = resolve;
      setConfirmationSequence((sequence) => sequence + 1); // Force a fresh typed-confirmation field for every request.
      setOptions(nextOptions);
      setIsOpen(true);
    });
  }, []);

  // Unmount must never strand a form awaiting a destructive-action decision.
  useEffect(() => () => {
    const unresolved = resolverRef.current;
    resolverRef.current = null;
    unresolved?.(false);
  }, []);

  const value = useMemo<TrainerInfrastructureConfirmContextValue>(() => ({ confirm }), [confirm]);

  return (
    <TrainerInfrastructureConfirmContext.Provider value={value}>
      {children}
      {options ? (
        <TrainerInfrastructureConfirmModal
          key={confirmationSequence}
          isOpen={isOpen}
          title={options.title}
          message={options.message}
          confirmText={options.confirmText}
          cancelText={options.cancelText}
          type={options.type}
          requireTypedConfirmation={options.requireTypedConfirmation}
          confirmationPhrase={options.confirmationPhrase}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      ) : null}
    </TrainerInfrastructureConfirmContext.Provider>
  );
}
