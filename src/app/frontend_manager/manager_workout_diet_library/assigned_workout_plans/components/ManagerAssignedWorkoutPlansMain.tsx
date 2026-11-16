// RESPONSIBILITY: Coordinates the assigned-workout-plans screen’s query status and delegates empty-state or assignment-list presentation; it does not assign workouts or own query transport.
'use client';

import { Loader2 } from 'lucide-react';
import CopyButton from '@/components/ui/CopyButton';
import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { useWorkoutAssignmentsQuery } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/hooks/useManagerAssignedWorkoutPlansQueries';
import { ManagerWorkoutPlansFormatDate } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/utils/ManagerWorkoutPlansFormatters';
import { useTranslations } from 'next-intl';
import ManagerAssignedWorkoutPlansEmptyState from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/components/ManagerAssignedWorkoutPlansEmptyState';

const TABLE_COLUMN_COUNT = 4;

export default function AssignedWorkoutPlansMain() {
  const t = useTranslations('MANAGER_WORKOUT_PLANS');
  const { data = [], isPending, isError, isFetching, refetch } = useWorkoutAssignmentsQuery();

  if (isPending) return <div className="p-6" role="status">{t('COPY_LOADING_ASSIGNED_PLANS')}</div>;
  if (isError) {
    return (
      <section className="p-6 space-y-3" aria-labelledby="assigned-plans-error-title">
        <p id="assigned-plans-error-title" className="text-danger-text" role="alert">{t('TEXT_GENERIC_ERROR')}</p>
        <button type="button" onClick={() => void refetch()} disabled={isFetching} className="inline-flex min-h-10 min-w-28 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
          {isFetching ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" />{t('COPY_LOADING_ASSIGNED_PLANS')}</> : t('COPY_TRY_AGAIN')}
        </button>
      </section>
    );
  }
  if (data.length === 0) return <ManagerAssignedWorkoutPlansEmptyState />;

  const labels = [t('COPY_MEMBER_NAME'), t('COPY_ASSIGNED_PLAN'), t('COPY_ASSIGNED'), t('COPY_START_DATE')];

  return (
    <section className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-text-primary">{t('COPY_ASSIGNED_WORKOUT_PLANS')}</h1>
      <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="max-h-[640px] overflow-auto">
          <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={labels}>
            <table className="w-full text-left">
              <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
                <tr>
                  <th className="sticky start-0 z-30 bg-surface-highlight border-e border-border px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">{t('COPY_MEMBER_NAME')}</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">{t('COPY_ASSIGNED_PLAN')}</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">{t('COPY_ASSIGNED')}</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary">{t('COPY_START_DATE')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-highlight/50 transition-colors group">
                    <td className="sticky start-0 z-10 bg-card border-e border-border px-4 py-3 text-sm font-medium text-text-primary group-hover:bg-surface-highlight/50 transition-colors">
                      <div className="flex items-center gap-2">
                        <span>{row.memberName}</span>
                        <CopyButton value={row.memberName} />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{row.planName}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{row.assignedBy}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{ManagerWorkoutPlansFormatDate(row.startDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ManagerInfrastructureResponsiveTable>
        </div>
      </div>
    </section>
  );
}
