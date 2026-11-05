"use client";
// RESPONSIBILITY: Renders the shared Admin confirmation dialog, including mandatory typed confirmation for destructive actions.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/feedback/AdminNavigationLayoutConfirmModal.tsx)

import { useTranslations } from 'next-intl';
import { useEffect, useId, useRef, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useAdminBillingPlansCatalogDialogAccessibility } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogDialogAccessibility';
import type { AdminConfirmType } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogConfirmTypes';
import type { AdminConfirmModalProps } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/types/AdminBillingPlansCatalogConfirmModalTypes';

/**
 * AdminNavigationLayoutConfirmModal renders the admin confirm modal UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminNavigationLayoutConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText, cancelText, type = 'danger', requireTyping = false, confirmationPhrase = 'CONFIRM' }: AdminConfirmModalProps) {
  const t = useTranslations();
  const resolvedConfirmText = confirmText ?? t('admin_layout.AdminNavigationLayoutConfirmModal.defaultConfirm');
  const resolvedCancelText = cancelText ?? t('admin_layout.AdminNavigationLayoutConfirmModal.defaultCancel');

  const [typedValue, setTypedValue] = useState('');
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const messageId = `${dialogId}-message`;
  const inputId = `${dialogId}-input`;
  const requiredPhrase = confirmationPhrase.trim();
  const dialogRef = useRef<HTMLDivElement>(null);
  // The existing feature-local hook restores focus, traps Tab, handles Escape and locks page scroll.
  useAdminBillingPlansCatalogDialogAccessibility({ isOpen, containerRef: dialogRef, onClose: onCancel });
  // EFFECT: Clears the type-to-confirm field whenever a new confirmation dialog opens.
  useEffect(() => {
    if (isOpen) setTypedValue('');
  }, [isOpen]);
  if (!isOpen) return null;
  const canConfirm = !requireTyping || (requiredPhrase.length > 0 && typedValue.trim().toUpperCase() === requiredPhrase.toUpperCase());
  return <div data-admin-dialog-overlay="true" className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop backdrop-blur-sm p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-base" role="presentation" data-testid="admin_navigation-admin-confirm-modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
    <div ref={dialogRef} data-admin-dialog="true" tabIndex={-1} className="bg-overlay backdrop-blur-xl rounded-2xl shadow-dialog border border-border w-full max-w-md overflow-hidden" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={messageId} data-testid="admin_navigation-admin-confirm-modal-open">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${type === 'danger' ? 'bg-danger text-on-danger' : type === 'warning' ? 'bg-warning-bg text-warning' : 'bg-info text-on-info'}`} data-testid="admin_navigation-adminfeedback-status-1"><AlertTriangle size={18}  strokeWidth={2}/></div>
          <div className="min-w-0"><h3 id={titleId} className="text-lg font-bold text-primary">{title}</h3><p id={messageId} className="text-sm text-secondary mt-1 leading-relaxed">{message}</p></div>
        </div>
        {requireTyping && <div className="mt-5"><label htmlFor={inputId} className="text-xs font-semibold text-secondary">{t('admin_layout.AdminNavigationLayoutConfirmModal.text_3deb745651')}{confirmationPhrase} {t('admin_layout.AdminNavigationLayoutConfirmModal.text_1c6b376132')}</label><input id={inputId} value={typedValue} onChange={(event) => setTypedValue(event.target.value)} autoComplete="off" className="mt-2 w-full px-3 py-2.5 bg-input border border-border rounded-xl text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out min-h-11" aria-label={t('AdminNavigationLayoutConfirmModal.auto_typeToConfirm', { phrase: confirmationPhrase })}  data-testid="admin_navigation-admin-confirm-modal-back"/></div>}
        <div className="flex gap-3 mt-6"><button type="button" onClick={onCancel} className="min-h-11 flex-1 py-2.5 border border-border rounded-xl text-sm font-semibold text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base motion-safe:transition-all motion-safe:duration-base ease-in-out focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-11 motion-safe:active:scale-95" data-admin-dialog-cancel="true" data-testid="admin_navigation-admin-confirm-modal-cancel">{resolvedCancelText}</button><button type="button" onClick={onConfirm} disabled={!canConfirm} className={`focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base ease-in-out min-w-11 motion-safe:active:scale-95 min-h-11 flex-1 py-2.5 rounded-xl text-sm font-semibold motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${type === 'danger' ? 'bg-danger text-on-danger' : type === 'warning' ? 'bg-warning-bg text-warning' : 'bg-info text-on-info'}`} data-testid="admin_navigation-admin-confirm-modal-back-2">{resolvedConfirmText}</button></div>
      </div>
    </div>
  </div>;
}
