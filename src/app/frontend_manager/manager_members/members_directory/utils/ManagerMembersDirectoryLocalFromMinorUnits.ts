/** Converts an API minor-unit amount into a display/form major-unit number. */
export function ManagerInfrastructureFromManagerMinorUnits(value: number): number {
  if (!Number.isFinite(value)) {
    throw new RangeError('Currency amount must be a finite number.');
  }
  return Math.round(value) / 100;
}
