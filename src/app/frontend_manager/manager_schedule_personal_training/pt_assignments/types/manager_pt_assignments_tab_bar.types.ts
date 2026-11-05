import type { PtActiveTab } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';

export interface ManagerPtAssignmentsTabBarProps {
  tabs: readonly PtActiveTab[];
  activeTab: PtActiveTab;
  onChange: (id: PtActiveTab) => void;
}
