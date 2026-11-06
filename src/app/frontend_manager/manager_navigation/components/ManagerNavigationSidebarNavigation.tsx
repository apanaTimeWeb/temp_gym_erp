// RESPONSIBILITY: Renders the accessible Manager sidebar destinations and expandable groups.
'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ManagerNavigationTranslatedGroup } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationConfigTypes';

type Props = {
  groups: ManagerNavigationTranslatedGroup[]; pathname: string; isCollapsed: boolean; isMobileOpen: boolean; searchQuery: string;
  expandedGroups: Record<string, boolean>; onToggleGroup: (groupKey: string, activeGroup?: boolean) => void;
};
export default function ManagerNavigationSidebarNavigation({ groups, pathname, isCollapsed, isMobileOpen, searchQuery, expandedGroups, onToggleGroup }: Props) {
  const t = useTranslations('MANAGER_SHELL');
  return (
    <>
        {/* Primary navigation: the 14 approved Manager domains appear as 14 top-level rows; multi-workflow domains expose sibling submodules. */}
        <nav aria-label={t('COPY_MANAGER_NAVIGATION')} className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {groups.length === 0 ? (
            <div className="text-center py-4 text-sm text-text-secondary" role="status">{t('COPY_NO_MATCHES_FOUND')}</div>
          ) : groups.map((group) => {
            const activeGroup = group.items.some((item) => pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`)));
            const expanded = Boolean(searchQuery.trim()) || (expandedGroups[group.groupKey] ?? activeGroup);
            const showLabel = !isCollapsed || isMobileOpen;
            const groupIcon = group.items[0]?.icon;
            const GroupIcon = groupIcon;

            if (!group.collapsible) {
              const item = group.items[0];
              if (!item) return null;
              const active = pathname === (group.domainHref ?? item.href) || (group.domainHref ? pathname.startsWith(`${group.domainHref}/`) : (item.href !== '/' && pathname.startsWith(`${item.href}/`))) || pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
              const Icon = item.icon;
              return (
                <Link
                  key={group.groupKey}
                  data-testid={`manager_navigation-sidebar-link-${item.labelKey.toLowerCase()}`}
                  href={group.domainHref ?? item.href}
                  title={!showLabel ? item.translatedLabel : undefined}
                  aria-label={item.translatedLabel}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-11 items-center gap-3 rounded-xl border-l-2 py-2.5 font-medium motion-safe:transition-colors ${!showLabel ? 'justify-center px-0' : 'px-3.5'} ${active ? 'bg-primary-subtle text-primary border-border-focus' : 'border-transparent text-text-secondary hover:bg-primary-subtle hover:text-primary'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
                >
                  <Icon size={18} aria-hidden="true" className={active ? 'text-primary' : 'text-text-secondary group-hover:text-primary'} />
                  {showLabel && <span className={`text-sm whitespace-nowrap ${isMobileOpen ? 'inline' : (!isCollapsed ? 'hidden md:inline' : 'hidden')}`}>{item.translatedLabel}</span>}
                </Link>
              );
            }

            return (
              <section key={group.groupKey} className="space-y-1">
                <div className={`flex min-h-11 w-full items-center rounded-xl ${activeGroup ? 'bg-primary-subtle text-primary' : 'text-text-secondary hover:bg-surface-hover hover:text-primary'}`}>
                  <Link
                    href={group.domainHref ?? group.items[0]?.href ?? '/frontend_manager/manager_dashboard'}
                    title={!showLabel ? group.translatedGroup : undefined}
                    aria-label={group.translatedGroup}
                    aria-current={activeGroup ? 'page' : undefined}
                    data-testid={`manager_navigation-sidebar-domain-${group.groupKey.toLowerCase()}`}
                    className={`flex min-w-0 flex-1 items-center gap-3 rounded-l-xl py-2.5 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset ${!showLabel ? 'justify-center px-0' : 'px-3.5'}`}
                  >
                    {GroupIcon && <GroupIcon size={18} aria-hidden="true" />}
                    {showLabel && <span className={`min-w-0 flex-1 truncate text-sm ${isMobileOpen ? 'inline' : (!isCollapsed ? 'hidden md:inline' : 'hidden')}`}>{group.translatedGroup}</span>}
                  </Link>
                  <button
                    type="button"
                    aria-label={`${group.translatedGroup} navigation submenu`}
                    aria-expanded={expanded}
                    aria-controls={`manager-nav-group-${group.groupKey}`}
                    data-testid={`manager_navigation-sidebar-group-${group.groupKey.toLowerCase()}`}
                    onClick={() => onToggleGroup(group.groupKey, activeGroup)}
                    className={`shrink-0 rounded-r-xl px-3 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset ${showLabel ? '' : 'px-1'}`}
                  >
                    <ChevronDown aria-hidden="true" size={16} className={`motion-safe:transition-transform ${expanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                <div id={`manager-nav-group-${group.groupKey}`} hidden={!expanded} className={`space-y-1 ${showLabel ? 'ml-3 border-l border-border pl-2' : 'pl-1'}`}>
                    {group.items.map((item) => {
                      const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          data-testid={`manager_navigation-sidebar-link-${item.labelKey.toLowerCase()}`}
                          href={item.href}
                          title={!showLabel ? item.translatedLabel : undefined}
                          aria-label={item.translatedLabel}
                          aria-current={active ? 'page' : undefined}
                          className={`flex min-h-11 items-center gap-3 rounded-lg border-l-2 py-2.5 font-medium motion-safe:transition-colors ${!showLabel ? 'justify-center px-0' : 'px-3'} ${active ? 'bg-primary-subtle text-primary border-border-focus' : 'border-transparent text-text-secondary hover:bg-primary-subtle hover:text-primary'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page`}
                        >
                          <Icon size={18} aria-hidden="true" />
                          {showLabel && <span className={`text-sm whitespace-nowrap ${isMobileOpen ? 'inline' : (!isCollapsed ? 'hidden md:inline' : 'hidden')}`}>{item.translatedLabel}</span>}
                        </Link>
                      );
                    })}
                </div>
              </section>
            );
          })}
        </nav>
    </>
  );
}
