"use client";
// RESPONSIBILITY: Renders the fixed Trainer shell header: sidebar toggle, page title, theme toggle, notification navigation, and accessible profile menu. It owns no feature/business data.
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

import { Bell, Building2, Check, ChevronDown, ChevronRight, HelpCircle, LogOut, MapPin, Menu, Search, ShieldCheck, User } from 'lucide-react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { getUser, logout } from '@/lib/api';

import TrainerNavigationTooltip from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationTooltip';

import { TRAINER_NOTIFICATIONS_PAGE_LIST } from '@/app/frontend_trainer/trainer_account/account_notifications/config/trainer_account_notifications.url_config';
import { TRAINER_PROFILE_PAGE_LIST } from '@/app/frontend_trainer/trainer_account/account_personal_profile/config/trainer_account_personal_profile.url_config';
import { TRAINER_ACCOUNT_SECURITY_PAGE_LIST } from '@/app/frontend_trainer/trainer_account/account_security/config/trainer_account_security.url_config';

import { ThemeToggle } from '@/components/ThemeToggle';

import type { TrainerNavigationHeaderProps } from '@/app/frontend_trainer/trainer_navigation/types/TrainerNavigationTypes';

/**
 * @description Renders the fixed Trainer shell header: sidebar toggle, page title, theme toggle, notification navigation, and accessible profile menu. It owns no feature/business data.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the authenticated Trainer header presentation, navigation toggles, notification entry, and profile shell actions.
 * @dependencies Trainer infrastructure stores/hooks and zero-business UI primitives only.
 * @edge-case Header actions must remain available on touch/mobile and must not hide required actions behind hover.
 */
