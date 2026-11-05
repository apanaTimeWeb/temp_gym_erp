// RESPONSIBILITY: Escapes audit CSV mock cells while preventing spreadsheet formula execution.
// DATA FLOW: already-redacted audit field → CSV-safe quoted cell → mock download response.
export function adminAuditLogsCsvCell(value: unknown): string {
  const raw = String(value ?? '').replace(/\r?\n/g, ' ');
  const text = /^[\u0000-\u0020\uFEFF]*[=+@-]/u.test(raw) ? `'${raw}` : raw;
  return `"${text.replaceAll('"', '""')}"`;
}
