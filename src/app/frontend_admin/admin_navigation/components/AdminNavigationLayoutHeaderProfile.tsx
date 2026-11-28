"use client";
// RESPONSIBILITY: Renders Admin shell profile trigger and obsidian dropdown menu matching Trainer UI.

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect, useId, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { getUser, logout } from '@/lib/api';
import type { AdminNavigationLayoutHeaderProfileProps } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutHeaderProfilePropsTypes';

export default function AdminNavigationLayoutHeaderProfile({ profileHref, settingsHref }: AdminNavigationLayoutHeaderProfileProps) {
  const t = useTranslations();
  const [showProfile, setShowProfile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const user = getUser();

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!showProfile) return;
    menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]')?.focus();
  }, [showProfile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) setShowProfile(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !showProfile) return;
      event.preventDefault();
      setShowProfile(false);
      triggerRef.current?.focus();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('mousedown', handleClickOutside); document.removeEventListener('keydown', handleKeyDown); };
  }, [showProfile]);

  const closeMenu = () => setShowProfile(false);
  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    setShowProfile(true);
  };

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      closeMenu();
      return;
    }
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
    if (!items.length) return;
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    let nextIndex: number | undefined;
    if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1 + items.length) % items.length;
    else if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + items.length) % items.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = items.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      items[nextIndex]?.focus();
    }
  };

  const displayName = mounted ? (user?.name ?? t('admin_navigation.AdminNavigationLayoutHeaderProfile.unknownUser')) : t('admin_navigation.AdminNavigationLayoutHeaderProfile.unknownUser');
  const displayEmail = mounted ? (user?.email ?? '') : '';
  const displayRole = mounted && user?.role ? user.role : 'Admin';
  const initial = mounted ? (user?.name?.charAt(0)?.toUpperCase() ?? 'A') : 'A';

  return (
    <div className="relative" ref={profileRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setShowProfile((value) => !value)}
        onKeyDown={handleTriggerKeyDown}
        className="min-h-10 min-w-10 flex items-center gap-2 px-1.5 sm:px-2.5 py-1 rounded-xl border border-orange-500/35 bg-white/[0.06] hover:bg-orange-500/15 hover:border-orange-400/60 cursor-pointer motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95"
        aria-label={t('admin_navigation.AdminNavigationLayoutHeaderProfile.text_45a612f7ef')}
        aria-haspopup="menu"
        aria-expanded={showProfile}
        aria-controls={menuId}
        data-testid="admin_navigation-admin-header-profile-control"
      >
        <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-[0_3px_12px_rgba(255,90,31,0.45)]" aria-hidden="true">
          {initial}
        </span>
        <span className="hidden lg:flex flex-col items-start min-w-0 text-start">
          <span className="text-[10px] leading-none text-amber-300 font-medium uppercase tracking-wider">{displayRole}</span>
          <strong className="text-xs leading-tight font-semibold text-white truncate max-w-28">{displayName}</strong>
        </span>
        <ChevronDown size={13} className={`hidden lg:block text-slate-300 motion-safe:transition-transform ${showProfile ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {showProfile && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          onKeyDown={handleMenuKeyDown}
          aria-label={t('admin_navigation.AdminNavigationLayoutHeaderProfile.text_45a612f7ef')}
          className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-1.5rem)] bg-[#0E1526]/98 backdrop-blur-2xl rounded-2xl shadow-[0_20px_48px_rgba(0,0,0,0.82)] border border-orange-500/35 overflow-hidden p-2 space-y-1.5 text-white z-50"
        >
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-gradient-to-r from-[#FF5A1F]/20 via-purple-500/10 to-transparent border border-orange-500/25">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF5A1F] via-[#EC4899] to-[#8B5CF6] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-[0_3px_12px_rgba(255,90,31,0.45)]" aria-hidden="true">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-white truncate">{displayName}</p>
              <p className="text-[11px] text-slate-300 truncate">{displayEmail || displayRole}</p>
              {mounted && user?.role && (
                <span className="mt-1 inline-block text-[10px] text-amber-300 bg-amber-500/15 border border-amber-400/30 px-1.5 py-0.5 rounded font-semibold uppercase">
                  {user.role}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Link
              role="menuitem"
              tabIndex={-1}
              href={profileHref}
              onClick={closeMenu}
              className="min-h-10 flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-sky-300 hover:text-white hover:bg-sky-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-sky-500/20"
              data-testid="admin_navigation-admin-header-profile-control-2"
            >
              <User size={15} aria-hidden="true" strokeWidth={2} />
              {t('admin_navigation.AdminNavigationLayoutHeaderProfile.text_9ba8d391c5')}
            </Link>
            <Link
              role="menuitem"
              tabIndex={-1}
              href={settingsHref}
              onClick={closeMenu}
              className="min-h-10 flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium text-emerald-300 hover:text-white hover:bg-emerald-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:bg-emerald-500/20"
              data-testid="admin_navigation-admin-header-profile-control-3"
            >
              <Settings size={15} aria-hidden="true" strokeWidth={2} />
              {t('admin_navigation.AdminNavigationLayoutHeaderProfile.text_c7f73bb54d')}
            </Link>
          </div>

          <div className="border-t border-white/10 pt-1.5">
            <button
              type="button"
              role="menuitem"
              tabIndex={-1}
              className="w-full flex min-h-10 items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-rose-300 border border-rose-500/30 bg-rose-500/15 hover:bg-rose-500/25 hover:text-white font-semibold motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95"
              onClick={() => { setShowProfile(false); logout(); }}
              data-testid="admin_navigation-admin-header-profile-control-4"
            >
              <LogOut size={15} aria-hidden="true" strokeWidth={2} />
              {t('admin_navigation.AdminNavigationLayoutHeaderProfile.text_6e78c91f5a')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
