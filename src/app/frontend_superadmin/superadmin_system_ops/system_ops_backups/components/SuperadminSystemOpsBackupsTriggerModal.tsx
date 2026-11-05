// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsBackupsTriggerModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Confirmation view for the global backup trigger; asynchronous mutation is owned by the feature action hook.
import { DatabaseBackup, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { useSuperadminSystemOpsBackupsActions } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsActions';
import { useSuperadminSystemOpsBackupsDialogA11y } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/hooks/useSuperadminSystemOpsBackupsDialogA11y';

import type { SuperadminBackupsTriggerModalProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups_trigger_modal.types';


/**
 * @description Confirmation view for the global backup trigger; asynchronous mutation is owned by the feature action hook.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminSystemOpsBackupsTriggerModal({ isOpen, onClose }: SuperadminBackupsTriggerModalProps) {
  const t = useTranslations('superadmin_system_ops_backups');
  const dialogRef = useSuperadminSystemOpsBackupsDialogA11y(isOpen, onClose);
  const { triggerBackup, isTriggering } = useSuperadminSystemOpsBackupsActions();
  if (!isOpen) return null;
  const handleCreateBackup = async () => {
    if (isTriggering) return;
    try {
      const response = await triggerBackup();
      toast.success(response.message, { id: 'superadmin-backups-trigger-result' });
      onClose();
    } catch (error: unknown) {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-backups-trigger-error' });
    }
  };
  return (<div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="superadmin-backups-trigger-title" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-trigger-modal-backups-trigger-modal-dialog" ref={dialogRef}>
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-overlay shadow-dialog motion-safe:animate-in motion-safe:fade-in">
      <div className="p-6">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary-subtle text-primary" aria-hidden="true"><DatabaseBackup size={18} strokeWidth={2}/></div>
        <h2 id="superadmin-backups-trigger-title" className="mb-2 text-lg font-bold text-primary">{t('ui.trigger_global_backup_6972865')}</h2>
        <p className="mb-6 text-sm text-secondary">{t('ui.are_you_sure_you_want_to_trigger_a_manual_snapshot_f_de30b23')}</p>
        <div className="flex justify-end gap-3">
          <button  type="button" onClick={onClose} disabled={isTriggering} className="min-h-11 rounded-md border border-border px-4 py-2 font-medium text-primary hover:bg-surface-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-trigger-modal-backups-trigger-modal-cancel">{t('ui.cancel_5ded4db')}</button>
          <button  type="button" onClick={() => void handleCreateBackup()} disabled={isTriggering} className="min-h-11 inline-flex min-w-36 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-on-primary hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-trigger-modal-backups-trigger-modal-back">{isTriggering ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin"/>{t('ui.creating_fdc7299')}</> : t('ui.yes_start_backup_83dae91')}</button>
        </div>
      </div>
    </div>
  </div>);
}


