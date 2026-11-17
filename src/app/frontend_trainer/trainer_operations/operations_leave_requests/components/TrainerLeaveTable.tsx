"use client";

import { useState, useMemo, Fragment } from 'react';
import { Calendar, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import TrainerInfrastructureTooltip from './TrainerOperationsLeaveRequestsTrainerInfrastructureTooltip';
import TrainerScheduleEmptyState from './TrainerOperationsLeaveRequestsScheduleEmptyState';
import { TrainerLeaveFilterBar } from './TrainerLeaveFilterBar';
import { TrainerLeaveMobileCard } from './TrainerLeaveMobileCard';
import { TrainerLeaveExpandedDetails } from './TrainerLeaveExpandedDetails';
import { TrainerScheduleFormatDate } from '../utils/TrainerOperationsLeaveRequestsScheduleFormatDate';
import type { TrainerScheduleLeaveRequest } from '../types/TrainerOperationsLeaveRequestsScheduleTypes';

interface TrainerLeaveTableProps {
  leaveRequests: TrainerScheduleLeaveRequest[];
  openLeaveModal: () => void;
}

export function TrainerLeaveTable({ leaveRequests, openLeaveModal }: TrainerLeaveTableProps) {
  const t = useTranslations('TRAINER_SCHEDULE');
  const locale = useLocale();

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
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

  const filteredLeaves = useMemo(() => {
    return leaveRequests.filter((leave) => {
      if (statusFilter !== 'ALL' && leave.status.toUpperCase() !== statusFilter) {
        return false;
      }
      if (typeFilter !== 'ALL' && leave.leaveType !== typeFilter) {
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
  }, [leaveRequests, statusFilter, typeFilter, searchQuery]);

  const totalRequests = leaveRequests.length;
  const approvedCount = leaveRequests.filter((l) => l.status.toUpperCase() === 'APPROVED').length;
  const pendingCount = leaveRequests.filter((l) => l.status.toUpperCase() === 'PENDING').length;
  const rejectedCount = leaveRequests.filter((l) => l.status.toUpperCase() === 'REJECTED').length;
  const hasActiveFilters = statusFilter !== 'ALL' || typeFilter !== 'ALL' || searchQuery.trim() !== '';
  const TABLE_COLUMN_COUNT = 7;

  return (
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
          className="min-h-11 min-w-36 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-on-primary text-sm font-bold rounded-xl hover:bg-primary-hover shadow-sm motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:active:scale-95"
          data-testid="trainer_schedule-schedule-leave_requests_request_leave"
        >
          <Plus size={18} strokeWidth={2} aria-hidden="true" />
          {t('TEXT_REQUEST_LEAVE')}
        </button>
      </div>

      {/* Filter and Search Bar */}
      <TrainerLeaveFilterBar
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalRequests={totalRequests}
        approvedCount={approvedCount}
        pendingCount={pendingCount}
        rejectedCount={rejectedCount}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={() => {
          setStatusFilter('ALL');
          setTypeFilter('ALL');
          setSearchQuery('');
        }}
      />

      {/* Desktop Table View */}
      <div className="hidden md:block max-h-[640px] overflow-auto custom-scrollbar">
        <table className="w-full text-start border-collapse">
          <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
            <tr className="bg-surface-highlight border-b border-border" data-testid="trainer_schedule-TrainerScheduleLeaveRequests-row-1">
              <th scope="col" className="sticky start-0 z-30 bg-surface-highlight border-e border-border text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">{t('TEXT_ID')}</th>
              <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">{t('TEXT_LEAVE_TYPE_LABEL')}</th>
              <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">{t('TEXT_DATE_RANGE')}</th>
              <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">{t('TEXT_REASON')}</th>
              <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">{t('TEXT_STATUS')}</th>
              <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">{t('TEXT_REQUESTED_ON')}</th>
              <th scope="col" className="text-center text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">{t('TEXT_DETAILS')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredLeaves.length === 0 ? (
              <tr data-testid="trainer_schedule-TrainerScheduleLeaveRequests-row-2">
                <td colSpan={TABLE_COLUMN_COUNT} className="p-0 border-b-0">
                  {leaveRequests.length === 0 ? (
                    <TrainerScheduleEmptyState />
                  ) : (
                    <div className="p-8 text-center space-y-2">
                      <p className="text-sm text-secondary">{t('TEXT_NO_MATCHING_LEAVES')}</p>
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
                      onClick={() => setExpandedId((curr) => (curr === leave.id ? null : leave.id))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setExpandedId((curr) => (curr === leave.id ? null : leave.id));
                        }
                      }}
                      className={`cursor-pointer hover:bg-surface-highlight/50 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-colors ${
                        expanded ? 'bg-primary-subtle border-l-4 border-l-primary' : ''
                      }`}
                    >
                      <td className="sticky start-0 z-10 bg-card border-e border-border px-4 py-4 text-xs font-bold text-primary whitespace-nowrap group-hover:bg-surface-highlight/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary text-sm font-mono">{leave.id}</span>
                          <CopyButton value={leave.id} />
                        </div>
                      </td>
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
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedId((curr) => (curr === leave.id ? null : leave.id));
                          }}
                          aria-label={expanded ? t('TEXT_COLLAPSE') : t('TEXT_EXPAND')}
                          className="p-1.5 rounded-lg hover:bg-input text-secondary hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                        >
                          {expanded ? <ChevronUp size={16} strokeWidth={2.5} /> : <ChevronDown size={16} strokeWidth={2.5} />}
                        </button>
                      </td>
                    </tr>

                    {/* Inline Expandable Details Row */}
                    {expanded && (
                      <tr className="bg-primary/5 border-b border-primary/20">
                        <td colSpan={TABLE_COLUMN_COUNT} className="p-0">
                          <TrainerLeaveExpandedDetails
                            leave={leave}
                            locale={locale}
                            daysCount={daysCount}
                            statusBadgeClass={statusBadgeClass}
                            leaveTypeLabel={getLeaveTypeLabel(leave.leaveType)}
                            statusLabel={getStatusLabel(leave.status)}
                            onClose={() => setExpandedId(null)}
                          />
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

      {/* Mobile Card Stack View */}
      <div className="cursor-pointer md:hidden space-y-3 p-3">
        {filteredLeaves.length === 0 ? (
          leaveRequests.length === 0 ? <TrainerScheduleEmptyState /> : (
            <div className="p-6 text-center text-secondary text-xs">{t('TEXT_NO_MATCHING_LEAVES')}</div>
          )
        ) : (
          filteredLeaves.map((leave) => {
            const statusBadgeClass = getStatusBadgeClass(leave.status);
            const daysCount = calculateDays(leave.startDate, leave.endDate);
            return (
              <TrainerLeaveMobileCard
                key={leave.id}
                leave={leave}
                statusBadgeClass={statusBadgeClass}
                statusLabel={getStatusLabel(leave.status)}
                leaveTypeLabel={getLeaveTypeLabel(leave.leaveType)}
                daysCount={daysCount}
              />
            );
          })
        )}
      </div>

      {/* In-Card Bottom-Pinned Footer Summary */}
      <div className="border-t border-border px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-card/60 text-xs text-secondary">
        <p>
          Showing <span className="font-semibold text-primary">{filteredLeaves.length}</span> of <span className="font-semibold text-primary">{totalRequests}</span> leave requests
        </p>
      </div>
    </div>
  );
}
