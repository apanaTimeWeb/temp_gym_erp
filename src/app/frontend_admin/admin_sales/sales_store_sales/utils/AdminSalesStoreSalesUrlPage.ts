// RESPONSIBILITY: Validate an untrusted URL page and outgoing page actions.
// Keep normal positive pages intact; bound untrusted pages to avoid unsafe offsets.
export function normalizeAdminSalesStoreSalesUrlPage(input: string | number | null): number {
  const raw = typeof input === 'number' ? String(input) : input;
  if (raw === null || !/^[1-9]\d*$/.test(raw)) return 1;
  const page = Number(raw);
  return Number.isSafeInteger(page) && page > 0 ? Math.min(page, 100000) : 1;
}
