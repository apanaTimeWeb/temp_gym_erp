// RESPONSIBILITY: Pure date-only range calculation and serialization for Superadmin date filters.
import { endOfDay, format, startOfDay, startOfMonth, startOfYear, startOfWeek } from 'date-fns';

import type { DateRangeOption } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center_date_range.types';



/**
 * @description Computes a date-only messaging range using the browser-local calendar and date-fns primitives.
 * @dependencies Uses the feature-local date range type and approved date-fns dependency.
 * @edge-case Serializes date-only values in local time so UTC conversion cannot shift the calendar day.
 */
export function getDateRange(option: Exclude<DateRangeOption, 'custom'>, now = new Date()): { start: string; end: string } {
  const day = startOfDay(now);
  switch (option) {
    case 'this_week':
      return { start: format(startOfWeek(day, { weekStartsOn: 0 }), 'yyyy-MM-dd'), end: format(endOfDay(day), 'yyyy-MM-dd') };
    case 'this_month':
      return { start: format(startOfMonth(day), 'yyyy-MM-dd'), end: format(day, 'yyyy-MM-dd') };
    case 'this_year':
      return { start: format(startOfYear(day), 'yyyy-MM-dd'), end: format(endOfDay(day), 'yyyy-MM-dd') };
    default:
      return { start: format(day, 'yyyy-MM-dd'), end: format(day, 'yyyy-MM-dd') };
  }
}

/**
 * @description Trims custom date values without changing their API contract.
 * @dependencies None beyond native string behavior.
 * @edge-case Blank values remain blank so the owning query layer can omit them rather than fabricating dates.
 */
export function serializeSuperadminCustomDateRange(start: string, end: string): { start: string; end: string } {
  return { start: start.trim(), end: end.trim() };
}
