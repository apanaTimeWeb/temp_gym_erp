// RESPONSIBILITY: Renders/orchestrates SuperadminPlatformShellNavigationHeaderProfile within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Superadmin profile trigger, Obsidian dropdown menu, and centered logout modal matching TrainerNavigationHeader.

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ChevronDown, LogOut, ShieldCheck, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { getUser, logout } from '@/lib/api';

import { SUPERADMIN_PLATFORM_SHELL_NAVIGATION_ROUTES as SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT } from '@/app/frontend_superadmin/superadmin_platform_shell/platform_shell_navigation/config/superadmin_platform_shell_navigation.url_config';

/**
 * Responsibility: Renders the SuperadminPlatformShellNavigationHeaderProfile UI boundary matching Trainer profile popover & logout modal.
 * Dependencies: Receives typed feature data/actions from the owning module; contains no cross-feature business ownership.
 * Accessibility: Preserves semantic controls, keyboard access, and feature-defined test selectors.
 */
export function SuperadminPlatformShellNavigationHeaderProfile() {
  const t = useTranslations('SuperadminPlatformShellLayoutStyles');
  const [showProfile, setShowProfile] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hour, setHour] = useState<number>(-1);
  const profileRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = 'superadmin-profile-menu';
  const user = getUser();

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

  const displayUserName = mounted ? (user?.name ?? t('ui.superadmin_fallback_title')) : t('ui.superadmin_fallback_title');
  const displayUserEmail = mounted ? (user?.email ?? '') : '';
  const displayUserRole = mounted && user?.role ? user.role : t('ui.superadmin_role');

  useEffect(() => {
    if (!showProfile) return;
    const menu = profileRef.current?.querySelector<HTMLElement>('[role="menu"]');
    const getItems = () => Array.from(menu?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    getItems()[0]?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      const items = getItems();
      if (event.key === 'Escape') {
        event.preventDefault();
        setShowProfile(false);
        triggerRef.current?.focus();
        return;
      }
      if (!items.length) return;
      const activeIndex = items.indexOf(document.activeElement as HTMLElement);
      let nextIndex: number | undefined;
      if (event.key === 'ArrowDown') nextIndex = (activeIndex + 1 + items.length) % items.length;
      else if (event.key === 'ArrowUp') nextIndex = (activeIndex - 1 + items.length) % items.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = items.length - 1;
      if (nextIndex !== undefined) {
        event.preventDefault();
        items[nextIndex]?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showProfile]);

  useEffect(() => {
    if (!showLogoutModal) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setShowLogoutModal(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showLogoutModal]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const securityHref = `${SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.ACCOUNT}/account_security`;

  return (
    <div
      className="relative"
      ref={profileRef}
      onMouseEnter={() => setShowProfile(true)}
      onMouseLeave={() => setShowProfile(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setShowProfile((prev) => !prev)}
        className="flex items-center gap-2.5 px-2 sm:px-2.5 py-1.5 rounded-xl border border-orange-500/35 bg-white/[0.06] hover:bg-orange-500/15 hover:border-orange-400/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base cursor-pointer"
        aria-label={t('ui.profile_menu_36eb56ac')}
        aria-haspopup="menu"
        aria-expanded={showProfile}
        aria-controls={menuId}
        data-testid="SuperadminPlatformShellLayoutStyles-superadmin-header-profile-header-profile-profile-menu"
      >
        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-[0_3px_12px_rgba(255,90,31,0.45)]" aria-hidden="true">
          {mounted ? (user?.name?.charAt(0)?.toUpperCase() ?? 'A') : 'A'}
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
            id={menuId}
            role="menu"
            aria-label={t('ui.profile_menu_36eb56ac')}
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
                href={SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES_URL_CONTRACT.SUPERADMIN_PLATFORM_SHELL_NAVIGATION_DESTINATION_ROUTES.PROFILE}
                role="menuitem"
                className="flex items-center gap-2 min-h-10 px-2.5 py-2 rounded-lg text-xs font-medium text-sky-300 hover:text-white hover:bg-sky-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-sky-500/20"
                onClick={() => setShowProfile(false)}
                data-testid="SuperadminPlatformShellLayoutStyles-superadmin-header-profile-header-profile-my-profile"
              >
                <User size={15} strokeWidth={2} aria-hidden="true" />
                <span>{t('ui.my_profile_e8956174')}</span>
              </Link>
              <Link
                href={securityHref}
                role="menuitem"
                className="flex items-center gap-2 min-h-10 px-2.5 py-2 rounded-lg text-xs font-medium text-emerald-300 hover:text-white hover:bg-emerald-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-emerald-500/20"
                onClick={() => setShowProfile(false)}
              >
                <ShieldCheck size={15} strokeWidth={2} aria-hidden="true" />
                <span>Security</span>
              </Link>
            </div>

            <div className="border-t border-white/10 pt-1.5">
              <button
                type="button"
                role="menuitem"
                className="w-full flex items-center gap-2 min-h-10 px-2.5 py-2 rounded-lg text-xs text-rose-300 border border-rose-500/30 bg-rose-500/15 hover:bg-rose-500/25 hover:text-white font-semibold motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                onClick={() => {
                  setShowProfile(false);
                  setShowLogoutModal(true);
                }}
                data-testid="SuperadminPlatformShellLayoutStyles-superadmin-header-profile-header-profile-log-out"
              >
                <LogOut size={15} strokeWidth={2} aria-hidden="true" />
                <span>{t('ui.log_out_4394c8d8')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogoutModal && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="superadmin-logout-title"
          aria-describedby="superadmin-logout-desc"
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
              <h2 id="superadmin-logout-title" className="text-white text-lg font-bold text-center">
                {t('ui.log_out_4394c8d8')}
              </h2>
              <p id="superadmin-logout-desc" className="text-slate-400 text-sm mt-1 text-center">
                Are you sure you want to end your current superadmin session?
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
                Cancel
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
                <span>{t('ui.log_out_4394c8d8')}</span>
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
