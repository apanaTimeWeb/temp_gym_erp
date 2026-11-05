import { describe, expect, it } from 'vitest';
import { TrainerEarningsFormatCurrency } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsFormatCurrency';
describe('ISO 4217 minor-unit formatting', () => {
 it('does not divide KRW or JPY by 100', () => {
  expect(TrainerEarningsFormatCurrency(1200,'KRW','en-US')).toContain('1,200');
  expect(TrainerEarningsFormatCurrency(1200,'JPY','en-US')).toContain('1,200');
 });
 it('uses 3 minor units for BHD, 2 for USD', () => {
  expect(TrainerEarningsFormatCurrency(1234,'BHD','en-US')).toContain('1.234');
  expect(TrainerEarningsFormatCurrency(1234,'USD','en-US')).toContain('12.34');
 });
});
