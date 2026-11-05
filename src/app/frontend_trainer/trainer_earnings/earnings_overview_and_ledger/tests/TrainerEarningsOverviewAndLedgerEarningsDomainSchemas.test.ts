import { describe, expect, it } from 'vitest';

import {
  TrainerEarningsDataSchema,
  TrainerEarningsHistoryRowSchema,
  TrainerEarningsKPIsDataSchema,
  TrainerEarningsPayoutStatusSchema,
  TrainerEarningsTrainerPendingPayoutSchema,
} from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/schemas/TrainerEarningsOverviewAndLedgerEarningsDomainSchemas';

const validKpis = {
  totalEarnings: 4550000,
  currency: 'INR',
  pendingPayouts: 1250000,
  sessionsCompleted: 142,
  commissionRate: 15,
  taxDeduction: 227500,
};

const validPendingPayout = {
  id: 'payout-1',
  period: 'Sep 01 - Sep 15, 2026',
  amount: 125000,
  currency: 'INR',
  status: 'pending' as const,
  dueDate: '2026-09-20',
};

const validHistoryRow = {
  id: 'ledger-1',
  date: '2026-09-01',
  type: 'Commission' as const,
  description: 'Session commission',
  amount: 125000,
  currency: 'INR',
  status: 'settled' as const,
};

describe('Trainer Earnings domain schemas', () => {
  it('accepts nonnegative integer minor-unit aggregate amounts and optional KPI metadata', () => {
    expect(TrainerEarningsKPIsDataSchema.safeParse(validKpis).success).toBe(true);
    expect(TrainerEarningsKPIsDataSchema.safeParse({ ...validKpis, bankAccount: '**** 4589', commissionTier: 'Gold' }).success).toBe(true);
    expect(TrainerEarningsKPIsDataSchema.safeParse({ ...validKpis, totalEarnings: -1 }).success).toBe(false);
    expect(TrainerEarningsKPIsDataSchema.safeParse({ ...validKpis, pendingPayouts: 1.5 }).success).toBe(false);
    expect(TrainerEarningsKPIsDataSchema.safeParse({ ...validKpis, taxDeduction: -1 }).success).toBe(false);
    expect(TrainerEarningsTrainerPendingPayoutSchema.safeParse({ ...validPendingPayout, amount: -1 }).success).toBe(false);
    expect(TrainerEarningsTrainerPendingPayoutSchema.safeParse({ ...validPendingPayout, amount: 1.5 }).success).toBe(false);
  });

  it('requires three-character currency values for monetary records', () => {
    expect(TrainerEarningsKPIsDataSchema.safeParse(validKpis).success).toBe(true);
    expect(TrainerEarningsKPIsDataSchema.safeParse({ ...validKpis, currency: 'IN' }).success).toBe(false);
    expect(TrainerEarningsTrainerPendingPayoutSchema.safeParse({ ...validPendingPayout, currency: 'INRR' }).success).toBe(false);
    expect(TrainerEarningsHistoryRowSchema.safeParse({ ...validHistoryRow, currency: 'US' }).success).toBe(false);
  });

  it('accepts signed integer ledger adjustments but rejects fractional amounts', () => {
    expect(TrainerEarningsHistoryRowSchema.safeParse({ ...validHistoryRow, amount: -1250, type: 'Commission' }).success).toBe(true);
    expect(TrainerEarningsHistoryRowSchema.safeParse({ ...validHistoryRow, amount: 0 }).success).toBe(true);
    expect(TrainerEarningsHistoryRowSchema.safeParse({ ...validHistoryRow, amount: 1.25 }).success).toBe(false);
  });

  it('limits ledger entry types and payout statuses to the module constants', () => {
    for (const type of ['Session', 'Bonus', 'Commission'] as const) {
      expect(TrainerEarningsHistoryRowSchema.safeParse({ ...validHistoryRow, type }).success).toBe(true);
    }
    expect(TrainerEarningsHistoryRowSchema.safeParse({ ...validHistoryRow, type: 'Refund' }).success).toBe(false);
    expect(TrainerEarningsHistoryRowSchema.safeParse({ ...validHistoryRow, sessionId: 'session-1', tdsDeducted: 125, netPayout: 1125, invoiceNumber: 'INV-1' }).success).toBe(true);
    expect(TrainerEarningsPayoutStatusSchema.safeParse('processing').success).toBe(true);
    expect(TrainerEarningsPayoutStatusSchema.safeParse('failed').success).toBe(false);
  });

  it('validates the composed response and optional pagination metadata', () => {
    const response = { kpis: validKpis, pendingPayouts: [validPendingPayout], history: [validHistoryRow] };
    expect(TrainerEarningsDataSchema.safeParse(response).success).toBe(true);
    expect(TrainerEarningsDataSchema.safeParse({ ...response, historyPage: 2, historyLimit: 10, historyTotal: 21 }).success).toBe(true);
    expect(TrainerEarningsDataSchema.safeParse({ ...response, historyPage: 0 }).success).toBe(false);
  });
});
