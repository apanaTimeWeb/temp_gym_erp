// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
"use client";
// RESPONSIBILITY: Provides zero-business dialog focus trapping, initial focus, Escape handling, and focus restoration for Trainer UI dialogs.
// DATA FLOW: dialog open state + dialog ref → focus trap → keyboard dismissal → previous trigger focus restore.
import { useEffect, useRef } from 'react';

import type { TrainerInfrastructureDialogFocusTrapOptions } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/types/TrainerOperationsWeeklyAvailabilityTrainerInfrastructureDialogFocusTrapOptions';




/**
 * @description Defines the keyboard-focusable descendants used by the dialog focus trap.
 * @dependencies Native interactive elements and tabindex semantics only.
 * @edge-case Excludes disabled controls and tabindex="-1" nodes so focus never lands on unavailable elements.
 */
const activeDialogTraps: symbol[] = [];

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
  onEscapeRef.current = onEscape;
// Effect contract: trap focus only while the dialog is open and restore focus to the triggering element during cleanup.
  useEffect(() => {
    if (!isOpen) return undefined;
    const trapId = Symbol('weekly-availability-dialog');
    activeDialogTraps.push(trapId);
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const dialog = dialogRef.current;
    if (dialog && !focusable?.length && !dialog.hasAttribute('tabindex')) dialog.tabIndex = -1;
    (focusable?.[0] ?? dialog)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (activeDialogTraps[activeDialogTraps.length - 1] !== trapId) return;
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
      const trapIndex = activeDialogTraps.lastIndexOf(trapId);
      if (trapIndex !== -1) activeDialogTraps.splice(trapIndex, 1);
      previousFocus?.focus();
    };
  }, [dialogRef, isOpen]);
}
