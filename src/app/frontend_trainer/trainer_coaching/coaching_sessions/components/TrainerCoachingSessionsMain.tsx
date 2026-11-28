"use client";
// RESPONSIBILITY: Renders the Trainer Sessions workspace by composing filters, session records, and child modal surfaces; orchestration lives in useTrainerSessionsMain.
// DATA FLOW: page.tsx → useTrainerSessionsMain → Session views/modals.

import { useState, useMemo } from 'react';
import { Clock, Dumbbell, Loader2, Pencil, User, Users, XCircle, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

import TrainerSessionsAttendanceModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsAttendanceModal';
import TrainerSessionsEditModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsEditModal';
import TrainerSessionsEmptyState from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsEmptyState';
import TrainerSessionsKPIs from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsKPIs';
import TrainerSessionsLoadingSkeleton from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsLoadingSkeleton';
import TrainerSessionsScheduleModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsScheduleModal';
import TrainerCoachingSessionsLiveWorkoutModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsLiveWorkoutModal';
import { TrainerCoachingSessionsFilterToolbar } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsFilterToolbar';
import { TrainerCoachingSessionsBookingRequests, type ClientBookingRequest } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsBookingRequests';

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

  // Additional Filter State: Status, Session Type, Client/Member, Search
  const [statusDropdown, setStatusDropdown] = useState('ALL');
  const [sessionType, setSessionType] = useState('ALL');
  const [memberFilter, setMemberFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Client Booking Requests State
  const [bookingRequests, setBookingRequests] = useState<ClientBookingRequest[]>(INITIAL_BOOKING_REQUESTS);

  // Live Workout Modal State
  const [liveWorkoutSession, setLiveWorkoutSession] = useState<TrainerSessionsTrainerSession | null>(null);

  // Handle Accept Client Booking
  const handleAcceptBooking = (id: string) => {
    const booking = bookingRequests.find((b) => b.id === id);
    if (booking) {
      setBookingRequests((prev) => prev.filter((b) => b.id !== id));
      setShowScheduleModal(true);
    }
  };

  // Handle Decline Client Booking
  const handleDeclineBooking = (id: string) => {
    setBookingRequests((prev) => prev.filter((b) => b.id !== id));
  };

  // Handle Completed Live Workout Tracker
  const handleLiveWorkoutComplete = async () => {
    if (liveWorkoutSession) {
      setAttendanceSession(liveWorkoutSession);
    }
    setLiveWorkoutSession(null);
  };

  // Client-side filtering logic
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
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
          s.trainerNotes?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesMemberName && !matchesNotes) {
          return false;
        }
      }
      return true;
    });
  }, [sessions, statusDropdown, sessionType, memberFilter, searchQuery]);

  const hasActiveFilters =
    statusDropdown !== 'ALL' ||
    sessionType !== 'ALL' ||
    memberFilter !== 'ALL' ||
    searchQuery.trim() !== '';

  const handleClearFilters = () => {
    setStatusDropdown('ALL');
    setSessionType('ALL');
    setMemberFilter('ALL');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      <TrainerSessionsKPIs />

      <div className="space-y-4">
        {/* Client Booking Requests */}
        <TrainerCoachingSessionsBookingRequests
          bookingRequests={bookingRequests}
          onAccept={handleAcceptBooking}
          onDecline={handleDeclineBooking}
        />

        {/* Filter Toolbar with Dropdowns, Date, Search & Tabs */}
        <TrainerCoachingSessionsFilterToolbar
          filter={filter}
          setFilter={setFilter}
          date={date}
          setDate={setDate}
          statusDropdown={statusDropdown}
          setStatusDropdown={setStatusDropdown}
          sessionType={sessionType}
          setSessionType={setSessionType}
          memberFilter={memberFilter}
          setMemberFilter={setMemberFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          memberOptions={memberOptions}
          onScheduleClick={() => setShowScheduleModal(true)}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {isPending ? <TrainerSessionsLoadingSkeleton /> : isError ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 bg-card rounded-xl border border-border">
            <p role="alert" className="text-danger" data-testid="trainer_sessions-main-error_state_51_1">{t('TEXT_UNABLE_TO_LOAD_SESSIONS_RIGHT_NOW_PLEASE_RETRY')}</p>
            <button type="button" onClick={() => void refetch()} disabled={isFetching} className="min-h-11 min-w-24 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border text-primary hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:active:scale-95" data-testid="trainer_sessions-trainersessionsmain-button_4">{isFetching ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t('TEXT_RETRYING')}</> : t('TEXT_RETRY')}</button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredSessions.map((session) => (
              <div key={session.id} className="bg-card rounded-xl shadow-card border border-border p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl mt-1 ${TRAINER_SESSIONS_SESSION_TYPE_STYLES[session.type]}`}>{session.type === TRAINER_SESSIONS_SESSION_TYPE.PT ? <User size={18} strokeWidth={2} /> : <Users size={18} strokeWidth={2} />}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-primary text-lg">{session.title}</h3>
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${TRAINER_SESSIONS_SESSION_TYPE_STYLES[session.type]}`}>{t(session.type === TRAINER_SESSIONS_SESSION_TYPE.PT ? 'TEXT_PT' : 'TEXT_GROUP')}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-secondary">
                      <span className="flex items-center gap-1.5"><Clock size={18} strokeWidth={2} />{session.time} ({session.duration})</span><span>•</span>
                      {session.type === TRAINER_SESSIONS_SESSION_TYPE.PT ? <span className="flex items-center gap-1.5"><User size={18} strokeWidth={2} />{session.member}</span> : <span className="flex items-center gap-1.5"><Users size={18} strokeWidth={2} />{session.attendees} / {session.maxAttendees} {t('TEXT_ENROLLED')}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-border md:border-none">
                  {session.status === TRAINER_SESSIONS_SESSION_STATUS.UPCOMING && (
                    <div className="flex flex-wrap items-center gap-2.5">
                      {session.type === TRAINER_SESSIONS_SESSION_TYPE.PT && (
                        <button
                          type="button"
                          onClick={() => setLiveWorkoutSession(session)}
                          className="min-h-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-300 hover:bg-sky-500/20 motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                          data-testid={`trainer_sessions-live-workout-${session.id}`}
                        >
                          <Dumbbell size={15} className="text-sky-500" /> Track Live
                        </button>
                      )}
                      <button type="button" onClick={() => setEditingSession(session)} className="min-w-11 min-h-10 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300 hover:bg-amber-500/20 text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" aria-label={t('TEXT_EDIT_SESSION_ARIA', { title: session.title })} data-testid={`trainer_sessions-sessions-edit-${session.id}`}><Pencil size={15} strokeWidth={2} />{t('TEXT_EDIT')}</button>
                      <button type="button" onClick={() => void handleNoShowSession(session.id)} disabled={markNoShowSessionPending} className="min-w-11 min-h-10 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-50" data-testid={`trainer_sessions-sessions-no-show-${session.id}`}>{markNoShowSessionPending ? <><Loader2 size={15} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t('TEXT_MARKING_NO_SHOW')}</> : t('TEXT_NO_SHOW')}</button>
                      <button type="button" onClick={() => void handleCancelSession(session.id)} disabled={cancelSessionPending} className="min-w-11 min-h-10 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 text-xs font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:opacity-50" data-testid={`trainer_sessions-sessions-cancel-${session.id}`}><XCircle size={15} strokeWidth={2} />{cancelSessionPending ? <><Loader2 size={15} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t('TEXT_CANCELLING')}</> : t('TEXT_CANCEL_SESSION')}</button>
                      <button type="button" onClick={() => setAttendanceSession(session)} className="min-h-10 text-xs font-semibold text-on-primary bg-primary px-4 py-2 rounded-xl hover:bg-primary-hover shadow-sm shadow-orange-500/20 motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring" data-testid={`trainer_sessions-sessions-attendance-${session.id}`}>{t('TEXT_MARK_ATTENDANCE')}</button>
                    </div>
                  )}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${TRAINER_SESSIONS_SESSION_STATUS_STYLES[session.status]}`} data-testid={`trainer_sessions-sessions-main-status-${session.id}`}>{session.status === TRAINER_SESSIONS_SESSION_STATUS.COMPLETED && <CheckCircle size={18} strokeWidth={2} />}{session.status === TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW && <XCircle size={18} strokeWidth={2} />}{t(session.status === TRAINER_SESSIONS_SESSION_STATUS.UPCOMING ? 'TEXT_UPCOMING' : session.status === TRAINER_SESSIONS_SESSION_STATUS.COMPLETED ? 'TEXT_COMPLETED' : 'TEXT_NO_SHOW')}</span>
                </div>
              </div>
            ))}
            {filteredSessions.length === 0 && <TrainerSessionsEmptyState onSchedule={() => setShowScheduleModal(true)} />}
          </div>
        )}
      </div>

      {showScheduleModal && <TrainerSessionsScheduleModal onClose={() => setShowScheduleModal(false)} onSubmit={handleScheduleSubmit} memberOptions={memberOptions} memberOptionsIsPending={memberOptionsIsPending} memberOptionsIsError={memberOptionsIsError} memberOptionsIsFetching={memberOptionsIsFetching} onRetryMemberOptions={retryMemberOptions} isSubmitting={createSessionPending} testId="trainer-sessions-main-schedule-modal" />}
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
