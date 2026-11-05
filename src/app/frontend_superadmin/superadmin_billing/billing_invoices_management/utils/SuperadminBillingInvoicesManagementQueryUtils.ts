/** Normalize URL pagination values to positive safe integers. */
export function normalizePositiveSafeInteger(value: string | null | undefined, fallback: number): number {
  if (!value || !/^[1-9]\d*$/.test(value)) return fallback;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}
