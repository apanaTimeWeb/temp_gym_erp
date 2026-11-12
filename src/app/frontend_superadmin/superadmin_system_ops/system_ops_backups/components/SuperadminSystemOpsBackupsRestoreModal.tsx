// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsBackupsRestoreModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Confirmation view for restoring a backup snapshot; mutation lifecycle is owned by the feature action hook.
import { Loader2, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { SUPERADMIN_BACKUPS_RESTORE_CONFIRMATION_PHRASE } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/constants/superadmin_system_ops_backups.constants';
import { useSuperadminSystemOpsBackupsActions } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsActions';
import { useSuperadminSystemOpsBackupsDialogA11y } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsDialogA11y';
import { formatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/utils/SuperadminSystemOpsBackupsFormatters';

import type { SuperadminBackupsRestoreModalProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups_restore_modal.types';


/**
 * @description Confirmation view for restoring a backup snapshot; mutation lifecycle is owned by the feature action hook.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminSystemOpsBackupsRestoreModal({ isOpen, onClose, selectedBackup, restoreConfirmText, setRestoreConfirmText }: SuperadminBackupsRestoreModalProps) {
  const t = useTranslations('superadmin_system_ops_backups');
  const dialogRef = useSuperadminSystemOpsBackupsDialogA11y(isOpen && Boolean(selectedBackup), onClose);
  const { restoreBackup, clearRestoreIntent, isRestoring } = useSuperadminSystemOpsBackupsActions();
  if (!isOpen || !selectedBackup) return null;

  const confirmRestore = async () => {
    if (restoreConfirmText !== SUPERADMIN_BACKUPS_RESTORE_CONFIRMATION_PHRASE || isRestoring) return;
    try {
      const response = await restoreBackup(selectedBackup.id);
      toast.success(response.message, { id: 'superadmin-backups-restore-result' });
      setRestoreConfirmText('');
      onClose();
    } catch (error: unknown) {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-backups-restore-error' });
    }
  };

  return (<div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-overlay p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-backups-restore-title" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-restore-modal-backups-restore-modal-dialog" ref={dialogRef}>
    <div className="my-auto flex max-h-dialog-desktop w-full max-w-md flex-col overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:fade-in">
      <div className="flex min-h-0 flex-1 flex-col p-6">
        <div className="shrink-0 mb-4 flex size-12 items-center justify-center rounded-full bg-danger-bg text-danger" aria-hidden="true"><RotateCcw size={18} strokeWidth={2}/></div>
        <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar pe-1">
          <h2 id="superadmin-backups-restore-title" className="mb-2 text-lg font-bold text-primary">{t('ui.restore_database_snapshot_f0d36ab')}</h2>
          <p className="mb-4 text-sm text-secondary">{t('ui.are_you_absolutely_sure_you_want_to_restore_the_d657706')} <strong className="text-primary">{selectedBackup.databaseName}</strong>  {t('ui.database_using_snapshot_5adc1f2')} <strong className="font-mono text-primary">{selectedBackup.id}</strong>{t('ui.text_d1457b72')}</p>
          <div className="mb-6 rounded-lg border border-border bg-warning-bg p-3"><p className="text-xs font-medium text-warning">{t('ui.warning_this_will_immediately_overwrite_the_live_pro_3003144')} <strong>{selectedBackup.tenantName}</strong>{t('ui.any_data_created_after_217508d')} {formatDateTime(selectedBackup.timestamp)}  {t('ui.will_be_permanently_lost_a67d240')}</p></div>
          <div className="mb-6">
            <label htmlFor="superadmin-backups-restore-confirm" className="mb-2 block text-sm font-medium text-primary">{t('ui.type_913ef98')} <span className="font-mono font-bold text-danger">{t('ui.restore_c11ac24')}</span>  {t('ui.to_confirm_db0f4c6')}</label>
            <input  id="superadmin-backups-restore-confirm" type="text" value={restoreConfirmText} onChange={(event) => setRestoreConfirmText(event.target.value)} disabled={isRestoring} aria-describedby="superadmin-backups-restore-help" className="min-h-11 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out" placeholder={t('ui.restore_c11ac24')} autoFocus  data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-restore-modal-backups-restore-modal-confirm"/>
            <p id="superadmin-backups-restore-help" className="mt-1 text-xs text-secondary">{t('ui.the_restore_action_cannot_start_until_the_exact_conf_4d045be')}</p>
          </div>
        </div>
        <div className="shrink-0 flex justify-end gap-3 pt-4 border-t border-border">
          <button  type="button" onClick={() => { clearRestoreIntent(selectedBackup.id); onClose(); setRestoreConfirmText(''); }} disabled={isRestoring} className="min-h-11 rounded-md border border-border px-4 py-2 font-medium text-primary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-restore-modal-backups-restore-modal-cancel">{t('ui.cancel_5ded4db')}</button>
          <button  type="button" onClick={() => void confirmRestore()} disabled={restoreConfirmText !== SUPERADMIN_BACKUPS_RESTORE_CONFIRMATION_PHRASE || isRestoring} className="min-h-11 inline-flex min-w-36 items-center justify-center gap-2 rounded-md bg-danger px-4 py-2 font-medium text-on-danger motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-restore-modal-backups-restore-modal-restore">{isRestoring ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/>{t('ui.restoring_b0cad24')}</> : t('ui.yes_restore_snapshot_45beb27')}</button>
        </div>
      </div>
    </div>
  </div>);
}


