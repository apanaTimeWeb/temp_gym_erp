// RESPONSIBILITY: Strict module-owned page boundary for untrusted URL values and outgoing pagination actions.
// Canonical positive decimal integers only; cap pages to avoid unsafe offset calculations.
export function normalizeAdminSecurityAuditLogsExplorerUrlPage(input: string | number | null | undefined): number {
  const raw = input === null || input === undefined ? '' : String(input);
  if (!/^[1-9]\d*$/.test(raw)) return 1;
  const page = Number(raw);
  return Number.isSafeInteger(page) && page > 0 ? Math.min(page, 100000) : 1;
}
