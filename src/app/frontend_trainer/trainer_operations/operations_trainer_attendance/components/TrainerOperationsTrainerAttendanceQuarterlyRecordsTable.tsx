"use client";

import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, CheckCircle2, ChevronLeft, ChevronRight, Clock, Eye } from 'lucide-react';
import { useLocale } from 'next-intl';
import CopyButton from '@/components/ui/CopyButton';
import TrainerOperationsTrainerAttendanceQuickViewModal from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/components/TrainerOperationsTrainerAttendanceQuickViewModal';
import {
  TrainerAttendanceFormatDate,
  TrainerAttendanceFormatTime,
} from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/utils/TrainerOperationsTrainerAttendanceAttendanceDisplayFormatters';
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceTypes';

export interface TrainerOperationsTrainerAttendanceQuarterlyRecordsTableProps {
  rangeRecords: TrainerAttendanceRecord[];
  startDate: string;
  endDate: string;
}

export function TrainerOperationsTrainerAttendanceQuarterlyRecordsTable({
  rangeRecords,
  startDate,
  endDate,
}: TrainerOperationsTrainerAttendanceQuarterlyRecordsTableProps) {
  const locale = useLocale();
  const [quickViewRecord, setQuickViewRecord] = useState<TrainerAttendanceRecord | null>(null);
  const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const TABLE_COLUMN_COUNT = 6;

  const sortedRecords = useMemo(() => {
    return [...rangeRecords].sort((a, b) => {
      const cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }, [rangeRecords, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedRecords.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedRecords = sortedRecords.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);

  return (
    <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
      <div className="p-4 border-b border-border bg-surface-highlight flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h3 className="font-bold text-sm text-text-primary flex items-center gap-2">
          <span className="p-1.5 rounded-lg border border-sky-500/30 bg-sky-500/15 text-sky-500 shrink-0">
            <Clock size={15} />
          </span>
          <span>
            Complete Attendance Log: Last 3 Months ({startDate} to {endDate})
          </span>
        </h3>
        <span className="self-start sm:self-auto text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-500 border border-orange-500/30 shrink-0">
          {rangeRecords.length} Logged Entries
        </span>
      </div>
      <div className="hidden md:block max-h-[640px] overflow-y-auto overflow-x-hidden">
        <table className="w-full text-xs sm:text-sm text-start border-collapse">
          <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
            <tr className="border-b border-border bg-surface-highlight text-secondary uppercase text-[11px] font-bold tracking-wider">
              <th className="p-3 whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => {
                    setSortDirection((d) => (d === 'desc' ? 'asc' : 'desc'));
                    setCurrentPage(1);
                  }}
                  className="inline-flex items-center gap-1 hover:text-text-primary cursor-pointer"
                >
                  <span>Date</span>
                  {sortDirection === 'asc' ? <ArrowUp size={13} className="text-orange-500" /> : <ArrowDown size={13} className="text-orange-500" />}
                </button>
              </th>
              <th className="p-3 whitespace-nowrap">Status</th>
              <th className="p-3 whitespace-nowrap">Check-In</th>
              <th className="p-3 whitespace-nowrap">Check-Out</th>
              <th className="p-3 whitespace-nowrap">Duration</th>
              <th className="p-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedRecords.length === 0 ? (
              <tr>
                <td colSpan={TABLE_COLUMN_COUNT} className="p-8 text-center text-secondary">
                  No biometric records found within the selected 3-month range.
                </td>
              </tr>
            ) : (
              paginatedRecords.map((r, idx) => (
                <tr key={`${r.id || idx}`} className="hover:bg-surface-hover transition-colors group">
                  <td className="p-3 font-bold text-text-primary whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-text-primary text-sm">{TrainerAttendanceFormatDate(r.date, locale)}</span>
                      <CopyButton value={r.date} />
                    </div>
                    <div className="text-xs text-secondary font-mono flex items-center gap-1.5 mt-0.5">
                      <span>#{String(r.id || idx + 1).slice(-6)}</span>
                    </div>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 size={12} /> {r.checkIn ? 'Present' : 'Logged'}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-text-primary whitespace-nowrap">{TrainerAttendanceFormatTime(r.checkIn, locale)}</td>
                  <td className="p-3 text-secondary whitespace-nowrap">{TrainerAttendanceFormatTime(r.checkOut, locale)}</td>
                  <td className="p-3 text-text-primary font-medium whitespace-nowrap">
                    {r.durationMinutes ? `${Math.floor(r.durationMinutes / 60)}h ${r.durationMinutes % 60}m` : '—'}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setQuickViewRecord(r)}
                      className="min-w-9 min-h-9 inline-flex items-center justify-center p-1.5 rounded-xl border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300 hover:bg-sky-500 hover:text-white motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                      aria-label={`View attendance details for ${r.date}`}
                      title="View full attendance details"
                    >
                      <Eye size={16} strokeWidth={2.2} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="md:hidden p-3 space-y-3">
        {sortedRecords.length === 0 ? (
          <p className="p-6 text-center text-sm text-secondary">
            No biometric records found within the selected 3-month range.
          </p>
        ) : (
          paginatedRecords.map((r, idx) => (
            <article key={`mobile-${r.id || idx}`} className="rounded-xl border border-border bg-card p-4 shadow-card space-y-2.5 text-xs">
              <div className="flex items-center justify-between gap-2 border-b border-border pb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-bold text-text-primary text-sm">{TrainerAttendanceFormatDate(r.date, locale)}</span>
                  <CopyButton value={r.date} />
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 shrink-0">
                  <CheckCircle2 size={12} /> {r.checkIn ? 'Present' : 'Logged'}
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-2">
                <div><dt className="text-secondary uppercase text-[10px]">Check-In</dt><dd className="font-semibold text-text-primary">{TrainerAttendanceFormatTime(r.checkIn, locale)}</dd></div>
                <div><dt className="text-secondary uppercase text-[10px]">Check-Out</dt><dd className="text-secondary">{TrainerAttendanceFormatTime(r.checkOut, locale)}</dd></div>
                <div><dt className="text-secondary uppercase text-[10px]">Duration</dt><dd className="font-medium text-text-primary">{r.durationMinutes ? `${Math.floor(r.durationMinutes / 60)}h ${r.durationMinutes % 60}m` : '—'}</dd></div>
                <div className="flex items-end justify-end"><button type="button" onClick={() => setQuickViewRecord(r)} className="min-h-9 inline-flex items-center gap-1 rounded-xl border border-sky-500/35 bg-sky-500/15 text-sky-600 dark:text-sky-300 font-semibold px-3 text-xs"><Eye size={14} />View</button></div>
              </dl>
            </article>
          ))
        )}
      </div>
      <div className="border-t border-border px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-card text-xs text-secondary">
        <p>
          Showing <span className="font-semibold text-text-primary">{sortedRecords.length === 0 ? 0 : (safePage - 1) * itemsPerPage + 1}</span>–<span className="font-semibold text-text-primary">{Math.min(safePage * itemsPerPage, sortedRecords.length)}</span> of <span className="font-semibold text-text-primary">{sortedRecords.length}</span> biometric log entries
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
      <TrainerOperationsTrainerAttendanceQuickViewModal
        record={quickViewRecord}
        onClose={() => setQuickViewRecord(null)}
      />
    </div>
  );
}

export const TrainerAttendanceQuarterlyRecordsTable = TrainerOperationsTrainerAttendanceQuarterlyRecordsTable;
export type TrainerAttendanceQuarterlyRecordsTableProps = TrainerOperationsTrainerAttendanceQuarterlyRecordsTableProps;
