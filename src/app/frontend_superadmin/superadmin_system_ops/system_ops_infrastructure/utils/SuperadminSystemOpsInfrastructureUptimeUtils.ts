// RESPONSIBILITY: Formats uptime chart timestamps for localized display. No JSX or API calls.
/** Formats a timestamp as a locale-aware 24-hour chart label; invalid input is intentionally blank. */
export function formatSuperadminInfrastructureUptimeAxisTime(timestamp: string, locale: string): string {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date);
  } catch {
    return new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(date);
  }
}
