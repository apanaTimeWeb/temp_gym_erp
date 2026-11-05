/** Converts an API minor-unit amount into a display/form major-unit number. */
export function ManagerInfrastructureFromManagerMinorUnits(value: number): number {
  if (!Number.isSafeInteger(value)) {
    throw new RangeError('Currency amount must be a safe integer in minor units.');
  }
  return value / 100;
}
