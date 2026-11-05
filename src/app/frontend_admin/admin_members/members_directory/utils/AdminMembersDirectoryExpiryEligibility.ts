// RESPONSIBILITY: Pure, mock-only expiry filter eligibility for the Members Directory.
// Invalid civil dates must never be classified as this-month / this-week expirations.
export function getAdminMembersExpiryEligibility(expiryDate: string, now: Date): { thisWeek: boolean; thisMonth: boolean } {
  const invalid = { thisWeek: false, thisMonth: false };
  if (typeof expiryDate !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z)?$/.test(expiryDate)) return invalid;
  const year = Number(expiryDate.slice(0, 4));
  const month = Number(expiryDate.slice(5, 7));
  const day = Number(expiryDate.slice(8, 10));
  const civil = new Date(0);
  civil.setUTCFullYear(year, month - 1, day);
  if (civil.getUTCFullYear() !== year || civil.getUTCMonth() !== month - 1 || civil.getUTCDate() !== day) return invalid;
  const expiryMs = Date.parse(expiryDate);
  if (!Number.isFinite(expiryMs) || !Number.isFinite(now.getTime())) return invalid;
  const days = Math.ceil((expiryMs - now.getTime()) / 86400000);
  const thisWeek = days >= 0 && days <= 7;
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDay = now.getDate();
  const thisMonth = year === nowYear && month === nowMonth && day >= nowDay;
  return { thisWeek, thisMonth };
}
