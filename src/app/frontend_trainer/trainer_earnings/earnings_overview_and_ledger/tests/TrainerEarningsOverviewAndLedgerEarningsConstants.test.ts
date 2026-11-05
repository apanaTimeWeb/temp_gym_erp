import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsConstants';




describe('TrainerEarningsConstants', () => {
  it('exposes covered utility/constants contracts', () => {
    expect(moduleUnderTest.TRAINER_EARNINGS_EARNINGS_ITEMS_PER_PAGE).toBeDefined();
    expect(moduleUnderTest.TRAINER_EARNINGS_PAYOUT_STATUS_STYLES).toBeDefined();
    expect(moduleUnderTest.TRAINER_EARNINGS_EARNINGS_SORT_OPTIONS).toBeDefined();
    expect(moduleUnderTest.TRAINER_EARNINGS_EARNINGS_SORT_DIRECTIONS).toBeDefined();
    expect(Object.keys(moduleUnderTest).length).toBeGreaterThan(0);
  });
});
