// RESPONSIBILITY: Renders the notifications page.
import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import TrainerNotificationsLoadingSkeleton from '@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsNotificationsLoadingSkeleton';

import TrainerNotificationsMain from '@/app/frontend_trainer/trainer_account/account_notifications/components/TrainerAccountNotificationsNotificationsMain';







export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('TRAINER_NOTIFICATIONS');
  return { title: t('TEXT_PAGE_TITLE'), description: t('TEXT_PAGE_DESCRIPTION') };
}

/**
 * @description Provides the server-owned Next.js route entry point for the notifications feature and delegates interactive work to the feature's client orchestration component.
 * @dependencies Uses only documented notifications module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerNotificationsPage() {
  return (
    <Suspense fallback={<TrainerNotificationsLoadingSkeleton />}>
      <TrainerNotificationsMain />
    </Suspense>
  );
}
