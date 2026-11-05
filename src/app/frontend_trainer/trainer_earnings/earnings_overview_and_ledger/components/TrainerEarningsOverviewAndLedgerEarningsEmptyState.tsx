"use client";
// RESPONSIBILITY: Renders the earnings ledger empty state using module-owned localized copy.
// DATA FLOW: Earnings empty-state props (optional overrides) -> module translations -> semantic empty-state presentation.
import { FileText } from 'lucide-react';

import { useTranslations } from 'next-intl';

import type { TrainerEarningsEmptyStateProps } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsEmptyStateProps';





/**
 * @description Renders the earnings ledger empty state using module-owned localized copy.
 * @dependencies Earnings empty-state props (optional overrides) -> module translations -> semantic empty-state presentation.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders the earnings feature's empty-result state with an actionable recovery or creation path when the documented flow permits one.
 * @dependencies Uses only documented earnings module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Keeps the no-data state distinct from a transport/API error state.
 */
export default function TrainerEarningsEmptyState({ message, description }: TrainerEarningsEmptyStateProps) {
  const t = useTranslations('TRAINER_EARNINGS');
  const resolvedMessage = message ?? t('TEXT_NO_EARNINGS_RECORDS_FOUND');
  const resolvedDescription = description ?? t('TEXT_TRY_ADJUSTING_EARNINGS_FILTERS');

  return (
    <div data-testid="trainer_earnings-empty-state" className="p-12 flex flex-col items-center justify-center text-center h-full space-y-3">
      <div className="w-14 h-14 rounded-full bg-input flex items-center justify-center">
        <FileText size={18} className="text-secondary" strokeWidth={2} />
      </div>
      <div>
        <p className="text-sm font-semibold text-primary">{resolvedMessage}</p>
        <p className="text-xs text-secondary mt-1">{resolvedDescription}</p>
      </div>
    </div>
  );
}
