// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsJobsHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the page title, filter toolbar, and bulk action buttons for the Jobs page.
import { RefreshCw, Filter, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS, SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs_filter_options.constants';

import type { SuperadminSystemOpsJobsHeaderProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs_header.types';



/**
 * @description Renders the Background Jobs page title, filters, and bulk-action controls.
 * @dependencies Consumes typed handler props and module-owned filter options; it does not fetch server state.
 * @edge-case Bulk actions remain disabled/visible according to selection and pending state so repeated submissions are guarded.
 */
/**
 * Header section of the Background Jobs page.
 * Contains: page title, Clear Completed + Retry All buttons, and filter dropdowns.
 */
export default function SuperadminSystemOpsJobsHeader({ selectedCount, isRetrying, statusFilter, setStatusFilter, queueFilter, setQueueFilter, onClearCompleted, onRetryAll, onBulkRetry, onBulkDelete, onFilterChange, }: SuperadminSystemOpsJobsHeaderProps) {
  const t = useTranslations('superadmin_system_ops_jobs');
    return (<div className="space-y-4">
      {/* Page Title + Primary Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="superadmin-page-title text-primary">{t('ui.background_jobs_d2258b3')}</h1>
          <p className="text-secondary mt-1 text-sm">{t('ui.monitor_async_queues_inspect_payloads_and_manage_tas_bb2b26c')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={onClearCompleted} className="min-h-11 bg-transparent text-primary px-4 py-2 rounded-lg font-medium hover:bg-surface-hover motion-safe:transition-colors border border-border text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-jobs-header-clear">
            
            {t('ui.clear_completed_e9bd409')}
          </button>
          <button type="button" onClick={onRetryAll} disabled={isRetrying} className="min-h-11 flex items-center gap-2 bg-danger-bg text-danger px-4 py-2 rounded-lg font-medium hover:bg-danger-bg motion-safe:transition-colors border border-border hover:border-transparent disabled:opacity-50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-jobs-header-retry">
            <RefreshCw size={18} strokeWidth={2} className={isRetrying ? 'motion-safe:animate-spin' : ''}/>
            
            {t('ui.retry_all_failed_d20ff57')}
          </button>
        </div>
      </div>

      {/* Filter + Bulk Actions Bar */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-secondary shrink-0"/>
            <div className="w-40 border-none bg-floating rounded-lg">
              <SearchableDropdown data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-header-SearchableDropdown-50" value={statusFilter} onChange={(val) => { const option = SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS.find((item) => item.value === String(val)); if (option) setStatusFilter(option.value); onFilterChange(); }} options={SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} className="bg-transparent border-transparent text-sm"/>
            </div>
          </div>
          <div className="w-40 border-none bg-floating rounded-lg">
            <SearchableDropdown data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-header-SearchableDropdown-54" value={queueFilter} onChange={(val) => { const option = SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS.find((item) => item.value === String(val)); if (option) setQueueFilter(option.value); onFilterChange(); }} options={SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} className="bg-transparent border-transparent text-sm"/>
          </div>
        </div>

        {selectedCount > 0 && (<div className="flex items-center gap-3 motion-safe:animate-in motion-safe:slide-in-from-right-4">
            <span className="text-sm font-medium text-primary">{selectedCount}  {t('ui.selected_890b976')}</span>
            <button type="button" onClick={onBulkRetry} className="min-h-11 flex items-center gap-1.5 bg-primary text-on-primary px-3 py-1.5 rounded-md text-sm hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-jobs-header-retry-2">
              <RefreshCw size={18} strokeWidth={2}/>  {t('ui.retry_177c206')}
            </button>
            <button type="button" onClick={onBulkDelete} className="min-h-11 flex items-center gap-1.5 bg-danger text-on-danger px-3 py-1.5 rounded-md text-sm hover:bg-danger-bg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-jobs-header-delete">
              <Trash2 size={18} strokeWidth={2}/>  {t('ui.delete_7a2cb12')}
            </button>
          </div>)}
      </div>
    </div>);
}