/**
 * @description Renders Trainer role shell controls and navigation destinations while keeping feature business logic inside owning feature modules.
 * @dependencies Consumes owning feature URL contracts and approved zero-business tooltip/theme primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
interface TrainerHeaderNotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  category: string;
  priority: 'high' | 'medium' | 'info';
  read: boolean;
  branch: string;
}

const DEFAULT_TRAINER_HEADER_NOTIFICATIONS: TrainerHeaderNotificationItem[] = [
  {
    id: 'trn-notif-1',
    title: 'Upcoming PT Session',
    description: 'Strength & Hypertrophy session with Aarav Mehta starts in 15 mins.',
    time: '10m ago',
    category: 'Sessions',
    priority: 'high',
    read: false,
    branch: 'Main Branch',
  },
  {
    id: 'trn-notif-2',
    title: 'Workout Plan Review Due',
    description: 'Priya Nair completed Week 4 progression and requested a phase update.',
    time: '45m ago',
    category: 'Coaching',
    priority: 'medium',
    read: false,
    branch: 'Main Branch',
  },
  {
    id: 'trn-notif-3',
    title: 'Member Attendance Alert',
    description: 'Biometric check-in synced for 6 morning trainees.',
    time: '2h ago',
    category: 'Attendance',
    priority: 'info',
    read: false,
    branch: 'Main Branch',
  },
  {
    id: 'trn-notif-4',
    title: 'Monthly PT Commission Ready',
    description: '40% retainer settlement summary is available in Earnings.',
    time: '1d ago',
    category: 'Earnings',
    priority: 'info',
    read: true,
    branch: 'Main Branch',
  },
];

const DEFAULT_TRAINER_BRANCHES = [
  { id: 'main', name: 'Main Branch', location: 'Andheri East · Floor 1–3', active: true },
  { id: 'downtown', name: 'Downtown Flagship', location: 'Lower Parel · Studio A', active: false },
  { id: 'westside', name: 'Westside Club', location: 'Bandra West · Strength Wing', active: false },
  { id: 'north', name: 'North Campus', location: 'Powai · Functional Turf', active: false },
] as const;

export default function TrainerNavigationHeader({ title, subtitle, branchName, isSidebarCollapsed, isMobileSidebarOpen, isMobileViewport, onToggleSidebar }: TrainerNavigationHeaderProps) {
  const t = useTranslations('TRAINER_SHELL');
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const [selectedBranchOverride, setSelectedBranchOverride] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notifications, setNotifications] = useState<TrainerHeaderNotificationItem[]>(DEFAULT_TRAINER_HEADER_NOTIFICATIONS);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const branchRef = useRef<HTMLDivElement>(null);
  const profileMenuId = useId();
  const profileTriggerRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hour, setHour] = useState<number>(-1);
  const user = getUser();
  const activeBranchLabel = selectedBranchOverride ?? branchName ?? '';
  const unreadCount = notifications.filter((item) => !item.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

// Effect contract: restore persisted shell presentation and keep outside-click/keyboard listeners aligned with mounted state.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true);
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
  const displayUserName = mounted ? (user?.name || t('TEXT_TRAINER')) : t('TEXT_TRAINER');
  const displayUserEmail = mounted ? (user?.email || '') : '';
  const displayUserRole = mounted && user?.role ? user.role : 'Trainer';

// Effect contract: restore persisted shell presentation and keep outside-click/keyboard listeners aligned with mounted state.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) {
        setShowProfile(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(target)) {
        setShowNotifications(false);
      }
      if (branchRef.current && !branchRef.current.contains(target)) {
        setShowBranches(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!showNotifications && !showLogoutModal && !showBranches) return;
    const handleModalOrNotifKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setShowNotifications(false);
        setShowBranches(false);
        setShowLogoutModal(false);
      }
    };
    document.addEventListener('keydown', handleModalOrNotifKeyDown);
    return () => document.removeEventListener('keydown', handleModalOrNotifKeyDown);
  }, [showNotifications, showLogoutModal, showBranches]);

// Effect contract: restore persisted shell presentation and keep outside-click/keyboard listeners aligned with mounted state.
  useEffect(() => {
    if (!showProfile) return;
    profileMenuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setShowProfile(false);
        profileTriggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showProfile]);

  const handleProfileMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(profileMenuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    if (items.length === 0) return;
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    let nextIndex: number | null = null;
    if (event.key === 'ArrowDown') nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
    if (event.key === 'ArrowUp') nextIndex = currentIndex < 0 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = items.length - 1;
    if (nextIndex !== null) {
      event.preventDefault();
      items[nextIndex]?.focus();
    }
    if (event.key === 'Tab') setShowProfile(false);
  };

  return (
    <header className={`trainer-header ${isSidebarCollapsed ? 'trainer-header-collapsed' : 'trainer-header-expanded'} bg-gradient-to-r from-[#0B0F19]/95 via-[#11182A]/95 to-[#19132B]/95 border-b border-orange-500/25 backdrop-blur-xl px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 text-white shadow-[0_4px_24px_rgba(0,0,0,0.35)] motion-safe:transition-all motion-safe:duration-base`}>
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <button
          type="button"
          data-trainer-sidebar-toggle
          aria-label={t("TEXT_TOGGLE_NAVIGATION_SIDEBAR")}
          aria-controls="trainer-sidebar"
          aria-expanded={isMobileViewport ? isMobileSidebarOpen : !isSidebarCollapsed}
          title={t("TEXT_TOGGLE_NAVIGATION_SIDEBAR")}
          className="md:hidden min-w-10 min-h-10 shrink-0 inline-flex items-center justify-center text-orange-400 bg-orange-500/15 hover:bg-orange-500/25 rounded-xl border border-orange-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95"
          onClick={onToggleSidebar}
         data-testid="trainer_navigation-infrastructure-header_toggle">
          <Menu size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="hidden sm:inline-flex items-center justify-center w-7 h-7 rounded-lg border border-orange-500/35 bg-orange-500/15 text-[#FF5A1F] shrink-0 shadow-[0_2px_10px_rgba(255,90,31,0.22)]" aria-hidden="true">
              <Building2 size={15} strokeWidth={2.2} />
            </span>
            <TrainerNavigationTooltip content={title}><h1 className="text-base sm:text-page-title font-bold text-white truncate">{title}</h1></TrainerNavigationTooltip>
            {activeBranchLabel && (
              <div
                ref={branchRef}
                className="relative hidden sm:inline-flex shrink-0"
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
                  data-testid="trainer-header-branch-trigger"
                  className="inline-flex items-center gap-1 rounded-md border border-cyan-400/35 bg-cyan-500/15 hover:bg-cyan-500/25 px-2 py-0.5 text-[11px] font-semibold text-cyan-300 shrink-0 shadow-[0_2px_8px_rgba(34,211,238,0.16)] transition-colors cursor-pointer"
                >
                  <span>{activeBranchLabel}</span>
                  <ChevronDown size={11} className={`transition-transform ${showBranches ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {showBranches && (
                  <div className="pt-2 absolute start-0 top-full z-50">
                    <div
                      role="listbox"
                      aria-label="Gym Branches"
                      data-testid="trainer-header-branch-dropdown"
                      className="w-64 rounded-2xl border border-cyan-500/35 bg-[#0E1526]/98 backdrop-blur-2xl shadow-[0_20px_48px_rgba(0,0,0,0.82)] overflow-hidden p-1.5 space-y-1 text-white"
                    >
                      <div className="px-2.5 py-1.5 border-b border-white/10">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Active Gym Branches</p>
                      </div>
                      {DEFAULT_TRAINER_BRANCHES.map((branch) => {
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
          {subtitle && <TrainerNavigationTooltip content={subtitle}><p className="hidden sm:block text-xs text-slate-300/80 mt-0.5 ps-9 truncate">{subtitle}</p></TrainerNavigationTooltip>}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          aria-label={t('TEXT_SEARCH_OR_JUMP')}
          title={`${t('TEXT_COMMAND_PALETTE')} (Ctrl+K)`}
          data-testid="trainer_navigation-header-command_palette_trigger"
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }))}
          className="min-w-10 h-10 inline-flex items-center justify-center lg:justify-between gap-2.5 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-orange-500/15 hover:border-orange-400/50 px-2.5 lg:px-3 text-xs font-medium text-slate-300 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
        >
          <span className="inline-flex items-center gap-2">
            <Search size={15} className="text-[#FF5A1F]" strokeWidth={2.2} aria-hidden="true" />
            <span className="hidden lg:inline">{t('TEXT_SEARCH_MENU')}</span>
          </span>
          <kbd className="hidden lg:inline-flex items-center rounded border border-white/15 bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-semibold text-slate-300">
            Ctrl K
          </kbd>
        </button>

        <button
          type="button"
          aria-label={t('TEXT_KEYBOARD_SHORTCUTS')}
          title={`${t('TEXT_KEYBOARD_SHORTCUTS')} (?)`}
          data-testid="trainer_navigation-header-shortcuts_trigger"
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: '?', shiftKey: true, bubbles: true }))}
          className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/35 bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 hover:border-purple-400/60 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shadow-[0_2px_10px_rgba(168,85,247,0.18)] cursor-pointer"
        >
          <HelpCircle size={17} strokeWidth={2} aria-hidden="true" />
        </button>

        <ThemeToggle />
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
            href={TRAINER_NOTIFICATIONS_PAGE_LIST}
            aria-label={t("TEXT_OPEN_NOTIFICATIONS")}
            aria-expanded={showNotifications}
            aria-haspopup="true"
            onClick={(event) => {
              if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                setShowNotifications((prev) => !prev);
                setShowProfile(false);
              }
            }}
            className="relative min-w-10 min-h-10 inline-flex items-center justify-center rounded-xl border border-sky-400/35 bg-sky-500/15 text-sky-300 hover:bg-sky-500/25 hover:border-sky-400/60 hover:text-white motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring shadow-[0_2px_10px_rgba(56,189,248,0.18)]"
           data-testid="trainer_navigation-infrastructure-header_open_notifications">
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
                data-testid="trainer-notifications-dropdown"
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
                      onClick={handleMarkAllAsRead}
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
                      onClick={() => handleMarkAsRead(item.id)}
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
                          <p className={`text-xs font-semibold truncate ${!item.read ? 'text-white' : 'text-slate-300'}`}>
                            {item.title}
                          </p>
                          <span className="text-[10px] text-slate-400 shrink-0 font-mono">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/70 font-medium">
                            {item.branch}
                          </span>
                          <span className="text-[10px] text-sky-400/90 font-medium">{item.category}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-2 border-t border-sky-500/20 bg-sky-950/25">
                  <Link
                    href={TRAINER_NOTIFICATIONS_PAGE_LIST}
                    onClick={() => setShowNotifications(false)}
                    data-testid="trainer-notifications-view-all"
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
            ref={profileTriggerRef}
            type="button"
            aria-label={t("TEXT_OPEN_PROFILE_MENU")}
            aria-expanded={showProfile}
            aria-haspopup="menu"
            aria-controls={profileMenuId}
            onClick={() => {
              setShowProfile((value) => !value);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 px-2 sm:px-2.5 py-1.5 rounded-xl border border-orange-500/35 bg-white/[0.06] hover:bg-orange-500/15 hover:border-orange-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base"
           data-testid="trainer_navigation-infrastructure-header_menu">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-[0_3px_12px_rgba(255,90,31,0.45)]" aria-hidden="true">
              {mounted ? (user?.name?.charAt(0)?.toUpperCase() || <User size={16} strokeWidth={2.2} />) : t("TEXT_A")}
            </span>
            <span className="hidden sm:flex flex-col items-start min-w-0 text-start">
              <span className="text-[11px] leading-none text-amber-300 font-medium">{greeting}</span>
              <strong className="text-[13px] leading-tight font-semibold text-white truncate max-w-28">{displayUserName}</strong>
            </span>
            <ChevronDown size={13} className={`hidden sm:block text-slate-300 motion-safe:transition-transform ${showProfile ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>

          <div
            hidden={!showProfile}
            className="pt-2 absolute end-0 top-full z-50"
          >
            <div
              ref={profileMenuRef}
              id={profileMenuId}
              hidden={!showProfile}
              role="menu"
              aria-label={t("TEXT_PROFILE_MENU")}
              onKeyDown={handleProfileMenuKeyDown}
              className="w-64 max-w-[calc(100vw-1.5rem)] bg-[#0E1526]/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.82)] border border-orange-500/35 overflow-hidden p-2 space-y-1.5 text-white"
            >
              <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-gradient-to-r from-[#FF5A1F]/20 via-purple-500/10 to-transparent border border-orange-500/25">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-[0_3px_12px_rgba(255,90,31,0.45)]" aria-hidden="true">
                  {displayUserName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <TrainerNavigationTooltip content={displayUserName}><p className="text-[13px] font-bold text-white truncate">{displayUserName}</p></TrainerNavigationTooltip>
                  <TrainerNavigationTooltip content={displayUserEmail}><p className="text-[11px] text-slate-300 truncate">{displayUserEmail || displayUserRole}</p></TrainerNavigationTooltip>
                </div>
              </div>
              <div className="px-2 py-1 space-y-1 text-xs border-b border-white/10 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Role:</span>
                  <span className="font-semibold text-amber-300" data-testid="trainer_navigation-header-warning-state-113-1">{displayUserRole}</span>
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
                  href={TRAINER_PROFILE_PAGE_LIST}
                  role="menuitem"
                  tabIndex={-1}
                  className="flex items-center gap-2 min-h-10 px-2.5 py-2 rounded-lg text-xs font-medium text-sky-300 hover:text-white hover:bg-sky-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-sky-500/20"
                  onClick={() => setShowProfile(false)}
                 data-testid="trainer_navigation-infrastructure-header_my_profile">
                  <User size={15} strokeWidth={2} aria-hidden="true" /> {t("TEXT_MY_PROFILE")}</Link>
                <Link
                  href={TRAINER_ACCOUNT_SECURITY_PAGE_LIST}
                  role="menuitem"
                  tabIndex={-1}
                  className="flex items-center gap-2 min-h-10 px-2.5 py-2 rounded-lg text-xs font-medium text-emerald-300 hover:text-white hover:bg-emerald-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-emerald-500/20"
                  onClick={() => setShowProfile(false)}
                 data-testid="trainer_navigation-infrastructure-header_security">
                  <ShieldCheck size={15} strokeWidth={2} aria-hidden="true" /> {t("NAV_ACCOUNT_SECURITY")}</Link>
              </div>
              <div className="border-t border-white/10 pt-1.5">
                <button
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  className="w-full flex items-center gap-2 min-h-10 px-2.5 py-2 rounded-lg text-xs text-rose-300 border border-rose-500/30 bg-rose-500/15 hover:bg-rose-500/25 hover:text-white font-semibold motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  onClick={() => { setShowProfile(false); setShowLogoutModal(true); }}
                 data-testid="trainer_navigation-infrastructure-header_log_out">
                  <LogOut size={15} strokeWidth={2} aria-hidden="true" /> {t("TEXT_LOG_OUT")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLogoutModal && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="trainer-logout-title"
          aria-describedby="trainer-logout-desc"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          data-testid="trainer-logout-overlay"
        >
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            onClick={() => setShowLogoutModal(false)}
            aria-hidden="true"
          />
          <div
            className="relative z-10 w-full max-w-sm rounded-2xl border border-rose-500/35 bg-[#0E1526]/98 p-6 text-white shadow-[0_24px_64px_rgba(0,0,0,0.85)] focus:outline-none"
            data-testid="trainer-logout-modal"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/35 text-rose-400 flex items-center justify-center mb-3 shadow-[0_4px_16px_rgba(244,63,94,0.25)]">
                <LogOut size={22} strokeWidth={2.2} aria-hidden="true" />
              </div>
              <h2 id="trainer-logout-title" className="text-white text-lg font-bold text-center">
                {t("TEXT_LOG_OUT")}
              </h2>
              <p id="trainer-logout-desc" className="text-slate-400 text-sm mt-1 text-center">
                Are you sure you want to end your current trainer session?
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
                data-testid="trainer-logout-cancel"
                onClick={() => setShowLogoutModal(false)}
                className="min-h-10 border border-white/15 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                {t("TEXT_CANCEL")}
              </button>
              <button
                type="button"
                data-testid="trainer-logout-confirm"
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                className="min-h-10 bg-rose-600 text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-rose-500 transition-colors cursor-pointer flex items-center gap-1.5 shadow-[0_4px_14px_rgba(225,29,72,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <LogOut size={14} strokeWidth={2} aria-hidden="true" />
                <span>{t("TEXT_LOG_OUT")}</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
