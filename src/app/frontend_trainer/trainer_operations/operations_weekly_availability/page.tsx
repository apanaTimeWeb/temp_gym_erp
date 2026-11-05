// RESPONSIBILITY: Renders the page route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import TrainerScheduleLoadingSkeleton from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/components/TrainerOperationsWeeklyAvailabilityScheduleLoadingSkeleton';

import TrainerOperationsWeeklyAvailabilityMain from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/components/TrainerOperationsWeeklyAvailabilityMain';





export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('TRAINER_SCHEDULE');
  return { title: t('TEXT_PAGE_TITLE'), description: t('TEXT_PAGE_DESCRIPTION') };
}

/**
 * @description Provides the server-owned Next.js route entry point for the schedule feature and delegates interactive work to the feature's client orchestration component.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerSchedulePage() {
  return (
    <Suspense fallback={<TrainerScheduleLoadingSkeleton />}>
      <TrainerOperationsWeeklyAvailabilityMain />
    </Suspense>
  );
}
