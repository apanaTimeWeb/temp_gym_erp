"use client";
// RESPONSIBILITY: Renders the locked Admin v24 sidebar groups and their primary route destinations.
// DATA FLOW: ADMIN_NAV_GROUPS + localized group/item labels → accessible visual group sections → canonical feature routes.

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ADMIN_NAV_GROUPS } from '@/app/frontend_admin/admin_navigation/config/admin_navigation_shell.url_config';
import type { AdminNavigationLayoutSidebarNavigationProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutSidebarPropsTypes';

export default function AdminNavigationLayoutSidebarNavigation({
  isCollapsed,
  isMobileOpen,
  searchQuery,
}: AdminNavigationLayoutSidebarNavigationProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const filteredNavGroups = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
    if (!normalizedQuery) return ADMIN_NAV_GROUPS;

    return ADMIN_NAV_GROUPS
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          t(`admin_navigation.AdminNavigation.items.${item.labelKey}`)
            .toLocaleLowerCase()
            .includes(normalizedQuery),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery, t]);

  return (
    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4 custom-scrollbar">
      {filteredNavGroups.length === 0 ? (
        <div className="text-center py-4 text-sm text-secondary">
          {t('admin_navigation.AdminNavigationLayoutSidebar.text_a68d28f1ee')}
        </div>
      ) : (
        filteredNavGroups.map((group, groupIndex) => {
          const groupLabel = t(`admin_navigation.AdminNavigation.groups.${group.groupKey}`);
          const groupLabelId = `admin-navigation-sidebar-group-label-${group.groupKey}`;
          const showGroupLabel = !isCollapsed || isMobileOpen;

          return (
            <div
              key={group.groupKey}
              role="group"
              aria-label={groupLabel}
              aria-labelledby={groupLabelId}
              data-testid={`admin_navigation-admin-sidebar-group-${group.groupKey}`}
              className={groupIndex > 0 ? 'border-t border-border pt-3' : undefined}
            >
              <p
                id={groupLabelId}
                data-testid={`admin_navigation-admin-sidebar-group-label-${group.groupKey}`}
                className={`text-xs font-semibold text-secondary mb-2 px-2 uppercase tracking-wider ${
                  showGroupLabel
                    ? (isMobileOpen ? 'block' : 'hidden xl:block')
                    : 'sr-only'
                }`}
              >
                {groupLabel}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  const showLabel = !isCollapsed || isMobileOpen;
                  const label = t(`admin_navigation.AdminNavigation.items.${item.labelKey}`);

                  return (
                    <Link
                      data-testid={`admin_navigation-admin-sidebar-navigate-${item.labelKey}`}
                      key={item.href}
                      href={item.href}
                      aria-label={label}
                      title={`${groupLabel} — ${label}`}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center gap-3 py-2.5 rounded-xl font-medium motion-safe:transition-all motion-safe:duration-base group cursor-pointer justify-center px-0 xl:justify-start xl:px-3.5 ${
                        active
                          ? 'bg-primary-subtle text-primary border-l-2 border-focus'
                          : 'text-secondary hover:text-primary hover:bg-primary-subtle border-l-2 border-transparent'
                      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
                    >
                      <Icon
                        size={18}
                        strokeWidth={2}
                        aria-hidden="true"
                        className={active ? 'text-primary' : 'text-secondary group-hover:text-primary motion-safe:transition-colors'}
                      />
                      {showLabel && (
                        <span className={`text-sm whitespace-nowrap ${isMobileOpen ? 'inline' : 'hidden xl:inline'}`}>
                          {label}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </nav>
  );
}
