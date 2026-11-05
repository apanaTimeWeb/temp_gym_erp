// RESPONSIBILITY: Validate untrusted invoice page URL and pagination action values.
// DATA FLOW: URL/page control → bounded safe integer → invoice query key and router.
export function normalizeAdminBillingSubscriptionInvoicesUrlPage(raw: string | number | null): number {
  const text = typeof raw === 'number' ? String(raw) : raw;
  if (text === null || !/^[1-9]\d*$/.test(text)) return 1;
  const page = Number(text);
  return Number.isSafeInteger(page) ? Math.min(page, 100000) : 1;
}
