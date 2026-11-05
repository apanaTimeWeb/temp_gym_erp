// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import ManagerPtAssignmentsExpiringSoon from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsExpiringSoon';
import ManagerPtAssignmentsKPIs from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsKPIs';
import ManagerPtAssignmentsTrainerWorkload from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsTrainerWorkload';
import type { ManagerPtAssignmentsDashboardTabProps } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/types/manager_pt_assignments_dashboard_tab.types';

/**
 * @description Composes the PT dashboard KPI, trainer workload, and expiring-package sections.
 * @dependencies Delegates each visual section to its existing Manager PT child component.
 * @edge-case Renders supplied empty arrays safely while preserving section layout.
 */
export default function ManagerPtAssignmentsDashboardTab({ kpis, workload, expiringPackages }: ManagerPtAssignmentsDashboardTabProps) {
  return (
    <div className="space-y-6">
      <ManagerPtAssignmentsKPIs kpis={kpis} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2"><ManagerPtAssignmentsTrainerWorkload workload={workload} /></div>
        <div><ManagerPtAssignmentsExpiringSoon expiringPackages={expiringPackages} /></div>
      </div>
    </div>
  );
}
