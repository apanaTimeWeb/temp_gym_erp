"use client";
// RESPONSIBILITY: Screen-level member comparison view; selection and metric state remain feature presentation state.
import { useTranslations } from 'next-intl';

import TrainerProgressTrackingComparisonChart from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingComparisonChart';
import TrainerProgressTrackingComparisonTable from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingComparisonTable';
import TrainerProgressTrackingMemberSelector from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingMemberSelector';
import type { useTrainerProgressTrackingMain } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingMain';

export default function TrainerProgressTrackingComparisonView({ model }: { model: ReturnType<typeof useTrainerProgressTrackingMain> }) {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  if (model.membersQuery.isPending) return <div role="status" className="rounded-xl border border-border bg-card p-6 text-sm text-secondary">{t('TEXT_MEMBERS_LOADING')}</div>;
  if (model.membersQuery.isError) {
    return <div className="rounded-xl border border-border bg-danger-bg p-5"><p role="alert" className="text-sm text-danger">{t('TEXT_MEMBERS_LOAD_ERROR')}</p><button type="button" onClick={model.retryMembers} disabled={model.membersQuery.isFetching} className="mt-3 min-h-11 px-4 rounded-lg bg-primary text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{model.membersQuery.isFetching ? t('TEXT_RETRYING') : t('TEXT_RETRY')}</button></div>;
  }
  if (model.tData.members.length === 0) return <div className="rounded-xl border border-border bg-card p-6 text-sm text-secondary">{t('TEXT_NO_MEMBERS_AVAILABLE')}</div>;

  return (
    <>
      <TrainerProgressTrackingMemberSelector allMembers={model.tData.members} selectedIds={model.selectedComparisonIds} onToggle={model.toggleComparisonMember} />
      {model.selectedComparisonIds.length >= 2 && model.comparisonIsPending ? (
        <div role="status" className="rounded-xl border border-border bg-card p-6 text-sm text-secondary">{t('TEXT_COMPARISON_LOADING')}</div>
      ) : model.selectedComparisonIds.length >= 2 && model.comparisonIsError ? (
        <div className="rounded-xl border border-border bg-danger-bg p-5"><p role="alert" className="text-sm text-danger">{t('TEXT_COMPARISON_LOAD_ERROR')}</p><button type="button" onClick={model.retryComparisonQueries} className="mt-3 min-h-11 px-4 rounded-lg bg-primary text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_RETRY')}</button></div>
      ) : model.selectedComparisonIds.length >= 2 ? (
        <><TrainerProgressTrackingComparisonChart snapshots={model.comparisonSnapshots} activeMetric={model.activeComparisonMetric} onMetricChange={model.setActiveComparisonMetric} /><TrainerProgressTrackingComparisonTable snapshots={model.comparisonSnapshots} /></>
      ) : null}
    </>
  );
}
