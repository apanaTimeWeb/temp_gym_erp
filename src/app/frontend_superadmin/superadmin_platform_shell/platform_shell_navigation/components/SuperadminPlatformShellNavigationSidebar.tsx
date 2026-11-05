// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellNavigationSidebar within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminPlatformShellNavigationSidebar owned by the SuperadminPlatformShellLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: useState, useEffect, useMemo, usePathname
 * MODULE DEPENDENCIES: next/image, next/link, next/navigation, react, lucide-react, next-intl, @/lib/api, @/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_config.constants, @/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/types/SuperadminPlatformShellLayoutTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the collapsible left navigation sidebar with nav items, user identity footer, and mobile drawer. No API calls.


import { useEffect, useMemo, useRef, useState } from 'react';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { getUser } from '@/lib/api';

import { SUPERADMIN_NAV_GROUPS } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_config.constants';

import type { SuperadminPlatformShellLayoutSidebarProps } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/types/superadmin_platform_shell_navigation.types';

/** @description Renders the Superadmin role navigation shell and its responsive collapsed state. @dependencies Consumes role-owned navigation configuration and approved UI primitives. @edge-case Keeps navigation keyboard accessible in both expanded and collapsed modes. */
export default function SuperadminPlatformShellNavigationSidebar({ isCollapsed, setIsCollapsed }: SuperadminPlatformShellLayoutSidebarProps) {
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const drawerCloseRef = useRef<HTMLButtonElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const drawerTriggerRef = useRef<HTMLElement | null>(null);
  const user = getUser();

  const focusDrawer = useMemo(() => {
    return (container: HTMLElement | null) => {
      if (!container) return;
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      focusable[0]?.focus();
    };
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileViewport(mobile);
      if (!mobile) setIsMobileOpen(false);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Sets mounted=true once on client-side hydration to safely read user data (avoids SSR mismatch).
  /* eslint-disable react-hooks/set-state-in-effect */
// EFFECT: Synchronizes this component effect with its declared React dependencies in SuperadminPlatformShellLayoutStyles/SuperadminPlatformShellNavigationMain/SuperadminPlatformShellNavigationSidebar.tsx.
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Listens for the global 'toggle-sidebar' event dispatched by SuperadminPlatformShellNavigationHeader's hamburger button.
  // On mobile (<768px) toggles the drawer; tablet/desktop toggle the collapsed icon-only mode..
// EFFECT: Synchronizes this component effect with its declared React dependencies in SuperadminPlatformShellLayoutStyles/SuperadminPlatformShellNavigationMain/SuperadminPlatformShellNavigationSidebar.tsx.
  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 768) {
        drawerTriggerRef.current = document.getElementById('superadmin-sidebar-toggle');
        setIsMobileOpen(v => !v);
      } else {
        setIsCollapsed(!isCollapsed);
      }
    };
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, [isCollapsed, setIsCollapsed]);

// EFFECT: Synchronizes the component state/effect side effect with its declared dependencies and cleans up the subscription or listener when the owner unmounts or dependencies change.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (!isMobileOpen) {
      document.body.style.overflow = previousOverflow;
      drawerTriggerRef.current?.focus();
      return;
    }
    document.body.style.overflow = 'hidden';
    focusDrawer(drawerCloseRef.current?.closest('aside') ?? null);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const aside = drawerCloseRef.current?.closest('aside');
      if (!aside) return;
      const focusable = Array.from(aside.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && active === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusDrawer, isMobileOpen]);

  // Closes the mobile drawer whenever the route changes (user navigated to a new page).
  /* eslint-disable react-hooks/set-state-in-effect */
