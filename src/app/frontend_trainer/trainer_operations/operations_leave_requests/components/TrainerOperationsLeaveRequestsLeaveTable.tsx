"use client";

import { useState, useMemo } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, Calendar, ChevronLeft, ChevronRight, Eye, Plus, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import CopyButton from '@/components/ui/CopyButton';
import TrainerScheduleEmptyState from './TrainerOperationsLeaveRequestsScheduleEmptyState';
import { TrainerOperationsLeaveRequestsLeaveFilterBar } from './TrainerOperationsLeaveRequestsLeaveFilterBar';
import { TrainerOperationsLeaveRequestsLeaveMobileCard } from './TrainerOperationsLeaveRequestsLeaveMobileCard';
import TrainerOperationsLeaveRequestsQuickViewModal from './TrainerOperationsLeaveRequestsQuickViewModal';
import { TrainerScheduleFormatDate } from '../utils/TrainerOperationsLeaveRequestsScheduleFormatDate';
import type { TrainerScheduleLeaveRequest } from '../types/TrainerOperationsLeaveRequestsScheduleTypes';

export interface TrainerOperationsLeaveRequestsLeaveTableProps {
  leaveRequests: TrainerScheduleLeaveRequest[];
  openLeaveModal: () => void;
  onWithdrawLeave?: (id: string) => void | Promise<void>;
  withdrawing?: boolean;
}

