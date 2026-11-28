// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsBackupsTable within its owning Superadmin feature module; no direct backend implementation.
'use client';

import { useState, useCallback } from 'react';

import { Download, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import SuperadminSystemOpsBackupsEmptyState from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/components/SuperadminSystemOpsBackupsEmptyState';
// RESPONSIBILITY: Renders and composes SuperadminSystemOpsBackupsTable for the owning feature module; business logic and API transport remain in module-owned hooks/services.
import { SUPERADMIN_BACKUPS_STATUS_CODES, SUPERADMIN_BACKUPS_STATUS_COLORS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/constants/superadmin_system_ops_backups.constants';
import { formatNumber, formatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/utils/SuperadminSystemOpsBackupsFormatters';

import type { SuperadminBackupsTableProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups_table.types';
import type { BackupRecord } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_backups/types/superadmin_system_ops_backups.types';

const TABLE_COLUMN_COUNT = 8;
/**
 * @description Renders the Backups Table component and its associated UI logic.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */

const MOBILE_CARD_TABLE_CLASSES = [
  'w-full text-start border-collapse max-md:block max-md:min-w-0',
  'max-md:[&_thead]:sr-only max-md:[&_tbody]:block',
  'max-md:[&_tbody_tr]:mb-3 max-md:[&_tbody_tr]:grid max-md:[&_tbody_tr]:grid-cols-1 max-md:[&_tbody_tr]:w-full',
  'max-md:[&_tbody_tr]:rounded-lg max-md:[&_tbody_tr]:border max-md:[&_tbody_tr]:border-border max-md:[&_tbody_tr]:bg-card',
  'max-md:[&_tbody_td]:grid max-md:[&_tbody_td]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-md:[&_tbody_td]:gap-3',
  'max-md:[&_tbody_td]:w-full max-md:[&_tbody_td]:border-0 max-md:[&_tbody_td]:p-3',
  'max-md:[&_tbody_td::before]:content-[attr(data-mobile-label)] max-md:[&_tbody_td::before]:text-secondary',
  'max-md:[&_tbody_td::before]:text-xs max-md:[&_tbody_td::before]:font-semibold max-md:[&_tbody_td::before]:uppercase',
].join(' ');

export default function SuperadminSystemOpsBackupsTable({
  paginatedBackups,
  filteredLength,
  handleDownload,
  handleRestoreClick,
  selectedBackupIds,
  onToggleSelectBackup,
  onToggleSelectAllBackups,
}: SuperadminBackupsTableProps) {
  const t = useTranslations('superadmin_system_ops_backups');

  const [internalSelectedIds, setInternalSelectedIds] = useState<Set<string>>(new Set());
  const selectedIds = selectedBackupIds ?? internalSelectedIds;

  const handleToggleSelect = useCallback((id: string) => {
    if (onToggleSelectBackup) {
      onToggleSelectBackup(id);
      return;
    }
    setInternalSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, [onToggleSelectBackup]);

  const isAllSelected = paginatedBackups.length > 0 && paginatedBackups.every((b) => selectedIds.has(b.id));
  const isIndeterminate = paginatedBackups.some((b) => selectedIds.has(b.id)) && !isAllSelected;

  const handleToggleSelectAll = useCallback(() => {
    if (onToggleSelectAllBackups) {
      onToggleSelectAllBackups();
      return;
    }
    setInternalSelectedIds((prev) => {
      const next = new Set(prev);
      if (isAllSelected) {
        paginatedBackups.forEach((b) => next.delete(b.id));
      } else {
        paginatedBackups.forEach((b) => next.add(b.id));
      }
      return next;
    });
  }, [onToggleSelectAllBackups, isAllSelected, paginatedBackups]);

  const handleClearSelection = useCallback(() => {
    setInternalSelectedIds(new Set());
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {selectedIds.size > 0 && (
        <div className="p-3 bg-primary-subtle border-b border-border flex flex-wrap items-center justify-between gap-3 motion-safe:animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-on-primary">
              {selectedIds.size} {t('ui.selected') ?? 'Selected'}
            </span>
            <button
              type="button"
              onClick={handleClearSelection}
              className="text-xs text-secondary hover:text-primary font-medium underline"
            >
              {t('ui.clear_selection') ?? 'Clear selection'}
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto flex-1">
        <table className={`w-full text-start border-collapse min-w-full ${MOBILE_CARD_TABLE_CLASSES}`}>
          <thead className="sticky top-0 z-20 bg-slate-100 dark:bg-[#152038] border-b border-border dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
            <tr className="border-b border-border dark:border-white/10 text-sm" data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-table-backups-table-action-1">
              <th className="sticky start-0 z-20 bg-slate-100 dark:bg-[#152038] border-b border-border dark:border-white/10 w-12 px-4 py-3.5 text-center">
                <input
                  type="checkbox"
                  aria-label={t('ui.select_all_backups') ?? 'Select all backups'}
                  checked={isAllSelected}
                  ref={(el) => { if (el) el.indeterminate = isIndeterminate; }}
                  onChange={handleToggleSelectAll}
                  className="h-4 w-4 rounded border-border text-primary accent-primary cursor-pointer focus:ring-2 focus:ring-primary"
                  data-testid="superadmin_system_ops_backups-table-select-all"
                />
              </th>
              <th className="sticky start-12 z-20 bg-slate-100 dark:bg-[#152038] border-b border-e border-border dark:border-white/10 px-4 py-3.5 font-bold text-secondary dark:text-slate-300 text-[11px] uppercase tracking-wider text-start">
                {t('ui.backup_id_f321e1e')}
              </th>
              <th className="border-b border-border dark:border-white/10 px-4 py-3.5 font-bold text-secondary dark:text-slate-300 text-[11px] uppercase tracking-wider text-start">{t('ui.gym_7af44a9')}</th>
              <th className="border-b border-border dark:border-white/10 px-4 py-3.5 font-bold text-secondary dark:text-slate-300 text-[11px] uppercase tracking-wider text-start">{t('ui.database_name_9627a1b')}</th>
              <th className="border-b border-border dark:border-white/10 px-4 py-3.5 font-bold text-secondary dark:text-slate-300 text-[11px] uppercase tracking-wider text-start">{t('ui.size_mb_1e94325')}</th>
              <th className="border-b border-border dark:border-white/10 px-4 py-3.5 font-bold text-secondary dark:text-slate-300 text-[11px] uppercase tracking-wider text-start">{t('ui.status_b2c5243')}</th>
              <th className="border-b border-border dark:border-white/10 px-4 py-3.5 font-bold text-secondary dark:text-slate-300 text-[11px] uppercase tracking-wider text-start">{t('ui.timestamp_4442a67')}</th>
              <th className="border-b border-border dark:border-white/10 px-4 py-3.5 font-bold text-secondary dark:text-slate-300 text-[11px] uppercase tracking-wider text-end">{t('ui.actions_1e45db1')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedBackups.map((backup: BackupRecord, index) => {
              const isSelected = selectedIds.has(backup.id);
              return (
                <tr
                  key={backup.id}
                  tabIndex={0}
                  className={`hover:bg-surface-hover motion-safe:transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${isSelected ? 'bg-primary-subtle border-s-4 border-s-primary' : ''}`}
                  data-testid={`superadmin_system_ops_backups-system-ops-backups-table-item-backup-id-2-${String(backup.id)}`}
                >
                  <td className="sticky start-0 z-10 w-12 bg-card group-hover:bg-surface-hover group-focus-within:bg-surface-hover border-b border-border px-4 py-3 text-center transition-colors">
                    <input
                      type="checkbox"
                      aria-label={`Select backup ${backup.id}`}
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleToggleSelect(backup.id);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 rounded border-border text-primary accent-primary cursor-pointer focus:ring-2 focus:ring-primary"
                      data-testid={`superadmin_system_ops_backups-select-row-${backup.id}`}
                    />
                  </td>
                  <td className="sticky start-12 z-10 bg-card group-hover:bg-surface-hover group-focus-within:bg-surface-hover border-b border-e border-border px-4 py-3.5 text-xs font-mono text-secondary transition-colors" data-mobile-label={t('ui.mobile_backup_id')}>
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <span>{backup.id}</span>
                      <CopyButton value={backup.id} label={`Copy backup ID ${backup.id}`} />
                    </div>
                  </td>
                  <td className="border-b border-border p-4 text-sm font-medium text-primary" data-mobile-label={t('ui.mobile_gym')}>{backup.tenantName}</td>
                  <td className="border-b border-border p-4 text-sm font-mono text-primary" data-mobile-label={t('ui.mobile_database_name')}>{backup.databaseName}</td>
                  <td className="border-b border-border p-4 text-sm text-secondary font-mono" data-mobile-label={t('ui.mobile_size_mb')}>{formatNumber(Math.round(backup.sizeMB * 10) / 10)}</td>
                  <td className="border-b border-border p-4" data-mobile-label={t('ui.mobile_status')}>
                    <span data-testid={`superadmin_system_ops_backups-status-${backup.id}`} className={`px-2.5 py-1 rounded-md text-xs font-bold ${SUPERADMIN_BACKUPS_STATUS_COLORS[backup.status as keyof typeof SUPERADMIN_BACKUPS_STATUS_COLORS]}`}>
                      {t(`ui.status_${backup.status.toLowerCase()}`)}
                    </span>
                  </td>
                  <td className="border-b border-border p-4 text-sm text-secondary" data-mobile-label={t('ui.mobile_timestamp')}>{formatDateTime(backup.timestamp)}</td>
                  <td className="border-b border-border p-4 text-end" data-mobile-label={t('ui.mobile_actions')}>
                    <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 motion-safe:transition-opacity">
                      <button
                        type="button"
                        aria-label={t('ui.a11y_download_backup', { id: backup.id })}
                        onClick={() => void handleDownload(backup.id)}
                        className="min-w-11 min-h-11 p-2 text-secondary hover:text-primary hover:bg-surface-hover rounded-lg motion-safe:transition-colors disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95"
                        title={t('ui.download_pg_dump_bc330ff')}
                        disabled={backup.status !== SUPERADMIN_BACKUPS_STATUS_CODES.SUCCESS}
                        data-testid={`superadmin_system_ops_backups-backups-table-download-${index}`}
                      >
                        <Download size={18} />
                      </button>
                      <button
                        type="button"
                        aria-label={t('ui.a11y_restore_backup', { id: backup.id })}
                        onClick={() => handleRestoreClick(backup)}
                        className="min-w-11 min-h-11 p-2 text-secondary hover:text-danger hover:bg-danger-bg rounded-lg motion-safe:transition-colors disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:active:scale-95"
                        title={t('ui.restore_snapshot_9d96d4a')}
                        disabled={backup.status !== SUPERADMIN_BACKUPS_STATUS_CODES.SUCCESS}
                        data-testid={`superadmin_system_ops_backups-backups-table-restore-${index}`}
                      >
                        <RotateCcw size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredLength === 0 && (
              <tr data-testid="superadmin_system_ops_backups-superadmin-system-ops-backups-table-backups-table-action-3">
                <td colSpan={TABLE_COLUMN_COUNT} className="p-8 text-center text-disabled" data-mobile-label={t('ui.mobile_backup_id')}>
                  <SuperadminSystemOpsBackupsEmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

