// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsJobsJobInspectModal within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the Job Payload Inspect Modal — shows timing, error trace, and JSON payload.
import { Eye, AlertTriangle, X as XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SUPERADMIN_JOBS_STATUS_TEXT_COLORS } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/constants/superadmin_system_ops_jobs.constants';
import { useSuperadminSystemOpsJobsDialogA11y } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/hooks/useSuperadminSystemOpsJobsDialogA11y';
import { formatDuration, formatDateTime } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/utils/SuperadminSystemOpsJobsFormatters';

import type { SuperadminSystemOpsJobsJobInspectModalProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs_job_inspect_modal.types';


/**
 * @description Renders the full-screen background-job inspection modal with timing, error, and payload details.
 * @dependencies Consumes the feature-local job entity contract and translated display strings without fetching or mutating data.
 * @edge-case Keeps the close action keyboard reachable and exposes a bounded dialog surface for large payloads.
 */
export default function SuperadminSystemOpsJobsJobInspectModal({ job, onClose }: SuperadminSystemOpsJobsJobInspectModalProps) {
  const t = useTranslations('superadmin_system_ops_jobs');
  const dialogRef = useSuperadminSystemOpsJobsDialogA11y(true, onClose);
        const statusKey = job.status as keyof typeof SUPERADMIN_JOBS_STATUS_TEXT_COLORS;

  return (<div role="dialog" aria-modal="true" aria-label={t('ui.a11y_inspect_job', { id: job.id })} data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-job-inspect-modal-job-inspect-modal-dialog" ref={dialogRef} className="fixed inset-0 bg-overlay z-40 flex items-center justify-center p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in">
      <div className="bg-overlay border border-border rounded-xl w-full max-w-2xl shadow-dialog overflow-hidden flex flex-col max-h-screen">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-overlay shrink-0">
          <div>
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <Eye size={18} className="text-primary"/>
              
              {t('ui.inspect_job_f693aa6')} <span className="font-mono text-sm text-secondary ms-1">{job.id}</span>
            </h2>
            <p className="text-sm text-secondary mt-1">
              
              {t('ui.queue_78d0b4b')} <span className="text-primary font-medium">{job.queueName}</span>  {t('ui.bull_task_d98c331')} {job.jobName}
            </p>
          </div>
          <button type="button" data-autofocus="true" onClick={onClose} aria-label={t('ui.close_inspect_modal_dbc7d72')} className="min-w-11 min-h-11 p-2 text-secondary hover:text-primary hover:bg-surface-hover rounded-full motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:active:scale-95" data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-job-inspect-modal-job-inspect-modal-close">
            <XIcon size={18}/>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {/* Status & Timing */}
          <div>
            <h3 className="text-xs font-semibold text-secondary mb-3 uppercase tracking-wider">{t('ui.status_amp_timing_bb09a35')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card p-4 rounded-lg">
              <div>
                <p className="text-xs text-secondary mb-1">{t('ui.status_b5bd428')}</p>
                <p className={`text-sm font-bold ${SUPERADMIN_JOBS_STATUS_TEXT_COLORS[statusKey]}`}>{t(`ui.status_${job.status.toLowerCase()}`)}</p>
              </div>
              <div>
                <p className="text-xs text-secondary mb-1">{t('ui.attempts_d7d5edb')}</p>
                <p className="text-sm font-medium text-primary">{job.attempts}</p>
              </div>
              <div>
                <p className="text-xs text-secondary mb-1">{t('ui.created_at_41f38d6')}</p>
                <p className="text-xs text-primary">{formatDateTime(job.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-secondary mb-1">{t('ui.duration_c05ec45')}</p>
                <p className="text-sm text-primary font-mono">{formatDuration(job.durationMs)}</p>
              </div>
            </div>
          </div>

          {/* Error Trace */}
          {job.error && (<div>
              <h3 className="text-xs font-semibold text-danger mb-3 uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle size={18}/>  {t('ui.error_trace_c91bb35')}
              </h3>
              <div className="bg-danger-bg border border-border text-danger p-4 rounded-lg text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                {job.error}
              </div>
            </div>)}

          {/* Payload */}
          <div>
            <h3 className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">{t('ui.job_payload_da3554b')}</h3>
            <div className="bg-sidebar border border-border p-4 rounded-lg overflow-x-auto">
              <pre className="text-xs font-mono text-primary">
                {JSON.stringify(job.payload ?? { message: t('ui.no_payload_attached_bfb599f') }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
