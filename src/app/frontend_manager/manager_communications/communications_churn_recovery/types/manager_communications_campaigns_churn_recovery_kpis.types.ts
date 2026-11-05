// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { ChurnKPIData } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_communications_churn_recovery.types';

export interface ManagerCommunicationsCampaignsChurnRecoveryKPIsProps {
  kpis: ChurnKPIData | undefined;
}
