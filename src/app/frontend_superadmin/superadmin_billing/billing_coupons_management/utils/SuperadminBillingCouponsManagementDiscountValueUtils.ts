/**
 * Formats and normalizes EXACT coupon discounts at the module boundary.
 * Form values are user-facing major units (e.g. 500.00 INR); API/record values are minor units.
 */
export const getSuperadminBillingCouponsCurrencyDivisor = (currencyCode: string): number => {
  if (!/^[A-Z]{3}$/.test(currencyCode)) throw new RangeError(`Invalid ISO currency code: ${currencyCode}`);
  try {
    const digits = new Intl.NumberFormat('en', { style: 'currency', currency: currencyCode }).resolvedOptions().maximumFractionDigits ?? 2;
    // Some ICU builds report IQD with zero digits even though ISO 4217 specifies three.
    return 10 ** (currencyCode === 'IQD' ? 3 : digits);
  } catch {
    throw new RangeError(`Unsupported ISO currency code: ${currencyCode}`);
  }
};

export const toSuperadminBillingCouponsMinorUnits = (amountMajor: number, currencyCode: string): number => {
  const divisor = getSuperadminBillingCouponsCurrencyDivisor(currencyCode);
  return Math.round(amountMajor * divisor);
};

export const fromSuperadminBillingCouponsMinorUnits = (amountMinor: number, currencyCode: string): number => {
  const divisor = getSuperadminBillingCouponsCurrencyDivisor(currencyCode);
  return amountMinor / divisor;
};
