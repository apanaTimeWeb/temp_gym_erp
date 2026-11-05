// RESPONSIBILITY: Owns mock-handler input/output types for the Admin blacklist feature.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_blacklist/blacklist_management/types/AdminMembersBlacklistManagementMockHandlerTypes.ts)

import type { BlacklistedMember } from '@/app/frontend_admin/admin_members/members_blacklist_management/types/AdminMembersBlacklistManagementTypes';

export type AdminBlacklistJsonObject = Record<string, unknown>;
export type BlacklistRecord = BlacklistedMember;
