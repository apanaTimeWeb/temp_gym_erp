// RESPONSIBILITY: Normalize untrusted URL pagination for this autonomous Finance leaf.
// Decimal, exponent, negative, zero, infinite and unsafe values fall back to page one.
export function normalizeAdminFinanceSummaryPage(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 1;
  const raw = String(value);
  if (!/^[1-9]\d*$/.test(raw)) return 1;
  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
}
