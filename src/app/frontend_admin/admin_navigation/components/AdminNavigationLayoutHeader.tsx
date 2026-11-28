"use client";
// RESPONSIBILITY: Renders the persistent fixed Admin shell header, aligned to the Trainer Obsidian + Electric Orange aesthetic.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/AdminNavigationLayoutHeader.tsx)

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Building2, CircleHelp, Menu, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import AdminNavigationLayoutDensityToggle from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutDensityToggle';
import type { AdminNavigationLayoutProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutPropsTypes';
import AdminNavigationLayoutHeaderProfile from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutHeaderProfile';
import { AdminNavigationLayoutRouteHeaderConfig } from '@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutRouteHeaderConfig';
import { AdminNavigationLayoutUrlConfig } from '@/app/frontend_admin/admin_navigation/config/admin_navigation_shell.url_config';

export default function AdminNavigationLayoutHeader({
  headerContextSlot,
  isSidebarCollapsed = false,
}: Pick<AdminNavigationLayoutProps, 'headerContextSlot'> & { isSidebarCollapsed?: boolean }) {
  const t = useTranslations();
  const pathname = usePathname();
  const { titleKey, subtitleKey } = AdminNavigationLayoutRouteHeaderConfig(pathname);
  const titleText = t(`admin_navigation.AdminRouteHeaders.${titleKey}`);
  const subtitleText = t(`admin_navigation.AdminRouteHeaders.${subtitleKey}`);

  return (
    <header
      data-admin-shell-header
      className={`fixed top-0 right-0 left-0 ${isSidebarCollapsed ? 'md:left-[60px]' : 'md:left-60'} z-20 h-16 bg-header-translucent backdrop-blur-md bg-gradient-to-r from-[#0B0F19]/95 via-[#11182A]/95 to-[#19132B]/95 border-b border-orange-500/25 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 text-white shadow-[0_4px_24px_rgba(0,0,0,0.35)] motion-safe:transition-all motion-safe:duration-base`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="md:hidden min-h-11 min-w-11 shrink-0 inline-flex items-center justify-center text-orange-400 bg-orange-500/15 hover:bg-orange-500/25 rounded-xl border border-orange-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95"
          onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
          aria-label={t('admin_navigation.AdminNavigationLayoutHeader.text_8b9b1bbd66')}
          data-testid="admin_navigation-admin-header-sidebar-toggle"
        >
          <Menu size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="hidden sm:inline-flex items-center justify-center w-7 h-7 rounded-lg border border-orange-500/35 bg-orange-500/15 text-[#FF5A1F] shrink-0 shadow-[0_2px_10px_rgba(255,90,31,0.22)]"
              aria-hidden="true"
            >
              <Building2 size={15} strokeWidth={2.2} />
            </span>
            <h1 className="text-base sm:text-page-title font-bold text-white truncate">{titleText}</h1>
          </div>
          {subtitleText && (
            <p className="hidden sm:block text-xs text-slate-300/80 truncate mt-0.5 sm:ps-9">{subtitleText}</p>
          )}
        </div>
      </div>
      <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2.5">
        <div className="hidden md:block">{headerContextSlot}</div>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event('open-admin-command-palette'))}
          className="min-h-10 min-w-10 inline-flex items-center justify-center rounded-xl border border-violet-400/35 bg-violet-500/15 text-violet-300 hover:bg-violet-500/25 hover:border-violet-400/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 shadow-[0_2px_10px_rgba(139,92,246,0.18)]"
          aria-label={t('admin_navigation.AdminNavigationLayoutKeyboardShortcuts.openCommandPalette')}
          title={t('admin_navigation.AdminNavigationLayoutKeyboardShortcuts.openCommandPalette')}
          data-testid="admin_navigation-admin-header-command-palette-open"
        >
          <Search size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <Link
          href="/frontend_admin/admin_communication/communication_notifications_center"
          className="relative min-h-10 min-w-10 inline-flex items-center justify-center rounded-xl border border-sky-400/35 bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 hover:border-sky-400/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 shadow-[0_2px_10px_rgba(56,189,248,0.18)]"
          aria-label={t('admin_navigation.AdminRouteHeaders.route_admin_notifications_title')}
          title={t('admin_navigation.AdminRouteHeaders.route_admin_notifications_title')}
          data-testid="admin_navigation-admin-header-notifications-link"
        >
          <Bell size={18} strokeWidth={2} aria-hidden="true" />
        </Link>
        <div className="hidden sm:block"><AdminNavigationLayoutDensityToggle /></div>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event('open-admin-shortcut-help'))}
          className="hidden sm:inline-flex min-h-10 min-w-10 items-center justify-center rounded-xl border border-emerald-400/35 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 shadow-[0_2px_10px_rgba(16,185,129,0.16)]"
          aria-label={t('admin_navigation.AdminNavigationLayoutKeyboardShortcuts.showHelp')}
          title={t('admin_navigation.AdminNavigationLayoutKeyboardShortcuts.showHelp')}
          data-testid="admin_navigation-admin-header-shortcut-help-open"
        >
          <CircleHelp size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <ThemeToggle />
        <AdminNavigationLayoutHeaderProfile
          profileHref={AdminNavigationLayoutUrlConfig.PAGES.PROFILE}
          settingsHref={AdminNavigationLayoutUrlConfig.PAGES.SETTINGS}
        />
      </div>
    </header>
  );
}
