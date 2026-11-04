// RESPONSIBILITY: Validates browser-local booking dates and serializes a selected calendar day without timezone drift.
import { format, addDays } from 'date-fns';

/** Returns today's browser-local date in the native date-input format. */
export function getPublicLandingTodayDateInputValue(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

/** Returns a future date-input value for deterministic UI/test setup. Negative offsets are clamped to today. */
export function getPublicLandingDateInputValueDaysFromToday(daysAhead: number): string {
  const safeDaysAhead = Number.isFinite(daysAhead) ? Math.max(0, Math.trunc(daysAhead)) : 0;
  return format(addDays(new Date(), safeDaysAhead), 'yyyy-MM-dd');
}

/** Checks exact YYYY-MM-DD syntax, real calendar validity, and the current local date minimum. */
export function isValidPublicLandingBookingDate(dateInput: string, today = getPublicLandingTodayDateInputValue()): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) return false;
  const [year, month, day] = dateInput.split('-').map(Number);
  const candidate = new Date(Date.UTC(year, month - 1, day));
  const isRealDate = candidate.getUTCFullYear() === year
    && candidate.getUTCMonth() === month - 1
    && candidate.getUTCDate() === day;
  return isRealDate && dateInput >= today;
}

/** Serializes the selected calendar day at UTC midnight so its date never shifts by browser timezone. */
export function serializePublicLandingDateToUtc(dateInput: string): string {
  if (!isValidPublicLandingBookingDate(dateInput)) {
    throw new RangeError('A valid current or future booking date is required.');
  }
  return new Date(`${dateInput}T00:00:00.000Z`).toISOString();
}
