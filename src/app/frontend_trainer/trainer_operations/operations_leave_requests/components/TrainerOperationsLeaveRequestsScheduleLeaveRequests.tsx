"use client";
// RESPONSIBILITY: Renders the Schedule leave-request history as an accessible desktop table and mobile card stack; mutation ownership remains in Schedule query state.
// DATA FLOW: TanStack Query schedule response → leave rows/cards → feature-owned modal or local expansion.
import { useState } from 'react';

import { Calendar, CheckCircle2, Clock, FileText, Loader2, Plus } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/components/TrainerOperationsLeaveRequestsTrainerInfrastructureTooltip';

import TrainerScheduleEmptyState from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/components/TrainerOperationsLeaveRequestsScheduleEmptyState';

import TrainerScheduleLoadingSkeleton from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/components/TrainerOperationsLeaveRequestsScheduleLoadingSkeleton';

import { TRAINER_SCHEDULE_LEAVE_TABLE_COLUMN_COUNT, TRAINER_SCHEDULE_LEAVE_TABLE_HEADERS, TRAINER_SCHEDULE_STATUS_STYLES, TRAINER_SCHEDULE_DEFAULT_STATUS_STYLE } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/utils/TrainerOperationsLeaveRequestsScheduleConstants';

import { useTrainerScheduleQuery } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/hooks/useTrainerOperationsLeaveRequestsScheduleQuery';

import { useTrainerScheduleStore } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/state/useTrainerOperationsLeaveRequestsScheduleStore';

import { TrainerScheduleFormatDate } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/utils/TrainerOperationsLeaveRequestsScheduleFormatDate';

