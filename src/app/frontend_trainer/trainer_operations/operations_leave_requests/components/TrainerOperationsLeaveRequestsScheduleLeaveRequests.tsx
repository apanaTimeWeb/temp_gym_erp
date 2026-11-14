"use client";
// RESPONSIBILITY: Renders the Schedule leave-request history as an accessible desktop table and mobile card stack; mutation ownership remains in Schedule query state.
// DATA FLOW: TanStack Query schedule response → leave rows/cards → feature-owned modal or local expansion.
import { useState, useMemo, Fragment } from 'react';
import { Calendar, CheckCircle2, Clock, FileText, Loader2, Plus, ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import TrainerInfrastructureTooltip from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/components/TrainerOperationsLeaveRequestsTrainerInfrastructureTooltip';
import TrainerScheduleEmptyState from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/components/TrainerOperationsLeaveRequestsScheduleEmptyState';
import TrainerScheduleLoadingSkeleton from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/components/TrainerOperationsLeaveRequestsScheduleLoadingSkeleton';
import { useTrainerScheduleQuery } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/hooks/useTrainerOperationsLeaveRequestsScheduleQuery';
import { useTrainerScheduleStore } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/state/useTrainerOperationsLeaveRequestsScheduleStore';
import { TrainerScheduleFormatDate } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/utils/TrainerOperationsLeaveRequestsScheduleFormatDate';

export default function TrainerScheduleLeaveRequests() {
  const t = useTranslations('TRAINER_SCHEDULE');
  const locale = useLocale();
  const { data, isPending, isError, isFetching, refetch } = useTrainerScheduleQuery();
  const openLeaveModal = useTrainerScheduleStore((state) => state.openLeaveModal);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const calculateDays = (start: string, end: string) => {
    try {
      const s = new Date(start);
      const e = new Date(end);
      const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(1, diff);
    } catch {
      return 1;
    }
  };

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

  const getLeaveTypeLabel = (type: string) => {
    if (type === 'Sick Leave') return t('TEXT_SICK_LEAVE');
    if (type === 'Casual Leave') return t('TEXT_CASUAL_LEAVE');
    if (type === 'Emergency') return t('TEXT_EMERGENCY_LEAVE');
    if (type === 'Personal') return t('TEXT_PERSONAL_LEAVE');
    if (type === 'Other') return t('TEXT_OTHER_LEAVE');
    return type;
  };

  const leaveRequests = useMemo(() => data?.leaves ?? [], [data?.leaves]);
  const totalRequests = leaveRequests.length;
  const approvedLeaves = useMemo(() => leaveRequests.filter((l) => l.status.toUpperCase() === 'APPROVED').length, [leaveRequests]);
  const pendingLeaves = useMemo(() => leaveRequests.filter((l) => l.status.toUpperCase() === 'PENDING').length, [leaveRequests]);
  const rejectedLeaves = useMemo(() => leaveRequests.filter((l) => l.status.toUpperCase() === 'REJECTED').length, [leaveRequests]);
  const leaveBalance = Math.max(0, 15 - approvedLeaves);

  // Filtered leaves according to status and search query
  const filteredLeaves = useMemo(() => {
    return leaveRequests.filter((leave) => {
      if (statusFilter !== 'ALL' && leave.status.toUpperCase() !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesReason = leave.reason?.toLowerCase().includes(q);
        const matchesId = leave.id?.toLowerCase().includes(q);
        const matchesType = leave.leaveType?.toLowerCase().includes(q);
        if (!matchesReason && !matchesId && !matchesType) return false;
      }
      return true;
    });
  }, [leaveRequests, statusFilter, searchQuery]);

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

  return (
    <div className="space-y-6">
      {/* Leave Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-md motion-safe:transition-all flex items-center gap-4 border-l-4 border-l-primary">
          <div className="p-3.5 rounded-xl bg-primary/10 text-primary shrink-0">
            <FileText size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{t('TEXT_TOTAL_REQUESTS')}</p>
            <p className="text-2xl font-bold text-primary mt-0.5">{totalRequests}</p>
            <p className="text-2xs text-secondary mt-0.5">All-time submissions</p>
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-md motion-safe:transition-all flex items-center gap-4 border-l-4 border-l-success">
          <div className="p-3.5 rounded-xl bg-success/10 text-success shrink-0">
            <CheckCircle2 size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{t('TEXT_APPROVED_LEAVES')}</p>
            <p className="text-2xl font-bold text-success mt-0.5">{approvedLeaves}</p>
            <p className="text-2xs text-secondary mt-0.5">Authorized by manager</p>
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-md motion-safe:transition-all flex items-center gap-4 border-l-4 border-l-warning">
          <div className="p-3.5 rounded-xl bg-warning/10 text-warning shrink-0">
            <Clock size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{t('TEXT_PENDING_REQUESTS')}</p>
            <p className="text-2xl font-bold text-warning mt-0.5">{pendingLeaves}</p>
            <p className="text-2xs text-secondary mt-0.5">Awaiting manager review</p>
          </div>
        </div>
        <div className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-md motion-safe:transition-all flex items-center gap-4 border-l-4 border-l-info">
          <div className="p-3.5 rounded-xl bg-info/10 text-info shrink-0">
            <Calendar size={22} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs text-secondary font-semibold uppercase tracking-wider">{t('TEXT_LEAVE_BALANCE')}</p>
            <p className="text-2xl font-bold text-primary mt-0.5">
              {leaveBalance} <span className="text-xs font-normal text-secondary">{t('TEXT_DAYS_AVAILABLE')}</span>
            </p>
            <p className="text-2xs text-secondary mt-0.5">Annual paid allowance (15d)</p>
          </div>
        </div>
      </div>

      {/* Main Leave Requests Table Card */}
      <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
        {/* Table Top Header Bar */}
        <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-header">
          <div>
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              {t('TEXT_TIME_OFF_REQUESTS')}
            </h2>
            <p className="text-xs text-secondary mt-0.5">{t('TEXT_LEAVE_HISTORY_IS_DELIVERED_AS_PART_OF_TH_EA5A742B')}</p>
          </div>
          <button
            type="button"
            onClick={openLeaveModal}
            className="min-h-11 min-w-36 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-on-primary text-sm font-bold rounded-xl hover:bg-primary-hover shadow-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
            data-testid="trainer_schedule-schedule-leave_requests_request_leave"
          >
            <Plus size={18} strokeWidth={2} aria-hidden="true" />
            {t('TEXT_REQUEST_LEAVE')}
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 border-b border-border/80 bg-surface-highlight/30 flex flex-wrap items-center justify-between gap-3">
          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-all ${
                statusFilter === 'ALL'
                  ? 'bg-primary text-on-primary border-focus shadow-sm'
                  : 'bg-input text-secondary border-border hover:border-focus hover:text-primary'
              }`}
            >
              {t('TEXT_ALL')} ({totalRequests})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('PENDING')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-all ${
                statusFilter === 'PENDING'
                  ? 'bg-warning-bg text-warning border-warning shadow-sm font-bold'
                  : 'bg-input text-secondary border-border hover:border-warning/50 hover:text-warning'
              }`}
            >
              {t('TEXT_STATUS_PENDING')} ({pendingLeaves})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('APPROVED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-all ${
                statusFilter === 'APPROVED'
                  ? 'bg-success-bg text-success border-success shadow-sm font-bold'
                  : 'bg-input text-secondary border-border hover:border-success/50 hover:text-success'
              }`}
            >
              {t('TEXT_STATUS_APPROVED')} ({approvedLeaves})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('REJECTED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border motion-safe:transition-all ${
                statusFilter === 'REJECTED'
                  ? 'bg-danger-bg text-danger border-danger shadow-sm font-bold'
                  : 'bg-input text-secondary border-border hover:border-danger/50 hover:text-danger'
              }`}
            >
              {t('TEXT_STATUS_REJECTED')} ({rejectedLeaves})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px] max-w-xs flex-1 sm:flex-initial">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('TEXT_SEARCH_LEAVES')}
              className="w-full pl-8 pr-8 py-1.5 bg-input border border-border rounded-lg text-xs text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-0.5"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Desktop View Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-highlight">
              <tr data-testid="trainer_schedule-TrainerScheduleLeaveRequests-row-1">
                <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                  {t('TEXT_ID')}
                </th>
                <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                  {t('TEXT_LEAVE_TYPE_LABEL')}
                </th>
                <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                  {t('TEXT_DATE_RANGE')}
                </th>
                <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                  {t('TEXT_REASON')}
                </th>
                <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                  {t('TEXT_STATUS')}
                </th>
                <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                  {t('TEXT_REQUESTED_ON')}
                </th>
                <th scope="col" className="text-center text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                  {t('TEXT_DETAILS')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeaves.length === 0 ? (
                <tr data-testid="trainer_schedule-TrainerScheduleLeaveRequests-row-2">
                  <td colSpan={7} className="p-0 border-b-0">
                    {leaveRequests.length === 0 ? (
                      <TrainerScheduleEmptyState />
                    ) : (
                      <div className="p-8 text-center space-y-2">
                        <p className="text-sm text-secondary">{t('TEXT_NO_MATCHING_LEAVES')}</p>
                        <button
                          type="button"
                          onClick={() => { setStatusFilter('ALL'); setSearchQuery(''); }}
                          className="text-xs text-primary font-semibold hover:underline"
                        >
                          {t('TEXT_CLEAR_FILTERS')}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                filteredLeaves.map((leave) => {
                  const expanded = expandedId === leave.id;
                  const statusBadgeClass = getStatusBadgeClass(leave.status);
                  const daysCount = calculateDays(leave.startDate, leave.endDate);
                  return (
                    <Fragment key={leave.id}>
                      <tr
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
                        className={`cursor-pointer hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus-ring motion-safe:transition-colors motion-safe:duration-base ${
                          expanded ? 'bg-primary-subtle border-l-4 border-l-primary' : ''
                        }`}
                      >
                        <td className="px-4 py-4 text-xs font-bold text-primary whitespace-nowrap">{leave.id}</td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-input text-primary border border-border">
                            {getLeaveTypeLabel(leave.leaveType)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold text-primary whitespace-nowrap">
                          {TrainerScheduleFormatDate(leave.startDate, locale)} <span className="text-secondary font-normal mx-1">{t('TEXT_TO')}</span> {TrainerScheduleFormatDate(leave.endDate, locale)}
                          <span className="ml-2 text-xs font-normal text-secondary">
                            ({daysCount} {daysCount === 1 ? t('TEXT_DAY') : t('TEXT_DAYS')})
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-secondary max-w-xs truncate">
                          <TrainerInfrastructureTooltip content={leave.reason}>
                            <span className="truncate block">{leave.reason}</span>
                          </TrainerInfrastructureTooltip>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}`} data-testid={`trainer_schedule-leave-requests-status-state-${leave.id}`}>
                            {getStatusLabel(leave.status)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-xs text-secondary whitespace-nowrap">{TrainerScheduleFormatDate(leave.createdAt, locale)}</td>
                        <td className="px-4 py-4 text-center whitespace-nowrap">
                          <button
                            type="button"
                            aria-label={expanded ? t('TEXT_COLLAPSE') : t('TEXT_EXPAND')}
                            className="p-1 rounded-lg hover:bg-input text-secondary hover:text-primary motion-safe:transition-colors"
                          >
                            {expanded ? <ChevronUp size={16} strokeWidth={2.5} /> : <ChevronDown size={16} strokeWidth={2.5} />}
                          </button>
                        </td>
                      </tr>

                      {/* Inline Expandable Details Row right below clicked row */}
                      {expanded && (
                        <tr className="bg-primary/5 border-b border-primary/20">
                          <td colSpan={7} className="p-0">
                            <div
                              id={`trainer-schedule-leave-details-${leave.id}`}
                              className="p-5 border-l-4 border-l-primary bg-card/70 space-y-4 shadow-inner"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-primary">{leave.id}</span>
                                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-input text-primary border border-border">
                                    {getLeaveTypeLabel(leave.leaveType)}
                                  </span>
                                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusBadgeClass}`}>
                                    {getStatusLabel(leave.status)}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedId(null);
                                  }}
                                  className="text-xs text-secondary hover:text-primary p-1 rounded hover:bg-input"
                                >
                                  {t('TEXT_COLLAPSE')}
                                </button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs">
                                <div className="p-3 rounded-xl bg-input/40 border border-border">
                                  <span className="font-semibold text-secondary uppercase block mb-1">{t('TEXT_DATE_RANGE')}</span>
                                  <p className="text-sm font-bold text-primary">
                                    {TrainerScheduleFormatDate(leave.startDate, locale)} {t('TEXT_TO')} {TrainerScheduleFormatDate(leave.endDate, locale)}
                                    <span className="text-secondary ml-1.5 font-normal text-xs">({daysCount} {daysCount === 1 ? t('TEXT_DAY') : t('TEXT_DAYS')})</span>
                                  </p>
                                </div>
                                <div className="p-3 rounded-xl bg-input/40 border border-border">
                                  <span className="font-semibold text-secondary uppercase block mb-1">{t('TEXT_REASON')}</span>
                                  <p className="text-sm text-primary font-medium">{leave.reason}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-input/40 border border-border">
                                  <span className="font-semibold text-secondary uppercase block mb-1">{t('TEXT_MANAGER_NOTES')}</span>
                                  <p className="text-sm text-secondary italic">
                                    {leave.managerNotes || t('TEXT_NO_MANAGER_NOTES')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View Card Stack */}
        <div className="cursor-pointer md:hidden space-y-3 p-3">
          {filteredLeaves.length === 0 ? (
            leaveRequests.length === 0 ? (
              <TrainerScheduleEmptyState />
            ) : (
              <div className="p-6 text-center space-y-2">
                <p className="text-sm text-secondary">{t('TEXT_NO_MATCHING_LEAVES')}</p>
                <button
                  type="button"
                  onClick={() => { setStatusFilter('ALL'); setSearchQuery(''); }}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  {t('TEXT_CLEAR_FILTERS')}
                </button>
              </div>
            )
          ) : (
            filteredLeaves.map((leave) => {
              const statusBadgeClass = getStatusBadgeClass(leave.status);
              const daysCount = calculateDays(leave.startDate, leave.endDate);
              return (
                <article key={leave.id} className="bg-card rounded-xl border border-border p-4 shadow-card space-y-3" data-testid={`trainer_schedule-leave-requests_card${leave.id}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-primary truncate">{leave.id}</h3>
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-input text-primary border border-border">
                          {getLeaveTypeLabel(leave.leaveType)}
                        </span>
                      </div>
                      <p className="text-xs text-secondary mt-0.5">{t('TEXT_REQUESTED_ON')}: {TrainerScheduleFormatDate(leave.createdAt, locale)}</p>
                    </div>
                    <span className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}`} data-testid={`trainer_schedule-leave-requests-status-state-mobile-${leave.id}`}>
                      {getStatusLabel(leave.status)}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm pt-1 border-t border-border/60">
                    <div>
                      <span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_DATE_RANGE')}</span>
                      <span className="text-primary font-medium">
                        {TrainerScheduleFormatDate(leave.startDate, locale)} <span className="text-secondary">{t('TEXT_TO')}</span> {TrainerScheduleFormatDate(leave.endDate, locale)}
                        <span className="text-secondary ml-1 text-xs font-normal">({daysCount} {daysCount === 1 ? t('TEXT_DAY') : t('TEXT_DAYS')})</span>
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_REASON')}</span>
                      <TrainerInfrastructureTooltip content={leave.reason}>
                        <span className="text-primary">{leave.reason}</span>
                      </TrainerInfrastructureTooltip>
                    </div>
                    {leave.managerNotes && (
                      <div>
                        <span className="block text-xs font-semibold text-secondary uppercase">{t('TEXT_MANAGER_NOTES')}</span>
                        <span className="text-secondary italic text-xs">{leave.managerNotes}</span>
                      </div>
                    )}
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
