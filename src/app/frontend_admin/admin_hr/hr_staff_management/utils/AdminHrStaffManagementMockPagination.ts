// RESPONSIBILITY: Normalizes HR Staff MSW pagination without guessing a backend pagination contract.
// DATA FLOW: Mock URL query string -> safe integer page/limit -> existing sliced mock list.

/** Accept finite, positive safe integers only; malformed values use the existing default. */
export function adminHrStaffMockPositiveInteger(raw: string | null, fallback: number): number {
  if (raw === null || !/^\d+$/.test(raw)) return fallback;
  const value = Number(raw);
  return Number.isSafeInteger(value) && value > 0 ? value : fallback;
}
