// RESPONSIBILITY: Formats Trainer Earnings monetary values from backend minor units using the active locale and ISO 4217 currency contract.

/**
 * @description Formats Trainer Earnings monetary values from backend minor units using the active locale and ISO 4217 currency contract.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export const TrainerEarningsFormatCurrency = (amount: number, currency: string, locale: string): string => {
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });
  const fractionDigits = formatter.resolvedOptions().maximumFractionDigits;
  const divisor = 10 ** fractionDigits;
  return formatter.format(amount / divisor);
};
