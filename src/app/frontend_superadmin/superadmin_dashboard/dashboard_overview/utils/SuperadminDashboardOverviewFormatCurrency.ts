/** Formats an API amount expressed in the currency's minor unit into a localized major-unit string. */
export const SuperadminDashboardFormatCurrency = (amountMinor: number, currency: string, locale: string): string => {
  if (!Number.isFinite(amountMinor)) return '—';
  try {
    const options = new Intl.NumberFormat(locale, { style: 'currency', currency }).resolvedOptions();
    const fractionDigits = options.maximumFractionDigits ?? 2;
    const divisor = 10 ** fractionDigits;
    return new Intl.NumberFormat(locale, {
      style: 'currency', currency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(amountMinor / divisor);
  } catch {
    return '—';
  }
};
