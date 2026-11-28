"use client";
// RESPONSIBILITY: Renders the Trainer role navigation shell, including desktop collapse, mobile drawer, navigation search, focus management, and route-aware active state. No feature business data or API ownership.
import { useEffect, useMemo, useRef, useState } from 'react';

import { ChevronDown, Menu, Search, X } from 'lucide-react';
import TrainerNavigationBrandIcon from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationBrandIcon';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { getUser } from '@/lib/api';

import { TRAINER_NAVIGATION_GROUPS } from '@/app/frontend_trainer/trainer_navigation/config/TrainerNavigationConstants';
import {
  DEFAULT_TRAINER_NAV_COLOR,
  TRAINER_NAV_GROUP_COLORS,
  TRAINER_NAV_ITEM_COLORS,
} from '@/app/frontend_trainer/trainer_navigation/config/TrainerNavigationSidebarColors';

import '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationSidebar.css';

import type { TrainerNavigationSidebarProps } from '@/app/frontend_trainer/trainer_navigation/types/TrainerNavigationTypes';












/**
 * @description Owns TrainerNavigationSidebar behavior in the Trainer module.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
/**
 * @description Owns only Trainer role navigation presentation, filtering, responsive drawer state, focus handling, and active-route state.
 * @dependencies Consumes module-owned navigation metadata and zero-business session/API access only; it does not import feature business modules.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerNavigationSidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }: TrainerNavigationSidebarProps) {
  const t = useTranslations('TRAINER_SHELL');
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const prevPathnameRef = useRef(pathname);
  const user = getUser();

// Effect contract: initialize browser-only navigation state after hydration and keep shell listeners synchronized with viewport/navigation changes.
  useEffect(() => setMounted(true), []);

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
        document.querySelector<HTMLElement>('[data-trainer-sidebar-toggle]')?.focus();
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
  }, [isMobileOpen]);

  const filteredNavGroups = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return TRAINER_NAVIGATION_GROUPS;
    return TRAINER_NAVIGATION_GROUPS
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => t(item.labelKey).toLowerCase().includes(normalized)),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery, t]);

  const displayName = mounted ? user?.name || t('TEXT_DEFAULT_TRAINER_NAME') : t('TEXT_DEFAULT_TRAINER_NAME');
  const displayRole = mounted ? user?.role || t('TEXT_DEFAULT_PERSONAL_TRAINER') : t('TEXT_DEFAULT_PERSONAL_TRAINER');

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label={t('TEXT_CLOSE_NAVIGATION_SIDEBAR')}
          className="trainer-mobile-backdrop trainer-mobile-backdrop-safe-area focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
          onClick={() => setIsMobileOpen(false)}
          data-testid="trainer_navigation-sidebar-backdrop"
        />
      )}
      <aside
        ref={sidebarRef}
        id="trainer-sidebar"
        role={isMobileOpen ? 'dialog' : undefined}
        aria-label={t('TEXT_TRAINER_NAVIGATION')}
        aria-modal={isMobileOpen || undefined}
        className={`trainer-sidebar trainer-sidebar-safe-area motion-safe:transition-all motion-safe:duration-base ${isCollapsed ? 'trainer-sidebar-collapsed' : ''} ${isMobileOpen ? 'trainer-sidebar-open' : ''}`}
      >
        <div className="h-16 flex items-center gap-2.5 px-3 border-b border-orange-500/20 bg-gradient-to-r from-[#FF5A1F]/18 via-purple-500/10 to-transparent shrink-0">
          <button
            type="button"
            onClick={isMobileOpen ? () => setIsMobileOpen(false) : () => setIsCollapsed(!isCollapsed)}
            aria-label={isMobileOpen ? t('TEXT_CLOSE_NAVIGATION_SIDEBAR') : t('TEXT_TOGGLE_NAVIGATION_SIDEBAR')}
            className="min-w-9 min-h-9 w-9 h-9 inline-flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0 motion-safe:transition-all"
            data-testid="trainer_navigation-sidebar-toggle"
          >
            {isMobileOpen ? <X size={18} strokeWidth={2} aria-hidden="true" /> : <Menu size={18} strokeWidth={2} aria-hidden="true" />}
          </button>
          {(!isCollapsed || isMobileOpen) && (
            <Link
              href="/frontend_trainer/trainer_dashboard/dashboard_overview"
              onClick={() => { if (typeof window !== 'undefined' && window.innerWidth < 768) setIsMobileOpen(false); }}
              className="flex items-center gap-2.5 min-w-0 flex-1 group no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-lg"
            >
              <span
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] border border-white/25 text-white flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(255,90,31,0.5)] motion-safe:transition-transform motion-safe:duration-base group-hover:scale-105"
                aria-hidden="true"
              >
                <TrainerNavigationBrandIcon className="w-[19px] h-[19px]" />
              </span>
              <div className="whitespace-nowrap flex flex-col min-w-0 justify-center">
                <span className="bg-gradient-to-r from-white via-orange-200 to-amber-300 bg-clip-text text-transparent font-black text-[15px] leading-none tracking-tight truncate">
                  {t('TEXT_GYMSMART')}
                </span>
                <span className="self-start text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-400/35 rounded px-1.5 py-0.5 leading-none mt-1 truncate">
                  {t('TEXT_TRAINER_APP')}
                </span>
              </div>
            </Link>
          )}
        </div>
        {(!isCollapsed || isMobileOpen) && (
          <div className="px-3 py-3 border-b border-white/10 shrink-0">
            <label htmlFor="trainer-sidebar-search" className="sr-only">{t('TEXT_SEARCH_MENU')}</label>
            <div className="relative">
              <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-[#FF5A1F] pointer-events-none" aria-hidden="true" strokeWidth={2.2}/>
              <input
                id="trainer-sidebar-search"
                type="search"
                placeholder={t('TEXT_SEARCH_MENU')}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="block w-full min-h-10 ps-9 pe-8 py-2 border border-white/15 hover:border-orange-500/45 rounded-xl bg-white/[0.06] text-sm text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:border-focus motion-safe:transition-colors motion-safe:duration-base"
                data-testid="trainer_navigation-sidebar-search"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear menu search"
                  className="absolute end-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        )}
        {isCollapsed && !isMobileOpen && (
          <div className="flex items-center justify-center px-2 py-3 border-b border-white/10 shrink-0">
            <button type="button" onClick={() => setIsCollapsed(false)} aria-label={t('TEXT_SEARCH_MENU')} title={t('TEXT_SEARCH_MENU')} className="min-w-11 min-h-11 p-2 rounded-xl text-orange-400 bg-orange-500/10 border border-orange-500/25 hover:bg-orange-500/20 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-base motion-safe:active:scale-95" data-testid="trainer_navigation-sidebar-expand_search">
              <Search size={18} aria-hidden="true" strokeWidth={2}/>
            </button>
          </div>
        )}
        <nav className={`flex-1 overflow-y-auto py-3 ${!isCollapsed || isMobileOpen ? 'px-2.5 space-y-3' : 'px-1.5 space-y-2'} trainer-shell-scrollbar`} aria-label={t('TEXT_TRAINER_NAVIGATION')}>
          {filteredNavGroups.length === 0 ? (
            <p className="text-center py-4 text-sm text-slate-400">{t('TEXT_NO_MATCHES_FOUND')}</p>
          ) : filteredNavGroups.map((group, groupIndex) => {
            const activeGroup = group.items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
            const searching = searchQuery.trim().length > 0;
            const showLabel = !isCollapsed || isMobileOpen;
            const showChildren = !showLabel ? true : (searching || (expandedGroups[group.groupKey] ?? true));
            const sectionId = `trainer-domain-${group.groupKey.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            const groupColor = TRAINER_NAV_GROUP_COLORS[group.groupKey] ?? DEFAULT_TRAINER_NAV_COLOR;
            const GroupIcon = group.icon;
            return (
              <div key={group.groupKey} className={!showLabel && groupIndex > 0 ? 'pt-2 border-t border-white/10' : ''}>
                {showLabel && (
                  <button
                    type="button"
                    aria-expanded={showChildren}
                    aria-controls={sectionId}
                    onClick={() => {
                      setExpandedGroups((previous) => ({ ...previous, [group.groupKey]: !showChildren }));
                    }}
                    className={`flex w-full min-h-9 items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-start text-[11px] font-bold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-colors ${activeGroup ? 'bg-white/[0.08]' : 'hover:bg-white/[0.05]'}`}
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
                      <span className="truncate" style={{ color: groupColor.iconColor }}>{t(group.groupKey)}</span>
                    </span>
                    <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" className={`shrink-0 text-slate-400 motion-safe:transition-transform ${showChildren ? 'rotate-180' : ''}`} />
                  </button>
                )}
                <div id={sectionId} hidden={!showChildren} className={`${showLabel ? 'mt-1 space-y-1' : 'space-y-1.5 flex flex-col items-center'}`}>
                  {group.items.map((item) => {
                    const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    const Icon = item.icon;
                    const itemColor = TRAINER_NAV_ITEM_COLORS[item.labelKey] ?? groupColor;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={t(item.labelKey)}
                        aria-label={!showLabel ? t(item.labelKey) : undefined}
                        aria-current={active ? 'page' : undefined}
                        onClick={() => { if (window.innerWidth < 768) setIsMobileOpen(false); }}
                        style={
                          active
                            ? {
                                borderColor: itemColor.iconColor,
                                background: `linear-gradient(90deg, ${itemColor.activeBg} 0%, ${itemColor.bg} 55%, transparent 100%)`,
                                boxShadow: itemColor.activeShadow,
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
                            : showLabel
                              ? 'border-transparent text-slate-300 hover:bg-white/[0.07] hover:text-white'
                              : 'border-transparent text-slate-300 hover:bg-white/[0.08] hover:text-white'
                        }`}
                        data-testid={`trainer_navigation-sidebar-nav${item.href.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')}`}
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
          })}
        </nav>
        <div className="mt-auto border-t border-white/10 bg-gradient-to-r from-orange-500/12 via-purple-500/5 to-sky-500/10 px-2.5 py-3">
          <div className={`flex items-center rounded-xl border border-white/15 bg-white/[0.05] p-2 ${!isCollapsed || isMobileOpen ? 'gap-3' : 'justify-center'}`}>
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-[0_3px_14px_rgba(255,90,31,0.45)]" aria-hidden="true">
              {displayName.charAt(0).toUpperCase()}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090D16] shadow-[0_0_6px_#34d399]" />
            </div>
            {(!isCollapsed || isMobileOpen) && <div className="min-w-0"><p className="text-sm font-semibold text-white truncate">{displayName}</p><p className="text-[11px] font-medium text-emerald-400 truncate">{displayRole}</p></div>}
          </div>
        </div>
      </aside>
    </>
  );
}
