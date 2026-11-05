import { format, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

/** Formats ISO date-only values as calendar dates without UTC-to-local day drift. */
export function formatSuperadminAnalyticsReportsCancellationDate(value: string | null | undefined, locale: string): string {
  if (!value) return '—';
  const date = parseISO(value);
  if (Number.isNaN(date.getTime())) return '—';
  return format(date, 'PP', { locale: locale.toLowerCase().startsWith('hi') ? hi : enUS });
}
