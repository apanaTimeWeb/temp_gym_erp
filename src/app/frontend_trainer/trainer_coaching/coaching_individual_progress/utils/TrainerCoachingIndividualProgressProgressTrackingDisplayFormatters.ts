import { format, isValid } from 'date-fns';

import { enUS, hi } from 'date-fns/locale';
import type { Locale } from 'date-fns';

// RESPONSIBILITY: Provides Trainer Progress Tracking feature-local numeric and nullable display formatting.

/**
 * @description Formats progress measurements using the active application locale.
 * @dependencies Intl.NumberFormat.
 * @edge-case Preserves zero and supports decimal measurements.
 */
export function TrainerProgressTrackingFormatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
}

function resolveTrainerProgressTrackingDateLocale(locale: string): Locale {
  return locale.toLowerCase().startsWith('hi') ? hi : enUS;
}

/**
 * @description Formats progress-entry dates through date-fns using the active application locale.
 * @dependencies date-fns locale data.
 * @edge-case Invalid dates are prevented by the API schema before reaching the table.
 */
export function TrainerProgressTrackingFormatDate(value: string, locale: string): string {
  const parsed = new Date(value);
  return isValid(parsed) ? format(parsed, 'dd MMM yyyy', { locale: resolveTrainerProgressTrackingDateLocale(locale) }) : '—';
}
