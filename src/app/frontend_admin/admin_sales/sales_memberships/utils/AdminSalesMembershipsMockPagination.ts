// RESPONSIBILITY: Strictly parse untrusted mock list pagination at the HTTP boundary.
// Existing list defaults are preserved; the mock limit is bounded to avoid huge slices.
export function normalizeAdminSalesMembershipsMockPagination(raw: string | null, fallback: number, maximum = 100000): number {
  if (raw === null || !/^[1-9]\d*$/.test(raw)) return fallback;
  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) && parsed > 0 ? Math.min(parsed, maximum) : fallback;
}
