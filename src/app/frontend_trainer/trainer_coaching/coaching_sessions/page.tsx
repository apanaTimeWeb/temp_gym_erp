// RESPONSIBILITY: Renders the page route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import TrainerSessionsLoadingSkeleton from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsLoadingSkeleton';

import TrainerSessionsMain from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsMain';





export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('TRAINER_SESSIONS');
  return { title: t('TEXT_PAGE_TITLE'), description: t('TEXT_PAGE_DESCRIPTION') };
}

/**
 * @description Provides the server-owned Next.js route entry point for the sessions feature and delegates interactive work to the feature's client orchestration component.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerSessionsPage() {
  return (
    <Suspense fallback={<TrainerSessionsLoadingSkeleton />}>
      <TrainerSessionsMain />
    </Suspense>
  );
}
