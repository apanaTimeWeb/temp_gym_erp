// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Provides zero-business dialog focus trapping, initial focus, Escape handling, and focus restoration for Trainer UI dialogs.
// DATA FLOW: dialog open state + dialog ref → focus trap → keyboard dismissal → previous trigger focus restore.
import { useEffect, useRef } from 'react';

import type { TrainerInfrastructureDialogFocusTrapOptions } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/types/TrainerCoachingWorkoutPlansTrainerInfrastructureDialogFocusTrapOptions';




/**
 * @description Defines the keyboard-focusable descendants used by the dialog focus trap.
 * @dependencies Native interactive elements and tabindex semantics only.
 * @edge-case Excludes disabled controls and tabindex="-1" nodes so focus never lands on unavailable elements.
 */
const FOCUSABLE_SELECTOR = 'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * @description Owns useTrainerInfrastructureDialogFocusTrap behavior in the Trainer module.
 * @dependencies dialog open state + dialog ref → focus trap → keyboard dismissal → previous trigger focus restore.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Manages TrainerInfrastructureDialogFocusTrap state and data flow for the infrastructure feature while keeping server data in TanStack Query and UI-only state at the module boundary.
 * @dependencies Uses only documented infrastructure module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, retry, URL-state, and cleanup behavior on repeated interaction.
 */
export function useTrainerInfrastructureDialogFocusTrap({ isOpen, dialogRef, onEscape }: TrainerInfrastructureDialogFocusTrapOptions) {
  const onEscapeRef = useRef(onEscape);
  useEffect(() => { onEscapeRef.current = onEscape; }, [onEscape]);
// Effect contract: trap focus only while the dialog is open and restore focus to the triggering element during cleanup.
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const dialog = dialogRef.current;
    if (dialog && !focusable?.length && !dialog.hasAttribute('tabindex')) dialog.tabIndex = -1;
    (focusable?.[0] ?? dialog)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const targetDialog = event.target instanceof Element
          ? event.target.closest<HTMLElement>('[role="dialog"][aria-modal="true"]')
          : null;
        const openDialogs = document.querySelectorAll<HTMLElement>('[role="dialog"][aria-modal="true"]');
        const topmostDialog = targetDialog ?? openDialogs[openDialogs.length - 1] ?? null;
        if (topmostDialog !== dialogRef.current) return;
        event.preventDefault();
        onEscapeRef.current?.();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const elements: HTMLElement[] = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (elements.length === 0) return;
      const first = elements[0]!;
      const last = elements[elements.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus();
    };
  }, [dialogRef, isOpen]);
}
