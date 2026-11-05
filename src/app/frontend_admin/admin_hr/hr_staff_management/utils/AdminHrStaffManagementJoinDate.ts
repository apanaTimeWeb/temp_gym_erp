// RESPONSIBILITY: Validate HR joining date before serialization and API side effects.
// ISO date-only strings must be real calendar days; preserve valid ISO date-time and Date inputs.
export function getAdminHrStaffJoinDateIso(value: string | Date): string {
  if (value instanceof Date) {
    if (!Number.isFinite(value.getTime())) throw new RangeError('Invalid staff joining date');
    return value.toISOString();
  }
  if (typeof value !== 'string' || value.trim() === '') throw new RangeError('Invalid staff joining date');
  const datePart = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(value);
  if (!datePart) throw new RangeError('Invalid staff joining date');
  const year = Number(datePart[1]);
  const month = Number(datePart[2]);
  const day = Number(datePart[3]);
  // UTC civil-calendar validation also rejects JavaScript's Feb-30 normalization.
  const civilDay = new Date(0);
  civilDay.setUTCFullYear(year, month - 1, day);
  if (civilDay.getUTCFullYear() !== year || civilDay.getUTCMonth() !== month - 1 || civilDay.getUTCDate() !== day) {
    throw new RangeError('Invalid staff joining date');
  }
  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) throw new RangeError('Invalid staff joining date');
  // Accept date-only or ISO date-time with explicit zone; no ambiguous browser-local date strings.
  if (value.length > 10 && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value)) {
    throw new RangeError('Invalid staff joining date');
  }
  return parsed.toISOString();
}
