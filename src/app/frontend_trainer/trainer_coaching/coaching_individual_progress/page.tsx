// RESPONSIBILITY: Renders the page route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import TrainerProgressTrackingLoadingSkeleton from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressProgressTrackingLoadingSkeleton';

import TrainerCoachingIndividualProgressMain from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/components/TrainerCoachingIndividualProgressMain';





export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('TRAINER_PROGRESS_TRACKING');
  return { title: t('TEXT_PAGE_TITLE'), description: t('TEXT_PAGE_DESCRIPTION') };
}

/**
 * @description Provides the server-owned Next.js route entry point for the progress tracking feature and delegates interactive work to the feature's client orchestration component.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerProgressTrackingPage() {
  return (
    <Suspense fallback={<TrainerProgressTrackingLoadingSkeleton />}>
      <TrainerCoachingIndividualProgressMain />
    </Suspense>
  );
}
