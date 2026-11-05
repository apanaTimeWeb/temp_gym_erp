// RESPONSIBILITY: Validates and resolves Personal Training view identifiers.
import type { ManagerPtAssignmentsViewId } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';
import { MANAGER_PT_ASSIGNMENTS_DEFAULT_VIEW, MANAGER_PT_ASSIGNMENTS_VIEW_IDS } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/constants/manager_pt_assignments_view.constants';

export function resolveManagerPtAssignmentsView(value: string | null | undefined): ManagerPtAssignmentsViewId {
  return MANAGER_PT_ASSIGNMENTS_VIEW_IDS.includes(value as ManagerPtAssignmentsViewId) ? value as ManagerPtAssignmentsViewId : MANAGER_PT_ASSIGNMENTS_DEFAULT_VIEW;
}
