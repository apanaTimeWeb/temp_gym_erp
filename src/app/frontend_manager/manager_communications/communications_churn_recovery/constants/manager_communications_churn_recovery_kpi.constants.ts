import { UserX, TrendingDown, RotateCcw, Clock } from 'lucide-react';

import { ManagerCommunicationsCampaignsFormatNumber, ManagerCommunicationsCampaignsFormatPercent } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/utils/ManagerCommunicationsChurnRecoveryFormatters';
import type { ChurnKPIData } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/types/manager_communications_communications_churn_recovery.types';


/**
 * @description Provides the ManagerCommunicationsCampaignsChurnRecoveryKpiConstants implementation for the communications module.
 * @dependencies @/app/frontend_manager/manager_communications/manager_communications_utils/ManagerCommunicationsCampaignsFormatters; @/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsCampaignsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_CHURN_RECOVERY_KPI_CARDS = [
  { key: 'totalChurned' as keyof ChurnKPIData, label: 'TOTAL LOST', icon: UserX, iconBg: 'bg-danger-bg', iconColor: 'text-danger-text', format: (v: number) => ManagerCommunicationsCampaignsFormatNumber(v) },
  { key: 'churnedThisMonth' as keyof ChurnKPIData, label: 'LOST THIS MONTH', icon: TrendingDown, iconBg: 'bg-warning-bg', iconColor: 'text-warning-text', format: (v: number) => ManagerCommunicationsCampaignsFormatNumber(v) },
  { key: 'recoveryRate' as keyof ChurnKPIData, label: 'RECOVERY RATE', icon: RotateCcw, iconBg: 'bg-success-bg', iconColor: 'text-success-text', format: (v: number) => ManagerCommunicationsCampaignsFormatPercent(v) },
  { key: 'avgDaysSinceExit' as keyof ChurnKPIData, label: 'AVG DAYS SINCE EXIT', icon: Clock, iconBg: 'bg-info-bg', iconColor: 'text-info-text', format: (v: number) => `${v}d` },
] as const;
