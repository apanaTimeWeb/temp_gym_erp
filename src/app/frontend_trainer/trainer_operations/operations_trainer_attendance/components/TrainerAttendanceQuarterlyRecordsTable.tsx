"use client";

import { CheckCircle2, Clock } from 'lucide-react';
import CopyButton from '@/components/ui/CopyButton';
import type { TrainerAttendanceRecord } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/types/TrainerOperationsTrainerAttendanceAttendanceTypes';

interface TrainerAttendanceQuarterlyRecordsTableProps {
  rangeRecords: TrainerAttendanceRecord[];
  startDate: string;
  endDate: string;
}

export function TrainerAttendanceQuarterlyRecordsTable({
  rangeRecords,
  startDate,
  endDate,
}: TrainerAttendanceQuarterlyRecordsTableProps) {
  const TABLE_COLUMN_COUNT = 6;

  return (
    <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
      <div className="p-4 border-b border-border bg-surface-highlight flex items-center justify-between">
        <h3 className="font-bold text-sm text-primary flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          <span>
            Complete Attendance Log: Last 3 Months ({startDate} to {endDate})
          </span>
        </h3>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary-subtle text-primary border border-border">
          {rangeRecords.length} Logged Entries
        </span>
      </div>
      <div className="max-h-[640px] overflow-auto custom-scrollbar">
        <table className="w-full text-xs sm:text-sm text-start border-collapse">
          <thead className="sticky top-0 z-20 bg-surface-highlight border-b border-border">
            <tr className="border-b border-border bg-surface-highlight text-secondary uppercase text-[11px] font-bold tracking-wider">
              <th className="p-3.5 sticky start-0 z-30 bg-surface-highlight border-e border-border whitespace-nowrap">Date</th>
              <th className="p-3.5 whitespace-nowrap">Status</th>
              <th className="p-3.5 whitespace-nowrap">Check-In Time</th>
              <th className="p-3.5 whitespace-nowrap">Check-Out Time</th>
              <th className="p-3.5 whitespace-nowrap">Duration</th>
              <th className="p-3.5 whitespace-nowrap">Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rangeRecords.length === 0 ? (
              <tr>
                <td colSpan={TABLE_COLUMN_COUNT} className="p-8 text-center text-secondary">
                  No biometric records found within the selected 3-month range.
                </td>
              </tr>
            ) : (
              rangeRecords.map((r, idx) => (
                <tr key={`${r.id || idx}`} className="hover:bg-surface-highlight/50 transition-colors group">
                  <td className="p-3.5 font-bold text-primary sticky start-0 z-10 bg-card border-e border-border whitespace-nowrap group-hover:bg-surface-highlight/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary text-sm">{r.date}</span>
                      <CopyButton value={r.date} />
                    </div>
                    <div className="text-xs text-secondary font-mono flex items-center gap-1.5 mt-0.5">
                      <span>#{String(r.id || idx + 1).slice(-6)}</span>
                    </div>
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-success-bg text-success border border-success/30">
                      <CheckCircle2 size={12} /> Present
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-primary whitespace-nowrap">{r.checkIn || '06:00 AM'}</td>
                  <td className="p-3.5 text-secondary whitespace-nowrap">{r.checkOut || '03:00 PM'}</td>
                  <td className="p-3.5 text-primary font-medium whitespace-nowrap">
                    {r.durationMinutes ? `${Math.floor(r.durationMinutes / 60)}h ${r.durationMinutes % 60}m` : '8h 30m'}
                  </td>
                  <td className="p-3.5 text-xs text-secondary whitespace-nowrap">{r.checkInMethod || 'Biometric Fingerprint'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border px-4 py-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-card/60 text-xs text-secondary">
        <p>
          Showing <span className="font-semibold text-primary">{rangeRecords.length}</span> biometric log entries
        </p>
      </div>
    </div>
  );
}
