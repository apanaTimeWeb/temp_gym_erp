'use client';

import { useMemo, useState } from 'react';
import { Check, CheckCircle2, Clock, Loader2, LogOut, Search, UserCheck, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { TrainerAttendanceFormatTime } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/utils/TrainerOperationsMemberAttendanceAttendanceDisplayFormatters';
import type {
  TrainerAttendanceMemberBasic,
  TrainerAttendanceRecord,
} from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/types/TrainerOperationsMemberAttendanceAttendanceTypes';

interface QuickMarkProps {
  members: TrainerAttendanceMemberBasic[];
  records: TrainerAttendanceRecord[];
  onQuickMark: (member: TrainerAttendanceMemberBasic) => Promise<void>;
  onCheckOut: (recordId: string) => Promise<void>;
  onOpenModalWithMember: (memberId: string) => void;
  onOpenModal: () => void;
  isPending: boolean;
}

export default function TrainerOperationsMemberAttendanceQuickMark({
  members,
  records,
  onQuickMark,
  onCheckOut,
  onOpenModalWithMember,
  onOpenModal,
  isPending,
}: QuickMarkProps) {
  const locale = useLocale();
  const t = useTranslations('TRAINER_ATTENDANCE');
  const [query, setQuery] = useState('');
  const [markingId, setMarkingId] = useState<string | null>(null);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Map today's attendance records by memberId
  const todayRecordByMember = useMemo(() => {
    const map = new Map<string, TrainerAttendanceRecord>();
    records.forEach((record) => {
      if (record.date === todayStr && record.memberId) {
        map.set(String(record.memberId), record);
      }
    });
    return map;
  }, [records, todayStr]);

  // Filter members matching query
  const matchingMembers = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return members
      .filter((m) => {
        const nameMatch = m.name?.toLowerCase().includes(normalized);
        const phoneMatch = m.phone?.toLowerCase().includes(normalized);
        const idMatch = String(m.id).toLowerCase().includes(normalized);
        return nameMatch || phoneMatch || idMatch;
      })
      .slice(0, 8);
  }, [members, query]);

  const handleMarkPresent = async (member: TrainerAttendanceMemberBasic) => {
    setMarkingId(member.id);
    try {
      await onQuickMark(member);
    } finally {
      setMarkingId(null);
    }
  };

  const handleCheckOutNow = async (recordId: string) => {
    setMarkingId(recordId);
    try {
      await onCheckOut(recordId);
    } finally {
      setMarkingId(null);
    }
  };

  return (
    <section
      data-testid="trainer-attendance-quick-mark-section"
      className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-card"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary-subtle text-primary flex items-center justify-center font-bold">
            <UserCheck size={20} strokeWidth={2} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-base font-bold text-primary leading-tight">
              Quick Mark Attendance
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Search any member by name or phone to instantly mark today&apos;s check-in
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenModal}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border text-secondary hover:text-primary hover:bg-surface-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <Clock size={14} strokeWidth={2} aria-hidden="true" />
          <span>Full Form with Custom Time</span>
        </button>
      </div>

      <div className="relative">
        <Search
          size={18}
          strokeWidth={2}
          className="absolute start-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search member name or phone to mark attendance (e.g. Rahul, Priya, 9876...)"
          aria-label="Search member to mark attendance"
          data-testid="trainer-attendance-quick-mark-input"
          className="min-h-11 w-full rounded-lg border border-border bg-input ps-10 pe-10 text-sm text-primary placeholder:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute end-3 top-1/2 -translate-y-1/2 p-1 text-secondary hover:text-primary rounded-md"
          >
            <X size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Results Dropdown / Preview */}
      {query.trim().length > 0 && (
        <div
          data-testid="trainer-attendance-quick-mark-results"
          className="mt-3 divide-y divide-border rounded-lg border border-border bg-page/50 overflow-hidden"
        >
          {matchingMembers.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-sm text-secondary">
                No members found matching &ldquo;<span className="font-semibold text-primary">{query}</span>&rdquo;.
              </p>
              <button
                type="button"
                onClick={onOpenModal}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary underline"
              >
                Open manual attendance modal
              </button>
            </div>
          ) : (
            matchingMembers.map((member) => {
              const todayRecord = todayRecordByMember.get(String(member.id));
              const isCheckedIn = Boolean(todayRecord?.checkIn);
              const isCheckedOut = Boolean(todayRecord?.checkOut);
              const initial = member.name?.charAt(0).toUpperCase() || '?';
              const isCurrentlyMarking = markingId === member.id || (todayRecord && markingId === todayRecord.id);

              return (
                <div
                  key={member.id}
                  data-testid={`quick-mark-member-${member.id}`}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 hover:bg-surface-hover/70 motion-safe:transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-primary-subtle text-primary font-bold flex items-center justify-center text-sm shrink-0">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-primary truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-secondary truncate">
                        {member.phone ? `Phone: ${member.phone}` : `ID: ${member.id}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {/* Status Badge */}
                    {isCheckedOut ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-success">
                        <Check size={14} strokeWidth={2} />
                        Completed ({TrainerAttendanceFormatTime(todayRecord!.checkIn, locale)} - {TrainerAttendanceFormatTime(todayRecord!.checkOut, locale)})
                      </span>
                    ) : isCheckedIn ? (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-info-bg text-info">
                          <span className="w-2 h-2 rounded-full bg-info motion-safe:animate-pulse" />
                          Checked In at {TrainerAttendanceFormatTime(todayRecord!.checkIn, locale)}
                        </span>
                        <button
                          type="button"
                          onClick={() => void handleCheckOutNow(todayRecord!.id)}
                          disabled={isCurrentlyMarking || isPending}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-warning-bg text-warning-text hover:brightness-105 border border-warning/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-60"
                        >
                          {isCurrentlyMarking ? (
                            <Loader2 size={14} className="motion-safe:animate-spin" />
                          ) : (
                            <LogOut size={14} strokeWidth={2} />
                          )}
                          <span>Check Out</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-secondary hidden md:inline">
                          Not checked in today
                        </span>
                        <button
                          type="button"
                          onClick={() => void handleMarkPresent(member)}
                          disabled={isCurrentlyMarking || isPending}
                          data-testid={`quick-mark-btn-${member.id}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-primary text-on-primary hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:active:scale-95 transition-all shadow-sm disabled:opacity-60"
                        >
                          {isCurrentlyMarking ? (
                            <Loader2 size={14} className="motion-safe:animate-spin" />
                          ) : (
                            <CheckCircle2 size={14} strokeWidth={2} />
                          )}
                          <span>Mark Present</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onOpenModalWithMember(String(member.id))}
                          className="p-1.5 text-secondary hover:text-primary hover:bg-surface-hover rounded-lg"
                          title="Custom time"
                        >
                          <Clock size={16} strokeWidth={2} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </section>
  );
}

