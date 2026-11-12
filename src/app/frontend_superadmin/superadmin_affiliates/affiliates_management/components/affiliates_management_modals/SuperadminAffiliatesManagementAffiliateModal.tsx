// RESPONSIBILITY: Renders the Create/Edit Affiliate modal form. Receives form state via props from useSuperadminAffiliatesManagementPage. No API calls.
'use client';
import React from 'react';

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { useSuperadminAffiliatesManagementDialogA11y } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/hooks/useSuperadminAffiliatesManagementDialogA11y';
import { useSuperadminAffiliatesManagementUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/hooks/useSuperadminAffiliatesManagementUnsavedChangesGuard';

import type { SuperadminAffiliatesAffiliateModalProps } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management_affiliate_modal.types';



/**
 * @description Renders the Create/Edit Affiliate modal form. Receives form state via props and delegates validation/submission to the owning page flow.
 * @dependencies Consumes only owning feature props, form contracts, and approved global UI primitives.
 * @edge-case Preserves disabled, validation-error, cancel, retry, and repeated-submit safeguards.
 */
export const SuperadminAffiliatesAffiliateModal: React.FC<SuperadminAffiliatesAffiliateModalProps> = ({ isOpen, onClose, form, onSubmit, isEdit = false, isMutating = false, }) => {
  const t = useTranslations('superadmin_affiliates');
  const { confirm } = useConfirm();
    const { register, handleSubmit, formState: { errors, isDirty } } = form;
    useSuperadminAffiliatesManagementUnsavedChangesGuard(isOpen && isDirty && !isMutating, t('ui.unsaved_affiliate_changes'));
    const requestClose = async () => {
      if (isMutating) return;
      if (isDirty) {
        const approved = await confirm({ title: t('ui.discard_affiliate_changes_title'), message: t('ui.unsaved_affiliate_changes'), type: 'warning', confirmText: t('ui.discard_changes'), cancelText: t('ui.cancel_1821b90') });
        if (!approved) return;
      }
      onClose();
    };
    const dialogRef = useSuperadminAffiliatesManagementDialogA11y(isOpen, requestClose);
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 bg-overlay z-40 flex items-center justify-center overflow-y-auto p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-affiliate-modal-title" data-testid="superadmin_affiliates-superadmin-affiliates-affiliate-modal-affiliates-affiliate-modal-dialog" ref={dialogRef}>
      <div className="bg-overlay border border-border rounded-xl w-full max-w-md shadow-dialog my-auto max-h-dialog-desktop flex flex-col">
        <div className="flex shrink-0 items-center justify-between px-7 py-5 border-b border-border">
          <h2 id="superadmin-affiliate-modal-title" className="text-lg font-bold text-primary">
            {isEdit ? t('ui.edit_affiliate_partner_9e771fe') : t('ui.add_affiliate_partner_4c94707')}
          </h2>
          <button type="button" onClick={() => { void requestClose(); }} aria-label={t('ui.close_dialog')} className="min-h-11 min-w-11 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="superadmin_affiliates-superadmin-affiliates-affiliate-modal-affiliates-affiliate-modal-action1">
            <X size={18}/>
          </button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="min-h-0 flex-1 flex flex-col" data-testid="superadmin_affiliates-superadmin-affiliates-affiliate-modal-superadmin_affiliates-superadminaffiliatemodal-form-submit">
          <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar p-7 space-y-5">
            {errors.root?.server?.message ? <p role="alert" className="rounded-md border border-danger bg-danger-bg p-3 text-sm text-danger">{String(errors.root.server.message)}</p> : null}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="superadmin-affiliate-name" className="text-sm font-bold text-secondary">{t('ui.partner_name_d78e689')} <span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <input id="superadmin-affiliate-name" {...register('name')} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'superadmin-affiliate-name-error' : undefined} className="min-h-11 w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" placeholder={t('ui.e_g_fitness_gurus_llc_72bb9f6')} data-testid="superadmin_affiliates-superadmin-affiliates-affiliate-modal-affiliates-affiliate-modal-control"/>
              {errors.name && <span id="superadmin-affiliate-name-error" className="text-xs text-danger" role="alert">{errors.name.message ? t(String(errors.name.message)) : t('validation.invalid')}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="superadmin-affiliate-email" className="text-sm font-bold text-secondary">{t('ui.email_address_07a7614')} <span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <input id="superadmin-affiliate-email" type="email" {...register('email')} required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'superadmin-affiliate-email-error' : undefined} className="min-h-11 w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" placeholder={t('ui.partner_example_com_7901a9c')} data-testid="superadmin_affiliates-superadmin-affiliates-affiliate-modal-affiliate-modal-control-2"/>
              {errors.email && <span id="superadmin-affiliate-email-error" className="text-xs text-danger" role="alert">{errors.email.message ? t(String(errors.email.message)) : t('validation.invalid')}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="superadmin-affiliate-referral-code" className="text-sm font-bold text-secondary">{t('ui.custom_referral_code_bc8f181')} <span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <input id="superadmin-affiliate-referral-code" {...register('referralCode')} required aria-invalid={Boolean(errors.referralCode)} aria-describedby={errors.referralCode ? 'superadmin-affiliate-referral-code-error' : undefined} className="min-h-11 w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-primary font-mono uppercase focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page focus:border-focus motion-safe:transition-colors" placeholder={t('ui.e_g_partner2026_19b351b')} data-testid="superadmin_affiliates-superadmin-affiliates-affiliate-modal-affiliate-modal-control-3"/>
              {errors.referralCode && <span id="superadmin-affiliate-referral-code-error" className="text-xs text-danger" role="alert">{errors.referralCode.message ? t(String(errors.referralCode.message)) : t('validation.invalid')}</span>}
              <p className="text-xs text-secondary">{t('ui.superadmin_gyms_using_this_code_at_checkout_will_be_tracked_b3e726e')}</p>
            </div>
          </div>

          <div className="flex shrink-0 justify-end gap-3 p-5 border-t border-border">
            <button type="button" onClick={() => { void requestClose(); }} className="min-h-11 px-5 py-2.5 bg-transparent border border-border hover:bg-surface-hover text-primary font-medium rounded-lg motion-safe:transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="superadmin_affiliates-superadmin-affiliates-affiliate-modal-affiliates-affiliate-modal-cancel">
              {t('ui.cancel_1821b90')}
            </button>
            <button type="submit" disabled={isMutating} className="min-h-11 min-w-36 px-5 py-2.5 bg-primary hover:bg-primary-hover text-on-primary font-medium rounded-lg motion-safe:transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95" data-testid="superadmin_affiliates-superadmin-affiliates-affiliate-modal-affiliates-affiliate-modal-action3">
              {(() => { if (isMutating) { return (t('ui.saving')); } if (isEdit) { return (t('ui.save_changes_8cb69e1')); } return (t('ui.save_partner_1fb36ea')); })()}
            </button>
          </div>
        </form>
      </div>
    </div>);
};
