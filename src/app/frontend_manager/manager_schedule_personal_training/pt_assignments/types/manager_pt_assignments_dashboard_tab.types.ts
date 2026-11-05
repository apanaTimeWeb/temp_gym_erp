import type { PtDashboardKpis, PtAssignment, PtTrainerWorkload } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';

export interface ManagerPtAssignmentsDashboardTabProps {
  kpis: PtDashboardKpis | null;
  workload: PtTrainerWorkload[];
  expiringPackages: PtAssignment[];
}
