// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for hr_management; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_hr/hr_staff_management/utils/AdminHrManagementCurrencyUnits.ts)

/** Currency-unit boundary for the HR feature. Forms accept major-unit rupees; API DTOs use integer paise. */
const INR_MINOR_UNIT_FACTOR = 100;

/** @description Implements AdminHrToMinorUnits for the owning feature’s explicitly typed data. @param majorAmount - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function AdminHrToMinorUnits(majorAmount: number): number {
  if (!Number.isFinite(majorAmount) || majorAmount < 0) throw new RangeError('Amount must be a finite non-negative number.');
  const rounded = Math.round((majorAmount + Number.EPSILON) * INR_MINOR_UNIT_FACTOR);
  if (!Number.isSafeInteger(rounded) || Math.abs((majorAmount * INR_MINOR_UNIT_FACTOR) - rounded) > 1e-7) throw new RangeError('Amount must fit a safe integer number of paise.');
  return rounded;
}

/** @description Implements AdminHrFromMinorUnits for the owning feature’s explicitly typed data. @param minorAmount - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function AdminHrFromMinorUnits(minorAmount: number | undefined | null): number {
  if (minorAmount == null || !Number.isFinite(minorAmount)) return 0;
  if (!Number.isSafeInteger(minorAmount)) throw new RangeError('API monetary amount must be an integer minor-unit value.');
  return minorAmount / INR_MINOR_UNIT_FACTOR;
}
