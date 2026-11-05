"use client";
// RESPONSIBILITY: Provides consistent keyboard/focus behavior for nested Admin dialogs/drawers.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/feedback/AdminNavigationLayoutDialogAccessibilityProvider.tsx)

import { useEffect } from 'react';

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])', '[href]', 'input:not([disabled])', 'select:not([disabled])',
  'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])',
].join(',');

function getDialogs(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-admin-dialog="true"]'))
    .filter((dialog) => dialog.isConnected && !dialog.closest('[aria-hidden="true"]'));
}
function getFocusable(dialog: HTMLElement): HTMLElement[] {
  return Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((element) => {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden';
  });
}
function closeDialog(dialog: HTMLElement): void {
  dialog.querySelector<HTMLButtonElement>('button[data-admin-dialog-close], button[data-admin-dialog-cancel]')?.click();
}

export default function AdminNavigationLayoutDialogAccessibilityProvider() {
  useEffect(() => {
    const previousFocus = new Map<HTMLElement, HTMLElement>();
    let dialogStack: HTMLElement[] = [];
    let focusFrame = 0;
    const focusFirst = (dialog: HTMLElement) => {
      window.cancelAnimationFrame(focusFrame);
      focusFrame = window.requestAnimationFrame(() => {
        if (!dialog.isConnected || getDialogs().at(-1) !== dialog) return;
        (getFocusable(dialog)[0] ?? dialog).focus();
      });
    };
    const syncDialogs = () => {
      const nextStack = getDialogs();
      const oldTop = dialogStack.at(-1) ?? null;
      const nextTop = nextStack.at(-1) ?? null;
      if (oldTop && nextTop && oldTop !== nextTop && nextStack.includes(oldTop)) {
        // A new nested dialog was pushed: remember the focused parent control.
        const active = document.activeElement;
        previousFocus.set(nextTop, active instanceof HTMLElement ? active : oldTop);
        focusFirst(nextTop);
      } else if (oldTop && nextTop && oldTop !== nextTop && dialogStack.includes(nextTop)) {
        // The nested top dialog was popped: restore focus within the still-open parent.
        const trigger = previousFocus.get(oldTop);
        previousFocus.delete(oldTop);
        if (trigger?.isConnected && nextTop.contains(trigger)) trigger.focus();
        else (getFocusable(nextTop)[0] ?? nextTop).focus();
      } else if (oldTop && !nextTop) {
        const trigger = previousFocus.get(oldTop);
        previousFocus.delete(oldTop);
        if (trigger?.isConnected) trigger.focus();
      } else if (nextTop && nextTop !== oldTop) {
        const active = document.activeElement;
        previousFocus.set(nextTop, active instanceof HTMLElement ? active : document.body);
        focusFirst(nextTop);
      }
      for (const oldDialog of dialogStack) {
        if (!nextStack.includes(oldDialog) && oldDialog !== oldTop) previousFocus.delete(oldDialog);
      }
      dialogStack = nextStack;
    };
    const observer = new MutationObserver(syncDialogs);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-hidden'] });
    syncDialogs();
    const handleKeyDown = (event: KeyboardEvent) => {
      const dialog = getDialogs().at(-1);
      if (!dialog) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDialog(dialog);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = getFocusable(dialog);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) { event.preventDefault(); dialog.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => { observer.disconnect(); window.cancelAnimationFrame(focusFrame); document.removeEventListener('keydown', handleKeyDown); };
  }, []);
  return null;
}
