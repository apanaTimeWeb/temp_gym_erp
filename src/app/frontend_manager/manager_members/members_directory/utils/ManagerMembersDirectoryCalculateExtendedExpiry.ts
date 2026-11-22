// RESPONSIBILITY: Pure utility function to compute extended expiry date and freeze end date during membership freeze.

/**
 * Calculates freezeUntil date and extended membership expiry date.
 * If base dates are invalid, falls back safely to reasonable defaults.
 */
export function ManagerMembersDirectoryCalculateExtendedExpiry(
  currentExpiryDate: string | Date,
  freezeDays: number,
  freezeStartDate?: string | Date
): { freezeUntil: string; extendedExpiryDate: string } {
  const start = freezeStartDate
    ? (freezeStartDate instanceof Date ? new Date(freezeStartDate.getTime()) : new Date(freezeStartDate))
    : new Date();
  const safeStart = Number.isFinite(start.getTime()) ? start : new Date();

  const days = Math.max(1, Math.min(180, Math.floor(freezeDays || 1)));

  // Freeze end date
  const until = new Date(safeStart);
  until.setDate(until.getDate() + days);
  const freezeUntil = until.toISOString().split('T')[0] ?? '';

  // Extended expiry date: current expiry + freeze days
  const baseExpiry = currentExpiryDate instanceof Date ? new Date(currentExpiryDate.getTime()) : new Date(currentExpiryDate);
  const safeExpiry = Number.isFinite(baseExpiry.getTime()) ? baseExpiry : new Date(safeStart);
  const newExpiry = new Date(safeExpiry);
  newExpiry.setDate(newExpiry.getDate() + days);
  const extendedExpiryDate = newExpiry.toISOString().split('T')[0] ?? '';

  return { freezeUntil, extendedExpiryDate };
}
