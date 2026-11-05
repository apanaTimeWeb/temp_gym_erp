// RESPONSIBILITY: Renders the comparison workflow from query-backed view models; API and comparison logic stay in hooks.
"use client";
import { useTranslations } from 'next-intl';
import { useTrainerCoachingProgressComparisonComparisonScreen } from '../hooks/useTrainerCoachingProgressComparisonComparisonScreen';
import TrainerProgressTrackingComparisonView from './TrainerCoachingProgressComparisonProgressTrackingComparisonView';
export default function TrainerCoachingProgressComparisonMain() {
 const t = useTranslations('TRAINER_PROGRESS_TRACKING');
 const model = useTrainerCoachingProgressComparisonComparisonScreen();
 return <main className="min-h-full space-y-5 p-4 sm:p-6"><h1 className="text-section-title font-bold text-primary">{t('TEXT_COMPARE_MEMBERS')}</h1><TrainerProgressTrackingComparisonView model={model} /></main>;
}
