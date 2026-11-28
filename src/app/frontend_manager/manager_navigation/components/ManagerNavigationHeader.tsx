// RESPONSIBILITY: Renders ManagerNavigationHeader matching the Trainer obsidian glass header, branch switcher, notifications dropdown, profile menu, and centered logout modal.
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import {
  Bell,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  Command,
  LogOut,
  MapPin,
  Menu,
  QrCode,
  Search,
  Settings,
  SlidersHorizontal,
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ThemeToggle } from '@/components/ui/theme_toggle/ThemeToggle';
import { getUser, logout } from '@/lib/api';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { useManagerInfrastructureMounted } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureMounted';
import { useManagerInfrastructureDataDensity } from '@/app/frontend_manager/manager_infrastructure/hooks/useManagerInfrastructureDataDensity';

import { MANAGER_HEADER_NAVIGATION } from '@/app/frontend_manager/manager_navigation/constants/ManagerNavigationHeaderNavigationConfig';
import type { ManagerNavigationHeaderProps } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationLayoutTypes';

interface ManagerHeaderNotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: string;
  priority: 'high' | 'medium' | 'info';
  read: boolean;
  branch: string;
}

const DEFAULT_MANAGER_HEADER_NOTIFICATIONS: ManagerHeaderNotificationItem[] = [
  {
    id: 'mgr-notif-1',
    title: 'Membership Renewal Due',
    description: '8 active memberships expire within the next 48 hours.',
    time: '12m ago',
    category: 'Plans',
    priority: 'high',
    read: false,
    branch: 'Main Branch',
  },
  {
    id: 'mgr-notif-2',
    title: 'Maintenance Verification Pending',
    description: 'Treadmill #4 belt service completed by vendor — confirm floor readiness.',
    time: '38m ago',
    category: 'Maintenance',
    priority: 'medium',
    read: false,
    branch: 'Main Branch',
  },
  {
    id: 'mgr-notif-3',
    title: 'Daily Collection Synced',
    description: 'Morning POS & membership payments settled across UPI and Card.',
    time: '2h ago',
    category: 'Finance',
    priority: 'info',
    read: false,
    branch: 'Main Branch',
  },
];

const DEFAULT_MANAGER_BRANCHES = [
  { id: 'main', name: 'Main Branch', location: 'Andheri East · Floor 1–3' },
  { id: 'downtown', name: 'Downtown Flagship', location: 'Lower Parel · Studio A' },
  { id: 'westside', name: 'Westside Club', location: 'Bandra West · Strength Wing' },
  { id: 'north', name: 'North Campus', location: 'Powai · Functional Turf' },
] as const;

