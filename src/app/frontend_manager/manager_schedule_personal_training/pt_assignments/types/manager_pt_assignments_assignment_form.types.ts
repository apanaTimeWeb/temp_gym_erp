// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { PtPackage, PtTrainerWorkload } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';

export interface ManagerPtAssignmentsAssignmentFormValues {
  memberId: string;
  packageId: string;
  trainerId: string;
  startDate: string;
  notes?: string;
}

export interface ManagerPtAssignmentsAssignmentFormProps {
  open: boolean;
  packages: PtPackage[];
  trainers: PtTrainerWorkload[];
  members?: Array<{ id: string; name: string }>;
  saving: boolean;
  onClose: () => void;
  onSubmit: (values: ManagerPtAssignmentsAssignmentFormValues) => Promise<void>;
}
