/**
 * Converts form-visible major currency units to/from the minor-unit representation used by the Plans API.
 * The exponent is derived from Intl currency metadata so zero- and three-decimal currencies are handled correctly.
 */
export function toSuperadminBillingPlansMinorUnits(amount: number, currency = 'INR'): number {
  if (!Number.isFinite(amount) || amount < 0) throw new RangeError('Amount must be a finite non-negative number.');
  const fractionDigits = new Intl.NumberFormat('en-US', { style: 'currency', currency }).resolvedOptions().maximumFractionDigits ?? 2;
  return Math.round(amount * (10 ** fractionDigits));
}

export function fromSuperadminBillingPlansMinorUnits(amount: number, currency = 'INR'): number {
  if (!Number.isFinite(amount) || amount < 0) throw new RangeError('Amount must be a finite non-negative number.');
  const fractionDigits = new Intl.NumberFormat('en-US', { style: 'currency', currency }).resolvedOptions().maximumFractionDigits ?? 2;
  return amount / (10 ** fractionDigits);
}
