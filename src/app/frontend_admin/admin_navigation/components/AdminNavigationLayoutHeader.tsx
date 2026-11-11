"use client";
// RESPONSIBILITY: Renders the persistent fixed Admin shell header. It owns shell controls only; feature business logic stays inside feature modules.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/AdminNavigationLayoutHeader.tsx)

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, CircleHelp, Menu, Search } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import AdminNavigationLayoutDensityToggle from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutDensityToggle';
import type { AdminNavigationLayoutProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutPropsTypes';
import AdminNavigationLayoutHeaderProfile from '@/app/frontend_admin/admin_navigation/components/AdminNavigationLayoutHeaderProfile';
import { AdminNavigationLayoutRouteHeaderConfig } from '@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutRouteHeaderConfig';
import { AdminNavigationLayoutUrlConfig } from '@/app/frontend_admin/admin_navigation/config/admin_navigation_shell.url_config';

/**
 * @description AdminNavigationLayoutHeader renders only shell-owned controls and route chrome; no business feature is imported into the shell boundary.
 * @dependencies Consumes shell i18n, shell route-header configuration, shell navigation configuration, and global design primitives.
 * @edge-case Header shortcuts remain actionable without requiring any business module to be mounted or imported.
 */
export default function AdminNavigationLayoutHeader({ headerContextSlot }: Pick<AdminNavigationLayoutProps, 'headerContextSlot'>) {
  const t = useTranslations();
  const pathname = usePathname();
  const { titleKey, subtitleKey } = AdminNavigationLayoutRouteHeaderConfig(pathname);
  return (
    <header data-admin-shell-header className="fixed inset-x-0 top-0 z-20 h-16 bg-header-translucent backdrop-blur-md border-b border-border px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
        <button type="button" className="min-h-11 min-w-11 inline-flex items-center justify-center text-secondary hover:text-primary motion-safe:transition-colors bg-input hover:bg-surface-hover rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))} aria-label={t('admin_navigation.AdminNavigationLayoutHeader.text_8b9b1bbd66')} data-testid="admin_navigation-admin-header-sidebar-toggle">
          <Menu size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <div className="min-w-0"><h1 className="text-xl font-bold text-primary truncate">{t(`admin_navigation.AdminRouteHeaders.${titleKey}`)}</h1><p className="hidden sm:block text-sm text-secondary truncate mt-0.5">{t(`admin_navigation.AdminRouteHeaders.${subtitleKey}`)}</p></div>
      </div>
      <div className="flex min-w-0 shrink-0 items-center gap-1 sm:gap-2 lg:gap-3"><div className="hidden md:block">{headerContextSlot}</div>
        <button type="button" onClick={() => window.dispatchEvent(new Event('open-admin-command-palette'))} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg border border-border bg-input text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" aria-label={t('admin_navigation.AdminNavigationLayoutKeyboardShortcuts.openCommandPalette')} title={t('admin_navigation.AdminNavigationLayoutKeyboardShortcuts.openCommandPalette')} data-testid="admin_navigation-admin-header-command-palette-open"><Search size={18} strokeWidth={2} aria-hidden="true" /></button>
        <Link href="/frontend_admin/admin_communication/communication_notifications_center" className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg border border-border bg-input text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" aria-label={t('admin_navigation.AdminRouteHeaders.route_admin_notifications_title')} title={t('admin_navigation.AdminRouteHeaders.route_admin_notifications_title')} data-testid="admin_navigation-admin-header-notifications-link">
          <Bell size={18} strokeWidth={2} aria-hidden="true" />
        </Link>
        <div className="hidden sm:block"><AdminNavigationLayoutDensityToggle /></div>
        <button type="button" onClick={() => window.dispatchEvent(new Event('open-admin-shortcut-help'))} className="hidden sm:inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-input text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-colors motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95" aria-label={t('admin_navigation.AdminNavigationLayoutKeyboardShortcuts.showHelp')} title={t('admin_navigation.AdminNavigationLayoutKeyboardShortcuts.showHelp')} data-testid="admin_navigation-admin-header-shortcut-help-open"><CircleHelp size={18} strokeWidth={2} aria-hidden="true" /></button>
        <ThemeToggle />
        <AdminNavigationLayoutHeaderProfile profileHref={AdminNavigationLayoutUrlConfig.PAGES.PROFILE} settingsHref={AdminNavigationLayoutUrlConfig.PAGES.SETTINGS} />
      </div>
    </header>
  );
}
