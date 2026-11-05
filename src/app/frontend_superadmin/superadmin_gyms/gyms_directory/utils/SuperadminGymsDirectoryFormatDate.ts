import { format, parseISO, isValid } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** Format an optional ISO date/timestamp using the active frontend locale. */
export function formatSuperadminGymsDate(value: string | null | undefined, locale: string): string {
  if (!value) return '—';
  const date = parseISO(value);
  if (!isValid(date)) return '—';
  return format(date, 'PP', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS });
}
