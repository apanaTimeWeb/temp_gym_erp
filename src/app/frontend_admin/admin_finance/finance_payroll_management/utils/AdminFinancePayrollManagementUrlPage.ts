// RESPONSIBILITY: Strictly validate URL page input and outgoing pagination actions.
// The existing 100000-page ceiling and fallback 1 are retained.
export function normalizeAdminFinancePayrollManagementUrlPage(input: string | number | null): number {
  const raw = typeof input === 'number' ? String(input) : input;
  if (raw === null || !/^[1-9]\d*$/.test(raw)) return 1;
  const value = Number(raw);
  return Number.isSafeInteger(value) && value > 0 ? Math.min(value, 100000) : 1;
}
