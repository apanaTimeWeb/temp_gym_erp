// RESPONSIBILITY: Formats PublicLanding-owned monetary values from API-compatible minor units using the active locale.
/**
 * Formats an amount represented in currency minor units using the currency's ISO 4217 fraction digits.
 * Examples: INR/USD use two fraction digits, JPY zero, and KWD three.
 */
export function formatPublicLandingCurrency(amountMinor: number, currencyCode: string, locale: string): string {
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode });
  const fractionDigits = formatter.resolvedOptions().maximumFractionDigits;
  const amountMajor = amountMinor / (10 ** fractionDigits);
  return formatter.format(amountMajor);
}
