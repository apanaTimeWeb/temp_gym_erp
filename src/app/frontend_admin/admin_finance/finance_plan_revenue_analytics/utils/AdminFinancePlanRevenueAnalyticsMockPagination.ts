// RESPONSIBILITY: Reject malformed page/limit values at this leaf's mock HTTP boundary.
// Production endpoint URLs, response contracts and default page sizes are unchanged.
export function normalizeAdminFinancePlanRevenueAnalyticsMockPagination(raw: string | null, fallback: number): number {
  if (raw === null || !/^[1-9]\d*$/.test(raw)) return fallback;
  const value = Number(raw);
  return Number.isSafeInteger(value) && value > 0 ? value : fallback;
}
