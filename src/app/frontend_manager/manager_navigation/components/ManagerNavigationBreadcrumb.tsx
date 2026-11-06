// RESPONSIBILITY: Renders the authenticated Manager route breadcrumb using role-owned navigation labels; it does not own business data or navigation configuration.
'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { MANAGER_DEFAULT_HOME, MANAGER_NAV_GROUPS } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationConfig';

/**
 * @description Renders a compact accessible breadcrumb for the active Manager route.
 * @dependencies Manager navigation configuration and next-intl.
 * @edge-case Falls back to the Dashboard label when the current pathname is outside the documented Manager navigation map.
 */
export default function ManagerNavigationBreadcrumb() {
  const pathname = usePathname();
  const t = useTranslations('MANAGER_SHELL');
  const navigationItems = MANAGER_NAV_GROUPS.flatMap((group) => group.items);
  const currentPage = navigationItems.find((item) => pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`)));
  const dashboard = navigationItems.find((item) => item.labelKey === 'NAV_DOMAIN_DASHBOARD' || item.labelKey === 'NAV_DASHBOARD');

  const pageLabel = currentPage && currentPage.labelKey !== 'NAV_DOMAIN_DASHBOARD' && currentPage.labelKey !== 'NAV_DASHBOARD'
    ? t(currentPage.labelKey)
    : pathname.includes('/store_point_of_sale')
    ? t('NAV_STORE_POS')
    : pathname.includes('/store_order_management')
    ? t('NAV_STORE_ORDERS')
    : pathname.includes('/store_products_catalog')
    ? t('NAV_STORE_PRODUCTS')
    : pathname.includes('/notifications_inbox')
    ? t('NAV_NOTIFICATIONS')
    : null;

  return (
    <nav aria-label={t('BREADCRUMB_LABEL')} className="mb-4 flex min-h-11 items-center" data-testid="manager-components-breadcrumb">
      <ol className="flex min-w-0 items-center gap-1 text-sm text-text-secondary">
        <li className="shrink-0">
          <span data-testid="manager-components-breadcrumb-dashboard-link">
            <Link
              href={dashboard?.href ?? MANAGER_DEFAULT_HOME}
              className="inline-flex min-h-11 items-center rounded-md px-2 text-text-secondary hover:text-primary motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            >
              {t('NAV_DASHBOARD')}
            </Link>
          </span>
        </li>
        {pageLabel ? (
          <>
            <li aria-hidden="true" className="shrink-0 text-text-disabled"><ChevronRight size={18} strokeWidth={2} /></li>
            <li aria-current="page" className="min-w-0 truncate px-2 text-text-primary">{pageLabel}</li>
          </>
        ) : null}
      </ol>
    </nav>
  );
}
