// RESPONSIBILITY: Renders ManagerNavigationHeader's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Bell, Building2, Command, LogOut, Menu, QrCode, Search, Settings, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ThemeToggle } from '@/components/ui/theme_toggle/ThemeToggle';
import { getUser, logout } from '@/lib/api';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { useManagerInfrastructureMounted } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureMounted';
import { useManagerInfrastructureDataDensity } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDataDensity';

import { MANAGER_HEADER_NAVIGATION } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationHeaderNavigationConfig';
import type { ManagerNavigationHeaderProps } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationLayoutTypes';


/** @description Renders the ManagerNavigationHeader component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (4 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerNavigationHeader({ title, subtitle, onOpenCommandPalette }: ManagerNavigationHeaderProps) {
  const t = useTranslations('MANAGER_SHELL');
  const densityT = useTranslations('MANAGER_INFRASTRUCTURE');
  const { density, toggleDensity } = useManagerInfrastructureDataDensity();

  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const mounted = useManagerInfrastructureMounted();
  const user = getUser();


  // Attaches click-outside listener once on mount to close notification/profile dropdowns on outside click.
// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && showProfile) { event.preventDefault(); setShowProfile(false); profileRef.current?.querySelector<HTMLButtonElement>('button')?.focus(); return; }
      if (showProfile && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        const items = Array.from(profileRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
        if (!items.length) return; event.preventDefault();
        const index = items.indexOf(document.activeElement as HTMLElement);
        items[event.key === 'ArrowDown' ? (index + 1) % items.length : (index - 1 + items.length) % items.length]?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => { document.removeEventListener('mousedown', handleClickOutside); document.removeEventListener('keydown', handleKeyDown); };
  }, [showProfile]);

  return (
    <header className="fixed inset-x-0 top-0 z-20 h-16 bg-header-translucent backdrop-blur-md border-b border-border px-4 md:px-6 flex items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4 flex-1 min-w-0">
        <button data-testid="manager_navigation-header-button-sidebar-toggle"
          aria-label={t("COPY_TOGGLE_SIDEBAR")}
          className="min-h-11 min-w-11 inline-flex items-center justify-center p-2 text-text-secondary hover:text-primary motion-safe:transition-all bg-input hover:bg-page rounded-lg border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"
          onClick={() => window.dispatchEvent(new Event('toggle-sidebar'))}
         type="button">
          <Menu size={18} strokeWidth={2}/>
        </button>
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-text-primary truncate">{title}</h1>
          {subtitle && <p className="text-sm text-text-secondary truncate mt-0.5">{subtitle}</p>}
        </div>
        <button
          type="button"
          data-testid="manager_navigation-header-button-command-palette"
          aria-label={t('COMMAND_PALETTE_OPEN_BUTTON')}
          onClick={onOpenCommandPalette}
          className="hidden sm:inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-input px-3 text-sm text-text-secondary hover:bg-page hover:text-primary motion-safe:transition-all motion-safe:duration-200 motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          <Search size={18} strokeWidth={2} aria-hidden="true" />
          <span>{t('COMMAND_PALETTE_OPEN_BUTTON')}</span>
          <span className="ml-1 hidden lg:inline-flex items-center gap-1 text-xs text-text-disabled">
            <Command size={18} strokeWidth={2} aria-hidden="true" />
            {t('SHORTCUT_KEY_COMMAND_PALETTE')}
          </span>
        </button>
        <div className="hidden xl:flex items-center gap-2 border-l border-border pl-4" aria-label={ManagerEnvConfig.gymName}>
          <Building2 size={18} strokeWidth={2} className="text-text-secondary" aria-hidden="true" />
          <span className="max-w-56 truncate text-sm font-medium text-text-secondary" title={ManagerEnvConfig.gymName}>{ManagerEnvConfig.gymName}</span>
        </div>
        
      </div>
      <div className="flex flex-wrap items-center gap-4">


        {/* QR Scanner Mode (Kiosk) — visible on all breakpoints (Rule 64) */}
        <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "min-h-11 min-w-11 p-2 text-text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-all border border-transparent hover:border-border flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_navigation-header-button-scanner"
          onClick={() => router.push(MANAGER_HEADER_NAVIGATION.scanner)}
          aria-label={t("COPY_OPEN_QR_SCANNER_KIOSK_MODE")}
          
         type="button">
          <QrCode size={18} strokeWidth={2}/>
          <span className="hidden sm:inline text-sm font-medium">{t("COPY_SCANNER")}</span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        <button
          type="button"
          data-testid="manager_navigation-header-button-data-density"
          aria-label={densityT('COPY_TOGGLE_DATA_DENSITY')}
          aria-pressed={density === 'compact'}
          title={densityT(density === 'compact' ? 'COPY_DENSITY_COMPACT' : 'COPY_DENSITY_COMFORTABLE')}
          onClick={toggleDensity}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-input px-3 text-xs font-medium text-text-secondary hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <span aria-hidden="true">≡</span>
          <span className="hidden sm:inline">{densityT(density === 'compact' ? 'COPY_DENSITY_COMPACT' : 'COPY_DENSITY_COMFORTABLE')}</span>
        </button>

        {/* Notifications — navigation only; notification business data belongs to the Notifications feature. */}
        <Link data-testid="manager_navigation-header-link-notifications"
          href={MANAGER_HEADER_NAVIGATION.notifications}
          aria-label={t("COPY_OPEN_NOTIFICATIONS")}
          className="relative min-h-11 min-w-11 p-2 text-text-secondary hover:text-primary hover:bg-input rounded-lg motion-safe:transition-all border border-transparent hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-200 ease-in-out"
        >
          <Bell size={18} strokeWidth={2} aria-hidden="true" />
        </Link>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-11 h-11 rounded-full flex items-center justify-center text-on-primary text-sm font-bold cursor-pointer motion-safe:transition-all motion-safe:hover:scale-105 border border-border bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_navigation-header-button-profile"
            onClick={() => setShowProfile((value) => !value)}
            aria-haspopup="menu"
            aria-expanded={showProfile}
            aria-controls="manager-navigation-profile-menu"
            aria-label={t("COPY_TOGGLE_PROFILE_MENU")}
            
           type="button">
            {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'A') : 'A'}
          </button>

          {showProfile && (
            <div id="manager-navigation-profile-menu" role="menu" aria-label={t("COPY_TOGGLE_PROFILE_MENU")} className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30">
              <div className="px-4 py-3 border-b border-border bg-overlay">
                <p className="text-sm font-semibold text-text-primary">{mounted ? (user?.name || t("TEXT_MANAGER_DEFAULT_NAME")) : t("TEXT_MANAGER_DEFAULT_NAME")}</p>
                <p className="text-xs text-text-secondary">{mounted ? (user?.email || '') : ''}</p>
                {(mounted && user?.role) && <p className="text-xs text-warning-text bg-warning-bg inline-block px-1.5 rounded-md font-medium mt-0.5">{user.role}</p>}
              </div>
              <div className="py-1">
                <Link data-testid="manager_navigation-header-link-profile" href={MANAGER_HEADER_NAVIGATION.profile} role="menuitem" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-input motion-safe:transition-all motion-safe:duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" onClick={() => setShowProfile(false)}>
                  <User size={18} strokeWidth={2}/>{t("COPY_MY_PROFILE")}</Link>
                <Link data-testid="manager_navigation-header-link-settings" href={MANAGER_HEADER_NAVIGATION.settings} role="menuitem" className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-primary hover:bg-input motion-safe:transition-all motion-safe:duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page" onClick={() => setShowProfile(false)}>
                  <Settings size={18} strokeWidth={2}/>{t("COPY_SETTINGS")}</Link>
              </div>
              <div className="border-t border-border py-1 bg-overlay">
                <button data-testid="manager_navigation-header-button-logout"
                  role="menuitem"
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger-text hover:bg-danger-bg font-medium motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
                  onClick={() => { setShowProfile(false); logout(); }}
                 type="button">
                  <LogOut size={18} strokeWidth={2}/>{t("COPY_LOG_OUT")}</button>
              </div>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}