export default function TrainerScheduleLeaveRequests() {
  const t = useTranslations('TRAINER_SCHEDULE');
  const locale = useLocale();
  const { data, isPending, isError, isFetching, refetch } = useTrainerScheduleQuery();
  const openLeaveModal = useTrainerScheduleStore((state) => state.openLeaveModal);
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
            className="mt-3 min-h-11 min-w-28 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-danger text-on-danger motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
            data-testid="trainer_schedule-trainerscheduleleaverequests-button_1"
          >
            {isFetching ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" strokeWidth={2}/>{t('TEXT_RETRYING')}</> : t('TEXT_RETRY')}
          </button>
        </div>
      </div>
    );
  }

  const leaveRequests = data.leaves ?? [];
  const totalRequests = leaveRequests.length;
  const approvedLeaves = leaveRequests.filter((l) => l.status.toUpperCase() === 'APPROVED').length;
  const pendingLeaves = leaveRequests.filter((l) => l.status.toUpperCase() === 'PENDING').length;
  const leaveBalance = Math.max(0, 15 - approvedLeaves);

  const getStatusLabel = (status: string) => {
    const upper = status.toUpperCase();
    if (upper === 'APPROVED') return t('TEXT_STATUS_APPROVED');
    if (upper === 'PENDING') return t('TEXT_STATUS_PENDING');
    if (upper === 'REJECTED') return t('TEXT_STATUS_REJECTED');
    return status;
  };

  const getStatusBadgeClass = (status: string) => {
    const upper = status.toUpperCase();
    if (upper === 'APPROVED') return 'bg-success-bg text-success border border-success/30';
    if (upper === 'PENDING') return 'bg-warning-bg text-warning border border-warning/30';
    return 'bg-danger-bg text-danger border border-danger/30';
  };

  return (
    <div className="space-y-6">
      {/* Leave Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 shadow-card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary-subtle text-primary">
            <FileText size={20} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-secondary font-medium">{t('TEXT_TOTAL_REQUESTS')}</p>
            <p className="text-2xl font-bold text-primary">{totalRequests}</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 shadow-card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-success-bg text-success">
            <CheckCircle2 size={20} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-secondary font-medium">{t('TEXT_APPROVED_LEAVES')}</p>
            <p className="text-2xl font-bold text-primary">{approvedLeaves}</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 shadow-card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-warning-bg text-warning">
            <Clock size={20} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-secondary font-medium">{t('TEXT_PENDING_REQUESTS')}</p>
            <p className="text-2xl font-bold text-primary">{pendingLeaves}</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 shadow-card flex items-center gap-4">
          <div className="p-3 rounded-xl bg-info-bg text-info">
            <Calendar size={20} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-secondary font-medium">{t('TEXT_LEAVE_BALANCE')}</p>
            <p className="text-2xl font-bold text-primary">
              {leaveBalance} <span className="text-xs font-normal text-secondary">{t('TEXT_DAYS_AVAILABLE')}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Leave Requests Table Card */}
      <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-card">
          <div>
            <h2 className="text-lg font-bold text-primary">{t('TEXT_TIME_OFF_REQUESTS')}</h2>
            <p className="text-xs text-secondary mt-0.5">{t('TEXT_LEAVE_HISTORY_IS_DELIVERED_AS_PART_OF_TH_EA5A742B')}</p>
          </div>
          <button
            type="button"
            onClick={openLeaveModal}
            className="min-h-11 min-w-36 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
            data-testid="trainer_schedule-schedule-leave_requests_request_leave"
          >
            <Plus size={18} strokeWidth={2} aria-hidden="true" />
            {t('TEXT_REQUEST_LEAVE')}
          </button>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-highlight">
              <tr data-testid="trainer_schedule-TrainerScheduleLeaveRequests-row-1">
                {TRAINER_SCHEDULE_LEAVE_TABLE_HEADERS.map(([labelKey]) => (
                  <th key={labelKey} scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                    {t(labelKey)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leaveRequests.length === 0 ? (
                <tr data-testid="trainer_schedule-TrainerScheduleLeaveRequests-row-2">
                  <td colSpan={TRAINER_SCHEDULE_LEAVE_TABLE_COLUMN_COUNT} className="p-0 border-b-0">
                    <TrainerScheduleEmptyState />
                  </td>
                </tr>
              ) : (
                leaveRequests.map((leave) => {
                  const expanded = expandedId === leave.id;
                  const statusBadgeClass = getStatusBadgeClass(leave.status);
                  return (
                    <tr
                      key={leave.id}
                      data-testid={`trainer_schedule-schedule-leave-request-row-${leave.id}`}
                      tabIndex={0}
                      aria-expanded={expanded}
                      aria-controls={`trainer-schedule-leave-details-${leave.id}`}
                      onClick={() => setExpandedId((current) => current === leave.id ? null : leave.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setExpandedId((current) => current === leave.id ? null : leave.id);
                        }
                      }}
                      className="cursor-pointer hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring motion-safe:transition-colors motion-safe:duration-base"
                    >
                      <td className="px-4 py-4 text-xs font-bold text-primary whitespace-nowrap">{leave.id}</td>
                      <td className="px-4 py-4 text-sm font-semibold text-primary whitespace-nowrap">
                        {TrainerScheduleFormatDate(leave.startDate, locale)} <span className="text-secondary font-normal mx-1">{t('TEXT_TO')}</span> {TrainerScheduleFormatDate(leave.endDate, locale)}
                      </td>
                      <td className="px-4 py-4 text-sm text-secondary max-w-xs truncate">
                        <TrainerInfrastructureTooltip content={leave.reason}>
                          <span>{leave.reason}</span>
                        </TrainerInfrastructureTooltip>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}`} data-testid={`trainer_schedule-leave-requests-status-state-${leave.id}`}>
                          {getStatusLabel(leave.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-secondary whitespace-nowrap">{TrainerScheduleFormatDate(leave.createdAt, locale)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="cursor-pointer md:hidden space-y-3 p-3">
          {leaveRequests.length === 0 ? (
            <TrainerScheduleEmptyState />
          ) : (
            leaveRequests.map((leave) => {
              const statusBadgeClass = getStatusBadgeClass(leave.status);
              return (
                <article key={leave.id} className="bg-card rounded-xl border border-border p-4 shadow-card" data-testid={`trainer_schedule-leave-requests_card${leave.id}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-primary truncate">{leave.id}</h3>
                      <p className="text-xs text-secondary">{t('TEXT_ID')}</p>
                    </div>
                    <span className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}`} data-testid={`trainer_schedule-leave-requests-status-state-mobile-${leave.id}`}>
                      {getStatusLabel(leave.status)}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3 text-sm">
                    <p>
                      <span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_DATE_RANGE')}</span>
                      <span className="text-primary">
                        {TrainerScheduleFormatDate(leave.startDate, locale)} <span className="text-secondary">{t('TEXT_TO')}</span> {TrainerScheduleFormatDate(leave.endDate, locale)}
                      </span>
                    </p>
                    <p>
                      <span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_REASON')}</span>
                      <TrainerInfrastructureTooltip content={leave.reason}>
                        <span className="text-primary">{leave.reason}</span>
                      </TrainerInfrastructureTooltip>
                    </p>
                    <p>
                      <span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_REQUESTED_ON')}</span>
                      <span className="text-primary">{TrainerScheduleFormatDate(leave.createdAt, locale)}</span>
                    </p>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
