// RESPONSIBILITY: Canonical decimal page and limit parser for the invoice MSW boundary.
// Valid numbers retain prior paginate utility semantics; malformed URL representations fall back.
export function normalizeAdminSubscriptionInvoicesMockPage(value: string | null, fallback: number): number {
  if (value === null || !/^[1-9]\d*$/.test(value)) return fallback;
  const result = Number(value);
  return Number.isSafeInteger(result) && result > 0 ? result : fallback;
}
