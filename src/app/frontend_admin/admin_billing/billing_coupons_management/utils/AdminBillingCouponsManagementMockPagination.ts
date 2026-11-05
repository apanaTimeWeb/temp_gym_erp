// RESPONSIBILITY: Clamp mock-only query pagination to positive safe integers.
// DATA FLOW: MSW URL query strings -> finite page/limit -> slice bounds.
export function adminBillingCouponsManagementSafeMockPage(value: string | null, fallback: number): number {
  const parsed = Number(value ?? String(fallback));
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}
