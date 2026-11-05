"use client";
// RESPONSIBILITY: Owns modal focus management, Escape handling, focus trapping, and body scroll lock for billing_plans_catalog.
// DATA FLOW: Feature-local modal → feature-local accessibility hook → browser focus/scroll lifecycle.

import { useEffect, type RefObject } from 'react';

export interface AdminBillingPlansCatalogDialogAccessibilityOptions {
  isOpen: boolean;
  onClose: () => void;
  containerRef?: RefObject<HTMLElement | null>;
}

/** Keeps focus inside an open feature modal and restores the previous focus on close. */
export function useAdminBillingPlansCatalogDialogAccessibility({ isOpen, containerRef, onClose }: AdminBillingPlansCatalogDialogAccessibilityOptions): void {
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const getFocusableElements = (): HTMLElement[] => {
      const container = containerRef?.current;
      if (!container) return [];
      return Array.from(container.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
    };

    const focusFirstElement = () => {
      const container = containerRef?.current;
      if (!container) return;
      const first = getFocusableElements()[0];
      if (first) first.focus();
      else container.focus();
    };

    const animationFrame = window.requestAnimationFrame(focusFirstElement);
    const handleKeyDown = (event: KeyboardEvent) => {
      const container = containerRef?.current;
      if (!container) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = getFocusableElements();
      if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (!container.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
    };
  }, [containerRef, isOpen, onClose]);
}
