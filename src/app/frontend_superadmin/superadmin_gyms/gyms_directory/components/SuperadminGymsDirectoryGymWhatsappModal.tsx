// RESPONSIBILITY: Renders/orchestrates SuperadminGymsGymWhatsappModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymWhatsappModal owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminGymsDirectoryDialogA11y, useSuperadminGymsDirectoryGymWhatsappModal, useTranslations.
 * MODULE DEPENDENCIES: react, lucide-react, next-intl, @/lib/formatters, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymWhatsappModal, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryDialogA11y
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the modal UI for sending a WhatsApp message to a Gym owner. Purely a view component.

import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { maskSensitiveData } from '@/lib/formatters';

import { useSuperadminGymsDirectoryDialogA11y } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryDialogA11y';
import { useSuperadminGymsDirectoryGymWhatsappModal } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymWhatsappModal';


/**
 * @description Renders the modal UI for sending a WhatsApp message to a Gym owner. Purely a view component.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDirectoryGymWhatsappModal() {
  const t = useTranslations('superadmin_gyms');
  const validationMessage = (message?: string) => {
    switch (message) {
      case 'validation.subjectRequired': return t('validation.subjectRequired');
      case 'validation.messageRequired': return t('validation.messageRequired');
      default: return t('validation.invalidField');
    }
  };
    const { isWhatsappModalOpen, closeWhatsappModal, selectedGym, register, handleSubmit, onSubmit, errors, isSubmitting, } = useSuperadminGymsDirectoryGymWhatsappModal();
    const dialogRef = useSuperadminGymsDirectoryDialogA11y(isWhatsappModalOpen && Boolean(selectedGym), closeWhatsappModal);
    if (!isWhatsappModalOpen || !selectedGym)
        return null;
    return (<div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-overlay p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-gym-whatsapp-title" data-testid="superadmin_gyms-gym-whatsapp-modal-dialog" ref={dialogRef}>
      <div className="my-auto flex max-h-dialog-desktop w-full max-w-md flex-col rounded-xl border border-border bg-overlay p-7 shadow-dialog relative">
        <button type="button" onClick={closeWhatsappModal} aria-label={t('ui.cancel_ea478870')} className="min-h-11 min-w-11 absolute top-5 end-5 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_gyms-superadmin-gyms-gym-whatsapp-modal-gym-whatsapp-modal-button">
          <X size={18} aria-hidden="true"/>
        </button>

        <div className="shrink-0 mb-4 pe-8">
          <h2 id="superadmin-gym-whatsapp-title" className="text-lg font-bold text-primary mb-1">{t('ui.whatsapp_gym_owner_22a1e1c1')}</h2>
          <p className="text-sm text-secondary mb-6">{t('ui.send_a_whatsapp_message_to_06f6cf8b')}{selectedGym.ownerName} {t('ui.text_84c40473')}{maskSensitiveData(selectedGym.phone, 'phone')}{t('ui.text_ce96ce64')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="min-h-0 flex-1 flex flex-col" data-testid="superadmin_gyms-superadmingymsgymwhatsappmodal-form-1">
          <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar space-y-4 pe-1">
            <div>
              <label htmlFor="superadmin-gym-whatsapp-subject" className="block text-sm font-bold text-secondary mb-1">{t('ui.subject_c7892ebb')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <input id="superadmin-gym-whatsapp-subject" type="text" aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "superadmin-gym-whatsapp-subject-error" : undefined} {...register('subject')} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors min-h-11" placeholder={t('ui.e_g_important_update_about_your_subscription_375abb7e')} data-testid="superadmin_gyms-superadmin-gyms-gym-whatsapp-modal-gym-whatsapp-modal-text"/>
              {errors.subject && <p id="superadmin-gym-whatsapp-subject-error" role="alert" className="text-xs text-danger mt-1">{validationMessage(errors.subject.message)}</p>}
            </div>

            <div>
              <label htmlFor="superadmin-gym-whatsapp-message" className="block text-sm font-bold text-secondary mb-1">{t('ui.message_4c2a8fe7')}<span className="text-danger">{t('ui.text_3389dae3')}</span></label>
              <textarea id="superadmin-gym-whatsapp-message" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "superadmin-gym-whatsapp-message-error" : undefined} {...register('message')} rows={5} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-focus focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors resize-none min-h-11" placeholder={t('ui.type_your_message_here_88512a88')} data-testid="superadmin_gyms-superadmin-gyms-gym-whatsapp-modal-gym-whatsapp-modal-textarea"/>
              {errors.message && <p id="superadmin-gym-whatsapp-message-error" role="alert" className="text-xs text-danger mt-1">{validationMessage(errors.message.message)}</p>}
            </div>
          </div>

          <div className="flex shrink-0 justify-end gap-3 pt-4 border-t border-border mt-4">
            <button type="button" onClick={closeWhatsappModal} className="min-h-11 px-5 py-2.5 rounded-lg text-sm font-medium text-primary border border-border hover:bg-page motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" disabled={isSubmitting} data-testid="superadmin_gyms-superadmin-gyms-gym-whatsapp-modal-gym-whatsapp-modal-cancel">
              {t('ui.cancel_ea478870')}</button>
            <button type="submit" className="min-h-11 px-5 py-2.5 rounded-lg text-sm font-medium text-on-success bg-success hover:bg-success-bg motion-safe:transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" disabled={isSubmitting} data-testid="superadmin_gyms-superadmin-gyms-gym-whatsapp-modal-gym-whatsapp-modal-submit">
              {isSubmitting ? t('ui.sending_3d2f8a1b') : t('ui.open_whatsapp_repair')}
            </button>
          </div>
        </form>
      </div>
    </div>);
}
