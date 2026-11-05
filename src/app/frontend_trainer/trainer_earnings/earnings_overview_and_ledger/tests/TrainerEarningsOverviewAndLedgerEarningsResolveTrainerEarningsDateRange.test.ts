import { describe, expect, it } from 'vitest';

import {
  TrainerEarningsIsRealISODate,
  TrainerEarningsIsValidDateRange,
  TrainerEarningsResolveTrainerEarningsDateRange,
} from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsResolveTrainerEarningsDateRange';

describe('TrainerEarningsResolveTrainerEarningsDateRange', () => {
  it('resolves supported preset windows from the supplied reference date', () => {
    const reference = new Date(2026, 9, 16);
    expect(TrainerEarningsResolveTrainerEarningsDateRange('this_month', reference)).toEqual({ startDate: '2026-10-01', endDate: '2026-10-16' });
    expect(TrainerEarningsResolveTrainerEarningsDateRange('last_month', reference)).toEqual({ startDate: '2026-09-01', endDate: '2026-09-30' });
    expect(TrainerEarningsResolveTrainerEarningsDateRange('last_3_months', reference)).toEqual({ startDate: '2026-08-01', endDate: '2026-10-16' });
    expect(TrainerEarningsResolveTrainerEarningsDateRange('last_6_months', reference)).toEqual({ startDate: '2026-05-01', endDate: '2026-10-16' });
    expect(TrainerEarningsResolveTrainerEarningsDateRange('this_year', reference)).toEqual({ startDate: '2026-01-01', endDate: '2026-10-16' });
  });

  it('does not invent date values for a custom range', () => {
    expect(TrainerEarningsResolveTrainerEarningsDateRange('custom', new Date(2026, 9, 16))).toEqual({ startDate: '', endDate: '' });
  });

  it('accepts only real ISO dates and complete chronological custom ranges', () => {
    expect(TrainerEarningsIsRealISODate('2024-02-29')).toBe(true);
    expect(TrainerEarningsIsRealISODate('2025-02-29')).toBe(false);
    expect(TrainerEarningsIsRealISODate('2026-2-03')).toBe(false);
    expect(TrainerEarningsIsValidDateRange('2026-10-01', '2026-10-16')).toBe(true);
    expect(TrainerEarningsIsValidDateRange('2026-10-16', '2026-10-16')).toBe(true);
    expect(TrainerEarningsIsValidDateRange('', '2026-10-16')).toBe(false);
    expect(TrainerEarningsIsValidDateRange('2026-10-01', '')).toBe(false);
    expect(TrainerEarningsIsValidDateRange('2026-10-16', '2026-10-01')).toBe(false);
    expect(TrainerEarningsIsValidDateRange('2026-02-30', '2026-03-01')).toBe(false);
  });
});
