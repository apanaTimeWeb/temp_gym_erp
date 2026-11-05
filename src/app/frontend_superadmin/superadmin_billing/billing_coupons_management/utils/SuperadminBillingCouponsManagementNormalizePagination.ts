/** Strict URL pagination parsing: partial numbers and unsafe integers never become page state. */
export function normalizeSuperadminBillingCouponsPage(value: string | null, fallback = 1): number {
  if (value === null || !/^[1-9]\d*$/.test(value)) return fallback;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function normalizeSuperadminBillingCouponsPageSize<T extends number>(
  value: string | null,
  allowed: readonly T[],
  fallback: T,
): T {
  if (value === null || !/^[1-9]\d*$/.test(value)) return fallback;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) return fallback;
  return allowed.find((candidate) => candidate === parsed) ?? fallback;
}
