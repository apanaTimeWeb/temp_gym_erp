// RESPONSIBILITY: Enforce the coupon form's decimal, safe-integer usage-limit boundary.
// Never allow Number coercion to reinterpret hex, exponent notation, whitespace or unsafe integers.
export function isAdminCouponUsageLimit(value: string): boolean {
  return /^\d+$/.test(value) && Number.isSafeInteger(Number(value)) && Number(value) > 0;
}

export function parseAdminCouponUsageLimit(value: string): number {
  if (!isAdminCouponUsageLimit(value)) throw new RangeError('Invalid coupon usage limit');
  return Number(value);
}
