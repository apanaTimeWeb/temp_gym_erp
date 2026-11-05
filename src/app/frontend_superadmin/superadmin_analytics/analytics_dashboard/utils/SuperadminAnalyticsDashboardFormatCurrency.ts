/**
 * Formats a monetary amount from its smallest currency unit into a locale-aware string.
 * @description Feature-owned currency formatting boundary. The caller must pass the active i18n locale.
 * @param amount Integer in the backend-provided smallest currency unit.
 * @param currency ISO 4217 currency code.
 * @param locale Active BCP 47 application locale.
 * @edge-case Handles zero-decimal JPY and three-decimal KWD/BHD currencies.
 */
export const SuperadminAnalyticsFormatCurrency = (amount: number, currency: string, locale: string): string => {
  if (!Number.isFinite(amount) || !/^[A-Z]{3}$/.test(currency)) return '—';
  try {
    const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });
    const digits = formatter.resolvedOptions().maximumFractionDigits ?? 2;
    return new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: digits, maximumFractionDigits: digits }).format(amount / (10 ** digits));
  } catch { return '—'; }
};
