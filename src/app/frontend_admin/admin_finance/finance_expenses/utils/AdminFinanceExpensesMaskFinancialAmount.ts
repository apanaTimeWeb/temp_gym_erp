// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for finance_expenses; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_finance/finance_expenses/utils/AdminFinanceOverviewMaskFinancialAmount.ts)

/** Prevents per-record financial values from leaking in bulk finance tables. Totals remain available in summary surfaces. @description Implements maskAdminFinanceListAmount for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. */
export function maskAdminFinanceListAmount(): string {
  return '••••';
}
