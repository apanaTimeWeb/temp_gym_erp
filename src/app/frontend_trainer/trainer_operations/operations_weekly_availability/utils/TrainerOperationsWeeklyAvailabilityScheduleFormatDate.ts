// RESPONSIBILITY: Provides Trainer Schedule feature-local date display formatting.
import { format, isValid } from 'date-fns';

import { enUS, hi } from 'date-fns/locale';
import type { Locale } from 'date-fns';

function resolveTrainerScheduleDateLocale(locale: string): Locale {
  return locale.toLowerCase().startsWith('hi') ? hi : enUS;
}

/**
 * @description Formats schedule date values using the approved date-fns display contract.
 * @dependencies date-fns.
 * @edge-case Invalid API dates should be rejected by schema validation.
 */
export function TrainerScheduleFormatDate(value: string, locale: string): string {
  const parsed = new Date(value);
  return isValid(parsed) ? format(parsed, 'dd MMM yyyy', { locale: resolveTrainerScheduleDateLocale(locale) }) : '—';
}
