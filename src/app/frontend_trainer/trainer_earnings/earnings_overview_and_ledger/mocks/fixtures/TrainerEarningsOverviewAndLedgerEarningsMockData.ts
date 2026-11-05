import { TRAINER_EARNINGS_LEDGER_ENTRY_TYPES, TRAINER_EARNINGS_PAYOUT_STATUS_VALUES } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/utils/TrainerEarningsOverviewAndLedgerEarningsConstants';

import type { TrainerEarningsData } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/types/TrainerEarningsOverviewAndLedgerEarningsTypes';




export const TRAINER_EARNINGS_MOCK_EARNINGS_DATA: TrainerEarningsData = {
  kpis: {
    totalEarnings: 4550000,
    currency: 'INR',
    pendingPayouts: 1250000,
    sessionsCompleted: 142,
    commissionRate: 15,
    taxDeduction: 227500,
    bankAccount: '**** 4589',
    commissionTier: 'Gold',
  },
  pendingPayouts: [
    { id: '1', period: 'Sep 01 - Sep 15, 2026', amount: 1250000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[1], dueDate: 'Sep 20, 2026' },
    { id: '2', period: 'Sep 16 - Sep 30, 2026', amount: 840000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[0], dueDate: 'Oct 05, 2026' },
  ],
  history: [
    { id: 'INV-001', date: '2026-08-31', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[2], description: 'August PT Commission', amount: 2500000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 125000, netPayout: 2375000, invoiceNumber: 'INV-2026-001' },
    { id: 'INV-002', date: '2026-07-31', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[2], description: 'July PT Commission', amount: 2200000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 110000, netPayout: 2090000, invoiceNumber: 'INV-2026-002' },
    { id: 'BON-001', date: '2026-07-15', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[1], description: 'Performance Bonus Q2', amount: 500000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 25000, netPayout: 475000, invoiceNumber: 'INV-2026-003' },
    { id: 'INV-003', date: '2026-06-30', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[2], description: 'June PT Commission', amount: 1800000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 90000, netPayout: 1710000, invoiceNumber: 'INV-2026-004' },
    { id: 'INV-004', date: '2026-05-31', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[2], description: 'May PT Commission', amount: 1950000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 97500, netPayout: 1852500, invoiceNumber: 'INV-2026-005' },
    { id: 'INV-005', date: '2026-04-30', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[2], description: 'April PT Commission', amount: 1750000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 87500, netPayout: 1662500, invoiceNumber: 'INV-2026-006' },
    { id: 'BON-002', date: '2026-04-15', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[1], description: 'Quarterly Performance Bonus', amount: 325000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 16250, netPayout: 308750, invoiceNumber: 'INV-2026-007' },
    { id: 'INV-006', date: '2026-03-31', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[2], description: 'March PT Commission', amount: 1600000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 80000, netPayout: 1520000, invoiceNumber: 'INV-2026-008' },
    { id: 'INV-007', date: '2026-02-28', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[2], description: 'February PT Commission', amount: 1500000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 75000, netPayout: 1425000, invoiceNumber: 'INV-2026-009' },
    { id: 'INV-008', date: '2026-01-31', type: TRAINER_EARNINGS_LEDGER_ENTRY_TYPES[2], description: 'January PT Commission', amount: 1450000, currency: 'INR', status: TRAINER_EARNINGS_PAYOUT_STATUS_VALUES[2], tdsDeducted: 72500, netPayout: 1377500, invoiceNumber: 'INV-2026-010' },
  ],
};
