"use client";
// RESPONSIBILITY: Renders the Trainer Sessions workspace by composing filters, session records, and child modal surfaces; orchestration lives in useTrainerSessionsMain.
// DATA FLOW: page.tsx → useTrainerSessionsMain → Session views/modals.

import { useState, useMemo, useEffect } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight, Clock, Dumbbell, Loader2, MapPin, Pencil, User, Users, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { apiFetch } from '@/lib/api';

import TrainerSessionsAttendanceModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsAttendanceModal';
import TrainerSessionsEditModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsEditModal';
import TrainerSessionsEmptyState from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsEmptyState';
import TrainerSessionsKPIs from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsKPIs';
import TrainerSessionsLoadingSkeleton from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsLoadingSkeleton';
import TrainerSessionsScheduleModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsScheduleModal';
import TrainerCoachingSessionsLiveWorkoutModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsLiveWorkoutModal';
import {
  TrainerCoachingSessionsFilterToolbar,
  type TrainerSessionsSortDirection,
  type TrainerSessionsSortField,
} from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsFilterToolbar';
import { TrainerCoachingSessionsBookingRequests, type ClientBookingRequest } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsBookingRequests';

function parseSessionTimeMinutes(value?: string): number {
  if (!value) return Number.MAX_SAFE_INTEGER;
  const trimmed = value.trim();
  const match12 = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i.exec(trimmed);
  if (match12) {
    let h = Number(match12[1]);
    const m = Number(match12[2]);
    const period = match12[3].toUpperCase();
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  }
  const match24 = /^(\d{1,2}):(\d{2})$/.exec(trimmed);
  if (match24) {
    return Number(match24[1]) * 60 + Number(match24[2]);
  }
  return Number.MAX_SAFE_INTEGER;
}

