// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_finance/finance_payouts_management/mocks/fixtures/AdminFinancePayoutsManagementMockFixtures.ts)
import { PAYOUT_STATUS_VALUES } from '@/app/frontend_admin/admin_finance/finance_payouts_management/constants/AdminFinancePayoutsManagementConstants';
// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin payouts feature.
import type { PayoutsKPIData } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin Payouts & PnL feature.
import type { GymPayout, PnLEntry } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes';

export const MOCK_PAYOUTS: GymPayout[] = [
  { gymId: 'g1', gymName: 'Andheri East', month: '2026-10', grossRevenue: 450000, staffPayroll: 90000, operationalExpenses: 45000, platformFee: 13500, netProfit: 301500, payoutStatus: PAYOUT_STATUS_VALUES.PENDING },
  { gymId: 'g2', gymName: 'Bandra West', month: '2026-10', grossRevenue: 395000, staffPayroll: 80000, operationalExpenses: 39500, platformFee: 11850, netProfit: 263650, payoutStatus: PAYOUT_STATUS_VALUES.PROCESSING },
  { gymId: 'g3', gymName: 'Powai', month: '2026-10', grossRevenue: 320000, staffPayroll: 67000, operationalExpenses: 32000, platformFee: 9600, netProfit: 211400, payoutStatus: PAYOUT_STATUS_VALUES.PENDING },
  { gymId: 'g4', gymName: 'Thane', month: '2026-10', grossRevenue: 200000, staffPayroll: 53000, operationalExpenses: 22000, platformFee: 6000, netProfit: 119000, payoutStatus: PAYOUT_STATUS_VALUES.PENDING },
  { gymId: 'g1', gymName: 'Andheri East', month: '2026-06', grossRevenue: 420000, staffPayroll: 85000, operationalExpenses: 42000, platformFee: 12600, netProfit: 280400, payoutStatus: PAYOUT_STATUS_VALUES.PAID, paidOn: '2026-07-03' },
  { gymId: 'g2', gymName: 'Bandra West', month: '2026-06', grossRevenue: 380000, staffPayroll: 78000, operationalExpenses: 38000, platformFee: 11400, netProfit: 252600, payoutStatus: PAYOUT_STATUS_VALUES.PAID, paidOn: '2026-07-03' },
  { gymId: 'g3', gymName: 'Powai', month: '2026-06', grossRevenue: 310000, staffPayroll: 65000, operationalExpenses: 31000, platformFee: 9300, netProfit: 204700, payoutStatus: PAYOUT_STATUS_VALUES.PROCESSING },
  { gymId: 'g4', gymName: 'Thane', month: '2026-06', grossRevenue: 195000, staffPayroll: 52000, operationalExpenses: 22000, platformFee: 5850, netProfit: 115150, payoutStatus: PAYOUT_STATUS_VALUES.PENDING },
  { gymId: 'g1', gymName: 'Andheri East', month: '2026-05', grossRevenue: 405000, staffPayroll: 85000, operationalExpenses: 40000, platformFee: 12150, netProfit: 267850, payoutStatus: PAYOUT_STATUS_VALUES.PAID, paidOn: '2026-06-04' },
  { gymId: 'g2', gymName: 'Bandra West', month: '2026-05', grossRevenue: 362000, staffPayroll: 78000, operationalExpenses: 36000, platformFee: 10860, netProfit: 237140, payoutStatus: PAYOUT_STATUS_VALUES.PAID, paidOn: '2026-06-04' },
  { gymId: 'g3', gymName: 'Powai', month: '2026-05', grossRevenue: 298000, staffPayroll: 65000, operationalExpenses: 30000, platformFee: 8940, netProfit: 194060, payoutStatus: PAYOUT_STATUS_VALUES.PAID, paidOn: '2026-06-05' },
  { gymId: 'g4', gymName: 'Thane', month: '2026-05', grossRevenue: 182000, staffPayroll: 52000, operationalExpenses: 20000, platformFee: 5460, netProfit: 104540, payoutStatus: PAYOUT_STATUS_VALUES.PAID, paidOn: '2026-06-05' },
];

export const MOCK_PNL: PnLEntry[] = [
  { gymId: 'g1', gymName: 'Andheri East', month: '2026-06', revenue: 420000, cogs: 42000, grossProfit: 378000, staffCost: 85000, rentUtilities: 28000, marketing: 8000, miscExpenses: 6000, ebitda: 251000, tax: 50200, netProfit: 200800 },
  { gymId: 'g2', gymName: 'Bandra West', month: '2026-06', revenue: 380000, cogs: 38000, grossProfit: 342000, staffCost: 78000, rentUtilities: 25000, marketing: 7000, miscExpenses: 6000, ebitda: 226000, tax: 45200, netProfit: 180800 },
  { gymId: 'g3', gymName: 'Powai', month: '2026-06', revenue: 310000, cogs: 31000, grossProfit: 279000, staffCost: 65000, rentUtilities: 22000, marketing: 5000, miscExpenses: 4000, ebitda: 183000, tax: 36600, netProfit: 146400 },
  { gymId: 'g4', gymName: 'Thane', month: '2026-06', revenue: 195000, cogs: 19500, grossProfit: 175500, staffCost: 52000, rentUtilities: 18000, marketing: 3000, miscExpenses: 3500, ebitda: 99000, tax: 19800, netProfit: 79200 },
];

export const MOCK_PAYOUTS_KPI: PayoutsKPIData = {
  totalNetProfit: 852850,
  totalGrossRevenue: 1305000,
  totalExpenses: 452150,
  pendingPayouts: 2,
};
