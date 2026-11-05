// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsJobsMain within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: SuperadminSystemOpsJobsMain.tsx — orchestrator for the Background Jobs page.


import { useTranslations } from 'next-intl';

import Pagination from '@/components/ui/Pagination';

import SuperadminSystemOpsJobsHeader from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/components/SuperadminSystemOpsJobsHeader';
import SuperadminSystemOpsJobsJobInspectModal from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/components/SuperadminSystemOpsJobsJobInspectModal';
import SuperadminSystemOpsJobsStatsBar from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/components/SuperadminSystemOpsJobsStatsBar';
import SuperadminSystemOpsJobsTable from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/components/SuperadminSystemOpsJobsTable';
import { SUPERADMIN_JOBS_FILTER_QUEUE_CODES, SUPERADMIN_JOBS_FILTER_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs.constants';
import { useSuperadminSystemOpsJobsPage } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/hooks/useSuperadminSystemOpsJobsPage';

import type { SuperadminSystemOpsJobsStatusFilter } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs.types';

/**
 * @description SuperadminSystemOpsJobsMain.tsx — orchestrator for the Background Jobs page.
 * @dependencies useSuperadminSystemOpsJobsPage → SuperadminSystemOpsJobsMain → SuperadminSystemOpsJobsHeader + StatsBar + Table + InspectModal
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsJobsMain() {
  const t = useTranslations('superadmin_system_ops_jobs');
    const { isPending, isError: error, refetch, paginatedJobs, currentPage, totalPages, setCurrentPage, statusFilter, setStatusFilter, queueFilter, setQueueFilter, selectedJobIds, toggleSelection, toggleAll, inspectJob, setInspectJob, isRetrying, handleRetryAll, handleRetryJob, handleCancelJob, handleDeleteJob, handleClearCompleted, handleBulkRetry, handleBulkDelete, metrics, } = useSuperadminSystemOpsJobsPage();
    if (isPending) {
        return (<div className="space-y-6" data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-main-page">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-skeleton-base motion-safe:animate-pulse rounded"/>
          <div className="h-8 w-64 bg-skeleton-base motion-safe:animate-pulse rounded"/>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (<div key={`sk-stat-${i}`} className="h-24 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border"/>))}
        </div>
        <div className="h-96 bg-skeleton-base motion-safe:animate-pulse rounded-xl border border-border"/>
      </div>);
    }
    if (error) {
        return <section className="space-y-3 rounded-xl border border-border bg-danger-bg p-8 text-center" role="alert" data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-main-jobs-view-error-state"><p className="text-sm font-medium text-danger">{t('ui.error_loading_jobs_please_try_again_e2a0e60')}</p><button  type="button" onClick={() => void refetch()} className="mx-auto min-h-11 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-main-jobs-view-error-retry">{t('ui.try_again_cb12d14')}</button></section>;
    }
    return (<div className="space-y-6">
      <SuperadminSystemOpsJobsHeader selectedCount={selectedJobIds.size} isRetrying={isRetrying} statusFilter={statusFilter} setStatusFilter={setStatusFilter} queueFilter={queueFilter} setQueueFilter={setQueueFilter} onClearCompleted={handleClearCompleted} onRetryAll={handleRetryAll} onBulkRetry={handleBulkRetry} onBulkDelete={handleBulkDelete} onFilterChange={() => setCurrentPage(1)}/>

      <p className="text-xs text-secondary" role="note">{t('ui.metrics_scope_note')}</p>
      <SuperadminSystemOpsJobsStatsBar metrics={metrics} selectedStatus={statusFilter as SuperadminSystemOpsJobsStatusFilter} onFilterSelect={(status) => { setStatusFilter(status as SuperadminSystemOpsJobsStatusFilter); setCurrentPage(1); }}/>

      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden flex flex-col min-h-96">
        <SuperadminSystemOpsJobsTable jobs={paginatedJobs} allJobsFiltered={statusFilter !== SUPERADMIN_JOBS_FILTER_STATUS_CODES.ALL || queueFilter !== SUPERADMIN_JOBS_FILTER_QUEUE_CODES.ALL} selectedJobIds={selectedJobIds} toggleSelection={toggleSelection} toggleAll={toggleAll} onInspect={setInspectJob} onRetry={handleRetryJob} onCancel={handleCancelJob} onDelete={handleDeleteJob}/>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-main-ops-jobs-main-pagination"/>
      </div>

      {inspectJob && (<SuperadminSystemOpsJobsJobInspectModal job={inspectJob} onClose={() => setInspectJob(null)}/>)}
    </div>);
}
