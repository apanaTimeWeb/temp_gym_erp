// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for sales_analytics; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_sales/sales_overview/utils/AdminSalesAnalyticsFormatCurrency.ts)

/** AdminSalesFormatCurrency formats an integer API amount in the smallest currency unit. The caller must supply a validated ISO 4217 code; the frontend must never silently invent a currency. Missing/invalid currency identity or a non-integer amount returns a neutral placeholder until the API contract supplies it. @description Implements AdminSalesFormatCurrency for the owning feature’s explicitly typed data. @param amountMinor - Input used by this utility as declared by the signature. @param currencyCode - Input used by this utility as declared by the signature. @param locale - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function AdminSalesFormatCurrency(amountMinor: number, currencyCode: string | undefined, locale: string): string {
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
