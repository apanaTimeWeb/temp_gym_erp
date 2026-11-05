// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_finance/finance_payouts_management/constants/AdminFinancePayoutsManagementConstants.ts)

import type { GymPayout, PnLEntry, PayoutsKPIData } from '@/app/frontend_admin/admin_finance/finance_payouts_management/types/AdminFinancePayoutsManagementTypes';


export const PAYOUT_MONTH_OPTIONS = [
  { value: 'all', labelKey: 'payouts.AdminPayoutsFilters.allMonths' },
  { value: '2026-06', labelKey: 'payouts.AdminPayoutsFilters.june2026' },
  { value: '2026-05', labelKey: 'payouts.AdminPayoutsFilters.may2026' },
  { value: '2026-04', labelKey: 'payouts.AdminPayoutsFilters.april2026' },
  { value: '2026-03', labelKey: 'payouts.AdminPayoutsFilters.march2026' },
];

export const PAYOUT_GYM_OPTIONS = [
  { value: 'all', labelKey: 'payouts.AdminPayoutsFilters.allGyms' },
  { value: 'g1', labelKey: 'payouts.AdminPayoutsFilters.gymAndheriEast' },
  { value: 'g2', labelKey: 'payouts.AdminPayoutsFilters.gymBandraWest' },
  { value: 'g3', labelKey: 'payouts.AdminPayoutsFilters.gymPowai' },
  { value: 'g4', labelKey: 'payouts.AdminPayoutsFilters.gymThane' },
];

export const PAYOUT_STATUS_VALUES = { PAID: 'paid', PENDING: 'pending', PROCESSING: 'processing', FAILED: 'failed' } as const;

export const PAYOUT_STATUS_OPTIONS = [
  { value: 'all', labelKey: 'payouts.AdminPayoutsFilters.allStatus' },
  { value: 'paid', labelKey: 'payouts.AdminPayoutsFilters.paid' },
  { value: 'pending', labelKey: 'payouts.AdminPayoutsFilters.pending' },
  { value: 'processing', labelKey: 'payouts.AdminPayoutsFilters.processing' },
];

export const PAYOUTS_ITEMS_PER_PAGE = 10;

export const PAYOUT_TAB_OPTIONS = [
  { id: 'summary', labelKey: 'payouts.AdminAuditRepair.payoutSummary' },
  { id: 'pnl', labelKey: 'payouts.AdminAuditRepair.pnlStatement' },
] as const;

export const PAYOUT_SUMMARY_COLUMN_OPTIONS = [
  { key: 'gymName', labelKey: 'payouts.AdminAuditRepair.gym' },
  { key: 'month', labelKey: 'payouts.AdminAuditRepair.month' },
  { key: 'grossRevenue', labelKey: 'payouts.AdminAuditRepair.grossRevenue' },
  { key: 'staffPayroll', labelKey: 'payouts.AdminAuditRepair.payroll' },
  { key: 'operationalExpenses', labelKey: 'payouts.AdminAuditRepair.expenses' },
  { key: 'platformFee', labelKey: 'payouts.AdminAuditRepair.platformFee' },
  { key: 'netProfit', labelKey: 'payouts.AdminAuditRepair.netProfit' },
  { key: 'payoutStatus', labelKey: 'payouts.AdminAuditRepair.status' },
] as const;


/** Semantic status badge classes for payout table states. */
export const PAYOUT_STATUS_STYLES = {
  paid: 'bg-success-bg text-success',
  processing: 'bg-info-bg text-info',
  pending: 'bg-warning-bg text-warning',
  failed: 'bg-danger-bg text-danger',
} as const;

export const PAYOUT_STATUS_LABEL_KEYS: Record<string, string> = {
  paid: 'payouts.AdminPayoutsFilters.paid',
  pending: 'payouts.AdminPayoutsFilters.pending',
  processing: 'payouts.AdminPayoutsFilters.processing',
  failed: 'payouts.AdminAuditRepair.failed',
};
