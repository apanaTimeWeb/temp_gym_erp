// RESPONSIBILITY: Renders the accessible Manager sidebar destinations and expandable groups with Trainer-matching jewel badges.
'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  DEFAULT_MANAGER_NAV_COLOR,
  MANAGER_NAV_GROUP_COLORS,
  MANAGER_NAV_ITEM_COLORS,
} from '@/app/frontend_manager/manager_navigation/config/ManagerNavigationSidebarColors';
import type { ManagerNavigationTranslatedGroup } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationConfigTypes';

type Props = {
  groups: ManagerNavigationTranslatedGroup[];
  pathname: string;
  isCollapsed: boolean;
  isMobileOpen: boolean;
  searchQuery: string;
  expandedGroups: Record<string, boolean>;
  onToggleGroup: (groupKey: string, activeGroup?: boolean) => void;
  onNavigate?: () => void;
};

export default function ManagerNavigationSidebarNavigation({
  groups,
  pathname,
  isCollapsed,
  isMobileOpen,
  searchQuery,
  expandedGroups,
  onToggleGroup,
  onNavigate,
}: Props) {
  const t = useTranslations('MANAGER_SHELL');
  const showLabel = !isCollapsed || isMobileOpen;

  return (
    <nav
      aria-label={t('COPY_MANAGER_NAVIGATION')}
      className={`flex-1 overflow-y-auto py-3.5 ${showLabel ? 'px-2.5 space-y-3' : 'px-1.5 space-y-2.5'} manager-shell-scrollbar`}
    >
      {groups.length === 0 ? (
        <div className="text-center py-4 text-sm text-slate-400" role="status">{t('COPY_NO_MATCHES_FOUND')}</div>
      ) : groups.map((group, groupIndex) => {
        const activeGroup = group.items.some((item) => {
          const itemPath = item.href.split('?')[0] || item.href;
          return pathname === itemPath || (itemPath !== '/' && pathname.startsWith(`${itemPath}/`));
        });
        const expanded = !showLabel ? true : (Boolean(searchQuery.trim()) || (expandedGroups[group.groupKey] ?? activeGroup));
        const GroupIcon = group.items[0]?.icon;
        const groupColor = MANAGER_NAV_GROUP_COLORS[group.groupKey] ?? DEFAULT_MANAGER_NAV_COLOR;

        if (!group.collapsible) {
          const item = group.items[0];
          if (!item) return null;
          const active = pathname === (group.domainHref ?? item.href)
            || (group.domainHref ? pathname.startsWith(`${group.domainHref}/`) : (item.href !== '/' && pathname.startsWith(`${item.href}/`)))
            || pathname === item.href
            || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
          const Icon = item.icon;
          const itemColor = MANAGER_NAV_ITEM_COLORS[item.labelKey] ?? groupColor;

          return (
            <div
              key={group.groupKey}
              className={groupIndex > 0 ? (showLabel ? 'pt-2.5 border-t border-white/[0.07]' : 'pt-2 border-t border-white/10') : ''}
            >
              <Link
                data-testid={`manager_navigation-sidebar-link-${item.labelKey.toLowerCase()}`}
                href={group.domainHref ?? item.href}
                title={item.translatedLabel}
                aria-label={item.translatedLabel}
                aria-current={active ? 'page' : undefined}
                onClick={onNavigate}
                style={
                  active
                    ? {
                        borderColor: itemColor.iconColor,
                        background: `linear-gradient(90deg, ${itemColor.activeBg} 0%, ${itemColor.bg} 55%, transparent 100%)`,
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
                      }
                    : undefined
                }
                className={`group flex min-h-10 items-center rounded-xl text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all ${
                  showLabel
                    ? 'w-full gap-2.5 px-2.5 py-1.5 border-s-[3px]'
                    : 'w-11 h-11 justify-center px-0 border mx-auto'
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
                {showLabel && <span className="truncate">{item.translatedLabel}</span>}
              </Link>
            </div>
          );
        }

        return (
          <section
            key={group.groupKey}
            className={groupIndex > 0 ? (showLabel ? 'pt-2.5 border-t border-white/[0.07] space-y-1.5' : 'pt-2 border-t border-white/10 space-y-1.5') : 'space-y-1.5'}
          >
            {showLabel && (
              <div className={`flex min-h-8 w-full items-center rounded-lg px-1 py-0.5 motion-safe:transition-colors ${activeGroup ? 'bg-white/[0.05]' : 'hover:bg-white/[0.05]'}`}>
                <Link
                  href={group.domainHref ?? group.items[0]?.href ?? '/frontend_manager/manager_dashboard'}
                  title={group.translatedGroup}
                  aria-label={group.translatedGroup}
                  aria-current={activeGroup ? 'page' : undefined}
                  data-testid={`manager_navigation-sidebar-domain-${group.groupKey.toLowerCase()}`}
                  onClick={onNavigate}
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-l-lg px-1.5 py-1 text-[11px] font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  {GroupIcon && (
                    <span
                      className="w-5 h-5 rounded-md inline-flex items-center justify-center shrink-0"
                      style={{
                        color: groupColor.iconColor,
                        backgroundColor: groupColor.bg,
                        border: `1px solid ${groupColor.iconColor}40`,
                        boxShadow: activeGroup ? groupColor.activeShadow : undefined,
                      }}
                      aria-hidden="true"
                    >
                      <GroupIcon size={12} strokeWidth={2.4} />
                    </span>
                  )}
                  <span className="min-w-0 flex-1 truncate" style={{ color: groupColor.iconColor }}>{group.translatedGroup}</span>
                </Link>
                <button
                  type="button"
                  aria-label={`${group.translatedGroup} navigation submenu`}
                  aria-expanded={expanded}
                  aria-controls={`manager-nav-group-${group.groupKey}`}
                  data-testid={`manager_navigation-sidebar-group-${group.groupKey.toLowerCase()}`}
                  onClick={() => onToggleGroup(group.groupKey, activeGroup)}
                  className="shrink-0 rounded-r-lg p-1.5 text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                >
                  <ChevronDown aria-hidden="true" size={14} strokeWidth={2.2} className={`motion-safe:transition-transform ${expanded ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}

            <div
              id={`manager-nav-group-${group.groupKey}`}
              hidden={!expanded}
              className={
                showLabel
                  ? 'space-y-1 ps-2 ms-1.5 border-s border-white/[0.08]'
                  : 'space-y-1.5 flex flex-col items-center'
              }
            >
              {group.items.map((item) => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`));
                const Icon = item.icon;
                const itemColor = MANAGER_NAV_ITEM_COLORS[item.labelKey] ?? groupColor;
                return (
                  <Link
                    key={item.href}
                    data-testid={`manager_navigation-sidebar-link-${item.labelKey.toLowerCase()}`}
                    href={item.href}
                    title={item.translatedLabel}
                    aria-label={item.translatedLabel}
                    aria-current={active ? 'page' : undefined}
                    onClick={onNavigate}
                    style={
                      active
                        ? {
                            borderColor: itemColor.iconColor,
                            background: `linear-gradient(90deg, ${itemColor.activeBg} 0%, ${itemColor.bg} 55%, transparent 100%)`,
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.25)',
                          }
                        : undefined
                    }
                    className={`group flex min-h-10 items-center rounded-xl text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all ${
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
                    {showLabel && <span className="truncate">{item.translatedLabel}</span>}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </nav>
  );
}
