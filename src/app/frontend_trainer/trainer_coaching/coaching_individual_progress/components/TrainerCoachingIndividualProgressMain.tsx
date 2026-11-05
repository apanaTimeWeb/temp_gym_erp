'use client';
// RESPONSIBILITY: Canonical Individual Progress route; comparison remains in its own sibling submodule.
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TrainerProgressTrackingIndividualView from './TrainerCoachingIndividualProgressProgressTrackingIndividualView';
import TrainerProgressTrackingModal from './TrainerCoachingIndividualProgressProgressTrackingModal';
import { useTrainerProgressTrackingMain } from '../hooks/useTrainerCoachingIndividualProgressProgressTrackingMain';

export default function TrainerCoachingIndividualProgressMain() {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  // This canonical leaf never starts comparison-member network queries.
  const model = useTrainerProgressTrackingMain({ enableComparison: false });
  return (
    <main data-testid="trainer-canonical-coaching_individual_progress" className="min-h-full space-y-5 bg-page p-4 text-primary sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-section-title font-bold text-primary">{t('TEXT_INDIVIDUAL')}</h1>
          <p className="mt-1 text-sm text-secondary">{t('TEXT_BODY_MEASUREMENTS_AND_FITNESS_METRICS_OVER_TIME')}</p>
        </div>
        <button type="button" onClick={model.openAddModal} disabled={!model.selectedMemberId || model.membersQuery.isPending || model.membersQuery.isError}
          title={!model.selectedMemberId ? t('TEXT_SELECT_MEMBER') : undefined}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 font-semibold text-on-primary disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          data-testid="trainer-individual-progress-add-entry">
          <Plus size={18} strokeWidth={2} aria-hidden="true" />{t('TEXT_ADD_ENTRY')}
        </button>
      </div>
      <TrainerProgressTrackingIndividualView model={model} />
      {model.showModal && <TrainerProgressTrackingModal
        editingEntry={model.editingEntry} onSave={model.handleSave}
        onClose={model.closeModal} testId="trainer-individual-progress-modal" />}
    </main>
  );
}
