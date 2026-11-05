/**
 * Formats a monetary amount from its smallest currency unit using the currency's Intl exponent.
 * @param amount Integer expressed in the currency's smallest unit.
 * @param currency Valid ISO 4217 currency code (e.g. INR, USD, JPY, KWD).
 * @param locale BCP 47 locale string.
 */
export const formatCurrency = (amount: number, currency: string, locale: string): string => {
  if (!Number.isFinite(amount)) return '—';
  const currencyFormatter = new Intl.NumberFormat(locale, { style: 'currency', currency });
  const fractionDigits = currencyFormatter.resolvedOptions().maximumFractionDigits ?? 2;
  const divisor = 10 ** fractionDigits;
  return currencyFormatter.format(amount / divisor);
};

/** Formats integer/count metrics using the feature's active locale. */
export const formatSuperadminInvoiceCount = (amount: number, locale: string): string => {
  if (!Number.isFinite(amount)) return '—';
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(amount);
};

/** Converts a major-unit amount to an integer minor-unit amount using the currency exponent. */
export const toMinorCurrencyUnits = (amount: number, currency: string): number => {
  if (!Number.isFinite(amount) || amount <= 0) throw new RangeError('Amount must be a finite positive number.');
  const fractionDigits = new Intl.NumberFormat('en', { style: 'currency', currency }).resolvedOptions().maximumFractionDigits ?? 2;
  const scale = 10 ** fractionDigits;
  const scaledAmount = amount * scale;
  const roundedAmount = Math.round(scaledAmount);
  if (!Number.isSafeInteger(roundedAmount) || Math.abs(scaledAmount - roundedAmount) > 1e-8) {
    throw new RangeError('Amount exceeds the currency minor-unit precision or safe integer range.');
  }
  return roundedAmount;
};
