// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Typed props contract for the generic Trainer stat card.
import type { TrainerInfrastructureStatCardChangeType } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/types/TrainerDashboardOverviewTrainerInfrastructureStatCardTypes';

import type { LucideIcon } from 'lucide-react';

export interface TrainerInfrastructureStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: TrainerInfrastructureStatCardChangeType;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}
