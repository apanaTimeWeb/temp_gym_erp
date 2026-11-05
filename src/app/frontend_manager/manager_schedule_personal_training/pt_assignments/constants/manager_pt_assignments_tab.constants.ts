import type { PtActiveTab } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';

/** Canonical navigation options for the Manager PT module tabs. */
export const MANAGER_PT_ASSIGNMENTS_TAB_OPTIONS: ReadonlyArray<PtActiveTab> = [
  'dashboard',
  'assignments',
  'workload',
  'packages',
];

export const MANAGER_PT_ASSIGNMENTS_TAB_LABEL_KEYS: Record<PtActiveTab, 'TEXT_TAB_DASHBOARD' | 'TEXT_TAB_ASSIGNMENTS' | 'TEXT_TAB_WORKLOAD' | 'TEXT_TAB_PACKAGES'> = {
  dashboard: 'TEXT_TAB_DASHBOARD',
  assignments: 'TEXT_TAB_ASSIGNMENTS',
  workload: 'TEXT_TAB_WORKLOAD',
  packages: 'TEXT_TAB_PACKAGES',
};
