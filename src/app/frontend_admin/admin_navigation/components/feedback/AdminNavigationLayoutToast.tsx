"use client";
// RESPONSIBILITY: Renders the fixed bottom-right toast notification. Auto-dismisses after 4 seconds. Shared across all ADMIN modules.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/feedback/AdminNavigationLayoutToast.tsx)

import { useTranslations } from 'next-intl';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle, XCircle, MessageCircle, Mail, Info, AlertTriangle, X } from 'lucide-react';

import type { AdminToastProps, AdminToastType } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutToastTypes';

/**
 * AdminNavigationLayoutToast renders the admin toast UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminNavigationLayoutToast({ id, message, type, onClose }: AdminToastProps) {
  const t = useTranslations();

  const [visible, setVisible] = useState(true);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeCurrentToast = useCallback(() => onClose(), [onClose]);
  const dismiss = useCallback(() => {
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setVisible(false);
    closeTimerRef.current = setTimeout(closeCurrentToast, 300);
  }, [closeCurrentToast]);

// EFFECT: Tracks both auto-dismiss and exit-animation timers and clears them when toast identity or callback changes.
  useEffect(() => {
    setVisible(true);
    dismissTimerRef.current = setTimeout(dismiss, 4000);
    return () => {
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      dismissTimerRef.current = null;
      closeTimerRef.current = null;
    };
  }, [id, message, dismiss]);

  if (!visible) return null;

  const config: Record<AdminToastType, { icon: React.ReactNode, borderClass: string, colorClass: string, shadow: string }> = {
    success: { icon: <CheckCircle size={18}  strokeWidth={2}/>, borderClass: 'border-l-2 border-border', colorClass: 'text-success', shadow: 'shadow-card' },
    error: { icon: <XCircle size={18}  strokeWidth={2}/>, borderClass: 'border-l-2 border-border', colorClass: 'text-danger', shadow: 'shadow-card' },
    whatsapp: { icon: <MessageCircle size={18}  strokeWidth={2}/>, borderClass: 'border-l-2 border-border', colorClass: 'text-success', shadow: 'shadow-card' },
    email: { icon: <Mail size={18}  strokeWidth={2}/>, borderClass: 'border-l-2 border-border', colorClass: 'text-info', shadow: 'shadow-card' },
    info: { icon: <Info size={18}  strokeWidth={2}/>, borderClass: 'border-l-2 border-border', colorClass: 'text-info', shadow: 'shadow-card' },
    warning: { icon: <AlertTriangle size={18}  strokeWidth={2}/>, borderClass: 'border-l-2 border-border', colorClass: 'text-warning', shadow: 'shadow-card' },
  };

  const { icon, borderClass, colorClass, shadow } = config[type] || config.success;

  return (
    <div
      role={type === 'error' || type === 'warning' ? 'alert' : 'status'} aria-live={type === 'error' || type === 'warning' ? 'assertive' : 'polite'} aria-atomic="true" className={`fixed bottom-[max(12px,env(safe-area-inset-bottom))] right-3 sm:right-6 z-50 flex items-center gap-3 w-[min(320px,calc(100vw-24px))] p-4 rounded-xl border-y border-r border-l-4 backdrop-blur-xl bg-card text-primary motion-safe:animate-in motion-safe:slide-in-from-right-8 motion-safe:fade-in motion-safe:duration-slow ${shadow} ${borderClass}`}
     data-testid="layout-components-layout-toast-status-region">
      <div className={`${colorClass} flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 text-sm font-semibold">
        {message}
      </div>
      <button type="button"
        onClick={dismiss}
        className="min-h-11 min-w-11 inline-flex items-center justify-center text-secondary hover:text-primary flex-shrink-0 motion-safe:transition-colors p-1 rounded-md hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all ease-in-out motion-safe:active:scale-95"
        aria-label={t('admin_layout.AdminNavigationLayoutToast.text_dc83cd8031')}
       data-testid="admin_navigation-admin-toast-back">
        <X size={18}  strokeWidth={2}/>
      </button>
    </div>
  );
}
