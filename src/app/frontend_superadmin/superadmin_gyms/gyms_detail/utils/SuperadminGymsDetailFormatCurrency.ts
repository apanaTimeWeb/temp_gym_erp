/**
 * Formats a monetary amount from its smallest unit to a locale-aware display string.
 * @param amount  Integer in smallest unit (e.g., 9999 for ₹99.99)
 * @param currency ISO 4217 currency code (e.g., 'INR', 'USD', 'EUR')
 * @param locale  BCP 47 locale string (e.g., 'en-IN', 'nl-NL', 'en-US')
 */
export const formatCurrency = (
  amount: number,
  currency: string,
  locale: string
): string => {
  if (!Number.isFinite(amount) || !/^[A-Z]{3}$/.test(currency)) return '—';
  try {
    const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });
    const exponent = formatter.resolvedOptions().maximumFractionDigits ?? 2;
    return new Intl.NumberFormat(locale, {
      style: 'currency', currency,
      minimumFractionDigits: exponent, maximumFractionDigits: exponent,
    }).format(amount / (10 ** exponent));
  } catch {
    return '—';
  }
};
