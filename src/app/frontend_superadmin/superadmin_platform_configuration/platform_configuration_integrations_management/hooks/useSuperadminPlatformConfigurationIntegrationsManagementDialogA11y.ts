'use client';
import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

/**
 * Keeps an open Integrations dialog keyboard-safe and restores focus when it closes.
 * @description Traps Tab focus inside the dialog, closes dismissible dialogs with Escape, and locks page scrolling.
 * @dependencies Uses only browser focus APIs and React refs; no feature business state is owned here.
 * @edge-case Ignores disabled/unfocusable controls, restores the previously focused trigger, and safely handles an unmounted dialog.
 */
// DATA FLOW: Feature/API/query inputs → useSuperadminPlatformConfigurationIntegrationsManagementDialogA11y → owning feature view/components.
/**
 * @description Owns the feature-local integrations dialog accessibility responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminPlatformConfigurationIntegrationsManagementDialogA11y(
  open: boolean,
  onClose?: () => void,
): RefObject<HTMLDivElement | null> {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const onCloseRef = useRef(onClose);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // EFFECT INTENT: Install and remove dialog keyboard/focus listeners while the owning dialog is open.
// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const getFocusable = (): HTMLElement[] => Array.from(dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )).filter((element) => !element.hasAttribute('aria-hidden'));

    const focusInitial = () => {
      const target = dialog.querySelector<HTMLElement>('[data-autofocus="true"]') ?? getFocusable()[0];
      target?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (!dialog.contains(event.target as Node)) focusInitial();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);
    window.requestAnimationFrame(focusInitial);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
  }, [open]);

  return dialogRef;
}
