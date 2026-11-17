"use client";
// RESPONSIBILITY: Renders the Schedule leave-request screen composing KPIs and the leave table; mutation ownership remains in Schedule query state.
// DATA FLOW: TanStack Query schedule response → leave rows/cards → feature-owned modal or local expansion.

import { useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import TrainerScheduleLoadingSkeleton from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/components/TrainerOperationsLeaveRequestsScheduleLoadingSkeleton';
import { useTrainerScheduleQuery } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/hooks/useTrainerOperationsLeaveRequestsScheduleQuery';
import { useTrainerScheduleStore } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/state/useTrainerOperationsLeaveRequestsScheduleStore';
import { TrainerOperationsLeaveRequestsLeaveKpis } from './TrainerOperationsLeaveRequestsLeaveKpis';
import { TrainerOperationsLeaveRequestsLeaveTable } from './TrainerOperationsLeaveRequestsLeaveTable';

export default function TrainerScheduleLeaveRequests() {
  const t = useTranslations('TRAINER_SCHEDULE');
  const { data, isPending, isError, isFetching, refetch } = useTrainerScheduleQuery();
  const openLeaveModal = useTrainerScheduleStore((state) => state.openLeaveModal);

  const leaveRequests = useMemo(() => data?.leaves ?? [], [data?.leaves]);
  const totalRequests = leaveRequests.length;
  const approvedLeaves = useMemo(
    () => leaveRequests.filter((l) => l.status.toUpperCase() === 'APPROVED').length,
    [leaveRequests]
  );
  const pendingLeaves = useMemo(
    () => leaveRequests.filter((l) => l.status.toUpperCase() === 'PENDING').length,
    [leaveRequests]
  );
  const leaveBalance = Math.max(0, 15 - approvedLeaves);

  if (isPending) return <TrainerScheduleLoadingSkeleton />;

  if (isError || !data) {
    return (
      <div className="p-6" role="alert" data-testid="trainer_schedule-schedule-leave_requests_unable_to_load_leave_requests">
        <div className="rounded-xl border border-border bg-danger-bg p-5" data-testid="trainer_schedule-trainer_schedule-leave-requests-danger-state-30-1">
          <p className="text-sm font-semibold text-danger" data-testid="trainer_schedule-leave-requests_error_state">
            {t('TEXT_UNABLE_TO_LOAD_LEAVE_REQUESTS')}
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
            className="mt-3 min-h-11 min-w-28 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-danger text-on-danger motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:active:scale-95"
            data-testid="trainer_schedule-trainerscheduleleaverequests-button_1"
          >
            {isFetching ? (
              <>
                <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" strokeWidth={2} />
                {t('TEXT_RETRYING')}
              </>
            ) : (
              t('TEXT_RETRY')
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TrainerOperationsLeaveRequestsLeaveKpis
        totalRequests={totalRequests}
        approvedLeaves={approvedLeaves}
        pendingLeaves={pendingLeaves}
        leaveBalance={leaveBalance}
      />
      <TrainerOperationsLeaveRequestsLeaveTable
        leaveRequests={leaveRequests}
        openLeaveModal={openLeaveModal}
      />
    </div>
  );
}
