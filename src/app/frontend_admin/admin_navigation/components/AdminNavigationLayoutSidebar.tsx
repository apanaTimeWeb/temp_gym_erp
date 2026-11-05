"use client";
// RESPONSIBILITY: Coordinates sidebar open/collapse state and shell keyboard behavior.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/AdminNavigationLayoutSidebar.tsx)

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { getUser } from '@/lib/api';
import AdminNavigationLayoutSidebarBrand from '@/app/frontend_admin/admin_navigation/components/sidebar_brand/AdminNavigationLayoutSidebarBrand';
import AdminNavigationLayoutSidebarNavigation from '@/app/frontend_admin/admin_navigation/components/sidebar_navigation/AdminNavigationLayoutSidebarNavigation';
import AdminNavigationLayoutSidebarUserFooter from '@/app/frontend_admin/admin_navigation/components/sidebar_user_footer/AdminNavigationLayoutSidebarUserFooter';
import type { AdminSidebarProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutSidebarPropsTypes';

export default function AdminNavigationLayoutSidebar({ isCollapsed, setIsCollapsed }: AdminSidebarProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const sidebarRef = useRef<HTMLElement>(null);
  const user = getUser();

  // Delay user-derived UI until the client has hydrated to avoid SSR mismatch.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Header dispatches this event to toggle the mobile drawer or desktop collapse state.
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

  // Mobile drawer behavior: scroll lock, focus containment, Escape and trigger restoration.
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
          className="fixed inset-0 bg-overlay backdrop-blur-sm z-30 md:hidden motion-safe:transition-opacity motion-safe:duration-base"
          onClick={() => setIsMobileOpen(false)}
          data-testid="admin_navigation-admin-sidebar-click"
        />
      )}
      <aside
        ref={sidebarRef}
        aria-label={t('admin_navigation.AdminNavigationLayoutSidebar.text_sidebarLabel')}
        data-admin-shell-sidebar
        className={`fixed left-0 top-16 bottom-0 bg-sidebar border-r border-border z-20 flex flex-col motion-safe:transition-all motion-safe:duration-slow md:w-16 ${isCollapsed ? 'xl:w-16' : 'xl:w-60'} ${isMobileOpen ? 'w-64 left-0 z-40' : 'w-64 -left-64 md:left-0'}`}
      >
        <AdminNavigationLayoutSidebarBrand isCollapsed={isCollapsed} isMobileOpen={isMobileOpen} />
        {showSearch && (
          <div className={`px-4 py-3 border-b border-border shrink-0 ${isMobileOpen ? 'block' : 'hidden xl:block'}`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-secondary" strokeWidth={2} aria-hidden="true" />
              </div>
              <input
                type="search"
                aria-label={t('admin_navigation.AdminNavigationLayoutSidebar.text_7994a318d8')}
                placeholder={t('admin_navigation.AdminNavigationLayoutSidebar.text_7994a318d8')}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="block w-full pl-9 pr-3 py-2 min-h-11 border border-border rounded-lg leading-5 bg-input text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-focus sm:text-sm motion-safe:transition-colors motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                data-testid="admin_navigation-admin-sidebar-control"
              />
            </div>
          </div>
        )}
        {isCollapsed && !isMobileOpen && (
          <div className="flex items-center justify-center px-4 py-3 border-b border-border shrink-0">
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              aria-label={t('admin_navigation.AdminNavigationLayoutSidebar.text_13a91dc70a')}
              className="min-h-11 min-w-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95"
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
        <AdminNavigationLayoutSidebarUserFooter
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          mounted={mounted}
          userName={user?.name}
          userRole={user?.role}
        />
      </aside>
    </>
  );
}
