// RESPONSIBILITY: Provides Trainer Members feature-local numeric, date, and masking formatters.
import { format, isValid } from 'date-fns';

import { enUS, hi } from 'date-fns/locale';
import type { Locale } from 'date-fns';

function resolveTrainerMembersDateLocale(locale: string): Locale {
  return locale.toLowerCase().startsWith('hi') ? hi : enUS;
}

/**
 * @description Formats member metrics using the active application locale with no invented data.
 * @dependencies Intl.NumberFormat.
 * @edge-case Valid zero remains visible.
 */
export function TrainerMembersFormatNumber(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);
}

/**
 * @description Formats member date values using the approved date-fns display contract.
 * @dependencies date-fns.
 * @edge-case Invalid API dates should be prevented by schema validation.
 */
export function TrainerMembersFormatDate(value: string, locale: string): string {
  const parsed = new Date(value);
  return isValid(parsed) ? format(parsed, 'dd MMM yyyy', { locale: resolveTrainerMembersDateLocale(locale) }) : '—';
}

/**
 * @description Masks contact values using the documented 98****2310-style display.
 * @dependencies None.
 * @edge-case Short values use a conservative hidden representation.
 */
export function TrainerMembersMaskSensitiveData(value: string): string {
  const compact = value.replace(/\D/g, '');
  if (compact.length <= 6) return '••••';
  return `${compact.slice(0, 2)}****${compact.slice(-4)}`;
}
