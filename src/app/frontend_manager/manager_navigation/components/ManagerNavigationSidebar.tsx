// RESPONSIBILITY: Renders ManagerNavigationSidebar's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo, useRef } from 'react';

import { Menu, Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { getUser } from '@/lib/api';

import { useManagerInfrastructureMounted } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureMounted';

import ManagerNavigationBrandIcon from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationBrandIcon';
import '@/app/frontend_manager/manager_navigation/components/ManagerNavigationSidebar.css';
import { MANAGER_DEFAULT_HOME, MANAGER_NAV_GROUPS } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationConfig';
import ManagerNavigationSidebarNavigation from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationSidebarNavigation';
import type { ManagerNavigationSidebarProps } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationLayoutTypes';

/** @description Renders the ManagerNavigationSidebar component matching the Trainer obsidian glass sidebar with 15 jewel-accented domains. */
export default function ManagerNavigationSidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen: controlledMobileOpen,
  setIsMobileOpen: setControlledMobileOpen,
}: ManagerNavigationSidebarProps) {
  const t = useTranslations('MANAGER_SHELL');

  const pathname = usePathname();
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const isMobileOpen = controlledMobileOpen ?? internalMobileOpen;
  const setIsMobileOpen = setControlledMobileOpen ?? setInternalMobileOpen;
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const mounted = useManagerInfrastructureMounted();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const previousMobileFocusRef = useRef<HTMLElement | null>(null);
  const asideRef = useRef<HTMLElement | null>(null);
  const prevPathnameRef = useRef(pathname);
  const user = getUser();

  useEffect(() => {
    const updateViewport = () => {
      const isMobile = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(max-width: 767px)').matches
        : (typeof window !== 'undefined' ? window.innerWidth < 768 : false);
      setIsMobileViewport(isMobile);
      if (!isMobile) setIsMobileOpen(false);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, [setIsMobileOpen]);

  // Listens for the global 'toggle-sidebar' event dispatched by ManagerNavigationHeader's hamburger button.
  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 768) {
        if (!isMobileOpen) previousMobileFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setIsMobileOpen(!isMobileOpen);
      } else {
        setIsCollapsed(!isCollapsed);
      }
    };
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, [isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen]);

  // Mobile drawer: trap focus, close on Escape, lock page scrolling, and restore focus to the trigger.
  useEffect(() => {
    if (!isMobileOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]';
    const focusFirst = () => asideRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();
    focusFirst();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(asideRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      window.requestAnimationFrame(() => previousMobileFocusRef.current?.focus());
      previousMobileFocusRef.current = null;
    };
  }, [isMobileOpen, setIsMobileOpen]);

  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (isMobileOpen) setIsMobileOpen(false);
    }
  }, [pathname, isMobileOpen, setIsMobileOpen]);

  const translatedNavGroups = useMemo(() => MANAGER_NAV_GROUPS.map((group) => ({
    ...group,
    translatedGroup: t(group.groupKey),
    items: group.items.map((item) => ({ ...item, translatedLabel: t(item.labelKey) })),
  })), [t]);

  const filteredNavGroups = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
    if (!normalizedQuery) return translatedNavGroups;
    return translatedNavGroups
      .map((group) => {
        const groupMatches = group.translatedGroup.toLocaleLowerCase().includes(normalizedQuery)
          || (group.domainHref ?? '').toLocaleLowerCase().includes(normalizedQuery);
        return {
          ...group,
          items: groupMatches ? group.items : group.items.filter((item) =>
            item.translatedLabel.toLocaleLowerCase().includes(normalizedQuery)
            || item.href.toLocaleLowerCase().includes(normalizedQuery),
          ),
        };
      })
      .filter((group) => group.items.length > 0);
  }, [searchQuery, translatedNavGroups]);

  const toggleGroup = (groupKey: string, activeGroup = false) => {
    setExpandedGroups((current) => {
      const isCurrentlyExpanded = current[groupKey] ?? activeGroup;
      return { ...current, [groupKey]: !isCurrentlyExpanded };
    });
  };

  const gymBrandText = t('COPY_GYMSMART');
  const hasGymSmartSplit = gymBrandText === 'GymSmart';
  const showFull = !isCollapsed || isMobileOpen;

  return (
    <>
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          data-testid="manager_navigation-layout-backdrop-mobile-sidebar"
          className="manager-mobile-backdrop manager-mobile-backdrop-safe-area focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        ref={asideRef}
        id="manager-sidebar"
        role={isMobileOpen ? 'dialog' : undefined}
        aria-modal={isMobileOpen || undefined}
        aria-label={t('COPY_MANAGER_NAVIGATION')}
        aria-hidden={isMobileViewport && !isMobileOpen}
        inert={isMobileViewport && !isMobileOpen}
        className={`manager-sidebar manager-sidebar-safe-area motion-safe:transition-all motion-safe:duration-base ${isCollapsed ? 'manager-sidebar-collapsed' : ''} ${isMobileOpen ? 'manager-sidebar-open' : ''}`}
      >
        {/* Top Brand & Collapse Toggle Header (matching Trainer) */}
        <div className="h-16 flex items-center gap-2.5 px-3 border-b border-white/10 bg-white/[0.02] shrink-0">
          <button
            type="button"
            onClick={isMobileOpen ? () => setIsMobileOpen(false) : () => setIsCollapsed(!isCollapsed)}
            aria-label={isMobileOpen ? 'Close navigation menu' : t('COPY_TOGGLE_SIDEBAR')}
            data-testid={isMobileOpen ? 'manager-sidebar-close' : 'manager_navigation-sidebar-toggle'}
            className="min-w-9 min-h-9 w-9 h-9 inline-flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shrink-0 motion-safe:transition-all cursor-pointer"
          >
            {isMobileOpen ? <X size={18} strokeWidth={2} aria-hidden="true" /> : <Menu size={18} strokeWidth={2} aria-hidden="true" />}
          </button>

          {showFull && (
            <Link
              href={MANAGER_DEFAULT_HOME}
              onClick={() => { if (typeof window !== 'undefined' && window.innerWidth < 768) setIsMobileOpen(false); }}
              className="flex items-center gap-2.5 min-w-0 flex-1 group no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-lg"
            >
              <span
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] border border-white/25 text-white flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(255,90,31,0.45)] motion-safe:transition-transform motion-safe:duration-base group-hover:scale-105"
                aria-hidden="true"
              >
                <ManagerNavigationBrandIcon className="w-[19px] h-[19px]" />
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
                  {t('COPY_MANAGER_PORTAL')}
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Search Box */}
        {showFull && (
          <div className="px-3 py-3 border-b border-white/10 shrink-0">
            <div className="relative">
              <Search size={16} strokeWidth={2.2} className="absolute start-3 top-1/2 -translate-y-1/2 text-[#FF5A1F] pointer-events-none" aria-hidden="true" />
              <input
                data-testid="manager_navigation-layout-input-text"
                type="text"
                aria-label={t('COPY_SEARCH_MANAGER_NAVIGATION')}
                placeholder={t('COPY_SEARCH_MENU_2')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full min-h-10 ps-9 pe-8 py-2 border border-white/15 hover:border-orange-500/45 rounded-xl bg-white/[0.06] text-sm text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:border-focus motion-safe:transition-colors motion-safe:duration-base"
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
            <button
              data-testid="manager_navigation-layout-button-close"
              onClick={() => setIsCollapsed(false)}
              aria-label={t('COPY_TOGGLE_SIDEBAR')}
              title={t('COPY_SEARCH_MENU_2')}
              type="button"
              className="min-w-11 min-h-11 p-2 rounded-xl text-orange-400 bg-orange-500/10 border border-orange-500/25 hover:bg-orange-500/20 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-base motion-safe:active:scale-95"
            >
              <Search size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        )}

        <ManagerNavigationSidebarNavigation
          groups={filteredNavGroups}
          pathname={pathname}
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          searchQuery={searchQuery}
          expandedGroups={expandedGroups}
          onToggleGroup={toggleGroup}
          onNavigate={() => { if (typeof window !== 'undefined' && window.innerWidth < 768) setIsMobileOpen(false); }}
        />

        {/* Compact Obsidian User Footer */}
        <div className={`px-3 py-3 border-t border-white/10 bg-white/[0.02] shrink-0 flex items-center ${showFull ? 'gap-2.5' : 'justify-center'}`}>
          <div className="w-9 h-9 min-w-9 rounded-xl flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] shadow-[0_3px_12px_rgba(255,90,31,0.4)] shrink-0">
            {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'M') : 'M'}
          </div>
          {showFull && (
            <div className="whitespace-nowrap overflow-hidden flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">{mounted ? (user?.name || t('TEXT_MANAGER_USER')) : t('TEXT_MANAGER_USER')}</div>
              <div className="text-amber-300/90 text-[10px] font-medium truncate">{mounted ? (user?.role || t('TEXT_GYM_MANAGER')) : t('TEXT_GYM_MANAGER')}</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
