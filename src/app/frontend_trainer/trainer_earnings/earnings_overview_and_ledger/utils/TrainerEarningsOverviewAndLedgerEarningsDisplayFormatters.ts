// RESPONSIBILITY: Provides Trainer Earnings feature-local numeric, date, and currency display formatting.
import { format, isValid } from 'date-fns';

import { enUS, hi } from 'date-fns/locale';
import type { Locale } from 'date-fns';

function resolveTrainerEarningsDateLocale(locale: string): Locale {
  return locale.toLowerCase().startsWith('hi') ? hi : enUS;
}

/**
 * @description Formats numeric earnings metrics using the active application locale.
 * @dependencies Intl.NumberFormat.
 * @edge-case Preserves zero.
 */
export function TrainerEarningsFormatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value);
}

/**
 * @description Formats an ISO date into the earnings history display contract.
 * @dependencies date-fns.
 * @edge-case Invalid source values must be rejected at the API schema boundary.
 */
export function TrainerEarningsFormatDate(value: string, locale: string): string {
  const parsed = new Date(value);
  return isValid(parsed) ? format(parsed, 'dd MMM yyyy', { locale: resolveTrainerEarningsDateLocale(locale) }) : '—';
}
