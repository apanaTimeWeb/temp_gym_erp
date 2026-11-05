// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for attendance_dashboard; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_attendance/attendance_dashboard/utils/AdminAttendanceDashboardFormatters.ts)

import { differenceInMinutes, format, isValid, parse, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** Formats an integer/number using the active UI locale. @description Implements formatNumber for the owning feature’s explicitly typed data. @returns The typed result declared by the function signature. @param value - Input used according to the declared TypeScript signature. @param locale - Input used according to the declared TypeScript signature. */
export const formatNumber = (value: number, locale: string): string =>
  new Intl.NumberFormat(locale).format(value);

const TIME_ONLY_FORMATS = ['h:mm a', 'hh:mm a', 'H:mm', 'HH:mm'] as const;

/**
 * Parses the API's ISO timestamp contract and the legacy display-time forms
 * accepted by existing callers. Invalid values are rejected instead of being
 * coerced into misleading durations or raw timestamps.
 */
function parseAttendanceDateTime(value: string): Date | null {
  const normalized = value.trim();
  if (!normalized) return null;

  const isoCandidate = parseISO(normalized);
  if (isValid(isoCandidate) && /^\d{4}-\d{2}-\d{2}(?:T|$)/.test(normalized)) {
    return isoCandidate;
  }

  const referenceDate = new Date(2000, 0, 1);
  for (const timeFormat of TIME_ONLY_FORMATS) {
    const candidate = parse(normalized, timeFormat, referenceDate);
    if (isValid(candidate)) return candidate;
  }

  return null;
}

/** Formats a check-in/check-out timestamp as a localized time; invalid/missing values use a safe placeholder. @description Implements formatAttendanceTime for the owning feature’s explicitly typed data. @param value - Input used by this utility as declared by the signature. @param locale - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function formatAttendanceTime(value: string | null | undefined, locale = 'en'): string {
  if (!value) return '—';
  const date = parseAttendanceDateTime(value);
  if (!date) return '—';
  return format(date, 'p', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS });
}

/** Computes a non-negative duration from API ISO timestamps or legacy time strings. @description Implements computeDuration for the owning feature’s explicitly typed data. @param checkIn - Input used by this utility as declared by the signature. @param checkOut - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function computeDuration(checkIn: string, checkOut: string | null): string {
  if (!checkIn || !checkOut) return '—';

  const checkInDate = parseAttendanceDateTime(checkIn);
  const checkOutDate = parseAttendanceDateTime(checkOut);
  if (!checkInDate || !checkOutDate) return '—';

  const durationMinutes = differenceInMinutes(checkOutDate, checkInDate);
  if (durationMinutes <= 0) return '—';

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}
