"use client";
// RESPONSIBILITY: Provides zero-business dialog accessibility infrastructure for Admin modal/drawer surfaces.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/hooks/useAdminNavigationLayoutDialogAccessibility.ts)

import { useEffect, type RefObject } from 'react';
import type { AdminNavigationLayoutDialogAccessibilityOptions } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutTypes';


/**
 * Keeps modal/drawer focus inside the active dialog, restores focus to the trigger,
 * closes on Escape, and locks background scrolling while the dialog is open.
 * This utility owns accessibility plumbing only; business state remains in the feature.
 */
export function useAdminNavigationLayoutDialogAccessibility({
  isOpen,
  containerRef,
  onClose,
}: AdminNavigationLayoutDialogAccessibilityOptions): void {
// EFFECT: Manages dialog focus, Escape handling, and body scroll locking for the active Admin modal/drawer.
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
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus && document.contains(previousFocus)) previousFocus.focus();
    };
  }, [containerRef, isOpen, onClose]);
}
