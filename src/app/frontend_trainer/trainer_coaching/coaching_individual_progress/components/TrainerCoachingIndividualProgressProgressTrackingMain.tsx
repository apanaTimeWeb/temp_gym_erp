"use client";
// RESPONSIBILITY: Composes the Progress Tracking shell, canonical screen navigation, and module-owned screen views.
import { Plus, BarChart2, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

import TrainerProgressTrackingModal from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingModal';
import TrainerProgressTrackingComparisonView from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingComparisonView';
import TrainerProgressTrackingIndividualView from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingIndividualView';
import { useTrainerProgressTrackingMain } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/hooks/useTrainerCoachingIndividualProgressProgressTrackingMain';

export default function TrainerProgressTrackingMain() {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  const view = useTrainerProgressTrackingMain();
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div><h2 className="text-section-title font-bold text-primary">{t('TEXT_PROGRESS_TRACKING')}</h2><p className="text-sm text-secondary mt-0.5">{t('TEXT_BODY_MEASUREMENTS_AND_FITNESS_METRICS_OVER_TIME')}</p></div>
          {view.activeTab === 'individual' && <button type="button" onClick={view.openAddModal} className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-hover motion-safe:transition-opacity motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_progress_tracking-progress-tracking_progress_tracking_main_add"><Plus size={18} strokeWidth={2} /> {t('TEXT_ADD_ENTRY')}</button>}
        </div>
        <div className="flex border-b border-border">
          <button type="button" onClick={() => view.setActiveTab('individual')} aria-pressed={view.activeTab === 'individual'} className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors ${view.activeTab === 'individual' ? 'text-primary border-focus bg-primary-subtle' : 'border-transparent text-secondary hover:text-primary'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_progress_tracking-trainerprogresstrackingmain-button_2"><User size={18} strokeWidth={2} /> {t('TEXT_INDIVIDUAL')}</button>
          <button type="button" onClick={() => view.setActiveTab('compare')} aria-pressed={view.activeTab === 'compare'} className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors ${view.activeTab === 'compare' ? 'text-primary border-focus bg-primary-subtle' : 'border-transparent text-secondary hover:text-primary'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_progress_tracking-trainerprogresstrackingmain-button_3"><BarChart2 size={18} strokeWidth={2} /> {t('TEXT_COMPARE_MEMBERS')}</button>
        </div>
        {view.activeTab === 'individual' ? <TrainerProgressTrackingIndividualView model={view} /> : <TrainerProgressTrackingComparisonView model={view} />}
      </div>
      {view.showModal && <TrainerProgressTrackingModal editingEntry={view.editingEntry} onSave={view.handleSave} onClose={view.closeModal} testId="trainer-progress-tracking-main-progress-modal" />}
    </div>
  );
}
