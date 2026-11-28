// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsJobsHeader within its owning Superadmin feature module; no direct backend implementation.
'use client';
import { RefreshCw, Filter, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS, SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs_filter_options.constants';

import type { SuperadminSystemOpsJobsHeaderProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs_header.types';

export default function SuperadminSystemOpsJobsHeader({ selectedCount, isRetrying, statusFilter, setStatusFilter, queueFilter, setQueueFilter, onClearCompleted, onRetryAll, onBulkRetry, onBulkDelete, onFilterChange }: SuperadminSystemOpsJobsHeaderProps) {
  const t = useTranslations('superadmin_system_ops_jobs');
  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-2xl border border-blue-500/35 bg-card dark:bg-gradient-to-br dark:from-[#0E2438] dark:via-[#12192B] dark:to-[#0C1322] p-5 sm:p-6 shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#3B82F6] via-[#38BDF8] to-[#10B981]" />
        <div className="min-w-0">
          <h1 className="superadmin-page-title text-primary">{t('ui.background_jobs_d2258b3')}</h1>
          <p className="text-secondary mt-1 text-sm">{t('ui.monitor_async_queues_inspect_payloads_and_manage_tas_bb2b26c')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClearCompleted}
            className="min-h-10 bg-input text-primary px-4 py-2 rounded-xl font-semibold hover:bg-surface-hover motion-safe:transition-colors border border-border dark:border-white/15 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95 cursor-pointer"
            data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-jobs-header-clear"
          >
            {t('ui.clear_completed_e9bd409')}
          </button>
          <button
            type="button"
            onClick={onRetryAll}
            disabled={isRetrying}
            className="min-h-10 flex items-center gap-2 bg-rose-500/15 text-rose-500 dark:text-rose-300 px-4 py-2 rounded-xl font-semibold hover:bg-rose-500/25 motion-safe:transition-colors border border-rose-500/35 disabled:opacity-50 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95 cursor-pointer"
            data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-jobs-header-retry"
          >
            <RefreshCw size={16} strokeWidth={2.2} className={isRetrying ? 'motion-safe:animate-spin' : ''} />
            <span>{t('ui.retry_all_failed_d20ff57')}</span>
          </button>
        </div>
      </section>

      <div className="rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-gradient-to-b dark:from-[#121B2F] dark:to-[#0C1220] p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-secondary shrink-0" />
            <div className="w-40 border-none bg-floating rounded-xl">
              <SearchableDropdown data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-header-SearchableDropdown-50" value={statusFilter} onChange={(val) => { const option = SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS.find((item) => item.value === String(val)); if (option) setStatusFilter(option.value); onFilterChange(); }} options={SUPERADMIN_JOBS_STATUS_FILTER_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} className="bg-transparent border-transparent text-sm" />
            </div>
          </div>
          <div className="w-40 border-none bg-floating rounded-xl">
            <SearchableDropdown data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-header-SearchableDropdown-54" value={queueFilter} onChange={(val) => { const option = SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS.find((item) => item.value === String(val)); if (option) setQueueFilter(option.value); onFilterChange(); }} options={SUPERADMIN_JOBS_QUEUE_FILTER_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} className="bg-transparent border-transparent text-sm" />
          </div>
        </div>

        {selectedCount > 0 && (
          <div className="flex flex-wrap items-center gap-2.5 motion-safe:animate-in motion-safe:slide-in-from-right-4">
            <span className="text-xs font-semibold text-primary">{selectedCount} {t('ui.selected_890b976')}</span>
            <button type="button" onClick={onBulkRetry} className="min-h-10 flex items-center gap-1.5 bg-primary text-on-primary px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer" data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-jobs-header-retry-2">
              <RefreshCw size={15} strokeWidth={2} /> {t('ui.retry_177c206')}
            </button>
            <button type="button" onClick={onBulkDelete} className="min-h-10 flex items-center gap-1.5 bg-danger text-on-danger px-3 py-1.5 rounded-xl text-xs font-semibold hover:brightness-110 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer" data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-header-superadmin_system_ops_jobs-jobs-header-delete">
              <Trash2 size={15} strokeWidth={2} /> {t('ui.delete_7a2cb12')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
