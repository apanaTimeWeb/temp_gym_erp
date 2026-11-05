// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { PtAssignment } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';

export interface ManagerPtAssignmentsExpiringSoonProps {
  expiringPackages: PtAssignment[];
}
