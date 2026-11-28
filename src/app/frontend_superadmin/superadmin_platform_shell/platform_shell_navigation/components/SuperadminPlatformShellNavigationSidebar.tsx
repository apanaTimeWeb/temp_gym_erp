// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellNavigationSidebar within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the collapsible left navigation sidebar matching Trainer Obsidian Aurora UI with jewel icons, search, collapsible groups, and mobile drawer. No API calls.

import { useEffect, useMemo, useRef, useState } from 'react';

import { ChevronDown, LayoutDashboard, Menu, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SuperadminPlatformShellNavigationBrandIcon from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationBrandIcon';
import {
  DEFAULT_SUPERADMIN_NAV_COLOR,
  SUPERADMIN_NAV_GROUP_COLORS,
  SUPERADMIN_NAV_ITEM_COLORS,
} from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationSidebarColors';
import '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationSidebar.css';
import { SUPERADMIN_NAV_GROUPS } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_config.constants';
import { SUPERADMIN_PLATFORM_SHELL_NAVIGATION_ROUTES } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/config/superadmin_platform_shell_navigation.url_config';

import type { SuperadminPlatformShellLayoutSidebarProps } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/types/superadmin_platform_shell_navigation.types';

/** @description Renders the Superadmin role navigation shell and its responsive collapsed/mobile drawer states matching Trainer UI. @dependencies Consumes role-owned navigation configuration and approved UI primitives. @edge-case Keeps navigation keyboard accessible in both expanded and collapsed modes. */
export default function SuperadminPlatformShellNavigationSidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen: controlledMobileOpen,
  setIsMobileOpen: controlledSetMobileOpen,
}: SuperadminPlatformShellLayoutSidebarProps) {
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  const pathname = usePathname();
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const isMobileOpen = controlledMobileOpen ?? internalMobileOpen;
  const setIsMobileOpen = controlledSetMobileOpen ?? setInternalMobileOpen;

  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const sidebarRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const updateViewport = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileViewport(mobile);
      if (!mobile) setIsMobileOpen(false);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, [setIsMobileOpen]);

  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 768) {
        setIsMobileOpen(!isMobileOpen);
      } else {
        setIsCollapsed(!isCollapsed);
      }
    };
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, [isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen]);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (isMobileOpen) setIsMobileOpen(false);
    }
  }, [pathname, isMobileOpen, setIsMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const first = sidebarRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])');
    first?.focus();
    document.body.classList.add('overflow-hidden');

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileOpen(false);
        document.getElementById('superadmin-sidebar-toggle')?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = sidebarRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])');
      if (!focusable?.length) return;
      const firstFocusable = focusable[0]!;
      const lastFocusable = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overflow-hidden');
      previouslyFocused?.focus();
    };
  }, [isMobileOpen, setIsMobileOpen]);

  const filteredNavGroups = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return SUPERADMIN_NAV_GROUPS;
    return SUPERADMIN_NAV_GROUPS
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => t(item.labelKey).toLowerCase().includes(normalized)),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery, t]);

  const gymBrandText = t('ui.gymsmart_8e4d6efe');
  const hasGymSmartSplit = gymBrandText === 'GymSmart';
  const showLabel = !isCollapsed || isMobileOpen;

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label={t('ui.close_sidebar')}
          className="superadmin-mobile-backdrop superadmin-mobile-backdrop-safe-area focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
          onClick={() => setIsMobileOpen(false)}
          data-testid="superadmin_platform_shell_layout-superadminsidebar-interaction-layer-1"
        />
      )}

      <aside
        ref={sidebarRef}
        id="superadmin-sidebar"
        role={isMobileOpen ? 'dialog' : undefined}
        aria-label={t('ui.superadmin_sidebar_label')}
        aria-modal={isMobileOpen || undefined}
        aria-hidden={isMobileViewport && !isMobileOpen ? true : undefined}
        className={`superadmin-sidebar superadmin-sidebar-safe-area motion-safe:transition-all motion-safe:duration-base ${
          isCollapsed ? 'superadmin-sidebar-collapsed' : ''
        } ${isMobileOpen ? 'superadmin-sidebar-open' : ''}`}
      >
        {/* Top Brand + Toggle Header matching Trainer Sidebar */}
        <div className="h-16 flex items-center gap-2.5 px-3 border-b border-white/10 bg-white/[0.02] shrink-0">
          <button
            type="button"
            onClick={isMobileOpen ? () => setIsMobileOpen(false) : () => setIsCollapsed(!isCollapsed)}
            aria-label={isMobileOpen ? t('ui.close_sidebar') : t('ui.toggle_sidebar_d4bbf74f')}
            className="min-w-9 min-h-9 w-9 h-9 inline-flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0 motion-safe:transition-all cursor-pointer"
            data-testid="SuperadminPlatformShellLayoutStyles-superadmin-sidebar-superadmin-sidebar-close"
          >
            {isMobileOpen ? <X size={18} strokeWidth={2} aria-hidden="true" /> : <Menu size={18} strokeWidth={2} aria-hidden="true" />}
          </button>

          {showLabel && (
            <Link
              href={SUPERADMIN_PLATFORM_SHELL_NAVIGATION_ROUTES.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.DASHBOARD}
              onClick={() => { if (typeof window !== 'undefined' && window.innerWidth < 768) setIsMobileOpen(false); }}
              className="flex items-center gap-2.5 min-w-0 flex-1 group no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-lg"
            >
              <span
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] border border-white/25 text-white flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(255,90,31,0.45)] motion-safe:transition-transform motion-safe:duration-base group-hover:scale-105"
                aria-hidden="true"
              >
                <SuperadminPlatformShellNavigationBrandIcon className="w-[19px] h-[19px]" />
              </span>
              <div className="whitespace-nowrap flex flex-col min-w-0 justify-center">
                <span className="flex items-center text-[17px] leading-none tracking-tight truncate">
                  {hasGymSmartSplit ? (
                    <>
                      <span className="text-white font-extrabold">Gym</span>
                      <span className="bg-gradient-to-r from-[#FF5A1F] via-[#EC4899] to-[#A78BFA] bg-clip-text text-transparent font-black">Smart</span>
                    </>
                  ) : (
                    <span className="text-white font-extrabold">{gymBrandText}</span>
                  )}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-orange-400 leading-none mt-1.5 truncate">
                  {t('ui.superadmin_role')}
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Search Input (Expanded) */}
        {showLabel && (
          <div className="px-3 py-3 border-b border-white/10 shrink-0">
            <label htmlFor="superadmin-sidebar-search" className="sr-only">{t('ui.search_menu_97ecae35')}</label>
            <div className="relative">
              <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-[#FF5A1F] pointer-events-none" aria-hidden="true" strokeWidth={2.2} />
              <input
                ref={searchInputRef}
                id="superadmin-sidebar-search"
                type="search"
                aria-label={t('ui.search_menu_97ecae35')}
                placeholder={t('ui.search_menu_97ecae35')}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="block w-full min-h-10 ps-9 pe-8 py-2 border border-white/15 hover:border-orange-500/45 rounded-xl bg-white/[0.06] text-sm text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:border-focus motion-safe:transition-colors motion-safe:duration-base"
                data-testid="SuperadminPlatformShellLayoutStyles-superadmin-sidebar-layout-superadmin-sidebar-text"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear menu search"
                  className="absolute end-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring cursor-pointer"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Search Trigger (Collapsed) */}
        {isCollapsed && !isMobileOpen && (
          <div className="flex items-center justify-center px-2 py-3 border-b border-white/10 shrink-0">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setIsCollapsed(false);
                window.requestAnimationFrame(() => searchInputRef.current?.focus());
              }}
              aria-label={t('ui.search_menu_898fbc2a')}
              title={t('ui.search_menu_898fbc2a')}
              className="min-w-11 min-h-11 p-2 rounded-xl text-orange-400 bg-orange-500/10 border border-orange-500/25 hover:bg-orange-500/20 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-base motion-safe:active:scale-95 cursor-pointer"
              data-testid="SuperadminPlatformShellLayoutStyles-superadmin-sidebar-superadmin-sidebar-search-menu"
            >
              <Search size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Navigation Groups with Jewel Badges */}
        <nav
          className={`flex-1 overflow-y-auto py-3.5 ${showLabel ? 'px-2.5 space-y-4' : 'px-1.5 space-y-2.5'} superadmin-shell-scrollbar`}
          aria-label={t('ui.superadmin_sidebar_label')}
        >
          {filteredNavGroups.length === 0 ? (
            <p className="text-center py-4 text-sm text-slate-400">{t('ui.no_matches_found_d132286c')}</p>
          ) : (
            filteredNavGroups.map((group, groupIndex) => {
              const activeGroup = group.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
              const searching = searchQuery.trim().length > 0;
              const showChildren = !showLabel ? true : (searching || (expandedGroups[group.labelKey] ?? true));
              const sectionId = `superadmin-domain-${group.labelKey.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
              const groupColor = SUPERADMIN_NAV_GROUP_COLORS[group.labelKey] ?? DEFAULT_SUPERADMIN_NAV_COLOR;
              const GroupIcon = group.icon ?? LayoutDashboard;

              return (
                <div
                  key={group.labelKey}
                  className={groupIndex > 0 ? (showLabel ? 'pt-3 border-t border-white/[0.07]' : 'pt-2 border-t border-white/10') : ''}
                >
                  {showLabel && (
                    <button
                      type="button"
                      aria-expanded={showChildren}
                      aria-controls={sectionId}
                      onClick={() => {
                        setExpandedGroups((previous) => ({ ...previous, [group.labelKey]: !showChildren }));
                      }}
                      className={`flex w-full min-h-8 items-center justify-between gap-2 rounded-lg px-2 py-1 text-start text-[11px] font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-colors cursor-pointer ${
                        activeGroup ? 'bg-white/[0.04]' : 'hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className="flex items-center gap-2 min-w-0">
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
                        <span className="truncate" style={{ color: groupColor.iconColor }}>{t(group.labelKey)}</span>
                      </span>
                      <ChevronDown
                        size={14}
                        strokeWidth={2.2}
                        aria-hidden="true"
                        className={`shrink-0 text-slate-400 motion-safe:transition-transform ${showChildren ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}

                  <div
                    id={sectionId}
                    hidden={!showChildren}
                    className={
                      showLabel
                        ? 'mt-2.5 space-y-1.5 ps-2 ms-1.5 border-s border-white/[0.08]'
                        : 'space-y-1.5 flex flex-col items-center'
                    }
                  >
                    {group.items.map((item) => {
                      const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`)) || pathname === item.href;
                      const Icon = item.icon;
                      const itemColor = SUPERADMIN_NAV_ITEM_COLORS[item.labelKey] ?? groupColor;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          title={t(item.labelKey)}
                          aria-label={!showLabel ? t(item.labelKey) : undefined}
                          aria-current={active ? 'page' : undefined}
                          onClick={() => { if (typeof window !== 'undefined' && window.innerWidth < 768) setIsMobileOpen(false); }}
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
                          data-testid={`SuperadminPlatformShellLayoutStyles-superadmin-sidebar-link-${item.href.replace(/[^a-zA-Z0-9_-]/g, '-')}`}
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
                          {showLabel && <span className="truncate">{t(item.labelKey)}</span>}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </nav>
      </aside>
    </>
  );
}
