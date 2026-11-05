// RESPONSIBILITY: Renders/orchestrates SuperadminAccountProfileDataExportCard within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the authenticated Superadmin data-export settings surface without owning transport or mutation state.
import { DownloadCloud, Loader2, MailCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminDataExportCardProps } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/types/superadmin_account_profile_overview_data_export.types';



/**
 * @description Presents the asynchronous full-data export action, format expectation, and completion state.
 * @dependencies Uses feature-owned translated UI strings and the parent-owned export mutation contract.
 * @edge-case Never blocks on a file download; the API request is short-lived and completion is reported asynchronously through the role WebSocket flow.
 */
export default function SuperadminAccountProfileOverviewDataExportCard({ onRequestExport, isRequesting, completionState }: SuperadminDataExportCardProps) {
  const t = useTranslations('superadmin_account_profile');
  return (
    <section className="bg-card border border-border rounded-xl shadow-card p-6 space-y-5" aria-labelledby="superadmin_account_profile-data-export-title" data-testid="superadmin_account_profile-superadmin-profile-data-export-card-superadmin_account_profile-data-export-card">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 id="superadmin_account_profile-data-export-title" className="superadmin-section-title text-primary">{t('ui.data_export_and_offboarding')}</h2>
          <p className="mt-1 text-sm text-secondary max-w-2xl">{t('ui.data_export_description')}</p>
        </div>
        <DownloadCloud size={18} className="shrink-0 text-primary" aria-hidden="true" />
      </div>

      <div className="rounded-lg border border-border bg-surface-highlight p-4">
        <p className="text-sm text-primary font-medium">{t('ui.export_format_expectation')}</p>
        <p className="mt-1 text-xs text-secondary">{t('ui.export_background_processing')}</p>
      </div>

      {completionState === 'started' && (
        <div className="rounded-lg border border-border bg-info-bg p-4" role="status" data-testid="superadmin_account_profile-superadmin-profile-data-export-card-data-export-status-started">
          <p className="text-sm text-info">{t('ui.export_started_success')}</p>
        </div>
      )}
      {completionState === 'completed' && (
        <div className="rounded-lg border border-border bg-success-bg p-4 flex items-center gap-2" role="status" data-testid="superadmin_account_profile-superadmin-profile-data-export-card-data-export-status-completed">
          <MailCheck size={18} className="shrink-0 text-success" aria-hidden="true" />
          <p className="text-sm text-success">{t('ui.export_completed_success')}</p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button  type="button" onClick={() => void onRequestExport()} disabled={isRequesting} className="min-h-11 min-w-48 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:cursor-not-allowed disabled:opacity-50 motion-safe:active:scale-95" data-testid="superadmin_account_profile-superadmin-profile-data-export-card-superadmin_account_profile-data-export-request">
          {isRequesting && <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" />}
          {isRequesting ? t('ui.starting_export') : t('ui.request_full_data_export')}
        </button>
      </div>
    </section>
  );
}
