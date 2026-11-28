"use client";
// RESPONSIBILITY: Coordinates Admin sidebar open/collapse state, obsidian styling, mobile drawer, and shell keyboard behavior.

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, Search, X } from 'lucide-react';
import AdminNavigationLayoutSidebarBrand from '@/app/frontend_admin/admin_navigation/components/sidebar_brand/AdminNavigationLayoutSidebarBrand';
import AdminNavigationLayoutSidebarNavigation from '@/app/frontend_admin/admin_navigation/components/sidebar_navigation/AdminNavigationLayoutSidebarNavigation';
import type { AdminSidebarProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutSidebarPropsTypes';

export default function AdminNavigationLayoutSidebar({ isCollapsed, setIsCollapsed }: AdminSidebarProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleToggle = () => {
      if (window.innerWidth < 768) {
        setIsMobileOpen((current) => !current);
      } else {
        setIsCollapsed(!isCollapsed);
      }
    };
    window.addEventListener('toggle-sidebar', handleToggle);
    return () => window.removeEventListener('toggle-sidebar', handleToggle);
  }, [isCollapsed, setIsCollapsed]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const drawer = sidebarRef.current;
    const focusableSelector = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    const focusFirst = () => drawer?.querySelector<HTMLElement>(focusableSelector)?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !drawer) return;
      const focusables = Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector));
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const frame = window.requestAnimationFrame(focusFirst);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.querySelector<HTMLElement>('[data-testid="admin_navigation-admin-header-sidebar-toggle"]')?.focus();
    };
  }, [isMobileOpen]);

  const showSearch = !isCollapsed || isMobileOpen;

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-overlay-backdrop backdrop-blur-sm z-30 md:hidden motion-safe:transition-opacity motion-safe:duration-base"
          onClick={() => setIsMobileOpen(false)}
          data-testid="admin_navigation-admin-sidebar-click"
        />
      )}
      <aside
        ref={sidebarRef}
        aria-label={t('admin_navigation.AdminNavigationLayoutSidebar.text_sidebarLabel')}
        data-admin-shell-sidebar
        className={`fixed left-0 top-0 bottom-0 h-dvh flex flex-col text-slate-100 bg-gradient-to-b from-[#090D16] via-[#0E1526] to-[#090D16] border-r border-orange-500/20 shadow-[4px_0_28px_rgba(0,0,0,0.45)] backdrop-blur-xl motion-safe:transition-all motion-safe:duration-base ${
          isCollapsed ? 'w-[min(88vw,280px)] md:w-[60px]' : 'w-[min(88vw,280px)] md:w-60'
        } ${isMobileOpen ? 'translate-x-0 z-40 visible pointer-events-auto' : '-translate-x-full md:translate-x-0 z-20 invisible md:visible pointer-events-none md:pointer-events-auto'}`}
      >
        <div className="h-16 flex items-center gap-2.5 px-3 border-b border-white/10 bg-white/[0.02] shrink-0">
          <button
            type="button"
            onClick={() => (isMobileOpen ? setIsMobileOpen(false) : setIsCollapsed(!isCollapsed))}
            aria-label={t('admin_navigation.AdminNavigationLayoutHeader.text_8b9b1bbd66')}
            className="min-w-9 min-h-9 w-9 h-9 inline-flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 motion-safe:transition-all"
            data-testid="admin_navigation-admin-sidebar-toggle"
          >
            {isMobileOpen ? <X size={18} strokeWidth={2} aria-hidden="true" /> : <Menu size={18} strokeWidth={2} aria-hidden="true" />}
          </button>
          <AdminNavigationLayoutSidebarBrand isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} />
        </div>

        {showSearch && (
          <div className="px-3 py-3 border-b border-white/10 shrink-0">
            <div className="relative">
              <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-[#FF5A1F] pointer-events-none" strokeWidth={2.2} aria-hidden="true" />
              <input
                type="search"
                aria-label={t('admin_navigation.AdminNavigationLayoutSidebar.text_7994a318d8')}
                placeholder={t('admin_navigation.AdminNavigationLayoutSidebar.text_7994a318d8')}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="block w-full min-h-10 ps-9 pe-8 py-2 border border-white/15 hover:border-orange-500/45 rounded-xl bg-white/[0.06] text-sm text-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-focus motion-safe:transition-colors motion-safe:duration-base"
                data-testid="admin_navigation-admin-sidebar-control"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear menu search"
                  className="absolute end-2 top-1/2 -translate-y-1/2 p-1 rounded-md text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
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
              type="button"
              onClick={() => setIsCollapsed(false)}
              aria-label={t('admin_navigation.AdminNavigationLayoutSidebar.text_13a91dc70a')}
              title={t('admin_navigation.AdminNavigationLayoutSidebar.text_13a91dc70a')}
              className="min-w-11 min-h-11 p-2 rounded-xl text-orange-400 bg-orange-500/10 border border-orange-500/25 hover:bg-orange-500/20 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base motion-safe:active:scale-95"
              data-testid="admin_navigation-admin-sidebar-click-2"
            >
              <Search size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        )}

        <AdminNavigationLayoutSidebarNavigation
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          searchQuery={searchQuery}
        />
      </aside>
    </>
  );
}
