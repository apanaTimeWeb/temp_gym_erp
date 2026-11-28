"use client";
// RESPONSIBILITY: Renders the Admin 8-group / 13-domain sidebar hierarchy with Trainer-matched jewel neon icon badges and accessible grouping.

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ADMIN_NAV_GROUPS } from '@/app/frontend_admin/admin_navigation/config/admin_navigation_shell.url_config';
import {
  ADMIN_NAV_GROUP_COLORS,
  ADMIN_NAV_ITEM_COLORS,
  DEFAULT_ADMIN_NAV_COLOR,
} from '@/app/frontend_admin/admin_navigation/config/AdminNavigationSidebarColors';
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

  const showLabel = !isCollapsed || isMobileOpen;

  return (
    <nav
      className={`flex-1 overflow-y-auto py-3.5 ${showLabel ? 'px-2.5 space-y-3.5' : 'px-1.5 space-y-2.5'} trainer-shell-scrollbar`}
      aria-label={t('admin_navigation.AdminNavigationLayoutSidebar.text_sidebarLabel')}
    >
      {filteredNavGroups.length === 0 ? (
        <div className="text-center py-4 text-sm text-slate-400">
          {t('admin_navigation.AdminNavigationLayoutSidebar.text_a68d28f1ee')}
        </div>
      ) : (
        filteredNavGroups.map((group, groupIndex) => {
          const groupLabel = t(`admin_navigation.AdminNavigation.groups.${group.groupKey}`);
          const groupLabelId = `admin-navigation-sidebar-group-label-${group.groupKey}`;
          const groupColor = ADMIN_NAV_GROUP_COLORS[group.groupKey] ?? DEFAULT_ADMIN_NAV_COLOR;

          return (
            <div
              key={group.groupKey}
              role="group"
              aria-label={groupLabel}
              aria-labelledby={groupLabelId}
              data-testid={`admin_navigation-admin-sidebar-group-${group.groupKey}`}
              className={groupIndex > 0 ? 'border-t border-border pt-3 border-white/[0.08]' : undefined}
            >
              <p
                id={groupLabelId}
                data-testid={`admin_navigation-admin-sidebar-group-label-${group.groupKey}`}
                style={showLabel ? { color: groupColor.iconColor } : undefined}
                className={`text-[11px] font-bold mb-2 px-2 uppercase tracking-wider truncate ${
                  showLabel ? 'block' : 'sr-only'
                }`}
              >
                {groupLabel}
              </p>
              <div className={showLabel ? 'space-y-1' : 'space-y-1.5 flex flex-col items-center'}>
                {group.items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;
                  const label = t(`admin_navigation.AdminNavigation.items.${item.labelKey}`);
                  const itemColor = ADMIN_NAV_ITEM_COLORS[item.labelKey] ?? groupColor;

                  return (
                    <Link
                      data-testid={`admin_navigation-admin-sidebar-navigate-${item.labelKey}`}
                      key={item.href}
                      href={item.href}
                      aria-label={label}
                      title={`${groupLabel} — ${label}`}
                      aria-current={active ? 'page' : undefined}
                      style={
                        active
                          ? {
                              borderColor: itemColor.iconColor,
                              background: `linear-gradient(90deg, ${itemColor.activeBg} 0%, ${itemColor.bg} 55%, transparent 100%)`,
                              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
                            }
                          : undefined
                      }
                      className={`group flex min-h-10 items-center rounded-xl text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all ${
                        showLabel
                          ? 'w-full gap-2.5 px-2.5 py-1.5 border-s-[3px]'
                          : 'w-11 h-11 justify-center px-0 border'
                      } ${
                        active
                          ? 'text-white font-semibold'
                          : 'border-transparent text-slate-300 hover:bg-white/[0.07] hover:text-white'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-lg inline-flex items-center justify-center shrink-0 motion-safe:transition-all motion-safe:duration-fast group-hover:scale-110 group-hover:brightness-125"
                        style={{
                          color: itemColor.iconColor,
                          backgroundColor: active ? itemColor.activeBg : itemColor.bg,
                          border: `1px solid ${itemColor.iconColor}${active ? '88' : '38'}`,
                          boxShadow: active ? itemColor.activeShadow : undefined,
                        }}
                        aria-hidden="true"
                      >
                        <Icon size={15} strokeWidth={2.2} />
                      </span>
                      {showLabel && (
                        <span className="truncate">{label}</span>
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
