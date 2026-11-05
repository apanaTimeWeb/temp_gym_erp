/** Converts a validated user-entered major-unit amount into integer minor currency units for API requests. */
export function ManagerInfrastructureToManagerMinorUnits(value: number | string): number {
  const numericValue = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(numericValue) || numericValue < 0) {
    throw new RangeError('Currency amount must be a finite non-negative number.');
  }
  return Math.round((numericValue + Number.EPSILON) * 100);
}
