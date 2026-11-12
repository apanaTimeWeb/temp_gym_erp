// RESPONSIBILITY: Renders/orchestrates SuperadminGymsGymDeleteModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminGymsGymDeleteModal owned by the superadmin_gyms feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: Imported hook APIs: useSuperadminGymsDirectoryDialogA11y, useSuperadminGymsDirectoryGymDeleteModal, useTranslations.
 * MODULE DEPENDENCIES: react, lucide-react, next-intl, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymDeleteModal, @/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryDialogA11y
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the confirmation modal for deleting a gym. Requires the user to type "DELETE".

import { AlertTriangle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useSuperadminGymsDirectoryDialogA11y } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryDialogA11y';
import { useSuperadminGymsDirectoryGymDeleteModal } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymDeleteModal';


/**
 * @description Renders the confirmation modal for deleting a gym. Requires the user to type "DELETE".
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminGymsDirectoryGymDeleteModal() {
  const t = useTranslations('superadmin_gyms');
    const { isDeleteModalOpen, closeDeleteModal, gymToDelete, confirmText, setConfirmText, handleConfirmDelete, actionLoadingId } = useSuperadminGymsDirectoryGymDeleteModal();
    const dialogRef = useSuperadminGymsDirectoryDialogA11y(isDeleteModalOpen && Boolean(gymToDelete), closeDeleteModal);
    if (!isDeleteModalOpen || !gymToDelete)
        return null;
    const isDeleteEnabled = confirmText === t('ui.delete_32f68a60') && actionLoadingId !== gymToDelete.id;
    const isDeleting = actionLoadingId === gymToDelete.id;
    return (<div ref={dialogRef} tabIndex={-1} className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-overlay p-4" role="dialog" aria-modal="true" aria-labelledby="superadmin-gyms-delete-dialog-title" data-testid="superadmin_gyms-gym-delete-modal-dialog">
      <div className="my-auto flex max-h-dialog-desktop w-full max-w-md flex-col rounded-xl border border-border bg-overlay p-7 shadow-dialog relative">
        <button type="button" onClick={closeDeleteModal} aria-label={t('ui.close_modal_a2071564')} className="absolute top-5 end-5 min-h-11 min-w-11 text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" disabled={isDeleting} data-testid="superadmin_gyms-superadmin-gyms-gym-delete-modal-gym-delete-modal-button">
          <X size={18}/>
        </button>

        <div className="flex shrink-0 items-center gap-3 mb-4 pe-8">
          <div className="bg-danger-bg p-2 rounded-full">
            <AlertTriangle size={18} className="text-danger"/>
          </div>
          <h2 id="superadmin-gyms-delete-dialog-title" className="text-lg font-bold text-primary">{t('ui.delete_gym_326630c6')}</h2>
        </div>
        
        <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar mb-6">
          <p className="text-sm text-secondary mb-4">
            {t('ui.you_are_about_to_permanently_delete_44bf7cd2')}<strong>{gymToDelete.name}</strong> {t('ui.and_all_associated_data_this_action_cannot_b_f581a485')}</p>

          <div className="bg-danger-bg border border-border rounded-lg p-4">
            <label className="block text-sm font-bold text-secondary mb-2">
              {t('ui.please_type_1aeee9f4')}<span className="text-primary font-mono select-none">{t('ui.delete_32f68a60')}</span> {t('ui.to_confirm_c55cced3')}</label>
            <input id="superadmin-gyms-delete-confirm" aria-label={t('ui.type_delete_013033d8')} type="text" value={confirmText} onChange={(e) => setConfirmText(e.target.value)} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-primary focus:border-border focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-colors min-h-11" placeholder={t('ui.type_delete_013033d8')} disabled={isDeleting} data-testid="superadmin_gyms-superadmin-gyms-gym-delete-modal-gym-delete-modal-text"/>
          </div>
        </div>

        <div className="flex shrink-0 justify-end gap-3 pt-4 border-t border-border">
          <button type="button" onClick={closeDeleteModal} className="px-5 py-2.5 rounded-lg text-sm font-medium text-primary border border-border hover:bg-page motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" disabled={isDeleting} data-testid="superadmin_gyms-superadmin-gyms-gym-delete-modal-gym-delete-modal-cancel">
            {t('ui.cancel_ea478870')}</button>
          <button type="button" onClick={handleConfirmDelete} className="px-5 py-2.5 rounded-lg text-sm font-medium text-on-danger bg-danger hover:bg-danger-bg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-h-11 min-w-11" disabled={!isDeleteEnabled} data-testid="superadmin_gyms-gym-delete-modal-confirm-delete">
            {isDeleting ? t('ui.deleting_2b7e1c4d') : t('ui.confirm_delete_9a1d5c7e')}
          </button>
        </div>
      </div>
    </div>);
}
