// RESPONSIBILITY: Defines feature-local TypeScript contracts for members_directory; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_members/members_directory/types/AdminMembersDirectoryApiQueryTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { MemberStatus } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryTypes';
import type { AdminMembersExpiryFilter } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryUiTypes';

export interface FetchMembersParams {
  search?: string;
  status?: MemberStatus;
  branchId?: string;
  expiryFilter?: AdminMembersExpiryFilter;
  gender?: 'Male' | 'Female' | 'Other';
  plan?: 'basic' | 'pro' | 'classic';
  page?: number;
  limit?: number;
}
