// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ChurnedMember } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_communications_churn_recovery.types';

export interface ManagerCommunicationsCampaignsChurnRecoveryTableRowProps {
  member: ChurnedMember;
  onOpenComposer: (memberId: string) => void;
  maskPhone: (phone: string) => string;
}
