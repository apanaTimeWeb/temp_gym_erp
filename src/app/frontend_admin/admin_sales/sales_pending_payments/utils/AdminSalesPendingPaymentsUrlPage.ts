// RESPONSIBILITY: Validate both read URL pages and page-action writes in this Sales leaf.
// DATA FLOW: searchParams / page action → canonical bounded page → query/router.
export function normalizeAdminSalesPendingPaymentsUrlPage(raw: string | number | null): number {
  const text = typeof raw === 'number' ? String(raw) : raw;
  if (text === null || !/^[1-9]\d*$/.test(text)) return 1;
  const page = Number(text);
  return Number.isSafeInteger(page) ? Math.min(page, 100000) : 1;
}
