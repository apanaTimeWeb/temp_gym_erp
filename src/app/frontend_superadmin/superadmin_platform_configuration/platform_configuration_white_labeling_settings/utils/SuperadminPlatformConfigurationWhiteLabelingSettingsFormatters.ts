import { format } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** Module-owned date formatting for the White-labeling feature using the approved date-fns contract. */
export function formatWhiteLabelingDate(value: string | number | Date | null | undefined, locale: string): string {
  if (value === null || value === undefined || value === '') return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const resolvedLocale = locale.toLowerCase().startsWith('hi') ? hi : enUS;
  try { return format(date, 'MMM d, yyyy', { locale: resolvedLocale }); } catch { return '—'; }
}
