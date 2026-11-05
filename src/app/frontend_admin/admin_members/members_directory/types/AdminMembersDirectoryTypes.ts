// RESPONSIBILITY: TypeScript types and interfaces for the Admin Members module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_members/members_directory/types/AdminMembersDirectoryTypes.ts)

import type { QueryStatus } from '@tanstack/react-query';

export type MemberStatus = 'active' | 'expired' | 'pending' | 'frozen';
export type AdminMembersStatusFilter = MemberStatus | 'all';
export type AdminMemberGender = 'Male' | 'Female' | 'Other';
import type { AdminMembersExpiryFilter } from '@/app/frontend_admin/admin_members/members_directory/types/AdminMembersDirectoryUiTypes';


export interface AdminMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchId: string;
  branchName: string;
  planName: string;
  status: MemberStatus;
  joinDate: string;
  expiryDate: string;
  pendingAmount: number;
  gender: AdminMemberGender;
  referralSource?: string;
  photo?: string;
  lastCheckIn?: string;
  totalVisits?: number;
  dateOfBirth?: string;
  address?: string;
}

export interface AdminMembersSummary {
  totalMembers: number;
  activeMembers: number;
  expiredMembers: number;
  pendingMembers: number;
  expiringThisWeek: number;
  expiringThisMonth: number;
  totalOutstanding: number;
  newThisMonth: number;
}

export interface AdminMembersContextType {
  members: AdminMember[];
  summary: AdminMembersSummary | null;
  status: QueryStatus;
  error: string;
  search: string;
  setSearch: (s: string) => void;
  statusFilter: AdminMembersStatusFilter;
  setStatusFilter: (s: AdminMembersStatusFilter) => void;
  branchFilter: string;
  setBranchFilter: (s: string) => void;
  expiryFilter: AdminMembersExpiryFilter;
  setExpiryFilter: (s: AdminMembersExpiryFilter) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  selectedMember: AdminMember | null;
  setSelectedMember: (m: AdminMember | null) => void;
  loadAll: () => Promise<void>;
}
