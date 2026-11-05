import type { PtPackage } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments.types';

export interface ManagerPtAssignmentsPackagesGridProps {
  packages: PtPackage[];
  translate: (key: string) => string;
  locale: string;
  currencyCode: string;
}
