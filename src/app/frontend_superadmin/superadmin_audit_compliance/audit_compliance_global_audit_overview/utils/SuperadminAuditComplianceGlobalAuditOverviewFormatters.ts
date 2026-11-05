import { format, parseISO } from 'date-fns';
import { enUS, hi } from 'date-fns/locale';

function resolveDateLocale(language?: string) {
  const value = language ?? (typeof document !== 'undefined' ? document.documentElement.lang : 'en');
  return value.toLowerCase().startsWith('hi') ? hi : enUS;
}

export function formatSuperadminAuditComplianceGlobalAuditTimestamp(value: string | null | undefined, language?: string): string {
  if (!value) return '—';
  const parsed = parseISO(value);
  if (Number.isNaN(parsed.getTime())) return '—';
  return format(parsed, 'PPpp', { locale: resolveDateLocale(language) });
}
