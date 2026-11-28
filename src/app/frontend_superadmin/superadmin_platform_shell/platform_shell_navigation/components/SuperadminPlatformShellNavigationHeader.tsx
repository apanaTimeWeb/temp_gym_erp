// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellNavigationHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the single persistent fixed Superadmin shell header matching Trainer Obsidian header with notifications bell, theme toggle, and profile dropdown.
import { Suspense, useEffect, useRef, useState } from 'react';

import { Bell, Building2, ChevronRight, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeToggle } from '@/components/ThemeToggle';

import { SuperadminPlatformShellNavigationHeaderProfile } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/components/SuperadminPlatformShellNavigationHeaderProfile';
import { SUPERADMIN_PLATFORM_SHELL_NAVIGATION_ROUTES } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/config/superadmin_platform_shell_navigation.url_config';
import { getSuperadminRouteHeaderConfig } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/constants/superadmin_platform_shell_navigation_route_header_config.constants';

import type { SuperadminPlatformShellLayoutHeaderProps } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/types/superadmin_platform_shell_navigation.types';

interface SuperadminHeaderNotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: string;
  priority: 'high' | 'medium' | 'info';
  read: boolean;
}

const DEFAULT_SUPERADMIN_HEADER_NOTIFICATIONS: SuperadminHeaderNotificationItem[] = [
  {
    id: 'sa-notif-1',
    title: 'New Enterprise Gym Onboarded',
    description: 'Apex Iron Club completed provisioning across 4 branches.',
    time: '12m ago',
    category: 'Tenants',
    priority: 'info',
    read: false,
  },
  {
    id: 'sa-notif-2',
    title: 'Overdue Invoice Alert',
    description: '2 tenant billing cycles have pending settlement retries.',
    time: '48m ago',
    category: 'Billing',
    priority: 'high',
    read: false,
  },
  {
    id: 'sa-notif-3',
    title: 'Nightly DB Snapshot Verified',
    description: 'Automated pg_dump backup checksum passed across all shards.',
    time: '3h ago',
    category: 'System Ops',
    priority: 'medium',
    read: true,
  },
];

function SuperadminHeaderTitle() {
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  const pathname = usePathname();
  const { titleKey, subtitleKey } = getSuperadminRouteHeaderConfig(pathname);

  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="hidden sm:inline-flex items-center justify-center w-7 h-7 rounded-lg border border-orange-500/35 bg-orange-500/15 text-[#FF5A1F] shrink-0 shadow-[0_2px_10px_rgba(255,90,31,0.22)]" aria-hidden="true">
          <Building2 size={15} strokeWidth={2.2} />
        </span>
        <h1 className="text-base sm:text-page-title font-bold text-white truncate">{t(titleKey)}</h1>
        <span className="hidden sm:inline-flex items-center rounded-md border border-cyan-400/35 bg-cyan-500/15 px-2 py-0.5 text-[11px] font-semibold text-cyan-300 shrink-0 shadow-[0_2px_8px_rgba(34,211,238,0.16)]">
          Platform HQ
        </span>
      </div>
      <p className="hidden sm:block text-xs text-slate-300/80 mt-0.5 ps-9 truncate">{t(subtitleKey)}</p>
    </div>
  );
}

/**
 * @description Renders LayoutHeader within the owning Superadmin feature module matching Trainer shell header design.
 * @dependencies Uses only dependencies declared in this module file and documented feature infrastructure.
 * @edge-case Preserves documented loading, empty, error, disabled, retry, and repeated-action behavior.
 */
