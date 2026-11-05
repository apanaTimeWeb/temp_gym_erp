// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for plans_catalog; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_plans/plans_catalog/utils/AdminBillingPlansCatalogCurrencyUnits.ts)

const ADMIN_PLANS_MINOR_UNIT_FACTOR = 100;
/** Converts a rupee form value (major units) into integer paise for the API. @description Implements adminPlansMajorToMinor for the owning feature’s explicitly typed data. @param amountMajor - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function adminPlansMajorToMinor(amountMajor: number): number {
  if (!Number.isFinite(amountMajor) || amountMajor < 0) throw new RangeError('Plan amounts must be finite and non-negative.');
  const scaled = amountMajor * ADMIN_PLANS_MINOR_UNIT_FACTOR;
  const rounded = Math.round(scaled);
  if (!Number.isSafeInteger(rounded) || Math.abs(scaled - rounded) > 1e-7) throw new RangeError('Plan amounts must have at most two decimal places.');
  return rounded;
}
/** Converts integer minor-unit DTO values into human-entered rupee form values. @description Implements adminPlansMinorToMajor for the owning feature’s explicitly typed data. @param amountMinor - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function adminPlansMinorToMajor(amountMinor: number): number {
  if (!Number.isSafeInteger(amountMinor) || amountMinor < 0) throw new RangeError('Plan amounts must be non-negative integer minor units.');
  return amountMinor / ADMIN_PLANS_MINOR_UNIT_FACTOR;
}