export default function ManagerNavigationHeader({
  title,
  subtitle,
  branchName,
  isSidebarCollapsed = false,
  isMobileSidebarOpen = false,
  isMobileViewport = false,
  onToggleSidebar,
  onOpenCommandPalette,
}: ManagerNavigationHeaderProps) {
  const t = useTranslations('MANAGER_SHELL');
  const densityT = useTranslations('MANAGER_INFRASTRUCTURE');
  const { density, toggleDensity } = useManagerInfrastructureDataDensity();

  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const [selectedBranchOverride, setSelectedBranchOverride] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notifications, setNotifications] = useState<ManagerHeaderNotificationItem[]>(DEFAULT_MANAGER_HEADER_NOTIFICATIONS);
  const [hour, setHour] = useState<number>(-1);

  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);
  const profileMenuId = useId();
  const mounted = useManagerInfrastructureMounted();
  const user = getUser();

  const activeBranchLabel = selectedBranchOverride ?? branchName ?? 'Main Branch';
  const unreadCount = notifications.filter((item) => !item.read).length;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHour(new Date().getHours());
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const greeting =
    hour < 0
      ? 'Welcome'
      : hour < 12
        ? 'Good Morning'
        : hour < 17
          ? 'Good Afternoon'
          : hour < 21
            ? 'Good Evening'
            : 'Good Night';

  const displayUserName = mounted ? (user?.name || t('TEXT_MANAGER_DEFAULT_NAME')) : t('TEXT_MANAGER_DEFAULT_NAME');
  const displayUserEmail = mounted ? (user?.email || '') : '';
  const displayUserRole = mounted && user?.role ? user.role : t('TEXT_GYM_MANAGER');

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (showProfile) {
          event.preventDefault();
          setShowProfile(false);
          profileRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
        }
        setShowNotifications(false);
        setShowBranches(false);
        setShowLogoutModal(false);
        return;
      }
      if (showProfile && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        const items = Array.from(profileRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
        if (!items.length) return;
        event.preventDefault();
        const index = items.indexOf(document.activeElement as HTMLElement);
        items[event.key === 'ArrowDown' ? (index + 1) % items.length : (index - 1 + items.length) % items.length]?.focus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) setShowProfile(false);
      if (notificationsRef.current && !notificationsRef.current.contains(target)) setShowNotifications(false);
      if (branchRef.current && !branchRef.current.contains(target)) setShowBranches(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showProfile]);

  const handleToggleSidebar = () => {
    if (onToggleSidebar) {
      onToggleSidebar();
      return;
    }
    window.dispatchEvent(new Event('toggle-sidebar'));
  };

  return (
    <header
      className={`manager-header ${isSidebarCollapsed ? 'manager-header-collapsed' : 'manager-header-expanded'} bg-gradient-to-r from-[#0B0F19]/95 via-[#11182A]/95 to-[#19132B]/95 border-b border-orange-500/25 backdrop-blur-xl px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 text-white shadow-[0_4px_24px_rgba(0,0,0,0.35)] motion-safe:transition-all motion-safe:duration-base`}
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <button
          data-testid="manager_navigation-header-button-sidebar-toggle"
          aria-label={t('COPY_TOGGLE_SIDEBAR')}
          aria-controls="manager-sidebar"
          aria-expanded={isMobileViewport ? isMobileSidebarOpen : !isSidebarCollapsed}
          className="md:hidden min-w-10 min-h-10 shrink-0 inline-flex items-center justify-center text-orange-400 bg-orange-500/15 hover:bg-orange-500/25 rounded-xl border border-orange-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 cursor-pointer"
          onClick={handleToggleSidebar}
          type="button"
        >
          <Menu size={18} strokeWidth={2} aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="hidden sm:inline-flex items-center justify-center w-7 h-7 rounded-lg border border-orange-500/35 bg-orange-500/15 text-[#FF5A1F] shrink-0 shadow-[0_2px_10px_rgba(255,90,31,0.22)]" aria-hidden="true">
              <Building2 size={15} strokeWidth={2.2} />
            </span>
            <h1 className="text-base sm:text-page-title font-bold text-white truncate">{title}</h1>

            {activeBranchLabel && (
              <div
                ref={branchRef}
                className="relative hidden lg:inline-flex shrink-0"
                onMouseEnter={() => {
                  setShowBranches(true);
                  setShowNotifications(false);
                  setShowProfile(false);
                }}
                onMouseLeave={() => setShowBranches(false)}
              >
                <button
                  type="button"
                  onClick={() => {
                    setShowBranches((prev) => !prev);
                    setShowNotifications(false);
                    setShowProfile(false);
                  }}
                  aria-expanded={showBranches}
                  aria-haspopup="listbox"
                  className="inline-flex items-center gap-1 rounded-md border border-cyan-400/35 bg-cyan-500/15 hover:bg-cyan-500/25 px-2 py-0.5 text-[11px] font-semibold text-cyan-300 shrink-0 shadow-[0_2px_8px_rgba(34,211,238,0.16)] transition-colors cursor-pointer"
                >
                  <span>{activeBranchLabel}</span>
                  <ChevronDown size={11} className={`transition-transform ${showBranches ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {showBranches && (
                  <div className="pt-2 absolute start-0 top-full z-50">
                    <div
                      role="listbox"
                      aria-label={ManagerEnvConfig.gymName}
                      className="w-64 rounded-2xl border border-cyan-500/35 bg-[#0E1526]/98 backdrop-blur-2xl shadow-[0_20px_48px_rgba(0,0,0,0.82)] overflow-hidden p-1.5 space-y-1 text-white"
                    >
                      <div className="px-2.5 py-1.5 border-b border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">{ManagerEnvConfig.gymName} · Branches</p>
                      </div>
                      {DEFAULT_MANAGER_BRANCHES.map((branch) => {
                        const isSelected = activeBranchLabel === branch.name;
                        return (
                          <button
                            key={branch.id}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setSelectedBranchOverride(branch.name);
                              setShowBranches(false);
                            }}
                            className={`w-full flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-start text-xs transition-colors cursor-pointer ${isSelected ? 'bg-cyan-500/20 text-white border border-cyan-400/40' : 'text-slate-300 hover:bg-white/[0.06] hover:text-white border border-transparent'}`}
                          >
                            <span className="flex items-start gap-2 min-w-0">
                              <MapPin size={13} className={isSelected ? 'text-cyan-300 mt-0.5 shrink-0' : 'text-slate-400 mt-0.5 shrink-0'} aria-hidden="true" />
                              <span className="min-w-0">
                                <span className="block font-semibold truncate">{branch.name}</span>
                                <span className="block text-[10px] text-slate-400 truncate">{branch.location}</span>
                              </span>
                            </span>
                            {isSelected && <Check size={13} className="text-cyan-300 shrink-0" aria-hidden="true" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {subtitle && <p className="hidden sm:block text-xs text-slate-300/80 mt-0.5 ps-9 truncate">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Command Palette */}
        <button
          type="button"
          data-testid="manager_navigation-header-button-command-palette"
          aria-label={t('COMMAND_PALETTE_OPEN_BUTTON')}
          onClick={onOpenCommandPalette}
          className="hidden md:inline-flex h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-orange-500/15 hover:border-orange-400/50 px-3 text-xs font-medium text-slate-200 hover:text-white motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
        >
          <Search size={15} strokeWidth={2.2} className="text-orange-400" aria-hidden="true" />
          <span className="hidden xl:inline">{t('COMMAND_PALETTE_OPEN_BUTTON')}</span>
          <span className="inline-flex items-center gap-0.5 text-[11px] text-slate-400 bg-white/[0.06] px-1.5 py-0.5 rounded-md border border-white/10">
            <Command size={11} strokeWidth={2} aria-hidden="true" />
            {t('SHORTCUT_KEY_COMMAND_PALETTE')}
          </span>
        </button>

        {/* QR Scanner */}
        <button
          data-testid="manager_navigation-header-button-scanner"
          onClick={() => router.push(MANAGER_HEADER_NAVIGATION.scanner)}
          aria-label={t('COPY_OPEN_QR_SCANNER_KIOSK_MODE')}
          title={t('COPY_SCANNER')}
          type="button"
          className="h-10 min-w-10 px-2.5 inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-400/35 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-300/60 hover:text-white motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
        >
          <QrCode size={17} strokeWidth={2} aria-hidden="true" />
          <span className="hidden xl:inline text-xs font-semibold">{t('COPY_SCANNER')}</span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Data Density */}
        <button
          type="button"
          data-testid="manager_navigation-header-button-data-density"
          aria-label={densityT('COPY_TOGGLE_DATA_DENSITY')}
          aria-pressed={density === 'compact'}
          title={densityT(density === 'compact' ? 'COPY_DENSITY_COMPACT' : 'COPY_DENSITY_COMFORTABLE')}
          onClick={toggleDensity}
          className="hidden sm:inline-flex h-10 items-center gap-1.5 rounded-xl border border-purple-400/35 bg-purple-500/15 hover:bg-purple-500/25 px-2.5 text-xs font-semibold text-purple-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring transition-all cursor-pointer"
        >
          <SlidersHorizontal size={14} aria-hidden="true" />
          <span className="hidden xl:inline">{densityT(density === 'compact' ? 'COPY_DENSITY_COMPACT' : 'COPY_DENSITY_COMFORTABLE')}</span>
        </button>

        {/* Notifications */}
        <div
          ref={notificationsRef}
          className="relative"
          onMouseEnter={() => {
            setShowNotifications(true);
            setShowProfile(false);
          }}
          onMouseLeave={() => setShowNotifications(false)}
        >
          <Link
            data-testid="manager_navigation-header-link-notifications"
            href={MANAGER_HEADER_NAVIGATION.notifications}
            aria-label={t('COPY_OPEN_NOTIFICATIONS')}
            aria-expanded={showNotifications}
            aria-haspopup="true"
            onClick={(event) => {
              if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                setShowNotifications((prev) => !prev);
                setShowProfile(false);
              }
            }}
            className="relative h-10 w-10 inline-flex items-center justify-center rounded-xl border border-sky-400/35 bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 hover:border-sky-400/60 hover:text-white motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shadow-[0_2px_10px_rgba(56,189,248,0.18)]"
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
                      onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
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
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/70 font-medium">{item.branch}</span>
                          <span className="text-[10px] text-sky-400/90 font-medium">{item.category}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-2 border-t border-sky-500/20 bg-sky-950/25">
                  <Link
                    href={MANAGER_HEADER_NAVIGATION.notifications}
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

        {/* Profile */}
        <div
          className="relative"
          ref={profileRef}
          onMouseEnter={() => {
            setShowProfile(true);
            setShowNotifications(false);
          }}
          onMouseLeave={() => setShowProfile(false)}
        >
          <button
            data-testid="manager_navigation-header-button-profile"
            onClick={() => {
              setShowProfile((value) => !value);
              setShowNotifications(false);
            }}
            aria-haspopup="menu"
            aria-expanded={showProfile}
            aria-controls={profileMenuId}
            aria-label={t('COPY_TOGGLE_PROFILE_MENU')}
            type="button"
            className="flex items-center gap-2 px-2 sm:px-2.5 py-1.5 rounded-xl border border-orange-500/35 bg-white/[0.06] hover:bg-orange-500/15 hover:border-orange-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base cursor-pointer"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-[0_3px_12px_rgba(255,90,31,0.45)]" aria-hidden="true">
              {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'M') : 'M'}
            </span>
            <span className="hidden sm:flex flex-col items-start min-w-0 text-start">
              <span className="text-[11px] leading-none text-amber-300 font-medium">{greeting}</span>
              <strong className="text-[13px] leading-tight font-semibold text-white truncate max-w-28">{displayUserName}</strong>
            </span>
            <ChevronDown size={13} className={`hidden sm:block text-slate-300 motion-safe:transition-transform ${showProfile ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>

          {showProfile && (
            <div className="pt-2 absolute end-0 top-full z-50">
              <div
                id={profileMenuId}
                role="menu"
                aria-label={t('COPY_TOGGLE_PROFILE_MENU')}
                className="w-64 max-w-[calc(100vw-1.5rem)] bg-[#0E1526]/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.82)] border border-orange-500/35 overflow-hidden p-2 space-y-1.5 text-white"
              >
                <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-gradient-to-r from-[#FF5A1F]/20 via-purple-500/10 to-transparent border border-orange-500/25">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-[0_3px_12px_rgba(255,90,31,0.45)]" aria-hidden="true">
                    {displayUserName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-white truncate">{displayUserName}</p>
                    <p className="text-[11px] text-slate-300 truncate">{displayUserEmail || displayUserRole}</p>
                  </div>
                </div>
                <div className="px-2 py-1 space-y-1 text-xs border-b border-white/10 pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Role:</span>
                    <span className="font-semibold text-amber-300">{displayUserRole}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-500/35 bg-emerald-500/15 text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" aria-hidden="true" />
                      Online
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Link
                    data-testid="manager_navigation-header-link-profile"
                    href={MANAGER_HEADER_NAVIGATION.profile}
                    role="menuitem"
                    className="flex items-center gap-2 min-h-10 px-2.5 py-2 rounded-lg text-xs font-medium text-sky-300 hover:text-white hover:bg-sky-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-sky-500/20"
                    onClick={() => setShowProfile(false)}
                  >
                    <User size={15} strokeWidth={2} aria-hidden="true" />{t('COPY_MY_PROFILE')}
                  </Link>
                  <Link
                    data-testid="manager_navigation-header-link-settings"
                    href={MANAGER_HEADER_NAVIGATION.settings}
                    role="menuitem"
                    className="flex items-center gap-2 min-h-10 px-2.5 py-2 rounded-lg text-xs font-medium text-emerald-300 hover:text-white hover:bg-emerald-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-emerald-500/20"
                    onClick={() => setShowProfile(false)}
                  >
                    <Settings size={15} strokeWidth={2} aria-hidden="true" />{t('COPY_SETTINGS')}
                  </Link>
                </div>
                <div className="border-t border-white/10 pt-1.5">
                  <button
                    data-testid="manager_navigation-header-button-logout"
                    role="menuitem"
                    className="w-full flex items-center gap-2 min-h-10 px-2.5 py-2 rounded-lg text-xs text-rose-300 border border-rose-500/30 bg-rose-500/15 hover:bg-rose-500/25 hover:text-white font-semibold motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                    onClick={() => { setShowProfile(false); setShowLogoutModal(true); }}
                    type="button"
                  >
                    <LogOut size={15} strokeWidth={2} aria-hidden="true" />{t('COPY_LOG_OUT')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showLogoutModal && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="manager-logout-title"
          aria-describedby="manager-logout-desc"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
        >
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            onClick={() => setShowLogoutModal(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-rose-500/35 bg-[#0E1526]/98 p-6 text-white shadow-[0_24px_64px_rgba(0,0,0,0.85)] focus:outline-none">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/35 text-rose-400 flex items-center justify-center mb-3 shadow-[0_4px_16px_rgba(244,63,94,0.25)]">
                <LogOut size={22} strokeWidth={2.2} aria-hidden="true" />
              </div>
              <h2 id="manager-logout-title" className="text-white text-lg font-bold text-center">{t('COPY_LOG_OUT')}</h2>
              <p id="manager-logout-desc" className="text-slate-400 text-sm mt-1 text-center">
                Are you sure you want to end your current manager session?
              </p>
            </div>

            <div className="my-4 rounded-xl bg-white/[0.04] border border-white/10 p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] text-white flex items-center justify-center text-sm font-bold shrink-0" aria-hidden="true">
                {displayUserName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{displayUserName}</p>
                <p className="text-[11px] text-slate-400 truncate">{displayUserEmail || displayUserRole}</p>
              </div>
              <span className="text-[10px] font-bold uppercase text-amber-300 bg-amber-500/15 border border-amber-400/30 rounded px-1.5 py-0.5 shrink-0">
                {displayUserRole}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="min-h-10 border border-white/15 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                {t('TEXT_CANCEL')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                className="min-h-10 bg-rose-600 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-rose-500 transition-colors cursor-pointer flex items-center gap-1.5 shadow-[0_4px_14px_rgba(225,29,72,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <LogOut size={14} strokeWidth={2} aria-hidden="true" />
                <span>{t('COPY_LOG_OUT')}</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
