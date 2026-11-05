import { describe, expect, it } from 'vitest';

import { TrainerEarningsIsRealISODate, TrainerEarningsIsValidDateRange } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsResolveTrainerEarningsDateRange';

describe('TrainerEarnings date range validation', () => {
  it('rejects impossible calendar dates', () => {
    expect(TrainerEarningsIsRealISODate('2026-02-28')).toBe(true);
    expect(TrainerEarningsIsRealISODate('2026-02-30')).toBe(false);
  });
  it('rejects incomplete and reversed ranges', () => {
    expect(TrainerEarningsIsValidDateRange('2026-01-01', '2026-01-31')).toBe(true);
    expect(TrainerEarningsIsValidDateRange('', '2026-01-31')).toBe(false);
    expect(TrainerEarningsIsValidDateRange('2026-02-01', '2026-01-31')).toBe(false);
  });
});
