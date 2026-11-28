// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellNavigationMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Root Superadmin shell. Owns only sidebar collapse, persistent header, global Superadmin feedback, and shell-level alerts.
import { Suspense, useEffect, useState } from 'react';

import SuperadminPlatformShellNavigationHeader from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationHeader';
import SuperadminPlatformShellNavigationSidebar from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationSidebar';
import { SuperadminPlatformShellNavigationTopLoader } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationTopLoader';

import type { SuperadminPlatformShellLayoutProps } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/types/superadmin_platform_shell_navigation_main_props.types';

/** @description Provides the authenticated Superadmin shell composition around role-owned feature content matching Trainer shell geometry and Obsidian Aurora canvas. @dependencies Uses role layout infrastructure and zero-business UI primitives only. @edge-case Preserves responsive sidebar/header behavior across collapsed, tablet, and mobile states. */
export default function SuperadminPlatformShellNavigationMain({ children }: SuperadminPlatformShellLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const tabletQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(min-width: 768px) and (max-width: 1023px)') : null;
    const mobileQuery = typeof window.matchMedia === 'function' ? window.matchMedia('(max-width: 767px)') : null;

    const syncViewport = () => {
      const isMobile = mobileQuery ? mobileQuery.matches : window.innerWidth < 768;
      const isTablet = tabletQuery ? tabletQuery.matches : (window.innerWidth >= 768 && window.innerWidth < 1024);
      setIsMobileViewport(isMobile);
      if (!isMobile) setIsMobileOpen(false);
      if (isTablet) setIsCollapsed(true);
    };

    syncViewport();
    const handleTabletChange = (event: MediaQueryListEvent) => {
      setIsCollapsed(event.matches);
    };

    if (mobileQuery) mobileQuery.addEventListener('change', syncViewport);
    if (tabletQuery) tabletQuery.addEventListener('change', handleTabletChange);
    return () => {
      if (mobileQuery) mobileQuery.removeEventListener('change', syncViewport);
      if (tabletQuery) tabletQuery.removeEventListener('change', handleTabletChange);
    };
  }, []);

  const handleToggleSidebar = () => {
    if (isMobileViewport) {
      setIsMobileOpen((current) => !current);
      return;
    }
    setIsCollapsed((current) => !current);
  };

  return (
    <>
      <SuperadminPlatformShellNavigationTopLoader />
      <div className="min-h-screen bg-page text-text-primary superadmin-aurora-canvas">
        <a
          href="#superadmin-main-content"
          className="sr-only focus:not-sr-only focus:inline-flex focus:fixed focus:start-3 focus:top-3 focus:z-skip-link focus:min-h-11 focus:items-center focus:rounded-md focus:bg-primary focus:px-4 focus:font-semibold focus:text-on-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-page"
        >
          Skip to main content
        </a>
        <Suspense fallback={<div className="h-16 border-b border-orange-500/25 bg-[#0B0F19]" />}>
          <SuperadminPlatformShellNavigationHeader
            isSidebarCollapsed={isCollapsed}
            isMobileSidebarOpen={isMobileOpen}
            isMobileViewport={isMobileViewport}
            onToggleSidebar={handleToggleSidebar}
          />
        </Suspense>
        <Suspense fallback={<aside className="fixed inset-y-0 start-0 z-40 hidden md:block w-60 border-e border-orange-500/20 bg-[#090D16]" />}>
          <SuperadminPlatformShellNavigationSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
          />
        </Suspense>
        <main
          id="superadmin-main-content"
          tabIndex={-1}
          className={`min-h-screen min-w-0 overflow-x-hidden pt-16 superadmin-shell-scrollbar overflow-y-auto motion-safe:transition-all motion-safe:duration-base motion-reduce:transition-none ${
            isCollapsed ? 'superadmin-shell-content-offset-collapsed' : 'superadmin-shell-content-offset'
          }`}
        >
          <div className="p-4 sm:p-6 min-w-0">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
