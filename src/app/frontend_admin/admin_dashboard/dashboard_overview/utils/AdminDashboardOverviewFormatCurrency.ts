// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for dashboard_overview; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewFormatCurrency.ts)

/** AdminDashboardFormatCurrency formats an API monetary amount expressed in the smallest ISO-4217 currency unit. @param amountMinor integer amount in paise/cents/minor currency units. @param currencyCode ISO 4217 currency code. @param locale active BCP-47 locale used for formatting. @description Implements AdminDashboardFormatCurrency for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. */
export function AdminDashboardFormatCurrency(amountMinor: number, currencyCode: string, locale: string): string {
  if (!Number.isFinite(amountMinor)) return '—';
  const probe = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode });
  const fractionDigits = probe.resolvedOptions().maximumFractionDigits ?? 2;
  const divisor = 10 ** fractionDigits;
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, maximumFractionDigits: fractionDigits }).format(amountMinor / divisor);
}
