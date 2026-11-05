// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for finance_branch_profit_and_loss; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_finance/finance_branch_profit_and_loss/utils/AdminFinanceBranchProfitAndLossCsvExport.ts)

import type { BranchPnlRecord } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/types/AdminFinanceBranchProfitAndLossTypes';

/** Returns the current UTC calendar day for stable export filenames. */
export function getAdminFinancePnlExportDateKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function escapeCsvCell(value: string | number): string {
  let text = String(value ?? '');
  // Signed numeric finance amounts are data, not spreadsheet formulas.
  // Only treat externally supplied text beginning with a formula marker as unsafe.
  if (!(typeof value === 'number' && Number.isFinite(value)) && /^[\u0000-\u0020\uFEFF]*[=+@-]/u.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

/** @description Implements createAdminFinancePnlCsv for the owning feature’s explicitly typed data. @param records - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function createAdminFinancePnlCsv(records: readonly BranchPnlRecord[]): string {
  const headers = ['Branch', 'Location', 'Revenue', 'Expenses', 'Net Profit', 'Margin Percent', 'Status'];
  const rows = records.map((record) => [record.branchName, record.location, record.revenue, record.expenses, record.netProfit, record.marginPct, record.status]);
  return [headers, ...rows].map((row) => row.map((cell) => escapeCsvCell(cell)).join(',')).join('\r\n');
}
