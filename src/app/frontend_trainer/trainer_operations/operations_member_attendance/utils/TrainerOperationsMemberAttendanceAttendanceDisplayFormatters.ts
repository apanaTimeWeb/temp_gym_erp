// RESPONSIBILITY: Provides Trainer attendance numeric/date/time/masking formatting without cross-feature dependencies.
import { format, isValid } from 'date-fns';

import { enUS, hi } from 'date-fns/locale';
import type { Locale } from 'date-fns';

function resolveTrainerAttendanceDateLocale(locale: string): Locale {
  return locale.toLowerCase().startsWith('hi') ? hi : enUS;
}

/**
 * @description Formats numeric attendance metrics using the active application locale with no decimals.
 * @dependencies Intl.NumberFormat.
 * @edge-case Preserves valid zero values.
 */
export function TrainerAttendanceFormatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value);
}

/**
 * @description Formats an ISO timestamp into the Attendance date presentation contract.
 * @dependencies date-fns.
 * @edge-case Invalid source values must be rejected by schema validation before display.
 */
export function TrainerAttendanceFormatDate(value: string, locale: string): string {
  const parsed = new Date(value);
  return isValid(parsed) ? format(parsed, 'dd MMM yyyy', { locale: resolveTrainerAttendanceDateLocale(locale) }) : '—';
}

/**
 * @description Formats an optional ISO timestamp into a local HH:mm display value.
 * @dependencies date-fns.
 * @edge-case Missing checkout timestamps render as an en-dash.
 */
export function TrainerAttendanceFormatTime(value: string | null | undefined, locale: string): string {
  if (!value) return '—';
  const parsed = new Date(value);
  return isValid(parsed) ? format(parsed, 'HH:mm', { locale: resolveTrainerAttendanceDateLocale(locale) }) : '—';
}

/**
 * @description Masks trainer-visible sensitive contact values using the documented phone masking shape.
 * @dependencies None.
 * @edge-case Short/non-digit values use a conservative hidden representation.
 */
export function TrainerAttendanceMaskSensitiveData(value: string): string {
  const compact = value.replace(/\D/g, '');
  if (compact.length <= 6) return '••••';
  return `${compact.slice(0, 2)}****${compact.slice(-4)}`;
}
