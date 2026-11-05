// RESPONSIBILITY: Normalizes untrusted Finance Expenses URL pagination without accepting floats, exponent or unsafe integer values.
// DATA FLOW: URL parameter / requested page -> finite positive safe integer -> query key, API call, and pagination.
export function normalizeAdminFinanceExpensesPage(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 1;
  const raw = String(value);
  if (!/^[1-9]\d*$/.test(raw)) return 1;
  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
}
