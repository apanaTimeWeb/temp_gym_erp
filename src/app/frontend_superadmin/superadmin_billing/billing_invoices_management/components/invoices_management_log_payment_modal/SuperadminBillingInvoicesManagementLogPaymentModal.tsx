// RESPONSIBILITY: Renders/orchestrates SuperadminBillingInvoicesLogPaymentModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBillingInvoicesLogPaymentModal owned by the superadmin_billing_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useConfirm, useSuperadminBillingInvoicesManagementManualPaymentForm, useSuperadminBillingInvoicesManagementDialogA11y, useTranslations.
 * MODULE DEPENDENCIES: lucide-react, next-intl, @/components/ui/Feedback/ConfirmProvider, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementManualPaymentForm, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementDialogA11y, @/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_log_payment_modal.types
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the documented Superadmin manual-payment form and delegates submission to the feature hook.


import { useEffect, useRef, useState } from 'react';

import { X, Search, IndianRupee, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { useSuperadminBillingInvoicesManagementDialogA11y } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementDialogA11y';
import { useSuperadminBillingInvoicesManagementManualPaymentForm } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/hooks/useSuperadminBillingInvoicesManagementManualPaymentForm';

import type { SuperadminBillingInvoicesLogPaymentModalProps } from '@/app/frontend_superadmin/superadmin_billing/billing_invoices_management/types/superadmin_billing_invoices_management_log_payment_modal.types';
import type { KeyboardEvent } from 'react';

/**
 * @description Renders the documented Superadmin manual-payment form and delegates submission to the feature hook.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBillingInvoicesManagementLogPaymentModal({
  onClose,
  selectedGym,
  isGymDropdownOpen,
  setIsGymDropdownOpen,
  gymSearchTerm,
  setGymSearchTerm,
  filteredTenantsForDropdown,
  handleSelectGym,
  onSave,
  isSaving,
}: SuperadminBillingInvoicesLogPaymentModalProps) {
  const t = useTranslations('superadmin_billing_invoices');
  const { confirm } = useConfirm();
  const { register, handleSubmit, errors, isSubmitting, isDirty } = useSuperadminBillingInvoicesManagementManualPaymentForm(onSave, t('ui.unsaved_manual_payment_changes'));
  const requestClose = async () => {
    if (isSaving || isSubmitting) return;
    if (isDirty) {
      const approved = await confirm({ title: t('ui.discard_manual_payment_title'), message: t('ui.unsaved_manual_payment_changes'), type: 'warning', confirmText: t('ui.discard_changes'), cancelText: t('actions.cancel') });
      if (!approved) return;
    }
    onClose();
  };
  const dialogRef = useSuperadminBillingInvoicesManagementDialogA11y(true, requestClose);
  const submitDisabled = isSaving || isSubmitting || !selectedGym;
  const [activeGymIndex, setActiveGymIndex] = useState(0);
  const gymTriggerRef = useRef<HTMLButtonElement>(null);
  const gymOptionsId = 'superadmin-invoices-gym-options';

  useEffect(() => {
    if (!isGymDropdownOpen) return;
    const selectedIndex = filteredTenantsForDropdown.findIndex((tenant) => tenant.id === selectedGym?.id);
    setActiveGymIndex((() => { if (filteredTenantsForDropdown.length === 0) { return (-1); } if (selectedIndex >= 0) { return (selectedIndex); } return (0); })());
  }, [filteredTenantsForDropdown, isGymDropdownOpen, selectedGym?.id]);

  const handleGymSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveGymIndex((current) => Math.min(filteredTenantsForDropdown.length - 1, current + 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveGymIndex((current) => Math.max(0, current - 1));
    } else if (event.key === 'Home' && filteredTenantsForDropdown.length > 0) {
      event.preventDefault();
      setActiveGymIndex(0);
    } else if (event.key === 'End' && filteredTenantsForDropdown.length > 0) {
      event.preventDefault();
      setActiveGymIndex(filteredTenantsForDropdown.length - 1);
    } else if (event.key === 'Enter' && activeGymIndex >= 0) {
      event.preventDefault();
      const activeGym = filteredTenantsForDropdown[activeGymIndex];
      if (activeGym) handleSelectGym(activeGym.id);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setIsGymDropdownOpen(false);
      gymTriggerRef.current?.focus();
    }
  };

  return (
    <div ref={dialogRef} className="fixed inset-0 z-40 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-invoices-log-payment-title" data-testid="superadmin_billing_invoices-log-payment-dialog">
      <button type="button" aria-label={t('ui.close_manual_payment_dialog_8fcf0aba')} className="absolute inset-0 bg-overlay-backdrop focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" onClick={() => { void requestClose(); }}  data-testid="superadmin_billing_invoices-superadmin-invoices-log-payment-modal-close-manual-payment-dialog"/>
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-base">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 id="superadmin-invoices-log-payment-title" className="text-xl font-bold text-primary">{t('ui.log_manual_payment_e15e5207')}</h2>
            <p className="mt-1 text-xs text-secondary">{t('ui.record_the_amount_for_the_selected_gym_ed2152aa')}</p>
          </div>
          <button type="button" onClick={() => { void requestClose(); }} className="min-h-11 min-w-11 rounded-lg text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={t('ui.close_modal_a2071564')} data-testid="superadmin_billing_invoices-superadmin-invoices-log-payment-modal-payment-modal-close-modal">
            <X size={18} className="mx-auto" aria-hidden="true"/>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate data-testid="superadmin_billing_invoices-superadmininvoiceslogpaymentmodal-form-1">
          <div className="space-y-4 p-5">
            {errors.root?.server?.message ? <p role="alert" className="rounded-md border border-danger bg-danger-bg p-3 text-sm text-danger">{String(errors.root.server.message)}</p> : null}
            <div className="relative">
              <label htmlFor="superadmin-invoices-gym" className="mb-1.5 block text-sm font-medium text-secondary">{t('ui.select_gym_e1eeb492')}</label>
              <button ref={gymTriggerRef} id="superadmin-invoices-gym" type="button" aria-expanded={isGymDropdownOpen} aria-haspopup="listbox" className="flex min-h-11 w-full items-center justify-between rounded-lg border border-border bg-input px-4 py-2.5 text-start text-sm text-primary hover:border-focus motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" onClick={() => setIsGymDropdownOpen(!isGymDropdownOpen)} aria-controls={gymOptionsId} data-testid="superadmin_billing_invoices-superadmin-invoices-log-payment-modal-modal-superadmin-invoices-gym">
                <span className={selectedGym ? 'text-primary' : 'text-secondary'}>
                  {selectedGym ? `${selectedGym.name} (${selectedGym.plan})` : t('ui.choose_gym_repair')}
                </span>
                <span className="text-secondary text-xs" aria-hidden="true">{t('ui.text_af398179')}</span>
              </button>
              {isGymDropdownOpen && (
                <div className="absolute start-0 end-0 top-full z-30 mt-1 flex max-h-64 flex-col overflow-hidden rounded-lg border border-border bg-overlay shadow-popover motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-fast" data-testid="superadmin_billing_invoices-log-payment-gym-options">
                  <div className="border-b border-border bg-header p-2">
                    <label htmlFor="superadmin-invoices-gym-search" className="sr-only">{t('ui.search_gym_by_name_00953b4c')}</label>
                    <div className="relative">
                      <Search size={18} className="absolute start-2.5 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/>
                      <input id="superadmin-invoices-gym-search" type="text" role="combobox" aria-autocomplete="list" aria-expanded={isGymDropdownOpen} aria-controls={gymOptionsId} aria-activedescendant={activeGymIndex >= 0 ? `superadmin-invoices-gym-option-${activeGymIndex}` : undefined} onKeyDown={handleGymSearchKeyDown} placeholder={t('ui.search_gym_by_name_ee344db0')} className="min-h-11 w-full rounded border border-border bg-input py-1.5 ps-8 pe-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" value={gymSearchTerm} onChange={(event) => setGymSearchTerm(event.target.value)} autoFocus data-testid="superadmin_billing_invoices-superadmin-invoices-log-payment-modal-superadmin-invoices-gym-search"/>
                    </div>
                  </div>
                  <div id={gymOptionsId} className="overflow-y-auto p-1" role="listbox" aria-label={t('ui.gym_options_7fcc88ec')}>
                    {filteredTenantsForDropdown.map((tenant, index) => (
                      <button id={`superadmin-invoices-gym-option-${index}`} type="button" role="option" tabIndex={-1} aria-selected={selectedGym?.id === tenant.id} data-active={activeGymIndex === index} key={tenant.id} className={`min-h-11 w-full rounded-md px-3 py-2.5 text-start text-sm text-primary hover:bg-input motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${activeGymIndex === index ? 'bg-input' : ''}`} onClick={() => handleSelectGym(tenant.id)} data-testid="superadmin_billing_invoices-superadmin-invoices-log-payment-modal-log-payment-modal-button">
                        <span className="font-bold">{tenant.name}</span>
                        <span className="ms-1 text-xs text-secondary">{t('ui.text_84c40473')}{tenant.plan}{t('ui.text_9371d7a2')}</span>
                      </button>
                    ))}
                    {filteredTenantsForDropdown.length === 0 && (<div className="px-3 py-6 text-center text-sm font-medium text-disabled">{t('ui.no_gyms_found_ce3950ee')}</div>)}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="superadmin-invoices-payment-amount" className="mb-1.5 block text-sm font-medium text-secondary">{t('ui.amount_inr')}<span className="text-danger" aria-hidden="true">{t('ui.text_3389dae3')}</span></label>
              <div className="relative">
                <IndianRupee size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary" aria-hidden="true"/>
                <input id="superadmin-invoices-payment-amount" type="number" min="0" step="0.01" inputMode="decimal" {...register('amount')} aria-invalid={Boolean(errors.amount)} aria-describedby={errors.amount ? 'superadmin-invoices-payment-amount-error' : undefined} className="min-h-11 w-full rounded-lg border border-border bg-input py-2.5 ps-9 pe-4 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" placeholder={t('ui.e_g_4999_895d4ec7')} data-testid="superadmin_billing_invoices-superadmin-invoices-log-payment-modal-superadmin-invoices-payment-amount"/>
              </div>
              {errors.amount?.message && <p id="superadmin-invoices-payment-amount-error" className="mt-1 text-xs text-danger" role="alert" data-testid="superadmin_billing_invoices-log-payment-amount-error">{errors.amount.message}</p>}
              {!selectedGym && <p className="mt-1 text-xs text-danger" role="status" data-testid="superadmin_billing_invoices-log-payment-gym-required">{t('ui.select_a_gym_before_saving_the_payment_ceab5dc8')}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-border bg-header p-5">
            <button type="button" onClick={() => { void requestClose(); }} disabled={isSaving} className="min-h-11 rounded-lg border border-border bg-input px-4 py-2 text-sm font-medium text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50" data-testid="superadmin_billing_invoices-superadmin-invoices-log-payment-modal-log-payment-modal-cancel">
              {t('ui.cancel_ea478870')}</button>
            <button type="submit" disabled={submitDisabled} className="flex min-h-11 min-w-36 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50" data-testid="superadmin_billing_invoices-superadmin-invoices-log-payment-modal-log-payment-modal-submit">
              {(isSaving || isSubmitting) && <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"/>}
              {isSaving || isSubmitting ? t('ui.saving_payment_repair') : t('ui.save_payment_repair')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
