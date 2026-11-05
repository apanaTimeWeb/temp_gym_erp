"use client";
// RESPONSIBILITY: Screen-level individual progress view; all data/mutations remain in the module-owned main hook.
import { useTranslations } from 'next-intl';

import { TrainerInfrastructureUserSafeError } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/utils/TrainerCoachingIndividualProgressTrainerInfrastructureUserSafeError';
import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressTrainerInfrastructureSearchableDropdown';
import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressTrainerInfrastructureSkeletonBlock';
import TrainerProgressTrackingChart from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingChart';
import TrainerProgressTrackingEmptyState from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingEmptyState';
import TrainerProgressTrackingTable from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingTable';
import type { useTrainerProgressTrackingMain } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingMain';

export default function TrainerProgressTrackingIndividualView({ model }: { model: ReturnType<typeof useTrainerProgressTrackingMain> }) {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  return (
    <>
      <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border">
        <span className="text-sm font-semibold text-primary">{t('TEXT_SELECT_MEMBER')}</span>
        {model.membersQuery.isPending ? (
          <p role="status" className="text-sm text-secondary">{t('TEXT_MEMBERS_LOADING')}</p>
        ) : model.membersQuery.isError ? (
          <div className="flex items-center gap-2"><p role="alert" className="text-sm text-danger">{t('TEXT_MEMBERS_LOAD_ERROR')}</p><button type="button" onClick={model.retryMembers} disabled={model.membersQuery.isFetching} className="min-h-11 px-3 rounded-lg border border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{model.membersQuery.isFetching ? t('TEXT_RETRYING') : t('TEXT_RETRY')}</button></div>
        ) : model.tData.members.length === 0 ? (
          <p className="text-sm text-secondary">{t('TEXT_NO_MEMBERS_AVAILABLE')}</p>
        ) : (
          <TrainerInfrastructureSearchableDropdown value={model.selectedMemberId} onChange={(value: string | number) => model.setSelectedMemberId(String(value))} options={[{ label: t('TEXT_SELECT_MEMBER'), value: '' }, ...model.tData.members.map(member => ({ label: member.name, value: member.id }))]} className="w-64" ariaLabel={t('TEXT_SELECT_MEMBER')} testId="trainer-progress-tracking-main-member-select" />
        )}
      </div>
      {model.selectedMemberId && !model.membersQuery.isPending && !model.membersQuery.isError && model.tData.members.length > 0 ? (
        <section aria-labelledby="trainer-progress-summary-heading" className="rounded-xl border border-border bg-card p-4 space-y-3" data-testid="trainer-progress-summary">
          <h2 id="trainer-progress-summary-heading" className="font-semibold text-primary">{model.summaryQuery.data?.memberName ?? t('TEXT_PROGRESS_TRACKING')}</h2>
          {model.summaryQuery.isPending ? <p role="status" className="text-sm text-secondary">{t('TEXT_MEMBERS_LOADING')}</p> : model.summaryQuery.isError ? (
            <div className="flex flex-wrap items-center gap-2"><p role="alert" className="text-sm text-danger">{TrainerInfrastructureUserSafeError(model.summaryQuery.error, t('TEXT_GENERIC_REQUEST_ERROR'))}</p><button type="button" onClick={() => void model.summaryQuery.refetch()} disabled={model.summaryQuery.isFetching} className="min-h-11 rounded-lg border border-border px-3 text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{model.summaryQuery.isFetching ? t('TEXT_RETRYING') : t('TEXT_RETRY')}</button></div>
          ) : model.summaryQuery.data ? (
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div><dt className="text-xs text-secondary">{t('TEXT_ENTRIES')}</dt><dd className="text-lg font-semibold text-primary">{model.summaryQuery.data.totalEntries}</dd></div>
              <div><dt className="text-xs text-secondary">{t('TEXT_WEIGHT_CHANGE')}</dt><dd className="text-lg font-semibold text-primary">{model.summaryQuery.data.weightChangeKg} kg</dd></div>
              <div><dt className="text-xs text-secondary">{t('TEXT_CURRENT_WEIGHT')}</dt><dd className="text-lg font-semibold text-primary">{model.summaryQuery.data.latestEntry ? `${model.summaryQuery.data.latestEntry.weightKg} kg` : '—'}</dd></div>
              <div><dt className="text-xs text-secondary">{t('TEXT_CURRENT_BMI')}</dt><dd className="text-lg font-semibold text-primary">{model.summaryQuery.data.latestEntry?.bmi ?? '—'}</dd></div>
            </dl>
          ) : null}
        </section>
      ) : null}
      {model.membersQuery.isPending || model.membersQuery.isError || model.tData.members.length === 0 ? null : !model.selectedMemberId ? (
        <div className="text-center py-12 text-secondary bg-card rounded-xl border border-border">{t('TEXT_PLEASE_SELECT_A_MEMBER_TO_VIEW_THEIR_PROGRESS')}</div>
      ) : model.progressQuery.isPending || model.chartQuery.isPending ? (
        <div className="space-y-4"><TrainerInfrastructureSkeletonBlock className="h-64 rounded-xl border border-border" /><TrainerInfrastructureSkeletonBlock className="h-72 rounded-xl border border-border" /></div>
      ) : model.progressQuery.isError ? (
        <div className="p-5 rounded-xl border border-border bg-danger-bg" data-testid="trainer-progress-tracking-trainer-progress-tracking-main-danger-state-59-1">
          <p role="alert" className="text-sm text-danger font-medium" data-testid="trainer_progress_tracking-progress-tracking_main_error">{TrainerInfrastructureUserSafeError(model.progressQuery.error, t('TEXT_GENERIC_REQUEST_ERROR'))}</p>
          <button type="button" onClick={() => void model.progressQuery.refetch()} disabled={model.progressQuery.isFetching} className="mt-3 min-h-11 min-w-28 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_progress_tracking-trainerprogresstrackingmain-button_5">{model.progressQuery.isFetching ? t('TEXT_RETRYING') : t('TEXT_RETRY')}</button>
        </div>
      ) : model.progressQuery.data?.entries.length === 0 ? (
        <TrainerProgressTrackingEmptyState onAdd={model.openAddModal} />
      ) : (
        <>
          {model.chartQuery.isError ? <div className="p-4 rounded-xl border border-border bg-warning-bg text-warning" data-testid="trainer-progress-tracking-trainer-progress-tracking-main-warning-state-68-2">{t('TEXT_PROGRESS_CHART_COULD_NOT_BE_LOADED_THE_T_B99F5572')}</div> : <TrainerProgressTrackingChart entries={model.chartQuery.data?.entries ?? []} activeMetric={model.activeMetric} onMetricChange={model.setActiveMetric} />}
          <TrainerProgressTrackingTable entries={model.progressQuery.data?.entries ?? []} totalEntries={model.progressQuery.data?.total ?? 0} currentPage={model.currentPage} itemsPerPage={10} sortBy={model.sortBy} sortDirection={model.sortDirection} onPageChange={model.setCurrentPage} onSort={model.setSort} onEdit={model.openEditModal} onDelete={model.handleDelete} />
        </>
      )}
    </>
  );
}