import { TRAINER_SESSIONS_SESSION_STATUS_STYLES, TRAINER_SESSIONS_SESSION_TYPE, TRAINER_SESSIONS_SESSION_TYPE_STYLES } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';
import { TRAINER_SESSIONS_SESSION_STATUS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';
import { useTrainerSessionsMain } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsMain';
import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

const INITIAL_BOOKING_REQUESTS: ClientBookingRequest[] = [
  {
    id: 'req-1',
    clientName: 'Rahul Verma',
    preferredDate: 'Tomorrow',
    preferredTime: '07:00 AM - 08:00 AM',
    sessionType: '1-on-1 PT (Hypertrophy)',
    notes: 'Focus on chest & triceps technique',
  },
  {
    id: 'req-2',
    clientName: 'Sneha Patel',
    preferredDate: 'Thursday',
    preferredTime: '06:00 PM - 07:00 PM',
    sessionType: 'Fat Loss & HIIT PT',
    notes: 'Knee injury recovery, low impact',
  },
];

export default function TrainerSessionsMain() {
  const t = useTranslations('TRAINER_SESSIONS');
  const viewModel = useTrainerSessionsMain();
  const {
    filter, setFilter, date, setDate, sessions, memberOptions,
    memberOptionsIsPending, memberOptionsIsError, memberOptionsIsFetching, retryMemberOptions,
    isPending, isError, refetch,
    showScheduleModal, setShowScheduleModal, attendanceSession, setAttendanceSession, editingSession, setEditingSession,
    handleAttendanceSubmit, handleNoShowSession, handleCancelSession, handleScheduleSubmit, handleEditSuccess, createSessionPending,
    markNoShowSessionPending, cancelSessionPending, isFetching,
  } = viewModel;

  // Additional Filter State: Status, Session Type, Client/Member, Search, Sort
  const [statusDropdown, setStatusDropdown] = useState('ALL');
  const [sessionType, setSessionType] = useState('ALL');
  const [memberFilter, setMemberFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<TrainerSessionsSortField>('time');
  const [sortDirection, setSortDirection] = useState<TrainerSessionsSortDirection>('asc');
  const [sessionsPage, setSessionsPage] = useState(1);
  const [acceptedBooking, setAcceptedBooking] = useState<ClientBookingRequest | null>(null);
  const sessionsPerPage = 10;

  // Client Booking Requests State (loaded from backend/mock API)
  const [bookingRequests, setBookingRequests] = useState<ClientBookingRequest[]>(INITIAL_BOOKING_REQUESTS);

  useEffect(() => {
    let active = true;
    apiFetch<ClientBookingRequest[]>('/trainer/trainer_sessions/booking-requests')
      .then((res) => {
        if (active && res?.success && Array.isArray(res.data)) {
          setBookingRequests(res.data);
        }
      })
      .catch(() => {
        // Keep initial requests if offline or mocked in isolated unit tests
      });
    return () => { active = false; };
  }, []);

  // Live Workout Modal State
  const [liveWorkoutSession, setLiveWorkoutSession] = useState<TrainerSessionsTrainerSession | null>(null);

  // Handle Accept Client Booking
  const handleAcceptBooking = (id: string) => {
    const booking = bookingRequests.find((b) => b.id === id);
    if (booking) {
      setAcceptedBooking(booking);
      setShowScheduleModal(true);
    }
  };

  // Handle Decline Client Booking
  const handleDeclineBooking = (id: string) => {
    setBookingRequests((prev) => prev.filter((b) => b.id !== id));
    void apiFetch(`/trainer/trainer_sessions/booking-requests/${id}/decline`, { method: 'POST' }).catch(() => null);
  };

  // Handle Completed Live Workout Tracker
  const handleLiveWorkoutComplete = async () => {
    if (liveWorkoutSession) {
      setAttendanceSession(liveWorkoutSession);
    }
    setLiveWorkoutSession(null);
  };

  // Client-side filtering & sorting logic
  const filteredSessions = useMemo(() => {
    const filtered = sessions.filter((s) => {
      // 1. Filter by Status Dropdown
      if (statusDropdown !== 'ALL' && s.status !== statusDropdown) {
        return false;
      }
      // 2. Filter by Session Type Dropdown
      if (sessionType !== 'ALL' && s.type !== sessionType) {
        return false;
      }
      // 3. Filter by Member Dropdown
      if (memberFilter !== 'ALL') {
        const matchesMember =
          s.member === memberFilter ||
          s.enrolledMembers?.some((m) => m.id === memberFilter || m.name === memberFilter);
        if (!matchesMember) return false;
      }
      // 4. Filter by Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesTitle = s.title?.toLowerCase().includes(q);
        const matchesMemberName = s.member?.toLowerCase().includes(q);
        const matchesNotes =
          s.sessionNotes?.toLowerCase().includes(q) ||
          s.trainerNotes?.toLowerCase().includes(q) ||
          s.location?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesMemberName && !matchesNotes) {
          return false;
        }
      }
      return true;
    });

    const factor = sortDirection === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title) * factor;
      if (sortBy === 'status') return a.status.localeCompare(b.status) * factor;
      return (parseSessionTimeMinutes(a.time) - parseSessionTimeMinutes(b.time)) * factor;
    });
  }, [sessions, statusDropdown, sessionType, memberFilter, searchQuery, sortBy, sortDirection]);

  const totalSessionsPages = Math.max(1, Math.ceil(filteredSessions.length / sessionsPerPage));
  const safeSessionsPage = Math.min(sessionsPage, totalSessionsPages);
  const paginatedSessions = filteredSessions.slice((safeSessionsPage - 1) * sessionsPerPage, safeSessionsPage * sessionsPerPage);

  const hasActiveFilters =
    filter !== 'All' ||
    statusDropdown !== 'ALL' ||
    sessionType !== 'ALL' ||
    memberFilter !== 'ALL' ||
    searchQuery.trim() !== '';

  const handleClearFilters = () => {
    setFilter('All');
    setStatusDropdown('ALL');
    setSessionType('ALL');
    setMemberFilter('ALL');
    setSearchQuery('');
    setSortBy('time');
    setSortDirection('asc');
    setSessionsPage(1);
  };

  const handleExportCsv = () => {
    const header = ['ID', 'Title', 'Type', 'Time', 'Duration', 'Member / Attendees', 'Status'];
    const csvRows = [
      header.join(','),
      ...filteredSessions.map((s) =>
        [
          s.id,
          `"${String(s.title ?? '').replace(/"/g, '""')}"`,
          s.type,
          `"${String(s.time ?? '').replace(/"/g, '""')}"`,
          `"${String(s.duration ?? '').replace(/"/g, '""')}"`,
          `"${String(s.type === TRAINER_SESSIONS_SESSION_TYPE.PT ? (s.member ?? '') : `${s.attendees}/${s.maxAttendees}`).replace(/"/g, '""')}"`,
          s.status,
        ].join(',')
      ),
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'trainer_sessions_schedule.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-full pb-10 bg-page text-text-primary">
      <div className="p-4 sm:p-6 space-y-5 max-w-full min-w-0">
        <TrainerSessionsKPIs />

        <div className="space-y-4 min-w-0">
          {/* Client Booking Requests */}
          <TrainerCoachingSessionsBookingRequests
            bookingRequests={bookingRequests}
            onAccept={handleAcceptBooking}
            onDecline={handleDeclineBooking}
          />

          {/* Filter Toolbar with Dropdowns, Date, Sort, Search & Tabs */}
          <TrainerCoachingSessionsFilterToolbar
            filter={filter}
            setFilter={(val) => { setFilter(val); setSessionsPage(1); }}
            date={date}
            setDate={(val) => { setDate(val); setSessionsPage(1); }}
            statusDropdown={statusDropdown}
            setStatusDropdown={(val) => { setStatusDropdown(val); setSessionsPage(1); }}
            sessionType={sessionType}
            setSessionType={(val) => { setSessionType(val); setSessionsPage(1); }}
            memberFilter={memberFilter}
            setMemberFilter={(val) => { setMemberFilter(val); setSessionsPage(1); }}
            searchQuery={searchQuery}
            setSearchQuery={(val) => { setSearchQuery(val); setSessionsPage(1); }}
            sortBy={sortBy}
            setSortBy={(val) => { setSortBy(val); setSessionsPage(1); }}
            sortDirection={sortDirection}
            onToggleSortDirection={() => { setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc')); setSessionsPage(1); }}
            memberOptions={memberOptions}
            onScheduleClick={() => { setAcceptedBooking(null); setShowScheduleModal(true); }}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
            onExportCsv={handleExportCsv}
            onRefresh={() => void refetch()}
            isRefreshing={isFetching}
          />

          {isPending ? <TrainerSessionsLoadingSkeleton /> : isError ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 bg-card rounded-xl border border-border">
              <p role="alert" className="text-danger" data-testid="trainer_sessions-main-error_state_51_1">{t('TEXT_UNABLE_TO_LOAD_SESSIONS_RIGHT_NOW_PLEASE_RETRY')}</p>
              <button type="button" onClick={() => void refetch()} disabled={isFetching} className="min-h-11 min-w-24 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border text-primary hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:active:scale-95" data-testid="trainer_sessions-trainersessionsmain-button_4">{isFetching ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t('TEXT_RETRYING')}</> : t('TEXT_RETRY')}</button>
            </div>
          ) : (
            <div className="grid gap-4 min-w-0">
              {paginatedSessions.map((session) => (
                <div key={session.id} className="bg-card rounded-xl shadow-card border border-border p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-5 min-w-0 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform">
                  <div className="flex items-start gap-3.5 sm:gap-4 min-w-0 flex-1">
                    <div className={`p-3 rounded-xl mt-0.5 shrink-0 ${TRAINER_SESSIONS_SESSION_TYPE_STYLES[session.type]}`}>{session.type === TRAINER_SESSIONS_SESSION_TYPE.PT ? <User size={18} strokeWidth={2} /> : <Users size={18} strokeWidth={2} />}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-text-primary text-base sm:text-lg truncate">{session.title}</h3>
                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${TRAINER_SESSIONS_SESSION_TYPE_STYLES[session.type]}`}>{t(session.type === TRAINER_SESSIONS_SESSION_TYPE.PT ? 'TEXT_PT' : 'TEXT_GROUP')}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-secondary">
                        <span className="inline-flex items-center gap-1.5"><Clock size={16} strokeWidth={2} className="shrink-0" />{session.time} ({session.duration})</span>
                        <span aria-hidden="true">•</span>
                        {session.type === TRAINER_SESSIONS_SESSION_TYPE.PT ? <span className="inline-flex items-center gap-1.5"><User size={16} strokeWidth={2} className="shrink-0" />{session.member}</span> : <span className="inline-flex items-center gap-1.5"><Users size={16} strokeWidth={2} className="shrink-0" />{session.attendees} / {session.maxAttendees} {t('TEXT_ENROLLED')}</span>}
                        {(session.location || session.room) && (
                          <>
                            <span aria-hidden="true">•</span>
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={14} className="shrink-0" />
                              {[session.location, session.room].filter(Boolean).join(' · ')}
                            </span>
                          </>
                        )}
                      </div>
                      {session.trainerNotes && (
                        <p className="mt-1.5 text-xs text-secondary line-clamp-2">{session.trainerNotes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-3 w-full lg:w-auto pt-3 lg:pt-0 border-t border-border lg:border-none shrink-0">
                    {session.status === TRAINER_SESSIONS_SESSION_STATUS.UPCOMING && (
                      <div className="flex flex-wrap items-center gap-2">
                        {session.type === TRAINER_SESSIONS_SESSION_TYPE.PT && (
                          <button
                            type="button"
                            onClick={() => setLiveWorkoutSession(session)}
                            className="min-h-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-300 hover:bg-sky-500/20 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                            data-testid={`trainer_sessions-live-workout-${session.id}`}
                          >
                            <Dumbbell size={15} className="text-sky-500" /> Track Live
                          </button>
                        )}
                        <button type="button" onClick={() => setEditingSession(session)} className="min-w-11 min-h-10 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300 hover:bg-amber-500/20 text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer" aria-label={t('TEXT_EDIT_SESSION_ARIA', { title: session.title })} data-testid={`trainer_sessions-sessions-edit-${session.id}`}><Pencil size={15} strokeWidth={2} />{t('TEXT_EDIT')}</button>
                        <button type="button" onClick={() => void handleNoShowSession(session.id)} disabled={markNoShowSessionPending} className="min-w-11 min-h-10 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-50 cursor-pointer" data-testid={`trainer_sessions-sessions-no-show-${session.id}`}>{markNoShowSessionPending ? <><Loader2 size={15} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t('TEXT_MARKING_NO_SHOW')}</> : t('TEXT_NO_SHOW')}</button>
                        <button type="button" onClick={() => void handleCancelSession(session.id)} disabled={cancelSessionPending} className="min-w-11 min-h-10 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-50 cursor-pointer" data-testid={`trainer_sessions-sessions-cancel-${session.id}`}><XCircle size={15} strokeWidth={2} />{cancelSessionPending ? <><Loader2 size={15} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t('TEXT_CANCELLING')}</> : t('TEXT_CANCEL_SESSION')}</button>
                        <button type="button" onClick={() => setAttendanceSession(session)} className="min-h-10 text-xs font-semibold text-on-primary bg-primary px-4 py-2 rounded-xl hover:bg-primary-hover shadow-sm shadow-orange-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer" data-testid={`trainer_sessions-sessions-attendance-${session.id}`}>{t('TEXT_MARK_ATTENDANCE')}</button>
                      </div>
                    )}
                    <span className={`inline-flex items-center self-start sm:self-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${TRAINER_SESSIONS_SESSION_STATUS_STYLES[session.status]}`} data-testid={`trainer_sessions-sessions-main-status-${session.id}`}>{session.status === TRAINER_SESSIONS_SESSION_STATUS.COMPLETED && <CheckCircle size={16} strokeWidth={2} />}{session.status === TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW && <XCircle size={16} strokeWidth={2} />}{t(session.status === TRAINER_SESSIONS_SESSION_STATUS.UPCOMING ? 'TEXT_UPCOMING' : session.status === TRAINER_SESSIONS_SESSION_STATUS.COMPLETED ? 'TEXT_COMPLETED' : 'TEXT_NO_SHOW')}</span>
                  </div>
                </div>
              ))}
              {filteredSessions.length === 0 && <TrainerSessionsEmptyState onSchedule={() => { setAcceptedBooking(null); setShowScheduleModal(true); }} />}
              {totalSessionsPages > 1 && (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3 text-xs text-secondary">
                  <span>
                    Showing <strong className="text-text-primary">{(safeSessionsPage - 1) * sessionsPerPage + 1}</strong>–<strong className="text-text-primary">{Math.min(safeSessionsPage * sessionsPerPage, filteredSessions.length)}</strong> of <strong className="text-text-primary">{filteredSessions.length}</strong> sessions
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={safeSessionsPage <= 1}
                      onClick={() => setSessionsPage((p) => Math.max(1, p - 1))}
                      className="min-h-9 inline-flex items-center gap-1 rounded-lg border border-border bg-input px-2.5 py-1 text-xs font-semibold text-text-primary disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronLeft size={14} /> Prev
                    </button>
                    <span className="font-medium text-text-primary">Page {safeSessionsPage} / {totalSessionsPages}</span>
                    <button
                      type="button"
                      disabled={safeSessionsPage >= totalSessionsPages}
                      onClick={() => setSessionsPage((p) => Math.min(totalSessionsPages, p + 1))}
                      className="min-h-9 inline-flex items-center gap-1 rounded-lg border border-border bg-input px-2.5 py-1 text-xs font-semibold text-text-primary disabled:opacity-40 cursor-pointer"
                    >
                      Next <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showScheduleModal && (
        <TrainerSessionsScheduleModal
          onClose={() => { setShowScheduleModal(false); setAcceptedBooking(null); }}
          onSubmit={async (dto) => {
            const ok = await handleScheduleSubmit(dto);
            if (ok && acceptedBooking) {
              setBookingRequests((prev) => prev.filter((b) => b.id !== acceptedBooking.id));
              void apiFetch(`/trainer/trainer_sessions/booking-requests/${acceptedBooking.id}/accept`, { method: 'POST' }).catch(() => null);
              setAcceptedBooking(null);
            }
            return ok;
          }}
          memberOptions={memberOptions}
          memberOptionsIsPending={memberOptionsIsPending}
          memberOptionsIsError={memberOptionsIsError}
          memberOptionsIsFetching={memberOptionsIsFetching}
          onRetryMemberOptions={retryMemberOptions}
          isSubmitting={createSessionPending}
          defaultDate={date}
          prefillClientName={acceptedBooking?.clientName}
          prefillTime={acceptedBooking?.preferredTime}
          prefillType={acceptedBooking?.sessionType}
          testId="trainer-sessions-main-schedule-modal"
        />
      )}
      {attendanceSession && <TrainerSessionsAttendanceModal session={attendanceSession} onClose={() => setAttendanceSession(null)} onSubmit={handleAttendanceSubmit} testId="trainer-sessions-main-attendance-modal" />}
      {editingSession && <TrainerSessionsEditModal session={editingSession} onClose={() => setEditingSession(null)} onSuccess={(_updatedSession, message) => handleEditSuccess(message)} />}
      {liveWorkoutSession && (
        <TrainerCoachingSessionsLiveWorkoutModal
          session={liveWorkoutSession}
          onClose={() => setLiveWorkoutSession(null)}
          onComplete={handleLiveWorkoutComplete}
        />
      )}
    </div>
  );
}
