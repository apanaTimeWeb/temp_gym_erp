// RESPONSIBILITY: Provides pure calendar geometry and today-state calculations for the Gyms calendar UI.
export interface SuperadminGymsCalendarGrid { year: number; month: number; daysInMonth: number; leadingEmptyDays: number; }
/** Calculates calendar grid geometry for the requested local month. */
/**
 * @description Provides gyms formatting or feature utility behavior for getSuperadminGymsCalendarGrid.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function getSuperadminGymsCalendarGrid(year: number, month: number): SuperadminGymsCalendarGrid {
  return { year, month, daysInMonth: new Date(year, month + 1, 0).getDate(), leadingEmptyDays: new Date(year, month, 1).getDay() };
}
/** Returns whether a date value falls on the same local calendar day as the supplied clock value. */
/**
 * @description Provides gyms formatting or feature utility behavior for isSuperadminGymsCalendarToday.
 * @dependencies Pure or module-local utility with no UI rendering or API transport ownership.
 * @edge-case Returns deterministic output for nullable or boundary values handled by the utility contract.
 */
export function isSuperadminGymsCalendarToday(dateValue: string, now = new Date()): boolean {
  return new Date(dateValue).toDateString() === now.toDateString();
}
