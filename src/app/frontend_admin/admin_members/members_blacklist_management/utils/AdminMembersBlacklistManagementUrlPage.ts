// RESPONSIBILITY: Validate untrusted URL-sync page input before committing to admin_members/members_blacklist_management state.
export function normalizeAdminMembersBlacklistManagementUrlPage(raw: string | number | null | undefined): number {
  if (raw === null || raw === undefined) return 1;
  const value = String(raw);
  if (!/^[1-9]\d*$/.test(value)) return 1;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 1;
}
