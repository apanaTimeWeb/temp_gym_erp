// DATA FLOW: Dialog open state + dialog ref → useManagerInfrastructureDialogFocusTrap → keyboard focus lifecycle in zero-business dialog infrastructure.
"use client";

import { useEffect, useRef } from 'react';

import type { ManagerInfrastructureDialogFocusTrapOptions } from '@/app/frontend_manager/manager_infrastructure/types/ManagerInfrastructureDialogFocusTrapTypes';

/**
 * @description Keeps keyboard focus inside an open dialog, closes on Escape, focuses the first usable control, and restores focus to the previously active element.
 * @dependencies React browser focus APIs only; this is zero-business shared UI infrastructure.
 * @edge-case No focusable descendants are treated as a valid dialog; focus restoration is skipped if the original node is disconnected.
 */
export function useManagerInfrastructureDialogFocusTrap({ dialogRef, isOpen, onClose }: ManagerInfrastructureDialogFocusTrapOptions): void {
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // EFFECT: Install and remove the dialog keyboard/focus trap exactly with the open state and close callback.
  useEffect(() => {
    if (!isOpen) return undefined;
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const originalTabIndex = dialog.getAttribute('tabindex');
    const focusFirstElement = (): void => {
      const first = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).find((element) => { const style = window.getComputedStyle(element); return style.display !== 'none' && style.visibility !== 'hidden' && !element.hasAttribute('hidden'); });
      if (first) first.focus();
      else {
        if (!dialog.hasAttribute('tabindex')) dialog.tabIndex = -1;
        dialog.focus();
      }
    };
    const handleFocusIn = (event: FocusEvent): void => {
      if (event.target instanceof Node && !dialog.contains(event.target)) focusFirstElement();
    };
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => { const style = window.getComputedStyle(element); return style.display !== 'none' && style.visibility !== 'hidden' && !element.hasAttribute('hidden'); });
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    dialog.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn, true);
    const focusTimer = window.setTimeout(focusFirstElement, 0);
    return () => {
      window.clearTimeout(focusTimer);
      dialog.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn, true);
      if (originalTabIndex === null) dialog.removeAttribute('tabindex');
      else dialog.setAttribute('tabindex', originalTabIndex);
      if (restoreFocusRef.current?.isConnected) restoreFocusRef.current.focus();
    };
  }, [dialogRef, isOpen, onClose]);
}
