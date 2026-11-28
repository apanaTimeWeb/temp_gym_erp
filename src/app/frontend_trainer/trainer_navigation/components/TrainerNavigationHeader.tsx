"use client";
// RESPONSIBILITY: Renders the fixed Trainer shell header: sidebar toggle, page title, theme toggle, notification navigation, and accessible profile menu. It owns no feature/business data.
import { useEffect, useId, useRef, useState } from 'react';

import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

import { Bell, ChevronDown, LogOut, Menu, User } from 'lucide-react';

import { useTranslations } from 'next-intl';

import Link from 'next/link';

import { getUser, logout } from '@/lib/api';

import TrainerNavigationTooltip from '@/app/frontend_trainer/trainer_navigation/components/TrainerNavigationTooltip';

import { TRAINER_NOTIFICATIONS_PAGE_LIST } from '@/app/frontend_trainer/trainer_account/account_notifications/config/trainer_account_notifications.url_config';
import { TRAINER_PROFILE_PAGE_LIST } from '@/app/frontend_trainer/trainer_account/account_personal_profile/config/trainer_account_personal_profile.url_config';

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
export default function TrainerNavigationHeader({ title, subtitle, isSidebarCollapsed, isMobileSidebarOpen, isMobileViewport, onToggleSidebar }: TrainerNavigationHeaderProps) {
  const t = useTranslations('TRAINER_SHELL');
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuId = useId();
  const profileTriggerRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hour, setHour] = useState<number>(-1);
  const user = getUser();

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
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <header className={`trainer-header ${isSidebarCollapsed ? 'trainer-header-collapsed' : 'trainer-header-expanded'} bg-header-translucent dark:bg-gradient-to-r dark:from-[#0E1420]/95 dark:via-[#121A2B]/90 dark:to-[#181426]/95 backdrop-blur-xl border-b border-border px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 motion-safe:transition-all motion-safe:duration-base`}>
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <button
          type="button"
          data-trainer-sidebar-toggle
          aria-label={t("TEXT_TOGGLE_NAVIGATION_SIDEBAR")}
          aria-controls="trainer-sidebar"
          aria-expanded={isMobileViewport ? isMobileSidebarOpen : !isSidebarCollapsed}
          title={t("TEXT_TOGGLE_NAVIGATION_SIDEBAR")}
          className="md:hidden min-w-10 min-h-10 shrink-0 inline-flex items-center justify-center text-orange-500 bg-orange-500/10 hover:bg-orange-500/20 rounded-xl border border-orange-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95"
          onClick={onToggleSidebar}
         data-testid="trainer_navigation-infrastructure-header_toggle">
          <Menu size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className="hidden sm:inline-block w-1.5 h-5 rounded-full bg-gradient-to-b from-[#FF5A1F] to-[#F59E0B] shrink-0" aria-hidden="true" />
            <TrainerNavigationTooltip content={title}><h1 className="text-base sm:text-page-title font-bold text-primary truncate">{title}</h1></TrainerNavigationTooltip>
          </div>
          {subtitle && <TrainerNavigationTooltip content={subtitle}><p className="hidden sm:block text-xs text-secondary mt-0.5 ps-3.5 truncate">{subtitle}</p></TrainerNavigationTooltip>}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <ThemeToggle />
        <Link
          href={TRAINER_NOTIFICATIONS_PAGE_LIST}
          aria-label={t("TEXT_OPEN_NOTIFICATIONS")}
          className="relative min-w-10 min-h-10 inline-flex items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 hover:border-sky-400/50 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
         data-testid="trainer_navigation-infrastructure-header_open_notifications">
          <Bell size={18} strokeWidth={2} aria-hidden="true" />
          <span className="absolute top-2 end-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-header shadow-[0_0_8px_rgba(244,63,94,0.8)]" aria-hidden="true" />
        </Link>

        <div className="relative" ref={profileRef}>
          <button
            ref={profileTriggerRef}
            type="button"
            aria-label={t("TEXT_OPEN_PROFILE_MENU")}
            aria-expanded={showProfile}
            aria-haspopup="menu"
            aria-controls={profileMenuId}
            onClick={() => setShowProfile((value) => !value)}
            className="flex items-center gap-2.5 px-2 sm:px-2.5 py-1.5 rounded-xl border border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/15 hover:border-orange-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base"
           data-testid="trainer_navigation-infrastructure-header_menu">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5A1F] to-[#EC4899] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-[0_3px_10px_rgba(255,90,31,0.4)]" aria-hidden="true">
              {mounted ? (user?.name?.charAt(0)?.toUpperCase() || <User size={16} strokeWidth={2.2} />) : t("TEXT_A")}
            </span>
            <span className="hidden sm:flex flex-col items-start min-w-0 text-start">
              <span className="text-[11px] leading-none text-amber-600 dark:text-amber-300 font-medium">{greeting}</span>
              <strong className="text-[13px] leading-tight font-semibold text-primary truncate max-w-28">{displayUserName}</strong>
            </span>
            <ChevronDown size={13} className={`hidden sm:block text-secondary motion-safe:transition-transform ${showProfile ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>

          <div
            ref={profileMenuRef}
            id={profileMenuId}
            hidden={!showProfile}
            role="menu"
            aria-label={t("TEXT_PROFILE_MENU")}
            onKeyDown={handleProfileMenuKeyDown}
            className="absolute end-0 mt-2 w-64 max-w-[calc(100vw-1.5rem)] bg-popover backdrop-blur-xl rounded-2xl shadow-popover border border-orange-500/25 overflow-hidden z-30 p-2 space-y-1.5"
          >
              <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-gradient-to-r from-orange-500/15 to-transparent border border-orange-500/25">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF5A1F] to-[#EC4899] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-[0_3px_10px_rgba(255,90,31,0.4)]" aria-hidden="true">
                  {displayUserName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <TrainerNavigationTooltip content={displayUserName}><p className="text-[13px] font-bold text-primary truncate">{displayUserName}</p></TrainerNavigationTooltip>
                  <TrainerNavigationTooltip content={displayUserEmail}><p className="text-[11px] text-secondary truncate">{displayUserEmail || displayUserRole}</p></TrainerNavigationTooltip>
                </div>
              </div>
              <div className="px-2 py-1 space-y-1 text-xs border-b border-border pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Role:</span>
                  <span className="font-semibold text-amber-600 dark:text-amber-300" data-testid="trainer_navigation-header-warning-state-113-1">{displayUserRole}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary">Status:</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-500/30 bg-emerald-500/15 text-emerald-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" aria-hidden="true" />
                    Online
                  </span>
                </div>
              </div>
              <div>
                <Link
                  href={TRAINER_PROFILE_PAGE_LIST}
                  role="menuitem"
                  tabIndex={-1}
                  className="flex items-center gap-2 min-h-10 px-2.5 py-2 rounded-lg text-xs font-medium text-sky-600 dark:text-sky-300 hover:bg-sky-500/15 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-sky-500/15"
                  onClick={() => setShowProfile(false)}
                 data-testid="trainer_navigation-infrastructure-header_my_profile">
                  <User size={15} strokeWidth={2} aria-hidden="true" /> {t("TEXT_MY_PROFILE")}</Link>
              </div>
              <div className="border-t border-border pt-1.5">
                <button
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  className="w-full flex items-center gap-2 min-h-10 px-2.5 py-2 rounded-lg text-xs text-rose-500 border border-rose-500/25 bg-rose-500/10 hover:bg-rose-500/20 font-semibold motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  onClick={() => { setShowProfile(false); logout(); }}
                 data-testid="trainer_navigation-infrastructure-header_log_out">
                  <LogOut size={15} strokeWidth={2} aria-hidden="true" /> {t("TEXT_LOG_OUT")}</button>
              </div>
          </div>
        </div>
      </div>
    </header>
  );
}
