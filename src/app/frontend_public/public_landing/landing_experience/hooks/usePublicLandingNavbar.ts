'use client';
// RESPONSIBILITY: Owns public navigation scroll state plus mobile-drawer keyboard, focus, and scroll-lock lifecycle.
// DATA FLOW: Browser scroll/menu events → hook state → PublicLandingNavbar presentation.
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { PublicLandingNavbarController } from '@/app/frontend_public/public_landing/landing_experience/types/PublicLandingExperienceTypes';

function getFocusablePublicLandingElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'));
}

/**
 * Keeps the PublicLanding mobile navigation isolated from page-section state.
 * @dependencies Browser scroll events and DOM focus APIs.
 * @edge-cases Escape, backdrop close, focus trapping, focus restoration, and body-scroll restoration must all remain reversible.
 */
export function usePublicLandingNavbar(): PublicLandingNavbarController {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const menuTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleToggleMenu = useCallback(() => {
    setMenuOpen((current) => !current);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusFirstControl = () => {
      const firstFocusable = menuPanelRef.current ? getFocusablePublicLandingElements(menuPanelRef.current)[0] : undefined;
      firstFocusable?.focus();
    };
    const focusTimer = window.setTimeout(focusFirstControl, 0);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      const focusTarget = previouslyFocused?.isConnected ? previouslyFocused : menuTriggerRef.current;
      focusTarget?.focus();
    };
  }, [menuOpen]);

  const handleMenuKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      handleCloseMenu();
      return;
    }
    if (event.key !== 'Tab' || !menuPanelRef.current) return;
    const focusable = getFocusablePublicLandingElements(menuPanelRef.current);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }, [handleCloseMenu]);

  return { menuOpen, scrolled, menuPanelRef, menuTriggerRef, handleCloseMenu, handleToggleMenu, handleMenuKeyDown };
}
