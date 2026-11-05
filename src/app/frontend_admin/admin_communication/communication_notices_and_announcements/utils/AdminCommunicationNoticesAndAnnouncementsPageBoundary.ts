// RESPONSIBILITY: Strict module-local pagination boundary for untrusted URL/MSW inputs.
// Never interpret scientific notation, hex, fractions, or unsafe integer values as user page numbers.
export function normalizeAdminAnnouncementsPage(value: string | number | null, fallback = 1, cap = 100000): number {
  const raw = value === null ? '' : String(value);
  if (!/^[1-9]\d*$/.test(raw)) return fallback;
  const parsed = Number(raw);
  return Number.isSafeInteger(parsed) && parsed > 0 ? Math.min(parsed, cap) : fallback;
}

export function normalizeAdminAnnouncementsMockLimit(value: string | number | null): number {
  return normalizeAdminAnnouncementsPage(value, 10, 100);
}
