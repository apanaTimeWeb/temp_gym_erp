// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ChurnedMember } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_communications_churn_recovery.types';

export interface ManagerCommunicationsCampaignsChurnRecoveryTableProps {
  members: ChurnedMember[];
  allFilteredCount: number;
  isPending: boolean;
  isError: boolean;
  errorMessage?: string | null;
  churnSearch: string;
  onSearchChange: (s: string) => void;
  churnReasonFilter: string;
  onReasonFilterChange: (r: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  onOpenComposer: (memberId: string) => void;
}
