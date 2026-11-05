// RESPONSIBILITY: Renders/orchestrates SuperadminSystemOpsJobsEmptyState within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the empty state for the jobs table.
import { Activity } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { SuperadminSystemOpsJobsEmptyStateProps } from '@/app/frontend_superadmin/superadmin_system_ops/system_ops_jobs/types/superadmin_system_ops_jobs_empty_state.types';



/**
 * @description Renders the empty state for the jobs table.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsJobsEmptyState({ isFiltered }: SuperadminSystemOpsJobsEmptyStateProps) {
  const t = useTranslations('superadmin_system_ops_jobs');
    return (<tr data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-empty-state-jobs-empty-state-empty">
      <td colSpan={7} className="py-16" data-mobile-label={t('ui.mobile_field_1')} data-testid="superadmin_system_ops_jobs-superadmin-system-ops-jobs-empty-state-jobs-empty-state-empty-2">
        <div className="flex flex-col items-center justify-center text-center px-4" data-testid="superadmin_system_ops-systemopsjobsemptystate-state">
          <div className="w-12 h-12 rounded-full bg-floating flex items-center justify-center mb-4">
            <Activity size={18} className="text-secondary"/>
          </div>
          <h3 className="text-sm font-semibold text-primary mb-1">
            {isFiltered ? t('ui.no_jobs_found_a1e3309') : t('ui.no_jobs_available_ad0e724')}
          </h3>
          <p className="text-sm text-secondary max-w-sm">
            {isFiltered
            ? t('ui.try_adjusting_your_filters_to_find_the_jobs_you_are__ba29596')
            : t('ui.background_jobs_and_tasks_will_be_listed_here_when_s_59d3915')}
          </p>
        </div>
      </td>
    </tr>);
}
