// RESPONSIBILITY: Renders ManagerNavigationSidebar's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo, useRef } from 'react';

import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { getUser } from '@/lib/api';

import { useManagerInfrastructureMounted } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureMounted';

import { MANAGER_NAV_GROUPS } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationConfig';
import ManagerNavigationSidebarNavigation from '@/app/frontend_manager/manager_navigation/components/ManagerNavigationSidebarNavigation';
import type { ManagerNavigationSidebarProps } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationLayoutTypes';


/** @description Renders the ManagerNavigationSidebar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (3 documented module/import dependencies).. @edge-case Preserves drawer lifecycle, responsive behavior. */
export default function ManagerNavigationSidebar({ isCollapsed, setIsCollapsed }: ManagerNavigationSidebarProps) {
  const t = useTranslations('MANAGER_SHELL');

  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const mounted = useManagerInfrastructureMounted();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const previousMobileFocusRef = useRef<HTMLElement | null>(null);
  const asideRef = useRef<HTMLElement | null>(null);
  const user = getUser();

  useEffect(() => {
    const updateViewport = () => setIsMobileViewport(window.matchMedia('(max-width: 767px)').matches);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);


  // Listens for the global 'toggle-sidebar' event dispatched by ManagerNavigationHeader's hamburger button.
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 768) {
        setIsMobileOpen((open) => {
          if (!open) previousMobileFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
          return !open;
        });
      } else {
        setIsCollapsed(!isCollapsed);
      }
    };
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, [isCollapsed, setIsCollapsed]);

  // Mobile drawer: trap focus, close on Escape, lock page scrolling, and restore focus to the trigger.
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
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
  }, [isMobileOpen]);

  // Closes the mobile drawer whenever the route changes (user navigated to a new page).
  // Route changes close the mobile drawer so navigation never leaves a stale overlay open.
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Keep every registered destination searchable; the navigation registry is the source of truth for destination counts.
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

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups((current) => ({ ...current, [groupKey]: !(current[groupKey] ?? false) }));
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div aria-hidden="true" data-testid="manager_navigation-layout-backdrop-mobile-sidebar"
          className="fixed inset-0 bg-overlay backdrop-blur-sm z-30 md:hidden motion-safe:transition-opacity motion-safe:duration-200"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside ref={asideRef} aria-label={t("COPY_MANAGER_NAVIGATION")} aria-hidden={isMobileViewport && !isMobileOpen} inert={isMobileViewport && !isMobileOpen} className={`fixed left-0 top-16 bottom-0 bg-sidebar border-r border-border z-40 flex flex-col motion-safe:transition-all motion-safe:duration-300 w-60 ${
        isCollapsed ? 'md:w-[60px]' : 'md:w-60'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {isMobileOpen && (
          <div className="flex items-center justify-end border-b border-border px-4 py-2 md:hidden">
            <button type="button" onClick={() => setIsMobileOpen(false)} aria-label="Close navigation menu" className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-primary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" data-testid="manager-sidebar-close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
        )}

        {/* Logo & Toggle */}
        <div className="flex items-center justify-center px-4 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <Image src="/logo.png" alt={t("COPY_GYMSMART_MANAGER")} width={44} height={44} className="object-contain min-w-11 rounded-lg" />
            {(!isCollapsed || isMobileOpen) && (
              <div className="whitespace-nowrap motion-safe:transition-all motion-safe:duration-300 flex flex-col">
                <span className="text-text-primary font-bold text-lg leading-tight tracking-tight">{t("COPY_GYMSMART")}</span>
                <span className="text-xs text-warning-text font-bold uppercase tracking-wider -mt-0.5">{t("COPY_MANAGER_PORTAL")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Box */}
        {(!isCollapsed || isMobileOpen) && (
          <div className={`px-4 py-3 ${isMobileOpen ? 'block' : 'hidden md:block'} border-b border-border shrink-0`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} strokeWidth={2} className="text-text-secondary" />
              </div>
              <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "block w-full pl-9 pr-3 py-2 border border-border rounded-lg leading-5 bg-input text-text-primary placeholder-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page sm:text-sm motion-safe:transition-all motion-safe:duration-200 ease-in-out"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_navigation-layout-input-text"
                type="text"
                aria-label={t("COPY_SEARCH_MANAGER_NAVIGATION")}
                placeholder={t("COPY_SEARCH_MENU_2")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                
              />
            </div>
          </div>
        )}
        
        {isCollapsed && !isMobileOpen && (
          <div className="hidden xl:flex items-center justify-center px-4 py-3 border-b border-border shrink-0">
            <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-input motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_navigation-layout-button-close"
              onClick={() => setIsCollapsed(false)}
              aria-label={t("COPY_TOGGLE_SIDEBAR")}
              
             type="button">
              <Search size={18} strokeWidth={2} />
            </button>
          </div>
        )}

        <ManagerNavigationSidebarNavigation groups={filteredNavGroups} pathname={pathname} isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} searchQuery={searchQuery} expandedGroups={expandedGroups} onToggleGroup={toggleGroup} />

        {/* User */}
        <div className={`px-4 py-4 border-t border-border bg-header shrink-0 flex items-center ${isMobileOpen ? 'gap-3' : (!isCollapsed ? 'justify-center md:justify-start md:gap-3' : 'justify-center')}`}>
          <div className="w-10 h-10 min-w-10 rounded-full flex items-center justify-center text-on-primary text-sm font-bold border border-border bg-primary">
            {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'M') : 'M'}
          </div>
          {(!isCollapsed || isMobileOpen) && (
            <div className={`${isMobileOpen ? 'block' : 'hidden md:block'} whitespace-nowrap overflow-hidden flex-1`}>
              <div className="text-text-primary text-sm font-bold truncate">{mounted ? (user?.name || t("TEXT_MANAGER_USER")) : t("TEXT_MANAGER_USER")}</div>
              <div className="text-text-secondary text-xs truncate">{mounted ? (user?.role || t("TEXT_GYM_MANAGER")) : t("TEXT_GYM_MANAGER")}</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
