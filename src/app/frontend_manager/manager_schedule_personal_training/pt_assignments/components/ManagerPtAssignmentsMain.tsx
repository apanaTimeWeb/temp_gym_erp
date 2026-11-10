// RESPONSIBILITY: Orchestrates the Manager PT route and delegates all visual sections to child components; it does not own API transport or business calculations.
'use client';
import { useRef, useState, useMemo } from 'react';

import { useTranslations, useLocale } from 'next-intl';

import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/constants/ManagerInfrastructureEnvConfig';
import { ManagerInfrastructureIdempotency } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureIdempotency';

import ManagerPtAssignmentsAssignmentForm from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsAssignmentForm';
import ManagerPtAssignmentsScheduleSessionModal from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsScheduleSessionModal';
import ManagerPtAssignmentsSessionsTracker from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsSessionsTracker';
import ManagerPtAssignmentsLoadingSkeleton from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsLoadingSkeleton';
import ManagerPtAssignmentsDashboardTab from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsDashboardTab';
import ManagerPtAssignmentsPackagesGrid from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsPackagesGrid';
import ManagerPtAssignmentsTabBar from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsTabBar';
import ManagerPtAssignmentsToolbar from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsToolbar';
import ManagerPtAssignmentsTable from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsTable';
import ManagerPtAssignmentsTrainerWorkload from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/components/ManagerPtAssignmentsTrainerWorkload';
import { MANAGER_PT_ASSIGNMENTS_TAB_OPTIONS } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/constants/manager_pt_assignments_tab.constants';
import { useManagerPtAssignmentsLogic } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/hooks/useManagerPtAssignmentsLogic';
import { ManagerInfrastructureShowSuccessToast } from '@/app/frontend_manager/manager_infrastructure/utils/ManagerInfrastructureShowSuccessToast';
import type { ManagerPtAssignmentsAssignmentFormValues, ManagerPtScheduleSessionFormValues } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/schemas/manager_pt_assignments_assignment.schemas';

/**
 * @description Orchestrates the Manager PT route, owns only modal visibility and selected-tab composition, and delegates server state/mutations to useManagerPtAssignmentsLogic.
 * @dependencies Consumes module-owned PT hooks, schemas, API contracts, and visual child components.
 * @edge-case Keeps loading, error, empty-package, retry, and repeated-assignment flows inside the documented module boundaries.
 */
export default function ManagerPtAssignmentsMain() {
  const t = useTranslations('MANAGER_PT_ASSIGNMENTS');
  const locale = useLocale();
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const createIntentKeyRef = useRef<{ signature: string; key: string } | null>(null);
  const { activeTab, setActiveTab, packages, assignments, kpis, workload, expiringPackages, totalAssignments, currentPage, limit, search, setSearch, setPage, isPending, isError, errorMessage, markingId, handleMarkSession, createAssignment, assignmentSaving } = useManagerPtAssignmentsLogic();

  const existingMembers = useMemo(() => {
    const map = new Map<string, string>();
    assignments.forEach((a) => {
      if (a.memberId && a.memberName) map.set(a.memberId, a.memberName);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [assignments]);

  const handleCreateAssignment = async (values: ManagerPtAssignmentsAssignmentFormValues) => {
    const signature = JSON.stringify(values);
    const idempotencyKey = createIntentKeyRef.current?.signature === signature ? createIntentKeyRef.current.key : ManagerInfrastructureIdempotency();
    createIntentKeyRef.current = { signature, key: idempotencyKey };
    await createAssignment({ body: values, idempotencyKey });
    createIntentKeyRef.current = null;
    setIsAssignModalOpen(false);
  };

  const handleScheduleSession = async (values: ManagerPtScheduleSessionFormValues) => {
    ManagerInfrastructureShowSuccessToast(
      `Session booked for ${values.sessionDate} at ${values.sessionTime} (${values.location})`,
      'manager-pt-session-schedule'
    );
    setIsScheduleModalOpen(false);
  };

  return (
    <div className="w-full space-y-6">
      <ManagerPtAssignmentsAssignmentForm data-testid="manager_pt-managerptmain-managerptassignmentform-1" open={isAssignModalOpen} packages={packages} trainers={workload} members={existingMembers} saving={assignmentSaving} onClose={() => setIsAssignModalOpen(false)} onSubmit={handleCreateAssignment} />
      <ManagerPtAssignmentsScheduleSessionModal open={isScheduleModalOpen} assignments={assignments} saving={false} onClose={() => setIsScheduleModalOpen(false)} onSubmit={handleScheduleSession} />
      <ManagerPtAssignmentsToolbar data-testid="manager_pt-managerptmain-managerpttoolbar-2" title={t('COPY_PERSONAL_TRAINING')} subtitle={t('COPY_MANAGE_PT_PACKAGES_MONITOR_TRAINER_WORKLOAD_TRACK_SESSIONS')} actionLabel={t('COPY_ASSIGN_TRAINER_1')} onAssign={() => setIsAssignModalOpen(true)} onScheduleSession={() => setIsScheduleModalOpen(true)} />
      <div className="w-full sm:max-w-sm"><label htmlFor="manager-pt-assignments-search" className="mb-1 block text-sm font-medium text-text-secondary">{t('TEXT_TAB_ASSIGNMENTS')}</label><input id="manager-pt-assignments-search" type="search" placeholder="Search..." value={search} onChange={(event) => setSearch(event.target.value)} className="min-h-11 w-full rounded-lg border border-border bg-input px-3 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" /></div>
      <ManagerPtAssignmentsTabBar data-testid="manager_pt-managerptmain-managerpttabbar-3" tabs={MANAGER_PT_ASSIGNMENTS_TAB_OPTIONS} activeTab={activeTab} onChange={setActiveTab} />

      {isPending && <ManagerPtAssignmentsLoadingSkeleton />}
      {isError && <div data-testid="manager_pt-manager-pt-main-status" role="alert" className="rounded-xl border border-danger bg-danger p-5 text-sm text-on-danger">{errorMessage || t('TEXT_GENERIC_ERROR')}</div>}

      {!isPending && !isError && (
        <div className="space-y-6">
          {activeTab === 'dashboard' && <ManagerPtAssignmentsDashboardTab kpis={kpis} workload={workload} expiringPackages={expiringPackages}  data-testid="manager_pt-managerptmain-pt-dashboard-tab-1"/>}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <ManagerPtAssignmentsTable data-testid="manager_pt-managerptmain-managerptassignmentstable-4" assignments={assignments} totalAssignments={totalAssignments} currentPage={currentPage} totalPages={Math.max(1, Math.ceil(totalAssignments / limit))} pageSize={limit} onPageChange={setPage} markingId={markingId} onMarkSession={handleMarkSession} />
              <ManagerPtAssignmentsSessionsTracker assignments={assignments} onMarkSession={handleMarkSession} markingId={markingId} />
            </div>
          )}
          {activeTab === 'workload' && <ManagerPtAssignmentsTrainerWorkload workload={workload} />}
          {activeTab === 'packages' && (
            <ManagerPtAssignmentsPackagesGrid packages={packages} translate={t} locale={locale} currencyCode={ManagerEnvConfig.currencyCode} />
          )}
        </div>
      )}
    </div>
  );
}
