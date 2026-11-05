// RESPONSIBILITY: Composes the authenticated Manager shell, including the fixed header, responsive sidebar, permission boundary, and global keyboard command surface.
'use client';


import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

import { useTranslations } from 'next-intl';

import ManagerInfrastructurePermissionGate from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructurePermissionGate';
import ManagerInfrastructureNavigationDestinationsProvider from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureNavigationDestinationsProvider';

import ManagerNavigationBreadcrumb from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationBreadcrumb';
import ManagerNavigationCommandPalette from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationCommandPalette';
import ManagerNavigationHeader from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationHeader';
import ManagerNavigationSidebar from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationSidebar';
import { MANAGER_NAV_GROUPS } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationConfig';
import { MANAGER_NAVIGATION_DESTINATIONS } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationDestinations';
import { MANAGER_HEADER_NAVIGATION } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationHeaderNavigationConfig';
import type { ManagerNavigationLayoutProps } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationLayoutPropsTypes';
import type { ManagerNavigationHeaderProps } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationLayoutTypes';

/**
 * @description Composes the fixed Manager header, responsive sidebar, permission boundary, and global keyboard command surface for authenticated Manager routes.
 * @dependencies ManagerNavigationHeader, ManagerNavigationSidebar, ManagerNavigationCommandPalette, ManagerInfrastructurePermissionGate, and Manager navigation configuration.
 * @edge-case Preserves the collapsed sidebar state across route renders and falls back to the Manager shell title when a route is not present in the role navigation map.
 */
export default function ManagerNavigationLayout({ children }: ManagerNavigationLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCommandPaletteRequested, setIsCommandPaletteRequested] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('MANAGER_SHELL');

  const currentPage = useMemo(() => {
    const navigationItems = MANAGER_NAV_GROUPS.flatMap((group) => group.items);
    return navigationItems.find((item) => pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`)));
  }, [pathname]);

  const headerProps = useMemo<ManagerNavigationHeaderProps>(() => ({
    title: currentPage ? t(currentPage.labelKey) : t('NAV_DASHBOARD'),
    subtitle: currentPage ? t('TEXT_MANAGER_PORTAL_CONTEXT') : undefined,
  }), [currentPage, t]);

  // Keep profile/settings/scanner routes usable even though they are intentionally outside the primary sidebar inventory.
  const shellFallbackTitle = useMemo(() => {
    if (pathname === MANAGER_HEADER_NAVIGATION.notifications) return t('NAV_NOTIFICATIONS');
    if (pathname === MANAGER_HEADER_NAVIGATION.profile) return t('COPY_MY_PROFILE');
    if (pathname === MANAGER_HEADER_NAVIGATION.settings) return t('COPY_SETTINGS');
    return null;
  }, [pathname, t]);

  const resolvedHeaderTitle = shellFallbackTitle ?? headerProps.title;
  const resolvedHeaderSubtitle = shellFallbackTitle ? undefined : headerProps.subtitle;
  const handleOpenCommandPalette = () => setIsCommandPaletteRequested(true);

  return (
    <ManagerInfrastructurePermissionGate capability="manager.access">
      <div className="min-h-screen bg-page text-text-primary">
        <ManagerNavigationHeader data-testid="manager_navigation-managerlayout-managerheader-1"
          title={resolvedHeaderTitle}
          subtitle={resolvedHeaderSubtitle}
          onOpenCommandPalette={handleOpenCommandPalette}
        />
        <ManagerNavigationSidebar data-testid="manager_navigation-managerlayout-managersidebar-2" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <ManagerNavigationCommandPalette data-testid="manager_navigation-managerlayout-managercommandpalette-3" requestedOpen={isCommandPaletteRequested} onRequestedOpenHandled={() => setIsCommandPaletteRequested(false)} />
        <ManagerInfrastructureNavigationDestinationsProvider destinations={MANAGER_NAVIGATION_DESTINATIONS}>
          <main className={`min-h-screen pt-16 motion-safe:transition-all motion-safe:duration-300 ml-0 ${isCollapsed ? 'md:ml-16' : 'md:ml-64'}`}>
            <div className="px-4 py-4 md:px-6">
              <ManagerNavigationBreadcrumb />
              {children}
            </div>
          </main>
        </ManagerInfrastructureNavigationDestinationsProvider>
      </div>
    </ManagerInfrastructurePermissionGate>
  );
}
