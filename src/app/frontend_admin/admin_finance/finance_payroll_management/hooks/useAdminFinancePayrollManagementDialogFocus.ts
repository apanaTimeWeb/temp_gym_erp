"use client";
// RESPONSIBILITY: Manages keyboard focus, Escape dismissal, and scroll locking for feature-local modal dialogs.
// INPUT/OUTPUT: Open state, owning dialog root and close handler; no business fields or transport dependencies.
import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

export function useAdminFinancePayrollManagementDialogFocus(
  isOpen: boolean,
  dialogRef: RefObject<HTMLDivElement | null>,
  onDismiss: () => void,
): void {
  const onDismissRef = useRef(onDismiss);
  useEffect(() => { onDismissRef.current = onDismiss; }, [onDismiss]);
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    (dialog?.querySelector<HTMLElement>('[data-dialog-initial-focus]') ?? dialog)?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (!dialog) return;
      if (event.key === 'Escape') {
        // The nested searchable dropdown owns its first Escape while its listbox is open.
        if (dialog.querySelector('[role="listbox"]')) return;
        event.preventDefault();
        onDismissRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE))
        .filter(element => element.getClientRects().length > 0);
      if (!controls.length) { event.preventDefault(); dialog.focus(); return; }
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!dialog.contains(document.activeElement)) { event.preventDefault(); first.focus(); }
      else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen, dialogRef]);
}
