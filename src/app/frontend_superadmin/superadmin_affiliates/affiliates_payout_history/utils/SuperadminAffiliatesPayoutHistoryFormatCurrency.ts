/**
 * Formats a monetary amount from its smallest currency unit into a locale-aware string.
 * @description Feature-owned currency formatting boundary. The caller must pass the active i18n locale.
 * @param amount Integer in the backend-provided smallest currency unit.
 * @param currency ISO 4217 currency code.
 * @param locale Active BCP 47 application locale.
 * @edge-case Handles zero-decimal JPY and three-decimal KWD/BHD currencies.
 */
export const SuperadminAffiliatesFormatCurrency = (
  amount: number,
  currency: string,
  locale: string
): string => {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency || 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(0);
  }
  const subunitMap: Record<string, number> = {
    JPY: 1,
    KWD: 1000,
    BHD: 1000,
  };
  const divisor = subunitMap[currency] ?? 100;
  const fractionDigits = (() => { if (divisor === 1) { return (0); } if (divisor === 1000) { return (3); } return (2); })();
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount / divisor);
};
