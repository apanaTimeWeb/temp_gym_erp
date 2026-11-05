// RESPONSIBILITY: Reject malformed page/limit values at this leaf's mock HTTP boundary.
// Production endpoint URLs, response contracts and default page sizes are unchanged.
export function normalizeAdminMembersDirectoryMockPagination(raw: string | null, fallback: number, maximum = 100000): number {
  if (raw === null || !/^[1-9]\d*$/.test(raw)) return fallback;
  const value = Number(raw);
  return Number.isSafeInteger(value) && value > 0 ? Math.min(value, maximum) : fallback;
}
