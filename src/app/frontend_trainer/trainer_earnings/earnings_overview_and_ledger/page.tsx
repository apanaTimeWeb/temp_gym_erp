// RESPONSIBILITY: Server Component route entry for Trainer earnings.
import { Suspense } from 'react';

import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

import TrainerEarningsLoadingSkeleton from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsLoadingSkeleton';

import TrainerEarningsMain from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/components/TrainerEarningsOverviewAndLedgerEarningsMain';





export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('TRAINER_EARNINGS');
  return { title: t('TEXT_PAGE_TITLE'), description: t('TEXT_PAGE_DESCRIPTION') };
}

/**
 * @description Provides the server-owned Next.js route entry point for the earnings feature and delegates interactive work to the feature's client orchestration component.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerEarningsPage() {
  return (
    <Suspense fallback={<TrainerEarningsLoadingSkeleton />}>
      <TrainerEarningsMain />
    </Suspense>
  );
}
