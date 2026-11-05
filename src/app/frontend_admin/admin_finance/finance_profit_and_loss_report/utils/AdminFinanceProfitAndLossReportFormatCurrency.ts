// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for finance_profit_and_loss_report; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_finance/finance_profit_and_loss_report/utils/AdminFinanceProfitAndLossReportFormatCurrency.ts)

/** AdminFinanceProfitAndLossReportFormatCurrency formats an API amount in integer minor units with an explicit ISO-4217 currency identity. Missing/invalid currency identity is never inferred from the user's locale or product geography. @description Implements AdminFinanceProfitAndLossReportFormatCurrency for the owning feature’s explicitly typed data. @param amountMinor - Input used by this utility as declared by the signature. @param currencyCode - Input used by this utility as declared by the signature. @param locale - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function AdminFinanceProfitAndLossReportFormatCurrency(amountMinor: number, currencyCode: string | undefined, locale: string): string {
  if (!Number.isSafeInteger(amountMinor) || !currencyCode || !/^[A-Z]{3}$/.test(currencyCode)) return '—';
  try {
    const probe = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode });
    const fractionDigits = probe.resolvedOptions().maximumFractionDigits ?? 2;
    const divisor = 10 ** fractionDigits;
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, maximumFractionDigits: fractionDigits }).format(amountMinor / divisor);
  } catch {
    return '—';
  }
}
