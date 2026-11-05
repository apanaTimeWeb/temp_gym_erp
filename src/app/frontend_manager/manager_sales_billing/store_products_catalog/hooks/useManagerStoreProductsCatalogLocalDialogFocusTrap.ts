// DATA FLOW: Dialog open state + dialog ref → useManagerInfrastructureDialogFocusTrap → keyboard focus lifecycle in zero-business dialog infrastructure.
"use client";

import { useEffect, useRef } from 'react';

import type { ManagerInfrastructureDialogFocusTrapOptions } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/types/ManagerStoreProductsCatalogLocalDialogFocusTrapTypes';

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
    const focusFirstElement = (): void => {
      const first = dialog.querySelector<HTMLElement>(focusableSelector);
      first?.focus();
    };
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => element.offsetParent !== null);
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
    const focusTimer = window.setTimeout(focusFirstElement, 0);
    return () => {
      window.clearTimeout(focusTimer);
      dialog.removeEventListener('keydown', handleKeyDown);
      if (restoreFocusRef.current?.isConnected) restoreFocusRef.current.focus();
    };
  }, [dialogRef, isOpen, onClose]);
}