// EFFECT: Synchronizes this component effect with its declared React dependencies in SuperadminPlatformShellLayoutStyles/SuperadminPlatformShellNavigationMain/SuperadminPlatformShellNavigationSidebar.tsx.
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Filter groups based on search query
  const filteredNavGroups = useMemo(() => {
    if (!searchQuery.trim()) return SUPERADMIN_NAV_GROUPS;
    const lowerQuery = searchQuery.toLowerCase();
    
    return SUPERADMIN_NAV_GROUPS
      .map(group => ({
        ...group,
        items: group.items.filter(item => t(item.labelKey).toLowerCase().includes(lowerQuery))
      }))
      .filter(group => group.items.length > 0);
  }, [searchQuery, t]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-overlay backdrop-blur-sm z-10 lg:hidden motion-safe:transition-opacity motion-safe:duration-base"
          onClick={() => setIsMobileOpen(false)}
         data-testid="superadmin_platform_shell_layout-superadminsidebar-interaction-layer-1"/>
      )}

      <aside aria-hidden={isMobileViewport && !isMobileOpen} inert={isMobileViewport && !isMobileOpen ? true : undefined} className={`fixed start-0 top-16 bottom-0 bg-sidebar border-e border-border z-20 flex flex-col motion-safe:transition-all motion-safe:duration-slow w-60 ${
        isCollapsed ? 'md:w-15' : 'md:w-60'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`} aria-label={t('ui.superadmin_sidebar_label')}>

        {isMobileOpen && (
          <div className="flex items-center justify-end border-b border-border px-4 py-2 md:hidden">
            <button ref={drawerCloseRef} type="button" onClick={() => setIsMobileOpen(false)} aria-label={t('ui.close_sidebar')} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-secondary hover:text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="SuperadminPlatformShellLayoutStyles-superadmin-sidebar-superadmin-sidebar-close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
        )}

        {/* Logo & Toggle */}
        <div className="flex items-center justify-center px-4 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <Image src="/logo.png" alt={t('ui.gymsmart_admin_2b8e9f13')} width={44} height={44} className="object-contain min-w-11 rounded-lg" />
            {(!isCollapsed || isMobileOpen) && (
              <div className="whitespace-nowrap motion-safe:transition-opacity motion-safe:duration-slow flex flex-col">
                <span className="text-primary font-bold text-lg leading-tight tracking-tight">{t('ui.gymsmart_8e4d6efe')}</span>
                <span className="text-xs text-warning font-bold uppercase tracking-wider -mt-0.5">{t('ui.admin_system_100f28d6')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Box */}
        {(!isCollapsed || isMobileOpen) && (
          <div className={`px-4 py-3 ${isMobileOpen ? 'block' : 'hidden md:block'} border-b border-border shrink-0`}>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                <Search size={18} className="text-secondary" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                aria-label={t('ui.search_menu_97ecae35')}
                placeholder={t('ui.search_menu_97ecae35')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full ps-9 pe-3 py-2 min-h-11 border border-border rounded-lg leading-5 bg-input text-primary placeholder-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-focus sm:text-sm motion-safe:transition-colors motion-safe:duration-base"
               data-testid="SuperadminPlatformShellLayoutStyles-superadmin-sidebar-layout-superadmin-sidebar-text"/>
            </div>
          </div>
        )}
        
        {isCollapsed && !isMobileOpen && (
          <div className="hidden xl:flex items-center justify-center px-4 py-3 border-b border-border shrink-0">
            <button type="button"
              onClick={() => setIsCollapsed(false)}
              aria-label={t('ui.search_menu_898fbc2a')}
              className="min-h-11 min-w-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base"
             data-testid="SuperadminPlatformShellLayoutStyles-superadmin-sidebar-superadmin-sidebar-search-menu">
              <Search size={18} />
            </button>
          </div>
        )}

        {!isMobileOpen && (
          <div className="hidden md:flex xl:hidden items-center justify-center px-4 py-3 border-b border-border shrink-0">
            <button type="button" onClick={() => { setSearchQuery(''); setIsCollapsed(false); window.requestAnimationFrame(() => searchInputRef.current?.focus()); }} aria-label={t('ui.search_menu_898fbc2a')} className="min-h-11 min-w-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="SuperadminPlatformShellLayoutStyles-superadmin-sidebar-superadmin-sidebar-tablet-search">
              <Search size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4 custom-scrollbar">
          {filteredNavGroups.length === 0 ? (
            <div className="text-center py-4 text-sm text-secondary">
              {t('ui.no_matches_found_d132286c')}</div>
          ) : (
            filteredNavGroups.map((group) => (
              <div key={group.labelKey}>
                {group.items.length > 1 && (!isCollapsed || isMobileOpen) && (
                  <p className={`${isMobileOpen ? 'block' : 'hidden md:block'} text-xs font-semibold text-disabled mb-2 px-2 uppercase tracking-wider`}>
                    {t(group.labelKey)}
                  </p>
                )}
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    const Icon = item.icon;
                    const showLabel = !isCollapsed || isMobileOpen;
                    const labelVisibilityClass = (() => { if (isMobileOpen) { return ('inline'); } if (!isCollapsed) { return ('hidden md:inline'); } return ('hidden'); })();

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={!showLabel ? t(item.labelKey) : ''}
                        className={`flex items-center gap-3 py-2.5 rounded-xl font-medium motion-safe:transition-all motion-safe:duration-base group cursor-pointer ${
                          !showLabel ? 'justify-center px-0' : 'px-3.5'
                        } ${
                          active
                            ? 'bg-primary-subtle text-primary border-s-2 border-focus'
                            : 'text-secondary hover:text-primary hover:bg-primary-subtle border-s-2 border-transparent'
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11`}
                        
                       aria-current={active ? 'page' : undefined}
                       data-testid={`SuperadminPlatformShellLayoutStyles-superadmin-sidebar-link-${item.href.replace(/[^a-zA-Z0-9_-]/g, '-')}`}>
                        <Icon size={18} className={active ? 'text-primary' : 'text-secondary group-hover:text-primary motion-safe:transition-colors'} />
                        {showLabel && <span className={`text-sm whitespace-nowrap ${labelVisibilityClass}`}>{t(item.labelKey)}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </nav>

        {/* User */}
        <div className={`px-4 py-4 border-t border-border bg-header shrink-0 flex items-center ${(() => { if (isMobileOpen) { return ('gap-3'); } if (!isCollapsed) { return ('justify-center md:justify-start md:gap-3'); } return ('justify-center'); })()}`}>
          <div className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center text-on-primary text-sm font-bold border border-border bg-primary">
            {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'A') : 'A'}
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className={`${isMobileOpen ? 'block' : 'hidden md:block'} whitespace-nowrap overflow-hidden flex-1`}>
              <div className="text-primary text-sm font-bold truncate">{mounted ? (user?.name || t('ui.superadmin_user')) : t('ui.superadmin_user')}</div>
              <div className="text-secondary text-xs truncate">{mounted ? (user?.role || t('ui.superadmin_role')) : t('ui.superadmin_role')}</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
