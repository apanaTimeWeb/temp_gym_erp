// RESPONSIBILITY: Coordinates the assigned-workout-plans screen’s query status and delegates empty-state or assignment-list presentation; it does not assign workouts or own query transport.
'use client';

import { Loader2 } from 'lucide-react';
import ManagerInfrastructureResponsiveTable from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureResponsiveTable';
import { useWorkoutAssignmentsQuery } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/hooks/useManagerAssignedWorkoutPlansQueries';
import { ManagerWorkoutPlansFormatDate } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/utils/ManagerWorkoutPlansFormatters';
import { useTranslations } from 'next-intl';
import ManagerAssignedWorkoutPlansEmptyState from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/components/ManagerAssignedWorkoutPlansEmptyState';

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

  return (
    <section className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-text-primary">{t('COPY_ASSIGNED_WORKOUT_PLANS')}</h1>
      <div className="overflow-x-auto">
        <ManagerInfrastructureResponsiveTable mobilePattern="horizontal-scroll" labels={[t('COPY_MEMBER_NAME'), t('COPY_ASSIGNED_PLAN'), t('COPY_ASSIGNED'), t('COPY_START_DATE')]}>
          <table className="w-full text-left">
            <thead><tr><th>{t('COPY_MEMBER_NAME')}</th><th>{t('COPY_ASSIGNED_PLAN')}</th><th>{t('COPY_ASSIGNED')}</th><th>{t('COPY_START_DATE')}</th></tr></thead>
            <tbody>{data.map((row) => <tr key={row.id}><td>{row.memberName}</td><td>{row.planName}</td><td>{row.assignedBy}</td><td>{ManagerWorkoutPlansFormatDate(row.startDate)}</td></tr>)}</tbody>
          </table>
        </ManagerInfrastructureResponsiveTable>
      </div>
    </section>
  );
}
