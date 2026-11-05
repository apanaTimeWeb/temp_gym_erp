// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for coupons_management; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_coupons/coupons_management/utils/AdminBillingCouponsManagementCurrencyUnits.ts)

const COUPON_MINOR_UNIT_FACTOR = 100;

/** Converts rupee input (major units, at most two decimals) to integer paise for the API. @description Implements adminCouponsMajorToMinor for the owning feature’s explicitly typed data. @param amountMajor - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function adminCouponsMajorToMinor(amountMajor: number): number {
  if (!Number.isFinite(amountMajor) || amountMajor < 0) throw new RangeError('Coupon amounts must be finite and non-negative.');
  const rounded = Math.round(amountMajor * COUPON_MINOR_UNIT_FACTOR);
  if (!Number.isSafeInteger(rounded) || Math.abs(amountMajor * COUPON_MINOR_UNIT_FACTOR - rounded) > 1e-7) {
    throw new RangeError('Coupon amounts must have at most two decimal places.');
  }
  return rounded;
}

/** Converts integer paise from API DTOs back into rupee form values. @description Implements adminCouponsMinorToMajor for the owning feature’s explicitly typed data. @param amountMinor - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function adminCouponsMinorToMajor(amountMinor: number): number {
  if (!Number.isSafeInteger(amountMinor) || amountMinor < 0) throw new RangeError('Coupon amounts must be non-negative integer minor units.');
  return amountMinor / COUPON_MINOR_UNIT_FACTOR;
}
