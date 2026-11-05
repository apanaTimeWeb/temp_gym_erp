"use client";
// RESPONSIBILITY: Accessible, focus-contained confirmation dialog for permission changes and resets.
// DATA FLOW: queued confirmation options -> focus-managed dialog -> explicit confirm/cancel callback.

import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { AdminConfirmModalProps } from '@/app/frontend_admin/admin_security/security_permissions_management/types/AdminSecurityPermissionsManagementConfirmModalTypes';

const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

export default function AdminNavigationLayoutConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText, cancelText, type = 'danger', requireTyping = false, confirmationPhrase = 'CONFIRM' }: AdminConfirmModalProps) {
  const t = useTranslations();
  const titleId = useId();
  const messageId = useId();
  const inputId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [typedValue, setTypedValue] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setTypedValue('');
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const target = requireTyping ? inputRef.current : cancelRef.current;
    (target ?? dialogRef.current)?.focus();
    return () => {
      // Restore focus only to a connected control; the initiating route may have unmounted.
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [isOpen, requireTyping]);

  if (!isOpen) return null;
  const canConfirm = !requireTyping || typedValue.trim().toUpperCase() === confirmationPhrase.trim().toUpperCase();
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      event.preventDefault();
      onCancel();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusables = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])
      .filter((element) => element.getAttribute('aria-hidden') !== 'true');
    if (!focusables.length) {
      event.preventDefault();
      dialogRef.current?.focus();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !dialogRef.current?.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  };

  return <div data-admin-dialog-overlay="true" className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop backdrop-blur-sm p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-base" role="presentation" data-testid="admin_navigation-admin-confirm-modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
    <div ref={dialogRef} data-admin-dialog="true" tabIndex={-1} className="bg-overlay backdrop-blur-xl rounded-2xl shadow-dialog border border-border w-full max-w-md overflow-hidden" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={messageId} onKeyDown={handleKeyDown} data-testid="admin_navigation-admin-confirm-modal-open">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${type === 'danger' ? 'bg-danger text-on-danger' : type === 'warning' ? 'bg-warning-bg text-warning' : 'bg-info text-on-info'}`}><AlertTriangle size={18} strokeWidth={2} aria-hidden="true"/></div>
          <div className="min-w-0"><h3 id={titleId} className="text-lg font-bold text-primary">{title}</h3><p id={messageId} className="text-sm text-secondary mt-1 leading-relaxed">{message}</p></div>
        </div>
        {requireTyping && <div className="mt-5"><label htmlFor={inputId} className="text-xs font-semibold text-secondary">{t('admin_layout.AdminNavigationLayoutConfirmModal.text_3deb745651')}{confirmationPhrase} {t('admin_layout.AdminNavigationLayoutConfirmModal.text_1c6b376132')}</label><input ref={inputRef} id={inputId} value={typedValue} onChange={(event) => setTypedValue(event.target.value)} autoComplete="off" className="mt-2 w-full px-3 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11" aria-label={t('AdminNavigationLayoutConfirmModal.auto_typeToConfirm', { phrase: confirmationPhrase })} data-testid="admin_navigation-admin-confirm-modal-back"/></div>}
        <div className="flex gap-3 mt-6"><button ref={cancelRef} type="button" onClick={onCancel} className="min-h-11 flex-1 py-2.5 border border-border rounded-xl text-sm font-semibold text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95" data-admin-dialog-cancel="true" data-testid="admin_navigation-admin-confirm-modal-cancel">{cancelText ?? t('admin_layout.AdminNavigationLayoutConfirmModal.defaultCancel')}</button><button type="button" onClick={onConfirm} disabled={!canConfirm} className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base ease-in-out min-w-11 motion-safe:active:scale-95 min-h-11 flex-1 py-2.5 rounded-xl text-sm font-semibold motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${type === 'danger' ? 'bg-danger text-on-danger' : type === 'warning' ? 'bg-warning-bg text-warning' : 'bg-info text-on-info'}`} data-testid="admin_navigation-admin-confirm-modal-back-2">{confirmText ?? t('admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm')}</button></div>
      </div>
    </div>
  </div>;
}
