"use client";
// RESPONSIBILITY: Renders the fixed Trainer shell header: sidebar toggle, page title, theme toggle, notification navigation, and accessible profile menu. It owns no feature/business data.
import { useEffect, useId, useRef, useState } from 'react';

import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

import { Bell, LogOut, Menu, User } from 'lucide-react';

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
  const user = getUser();

// Effect contract: restore persisted shell presentation and keep outside-click/keyboard listeners aligned with mounted state.
  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

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
    <header className="fixed inset-x-0 top-0 z-20 trainer-shell-header-height bg-header-translucent backdrop-blur-md border-b border-border px-4 sm:px-6 flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-4 min-w-0">
        <button
          type="button"
          data-trainer-sidebar-toggle
          aria-label={t("TEXT_TOGGLE_NAVIGATION_SIDEBAR")}
          aria-controls="trainer-sidebar"
          aria-expanded={isMobileViewport ? isMobileSidebarOpen : !isSidebarCollapsed}
          title={t("TEXT_TOGGLE_NAVIGATION_SIDEBAR")}
          className="min-w-11 min-h-11 inline-flex items-center justify-center -ms-3 text-secondary hover:text-primary motion-safe:transition-colors bg-input hover:bg-page rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
          onClick={onToggleSidebar}
         data-testid="trainer_navigation-infrastructure-header_toggle">
          <Menu size={18} strokeWidth={2} aria-hidden="true" />
        </button>
        <div className="min-w-0">
          <TrainerNavigationTooltip content={title}><h1 className="text-page-title font-bold text-primary truncate">{title}</h1></TrainerNavigationTooltip>
          {subtitle && <TrainerNavigationTooltip content={subtitle}><p className="text-sm text-secondary mt-0.5 truncate">{subtitle}</p></TrainerNavigationTooltip>}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <ThemeToggle />
        <Link
          href={TRAINER_NOTIFICATIONS_PAGE_LIST}
          aria-label={t("TEXT_OPEN_NOTIFICATIONS")}
          className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-md border border-transparent text-secondary hover:text-primary hover:bg-input hover:border-border motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
         data-testid="trainer_navigation-infrastructure-header_open_notifications">
          <Bell size={18} strokeWidth={2} aria-hidden="true" />
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
            className="w-11 h-11 rounded-full flex items-center justify-center text-on-primary text-sm font-bold motion-safe:transition-transform motion-safe:hover:scale-105 border border-border bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
           data-testid="trainer_navigation-infrastructure-header_menu">
            {mounted ? (user?.name?.charAt(0)?.toUpperCase() || 'A') : t("TEXT_A")}
          </button>

          <div
            ref={profileMenuRef}
            id={profileMenuId}
            hidden={!showProfile}
            role="menu"
            aria-label={t("TEXT_PROFILE_MENU")}
            onKeyDown={handleProfileMenuKeyDown}
            className="absolute end-0 mt-2 w-56 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30"
          >
              <div className="px-4 py-3 border-b border-border bg-header">
                <TrainerNavigationTooltip content={mounted ? (user?.name || t('TEXT_TRAINER')) : t("TEXT_TRAINER")}><p className="text-sm font-semibold text-primary truncate">{mounted ? (user?.name || t('TEXT_TRAINER')) : t("TEXT_TRAINER")}</p></TrainerNavigationTooltip>
                <TrainerNavigationTooltip content={mounted ? (user?.email || '') : ''}><p className="text-xs text-secondary truncate">{mounted ? (user?.email || '') : ''}</p></TrainerNavigationTooltip>
                {mounted && user?.role && <p className="text-xs text-warning bg-warning-bg inline-block px-1.5 rounded-md font-medium mt-0.5" data-testid={"trainer_navigation-header-warning-state-113-1"}>{user.role}</p>}
              </div>
              <div className="py-1">
                <Link
                  href={TRAINER_PROFILE_PAGE_LIST}
                  role="menuitem"
                  tabIndex={-1}
                  className="flex items-center gap-2 min-h-11 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-input"
                  onClick={() => setShowProfile(false)}
                 data-testid="trainer_navigation-infrastructure-header_my_profile">
                  <User size={18} strokeWidth={2} aria-hidden="true" /> {t("TEXT_MY_PROFILE")}</Link>
              </div>
              <div className="border-t border-border py-1 bg-header">
                <button
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  className="w-full flex items-center gap-2 min-h-11 px-4 py-2 text-sm text-danger hover:bg-danger-bg font-medium motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-danger-bg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
                  onClick={() => { setShowProfile(false); logout(); }}
                 data-testid="trainer_navigation-infrastructure-header_log_out">
                  <LogOut size={18} strokeWidth={2} aria-hidden="true" /> {t("TEXT_LOG_OUT")}</button>
              </div>
          </div>
        </div>
      </div>
    </header>
  );
}
