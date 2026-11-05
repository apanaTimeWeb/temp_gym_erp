export function getSuperadminSupportTicketsSlaRemainingMs(slaDeadline: string | null | undefined, now = Date.now()): number | null {
  if (!slaDeadline || !/^\d{4}-\d{2}-\d{2}T/.test(slaDeadline)) return null;
  const prefix = /^(\d{4})-(\d{2})-(\d{2})T/.exec(slaDeadline);
  if (!prefix) return null;
  const [, year, month, day] = prefix;
  const calendar = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  if (calendar.getUTCFullYear() !== Number(year) || calendar.getUTCMonth() + 1 !== Number(month) || calendar.getUTCDate() !== Number(day)) return null;
  const deadline = Date.parse(slaDeadline);
  if (!Number.isFinite(deadline)) return null;
  return deadline - now;
}
