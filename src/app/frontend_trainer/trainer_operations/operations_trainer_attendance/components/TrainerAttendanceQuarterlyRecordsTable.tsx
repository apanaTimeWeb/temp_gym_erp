"use client";

import { CheckCircle2, Clock } from 'lucide-react';
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
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface-highlight/50 text-secondary uppercase text-[11px] font-bold tracking-wider">
              <th className="p-3.5">Date</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Check-In Time</th>
              <th className="p-3.5">Check-Out Time</th>
              <th className="p-3.5">Duration</th>
              <th className="p-3.5">Method</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rangeRecords.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-secondary">
                  No biometric records found within the selected 3-month range.
                </td>
              </tr>
            ) : (
              rangeRecords.map((r, idx) => (
                <tr key={`${r.id || idx}`} className="hover:bg-surface-hover motion-safe:transition-colors">
                  <td className="p-3.5 font-bold text-primary">{r.date}</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-success-bg text-success border border-success/30">
                      <CheckCircle2 size={12} /> Present
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-primary">{r.checkIn || '06:00 AM'}</td>
                  <td className="p-3.5 text-secondary">{r.checkOut || '03:00 PM'}</td>
                  <td className="p-3.5 text-primary font-medium">
                    {r.durationMinutes ? `${Math.floor(r.durationMinutes / 60)}h ${r.durationMinutes % 60}m` : '8h 30m'}
                  </td>
                  <td className="p-3.5 text-xs text-secondary">{r.checkInMethod || 'Biometric Fingerprint'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
