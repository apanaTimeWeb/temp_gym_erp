import { describe, expect, it } from 'vitest';

import { TrainerEarningsFormatDate, TrainerEarningsFormatNumber } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsDisplayFormatters';




describe('Trainer earnings display formatters', () => {
  it('formats earnings metrics without decimals by default', () => {
    expect(TrainerEarningsFormatNumber(1234567, 'en-IN')).toBe('1,234,567');
  });
  it('formats API ISO dates for display', () => {
    expect(TrainerEarningsFormatDate('2026-01-02T00:00:00.000Z', 'en-IN')).toMatch(/^02 Jan 2026$/);
    expect(TrainerEarningsFormatDate('not-a-date', 'en-IN')).toBe('—');
  });
});
