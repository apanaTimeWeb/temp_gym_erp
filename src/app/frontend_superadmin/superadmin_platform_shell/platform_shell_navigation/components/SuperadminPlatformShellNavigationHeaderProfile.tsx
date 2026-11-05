// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellNavigationHeaderProfile within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminPlatformShellNavigationHeaderProfile owned by the SuperadminPlatformShellLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useState, useEffect
 * MODULE DEPENDENCIES: next/link, react, lucide-react, next-intl, @/lib/api, @/app/frontend_superadmin/superadmin_account/account_profile_overview/config/superadmin_account_profile_overview.url_config
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellNavigationHeaderProfile for the superadmin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.


import { useState, useRef, useEffect } from 'react';

import { LogOut, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { getUser, logout } from '@/lib/api';

import { SUPERADMIN_PLATFORM_SHELL_NAVIGATION_ROUTES as SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/config/superadmin_platform_shell_navigation.url_config';

/**
 * Responsibility: Renders the SuperadminPlatformShellNavigationHeaderProfile UI boundary for the owning Superadmin feature.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 * Invariants: Visual styling consumes approved semantic tokens and the component remains below the documented size ceiling.
 */
export function SuperadminPlatformShellNavigationHeaderProfile() {
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  const [showProfile, setShowProfile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = 'superadmin-profile-menu';
  const user = getUser();

  // eslint-disable-next-line react-hooks/set-state-in-effect
// EFFECT: Synchronizes this component effect with its declared React dependencies in SuperadminPlatformShellLayoutStyles/SuperadminPlatformShellNavigationMain/SuperadminPlatformShellNavigationHeaderProfile.tsx.
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!showProfile) return;
    const menu = profileRef.current?.querySelector<HTMLElement>('[role="menu"]');
    const getItems = () => Array.from(menu?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    getItems()[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      const items = getItems();
      if (event.key === 'Escape') { event.preventDefault(); setShowProfile(false); triggerRef.current?.focus(); return; }
      if (!items.length) return;
      const activeIndex = items.indexOf(document.activeElement as HTMLElement);
      let nextIndex: number | undefined;
      if (event.key === 'ArrowDown') nextIndex = (activeIndex + 1 + items.length) % items.length;
      else if (event.key === 'ArrowUp') nextIndex = (activeIndex - 1 + items.length) % items.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = items.length - 1;
      if (nextIndex !== undefined) { event.preventDefault(); items[nextIndex]?.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showProfile]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={profileRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setShowProfile(!showProfile)}
        className="min-h-11 min-w-11 w-9 h-9 rounded-full flex items-center justify-center text-on-primary text-sm font-bold cursor-pointer motion-safe:transition-transform motion-safe:hover:scale-105 border border-border bg-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        aria-label={t('ui.profile_menu_36eb56ac')}
        aria-haspopup="menu"
        aria-expanded={showProfile}
        aria-controls={menuId}
       data-testid="SuperadminPlatformShellLayoutStyles-superadmin-header-profile-header-profile-profile-menu">
        {mounted ? (user?.name?.charAt(0)?.toUpperCase() ?? 'A') : 'A'}
      </button>
      {showProfile && (
        <div id={menuId} role="menu" aria-label={t('ui.profile_menu_36eb56ac')} className="absolute end-0 mt-2 w-56 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30">
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-semibold text-primary">{mounted ? (user?.name ?? t('ui.superadmin_fallback_title')) : t('ui.superadmin_fallback_title')}</p>
            <p className="text-xs text-secondary">{mounted ? (user?.email ?? '') : ''}</p>
            {mounted && user?.role && <p className="text-xs text-warning bg-warning-bg inline-block px-1.5 rounded-md font-medium mt-0.5">{user.role}</p>}
          </div>
          <div className="py-1">
            <Link href={SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.PROFILE} role="menuitem" className="flex min-h-11 items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" onClick={() => setShowProfile(false)} data-testid="SuperadminPlatformShellLayoutStyles-superadmin-header-profile-header-profile-my-profile">
              <User size={18} /> {t('ui.my_profile_e8956174')}</Link>
          </div>
          <div className="border-t border-border py-1">
            <button type="button" role="menuitem" className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-bg font-medium motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" onClick={() => { setShowProfile(false); logout(); }} data-testid="SuperadminPlatformShellLayoutStyles-superadmin-header-profile-header-profile-log-out">
              <LogOut size={18} /> {t('ui.log_out_4394c8d8')}</button>
          </div>
        </div>
      )}
    </div>
  );
}
