// RESPONSIBILITY: Composes the authenticated Manager shell, matching Trainer shell offsets, tablet auto-collapse, aurora canvas, and keyboard command palette.
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { useTranslations } from 'next-intl';

import ManagerInfrastructurePermissionGate from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructurePermissionGate';
import ManagerInfrastructureNavigationDestinationsProvider from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureNavigationDestinationsProvider';

import '@/app/frontend_manager/manager_navigation/components/ManagerNavigationShell.css';
import ManagerNavigationCommandPalette from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationCommandPalette';
import ManagerNavigationHeader from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationHeader';
import ManagerNavigationSidebar from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationSidebar';
import { MANAGER_NAV_GROUPS } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationConfig';
import { MANAGER_NAVIGATION_DESTINATIONS } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationDestinations';
import { MANAGER_HEADER_NAVIGATION } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationHeaderNavigationConfig';
import type { ManagerNavigationLayoutProps } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationLayoutPropsTypes';
import type { ManagerNavigationHeaderProps } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationLayoutTypes';

export default function ManagerNavigationLayout({ children }: ManagerNavigationLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isCommandPaletteRequested, setIsCommandPaletteRequested] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('MANAGER_SHELL');

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

  const currentPage = useMemo(() => {
    const navigationItems = MANAGER_NAV_GROUPS.flatMap((group) => group.items);
    return navigationItems.find((item) => pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`)));
  }, [pathname]);

  const headerProps = useMemo<ManagerNavigationHeaderProps>(() => ({
    title: currentPage ? t(currentPage.labelKey) : t('NAV_DASHBOARD'),
    subtitle: currentPage ? t('TEXT_MANAGER_PORTAL_CONTEXT') : undefined,
  }), [currentPage, t]);

  const shellFallbackTitle = useMemo(() => {
    if (pathname === MANAGER_HEADER_NAVIGATION.notifications || pathname.includes('/notifications_inbox')) return t('NAV_NOTIFICATIONS');
    if (pathname === MANAGER_HEADER_NAVIGATION.profile) return t('COPY_MY_PROFILE');
    if (pathname === MANAGER_HEADER_NAVIGATION.settings) return t('COPY_SETTINGS');
    if (pathname.includes('/store_point_of_sale')) return t('NAV_STORE_POS');
    if (pathname.includes('/store_order_management')) return t('NAV_STORE_ORDERS');
    if (pathname.includes('/store_products_catalog')) return t('NAV_STORE_PRODUCTS');
    return null;
  }, [pathname, t]);

  const resolvedHeaderTitle = shellFallbackTitle ?? headerProps.title;
  const resolvedHeaderSubtitle = shellFallbackTitle ? undefined : headerProps.subtitle;
  const handleOpenCommandPalette = () => setIsCommandPaletteRequested(true);

  const handleToggleSidebar = () => {
    if (isMobileViewport) {
      setIsMobileOpen((current) => !current);
      return;
    }
    setIsCollapsed((current) => !current);
  };

  return (
    <ManagerInfrastructurePermissionGate capability="manager.access">
      <div className="min-h-screen bg-page text-text-primary trainer-aurora-canvas">
        <a
          href="#manager-main-content"
          className="sr-only focus:not-sr-only focus:inline-flex focus:fixed focus:start-3 focus:top-3 focus:z-skip-link focus:min-h-11 focus:items-center focus:rounded-md focus:bg-primary focus:px-4 focus:font-semibold focus:text-on-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-page"
        >
          Skip to main content
        </a>
        <ManagerNavigationHeader
          data-testid="manager_navigation-managerlayout-managerheader-1"
          title={resolvedHeaderTitle}
          subtitle={resolvedHeaderSubtitle}
          branchName="Main Branch"
          isSidebarCollapsed={isCollapsed}
          isMobileSidebarOpen={isMobileOpen}
          isMobileViewport={isMobileViewport}
          onToggleSidebar={handleToggleSidebar}
          onOpenCommandPalette={handleOpenCommandPalette}
        />
        <ManagerNavigationSidebar
          data-testid="manager_navigation-managerlayout-managersidebar-2"
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <ManagerNavigationCommandPalette
          data-testid="manager_navigation-managerlayout-managercommandpalette-3"
          requestedOpen={isCommandPaletteRequested}
          onRequestedOpenHandled={() => setIsCommandPaletteRequested(false)}
        />
        <ManagerInfrastructureNavigationDestinationsProvider destinations={MANAGER_NAVIGATION_DESTINATIONS}>
          <main
            id="manager-main-content"
            tabIndex={-1}
            className={`min-h-screen min-w-0 overflow-x-hidden pt-16 manager-shell-scrollbar overflow-y-auto motion-safe:transition-all motion-safe:duration-base motion-reduce:transition-none ${isCollapsed ? 'manager-shell-content-offset-collapsed' : 'manager-shell-content-offset'}`}
          >
            {children}
          </main>
        </ManagerInfrastructureNavigationDestinationsProvider>
      </div>
    </ManagerInfrastructurePermissionGate>
  );
}
