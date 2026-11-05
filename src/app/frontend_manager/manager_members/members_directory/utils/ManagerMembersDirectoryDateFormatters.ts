import { format, isValid } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** Formats the attendance calendar heading in the caller's active locale. */
export function formatMemberMonthYear(value: Date | string, locale = 'en-IN'): string {
  const date = value instanceof Date ? value : new Date(value);
  if (!isValid(date)) return '—';
  const dateLocale = locale.toLowerCase().startsWith('hi') ? hi : enUS;
  return format(date, 'LLLL yyyy', { locale: dateLocale });
}
