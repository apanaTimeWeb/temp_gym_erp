// RESPONSIBILITY: Owns mutable in-memory mock state for the Admin blacklist feature.
// DATA FLOW: immutable seed fixture → cloned session state → MSW mutation handlers → subsequent queries.

import { MOCK_BLACKLIST_EXPANDED } from '@/app/frontend_admin/admin_members/members_blacklist_management/mocks/fixtures/AdminMembersBlacklistManagementMockFixtures';
import type { BlacklistedMember } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';

/**
 * cloneBlacklistRecords is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
function cloneBlacklistRecords(records: BlacklistedMember[]): BlacklistedMember[] {
  return records.map((record) => ({
    ...record,
    assignedGyms: [...record.assignedGyms],
    assignedGymNames: [...record.assignedGymNames],
  }));
}

let adminBlacklistMockState = cloneBlacklistRecords(MOCK_BLACKLIST_EXPANDED);

/**
 * getAdminBlacklistMockState is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function getAdminBlacklistMockState(): BlacklistedMember[] {
  return adminBlacklistMockState;
}

/**
 * resetAdminBlacklistMockState is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function resetAdminBlacklistMockState(): void {
  adminBlacklistMockState = cloneBlacklistRecords(MOCK_BLACKLIST_EXPANDED);
}
