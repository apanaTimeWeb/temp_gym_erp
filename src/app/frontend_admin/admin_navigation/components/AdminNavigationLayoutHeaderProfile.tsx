"use client";
// RESPONSIBILITY: Renders shell account controls using global auth only; business modules remain outside this component.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/AdminNavigationLayoutHeaderProfile.tsx)

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect, useId, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
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
  return <div className="relative" ref={profileRef}>
    <button ref={triggerRef} type="button" onClick={() => setShowProfile((value) => !value)} onKeyDown={handleTriggerKeyDown} className="min-h-11 min-w-11 w-9 h-9 rounded-full flex items-center justify-center text-on-primary text-sm font-bold cursor-pointer motion-safe:transition-transform motion-safe:hover:scale-105 border border-border bg-primary motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" aria-label={t('admin_navigation.AdminNavigationLayoutHeaderProfile.text_45a612f7ef')} aria-haspopup="menu" aria-expanded={showProfile} aria-controls={menuId} data-testid="admin_navigation-admin-header-profile-control">{mounted ? (user?.name?.charAt(0)?.toUpperCase() ?? 'A') : 'A'}</button>
    {showProfile && <div ref={menuRef} id={menuId} role="menu" onKeyDown={handleMenuKeyDown} aria-label={t('admin_navigation.AdminNavigationLayoutHeaderProfile.text_45a612f7ef')} className="absolute right-0 mt-2 w-56 bg-popover rounded-xl shadow-popover border border-border overflow-hidden z-30">
      <div className="px-4 py-3 border-b border-border"><p className="text-sm font-semibold text-primary">{mounted ? (user?.name ?? t('admin_navigation.AdminNavigationLayoutHeaderProfile.unknownUser')) : t('admin_navigation.AdminNavigationLayoutHeaderProfile.unknownUser')}</p><p className="text-xs text-secondary">{mounted ? (user?.email ?? '') : ''}</p>{mounted && user?.role && <p className="text-xs text-warning bg-warning-bg inline-block px-1.5 rounded-md font-medium mt-0.5">{user.role}</p>}</div>
      <div className="py-1"><Link role="menuitem" tabIndex={-1} href={profileHref} onClick={closeMenu} className="min-h-11 flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="admin_navigation-admin-header-profile-control-2"><User size={18} aria-hidden="true" strokeWidth={2}/> {t('admin_navigation.AdminNavigationLayoutHeaderProfile.text_9ba8d391c5')}</Link><Link role="menuitem" tabIndex={-1} href={settingsHref} onClick={closeMenu} className="min-h-11 flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="admin_navigation-admin-header-profile-control-3"><Settings size={18} aria-hidden="true" strokeWidth={2}/> {t('admin_navigation.AdminNavigationLayoutHeaderProfile.text_c7f73bb54d')}</Link></div>
      <div className="border-t border-border py-1"><button type="button" role="menuitem" tabIndex={-1} className="w-full flex min-h-11 items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-bg font-medium motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" onClick={() => { setShowProfile(false); logout(); }} data-testid="admin_navigation-admin-header-profile-control-4"><LogOut size={18} aria-hidden="true" strokeWidth={2}/> {t('admin_navigation.AdminNavigationLayoutHeaderProfile.text_6e78c91f5a')}</button></div>
    </div>}
  </div>;
}