export function TrainerOperationsLeaveRequestsLeaveTable({ leaveRequests, openLeaveModal, onWithdrawLeave, withdrawing }: TrainerOperationsLeaveRequestsLeaveTableProps) {
  const t = useTranslations('TRAINER_SCHEDULE');
  const locale = useLocale();

  const [quickViewLeave, setQuickViewLeave] = useState<TrainerScheduleLeaveRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'startDate' | 'days' | 'status'>('startDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    if (upper === 'APPROVED') return 'bg-success-bg text-success border border-success';
    if (upper === 'PENDING') return 'bg-warning-bg text-warning border border-warning';
    return 'bg-danger-bg text-danger border border-danger';
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
    const matches = leaveRequests.filter((leave) => {
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

    return [...matches].sort((a, b) => {
      let cmp = 0;
      if (sortField === 'startDate') {
        cmp = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      } else if (sortField === 'days') {
        cmp = calculateDays(a.startDate, a.endDate) - calculateDays(b.startDate, b.endDate);
      } else if (sortField === 'status') {
        cmp = a.status.localeCompare(b.status);
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [leaveRequests, statusFilter, typeFilter, searchQuery, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredLeaves.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedLeaves = filteredLeaves.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);
  const toggleSort = (field: 'startDate' | 'days' | 'status') => {
    if (sortField === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setCurrentPage(1);
  };

  const totalRequests = leaveRequests.length;
  const approvedCount = leaveRequests.filter((l) => l.status.toUpperCase() === 'APPROVED').length;
  const pendingCount = leaveRequests.filter((l) => l.status.toUpperCase() === 'PENDING').length;
  const rejectedCount = leaveRequests.filter((l) => l.status.toUpperCase() === 'REJECTED').length;
  const hasActiveFilters = statusFilter !== 'ALL' || typeFilter !== 'ALL' || searchQuery.trim() !== '';
  const TABLE_COLUMN_COUNT = 6;

  return (
    <div className="bg-card rounded-2xl border border-border shadow-card overflow-hidden">
      {/* Table Top Header Bar */}
      <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-header">
        <div>
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
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
      <TrainerOperationsLeaveRequestsLeaveFilterBar
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
      <div className="hidden md:block max-h-[640px] overflow-y-auto overflow-x-hidden">
        <table className="w-full text-start border-collapse">
          <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
            <tr className="bg-surface-highlight border-b border-border" data-testid="trainer_schedule-TrainerScheduleLeaveRequests-row-1">
              <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-3 py-3 whitespace-nowrap">{t('TEXT_ID')}</th>
              <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-3 py-3 whitespace-nowrap">{t('TEXT_LEAVE_TYPE_LABEL')}</th>
              <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-3 py-3 whitespace-nowrap">
                <button type="button" onClick={() => toggleSort('startDate')} className="inline-flex items-center gap-1 hover:text-text-primary cursor-pointer">
                  <span>{t('TEXT_DATE_RANGE')}</span>
                  {sortField === 'startDate' ? (sortDir === 'asc' ? <ArrowUp size={13} className="text-orange-500" /> : <ArrowDown size={13} className="text-orange-500" />) : <ArrowUpDown size={13} className="opacity-50" />}
                </button>
              </th>
              <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-3 py-3 whitespace-nowrap">
                <button type="button" onClick={() => toggleSort('days')} className="inline-flex items-center gap-1 hover:text-text-primary cursor-pointer">
                  <span>{t('TEXT_DAYS')}</span>
                  {sortField === 'days' ? (sortDir === 'asc' ? <ArrowUp size={13} className="text-orange-500" /> : <ArrowDown size={13} className="text-orange-500" />) : <ArrowUpDown size={13} className="opacity-50" />}
                </button>
              </th>
              <th scope="col" className="text-start text-xs font-bold text-secondary uppercase tracking-wider px-3 py-3 whitespace-nowrap">
                <button type="button" onClick={() => toggleSort('status')} className="inline-flex items-center gap-1 hover:text-text-primary cursor-pointer">
                  <span>{t('TEXT_STATUS')}</span>
                  {sortField === 'status' ? (sortDir === 'asc' ? <ArrowUp size={13} className="text-orange-500" /> : <ArrowDown size={13} className="text-orange-500" />) : <ArrowUpDown size={13} className="opacity-50" />}
                </button>
              </th>
              <th scope="col" className="text-center text-xs font-bold text-secondary uppercase tracking-wider px-3 py-3 whitespace-nowrap">{t('TEXT_ACTIONS')}</th>
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
              paginatedLeaves.map((leave) => {
                const statusBadgeClass = getStatusBadgeClass(leave.status);
                const daysCount = calculateDays(leave.startDate, leave.endDate);
                return (
                  <tr
                    key={leave.id}
                    data-testid={`trainer_schedule-schedule-leave-request-row-${leave.id}`}
                    className="hover:bg-surface-hover transition-colors group"
                  >
                    <td className="px-3 py-3.5 text-xs font-bold text-text-primary whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-text-primary text-sm font-mono">{leave.id}</span>
                        <CopyButton value={leave.id} />
                      </div>
                    </td>
                    <td className="px-3 py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-input text-text-primary border border-border">
                        {getLeaveTypeLabel(leave.leaveType)}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-sm font-semibold text-text-primary whitespace-nowrap">
                      {TrainerScheduleFormatDate(leave.startDate, locale)} <span className="text-secondary font-normal mx-1">{t('TEXT_TO')}</span> {TrainerScheduleFormatDate(leave.endDate, locale)}
                    </td>
                    <td className="px-3 py-3.5 text-sm text-secondary whitespace-nowrap">
                      {daysCount} {daysCount === 1 ? t('TEXT_DAY') : t('TEXT_DAYS')}
                    </td>
                    <td className="px-3 py-3.5 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusBadgeClass}`} data-testid={`trainer_schedule-leave-requests-status-state-${leave.id}`}>
                        {getStatusLabel(leave.status)}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-center whitespace-nowrap">
                      <div className="inline-flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setQuickViewLeave(leave)}
                          aria-label={`View leave request ${leave.id}`}
                          title="View leave details"
                          className="min-w-9 min-h-9 inline-flex items-center justify-center p-1.5 rounded-xl border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300 hover:bg-sky-500 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                          data-testid={`trainer_schedule-leave-view-${leave.id}`}
                        >
                          <Eye size={16} strokeWidth={2.2} />
                        </button>
                        {onWithdrawLeave && leave.status.toUpperCase() === 'PENDING' && (
                          <button
                            type="button"
                            disabled={withdrawing}
                            onClick={() => void onWithdrawLeave(leave.id)}
                            aria-label={`Withdraw leave request ${leave.id}`}
                            title="Withdraw pending leave request"
                            className="min-w-9 min-h-9 inline-flex items-center justify-center p-1.5 rounded-xl border border-rose-500/35 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 disabled:opacity-50 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                            data-testid={`trainer_schedule-leave-withdraw-${leave.id}`}
                          >
                            <Trash2 size={15} strokeWidth={2} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
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
          paginatedLeaves.map((leave) => {
            const statusBadgeClass = getStatusBadgeClass(leave.status);
            const daysCount = calculateDays(leave.startDate, leave.endDate);
            return (
              <div key={leave.id} className="space-y-2">
                <TrainerOperationsLeaveRequestsLeaveMobileCard
                  leave={leave}
                  statusBadgeClass={statusBadgeClass}
                  statusLabel={getStatusLabel(leave.status)}
                  leaveTypeLabel={getLeaveTypeLabel(leave.leaveType)}
                  daysCount={daysCount}
                />
                <div className="flex justify-end gap-2">
                  {onWithdrawLeave && leave.status.toUpperCase() === 'PENDING' && (
                    <button type="button" disabled={withdrawing} onClick={() => void onWithdrawLeave(leave.id)} className="min-h-9 inline-flex items-center gap-1.5 rounded-xl border border-rose-500/35 bg-rose-500/10 text-rose-500 px-3 text-xs font-semibold disabled:opacity-50">
                      <Trash2 size={14} /> Withdraw
                    </button>
                  )}
                  <button type="button" onClick={() => setQuickViewLeave(leave)} className="min-h-9 inline-flex items-center gap-1.5 rounded-xl border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300 px-3 text-xs font-semibold">
                    <Eye size={14} /> View Full Details
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* In-Card Bottom-Pinned Footer Summary & Pagination */}
      <div className="border-t border-border px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-card text-xs text-secondary">
        <p>
          Showing <span className="font-semibold text-text-primary">{filteredLeaves.length === 0 ? 0 : (safePage - 1) * itemsPerPage + 1}</span>–<span className="font-semibold text-text-primary">{Math.min(safePage * itemsPerPage, filteredLeaves.length)}</span> of <span className="font-semibold text-text-primary">{filteredLeaves.length}</span> leave requests ({totalRequests} total)
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="min-h-9 inline-flex items-center gap-1 rounded-lg border border-border bg-input px-2.5 py-1 text-xs font-semibold text-text-primary disabled:opacity-40 hover:bg-surface-hover cursor-pointer"
            >
              <ChevronLeft size={14} /> Prev
            </button>
            <span className="text-xs font-medium text-text-primary">Page {safePage} / {totalPages}</span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="min-h-9 inline-flex items-center gap-1 rounded-lg border border-border bg-input px-2.5 py-1 text-xs font-semibold text-text-primary disabled:opacity-40 hover:bg-surface-hover cursor-pointer"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      <TrainerOperationsLeaveRequestsQuickViewModal
        leave={quickViewLeave}
        onClose={() => setQuickViewLeave(null)}
        getStatusLabel={getStatusLabel}
        getStatusBadgeClass={getStatusBadgeClass}
        getLeaveTypeLabel={getLeaveTypeLabel}
        calculateDays={calculateDays}
      />
    </div>
  );
}

export const TrainerLeaveTable = TrainerOperationsLeaveRequestsLeaveTable;
export type TrainerLeaveTableProps = TrainerOperationsLeaveRequestsLeaveTableProps;
