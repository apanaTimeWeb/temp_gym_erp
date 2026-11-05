// RESPONSIBILITY: Server Component entry point for /trainer/profile; interactive form logic remains inside TrainerAccountPersonalProfileDetailsMain and its feature hooks.
import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import TrainerProfileLoadingSkeleton from '@/app/frontend_trainer/trainer_account/account_personal_profile/components/TrainerAccountPersonalProfileProfileLoadingSkeleton';

import TrainerAccountPersonalProfileDetailsMain from '@/app/frontend_trainer/trainer_account/account_personal_profile/components/TrainerAccountPersonalProfileDetailsMain';







export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('TRAINER_PROFILE');
  return { title: t('TEXT_PAGE_TITLE'), description: t('TEXT_PAGE_DESCRIPTION') };
}

/**
 * @description Provides the server-owned Next.js route entry point for the profile feature and delegates interactive work to the feature's client orchestration component.
 * @dependencies Uses only documented profile module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerProfilePage() {
  return (
    <Suspense fallback={<TrainerProfileLoadingSkeleton />}>
      <TrainerAccountPersonalProfileDetailsMain />
    </Suspense>
  );
}
