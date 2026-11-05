// RESPONSIBILITY: Prop contract for the Admin Members profile drawer.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_members/members_directory/types/AdminMembersDirectoryProfileDrawerTypes.ts)

import type { QueryStatus } from '@tanstack/react-query';
import type { AdminMember } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryTypes';

export interface AdminMembersProfileDrawerProps {
  member: AdminMember | null;
  status: QueryStatus;
  error: string;
  onRetry: () => void;
  onClose: () => void;
}