export default function SuperadminPlatformShellNavigationHeader({
  isSidebarCollapsed = false,
  isMobileSidebarOpen = false,
  isMobileViewport = false,
  onToggleSidebar,
}: SuperadminPlatformShellLayoutHeaderProps = {}) {
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<SuperadminHeaderNotificationItem[]>(DEFAULT_SUPERADMIN_HEADER_NOTIFICATIONS);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((item) => !item.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowNotifications(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleToggle = () => {
    if (onToggleSidebar) {
      onToggleSidebar();
    } else {
      window.dispatchEvent(new Event('toggle-sidebar'));
    }
  };

  const notificationsHref = `${SUPERADMIN_PLATFORM_SHELL_NAVIGATION_ROUTES.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.COMMUNICATION}/communication_notifications`;

  return (
    <header
      className={`superadmin-header ${isSidebarCollapsed ? 'superadmin-header-collapsed' : 'superadmin-header-expanded'} bg-gradient-to-r from-[#0B0F19]/95 via-[#11182A]/95 to-[#19132B]/95 border-b border-orange-500/25 backdrop-blur-xl px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 text-white shadow-[0_4px_24px_rgba(0,0,0,0.35)] motion-safe:transition-all motion-safe:duration-base`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="md:hidden min-w-10 min-h-10 shrink-0 inline-flex items-center justify-center text-orange-400 bg-orange-500/15 hover:bg-orange-500/25 rounded-xl border border-orange-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 cursor-pointer"
          onClick={handleToggle}
          id="superadmin-sidebar-toggle"
          aria-label={t('ui.toggle_sidebar_d4bbf74f')}
          aria-controls="superadmin-sidebar"
          aria-expanded={isMobileViewport ? isMobileSidebarOpen : !isSidebarCollapsed}
          data-testid="SuperadminPlatformShellLayoutStyles-superadmin-header-superadmin-header-toggle-sidebar"
        >
          <Menu size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <Suspense fallback={<div className="min-w-0 h-10 flex-1" />}>
          <SuperadminHeaderTitle />
        </Suspense>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <ThemeToggle />

        <div
          ref={notificationsRef}
          className="relative"
          onMouseEnter={() => setShowNotifications(true)}
          onMouseLeave={() => setShowNotifications(false)}
        >
          <Link
            href={notificationsHref}
            aria-label="Open notifications"
            aria-expanded={showNotifications}
            aria-haspopup="true"
            onClick={(event) => {
              if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                setShowNotifications((prev) => !prev);
              }
            }}
            className="relative min-w-10 min-h-10 inline-flex items-center justify-center rounded-xl border border-sky-400/35 bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 hover:border-sky-400/60 hover:text-white motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shadow-[0_2px_10px_rgba(56,189,248,0.18)]"
          >
            <Bell size={18} strokeWidth={2} aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute top-2 end-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#0E1525] shadow-[0_0_8px_rgba(244,63,94,0.9)]" aria-hidden="true" />
            )}
          </Link>

          {showNotifications && (
            <div className="pt-2 absolute end-0 top-full z-50">
              <div
                role="region"
                aria-label="Notifications Dropdown"
                className="w-80 sm:w-88 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-sky-500/35 bg-[#0E1526]/98 backdrop-blur-2xl shadow-[0_20px_48px_rgba(0,0,0,0.82)] overflow-hidden text-white"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-sky-500/20 bg-sky-950/35">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-white">Notifications</span>
                    {unreadCount > 0 ? (
                      <span className="rounded-full bg-sky-500/20 border border-sky-400/40 px-2 py-0.5 text-[10px] font-semibold text-sky-300">
                        {unreadCount} New
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-800 border border-slate-700 px-2 py-0.5 text-[10px] font-medium text-slate-400">
                        All caught up
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))}
                      className="text-[11px] font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-white/[0.06]">
                  {notifications.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)))}
                      className={`w-full p-3.5 hover:bg-white/[0.05] transition-colors cursor-pointer flex gap-3 text-left ${!item.read ? 'bg-sky-500/[0.06]' : ''}`}
                    >
                      <div className="mt-1 shrink-0">
                        <span
                          className={`inline-block h-2 w-2 rounded-full ${
                            !item.read
                              ? item.priority === 'high'
                                ? 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.75)]'
                                : 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.75)]'
                              : 'bg-slate-600'
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className={`text-xs font-semibold truncate ${!item.read ? 'text-white' : 'text-slate-300'}`}>{item.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0 font-mono">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                        <span className="mt-1.5 inline-block text-[10px] text-sky-400/90 font-medium">{item.category}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-2 border-t border-sky-500/20 bg-sky-950/25">
                  <Link
                    href={notificationsHref}
                    onClick={() => setShowNotifications(false)}
                    className="flex items-center justify-center gap-1.5 w-full py-2 text-xs font-semibold text-sky-300 hover:text-white hover:bg-sky-500/20 rounded-xl transition-all"
                  >
                    <span>View All Notifications</span>
                    <ChevronRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <SuperadminPlatformShellNavigationHeaderProfile />
      </div>
    </header>
  );
}
