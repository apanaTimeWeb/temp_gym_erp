"use client";
// RESPONSIBILITY: Renders the Trainer Sessions workspace by composing filters, session records, and child modal surfaces; orchestration lives in useTrainerSessionsMain.
/**
 * @description Renders session KPIs, filtering, session cards, loading/error/empty states, and the schedule/edit/attendance dialogs.
 * @dependencies useTrainerSessionsMain and Sessions presentation components.
 * @edge-case Preserves keyboard-accessible controls, repeated modal use, and user-visible terminal states.
 */
// DATA FLOW: page.tsx → useTrainerSessionsMain → Session views/modals.
import { useState } from 'react';
import { Calendar as CalendarIcon, CalendarCheck, Check, CheckCircle, Clock, Dumbbell, Loader2, Pencil, Play, Plus, User, Users, X, XCircle } from 'lucide-react';

import { useTranslations } from 'next-intl';

import TrainerSessionsAttendanceModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsAttendanceModal';
import TrainerSessionsEditModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsEditModal';
import TrainerSessionsEmptyState from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsEmptyState';
import TrainerSessionsKPIs from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsKPIs';
import TrainerSessionsLoadingSkeleton from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsLoadingSkeleton';
import TrainerSessionsScheduleModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsScheduleModal';
import TrainerCoachingSessionsLiveWorkoutModal from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/components/TrainerCoachingSessionsLiveWorkoutModal';

import { TRAINER_SESSIONS_SESSION_FILTER_OPTIONS, TRAINER_SESSIONS_SESSION_STATUS_STYLES, TRAINER_SESSIONS_SESSION_TYPE, TRAINER_SESSIONS_SESSION_TYPE_STYLES } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';
import { TRAINER_SESSIONS_SESSION_STATUS } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/TrainerCoachingSessionsConstants';
import { useTrainerSessionsMain } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsMain';
import type { TrainerSessionsTrainerSession } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

interface ClientBookingRequest {
  id: string;
  clientName: string;
  preferredDate: string;
  preferredTime: string;
  sessionType: string;
  notes: string;
}

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













/**
 * @description Owns the sessions feature UI responsibility represented by TrainerSessionsMain, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerSessionsMain() {
  const t = useTranslations('TRAINER_SESSIONS');
  const viewModel = useTrainerSessionsMain();
  const {
    filter, setFilter, date, setDate, sessions, filteredSessions, memberOptions,
    memberOptionsIsPending, memberOptionsIsError, memberOptionsIsFetching, retryMemberOptions,
    isPending, isError, refetch,
    showScheduleModal, setShowScheduleModal, attendanceSession, setAttendanceSession, editingSession, setEditingSession,
    handleAttendanceSubmit, handleNoShowSession, handleCancelSession, handleScheduleSubmit, handleEditSuccess, createSessionPending,
    markNoShowSessionPending, cancelSessionPending, isFetching,
  } = viewModel;

  const [liveWorkoutSession, setLiveWorkoutSession] = useState<TrainerSessionsTrainerSession | null>(null);
  const [bookingRequests, setBookingRequests] = useState<ClientBookingRequest[]>(INITIAL_BOOKING_REQUESTS);
  const [bookingBannerMessage, setBookingBannerMessage] = useState<string | null>(null);

  const handleAcceptBooking = (req: ClientBookingRequest) => {
    setBookingRequests((prev) => prev.filter((r) => r.id !== req.id));
    setBookingBannerMessage(`Booking accepted for ${req.clientName} (${req.preferredDate} at ${req.preferredTime}).`);
    setTimeout(() => setBookingBannerMessage(null), 5000);
  };

  const handleDeclineBooking = (reqId: string) => {
    setBookingRequests((prev) => prev.filter((r) => r.id !== reqId));
  };

  const handleLiveWorkoutComplete = async (loggedData: { durationMinutes: number; notes: string }) => {
    if (liveWorkoutSession) {
      const memberIds = liveWorkoutSession.enrolledMembers?.map((m) => m.id) ?? [];
      await handleAttendanceSubmit(liveWorkoutSession.id, memberIds);
    }
  };

  return (
    <div className="min-h-full pb-10 ">
      <div className="p-6 space-y-6 ">
        <TrainerSessionsKPIs />

        {/* Pending Client Booking Requests */}
        {bookingBannerMessage && (
          <div role="status" className="p-3 bg-success-bg border border-success/30 rounded-xl text-xs font-semibold text-success flex items-center justify-between">
            <span>{bookingBannerMessage}</span>
            <button type="button" onClick={() => setBookingBannerMessage(null)} className="p-1 hover:opacity-75">
              <X size={14} />
            </button>
          </div>
        )}

        {bookingRequests.length > 0 && (
          <div className="bg-card rounded-xl shadow-card border border-primary/20 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <CalendarCheck size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                    Pending Client Booking Requests
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary text-on-primary">
                      {bookingRequests.length}
                    </span>
                  </h3>
                  <p className="text-xs text-secondary">
                    Review and confirm 1-on-1 personal training requests from your assigned clients.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {bookingRequests.map((req) => (
                <div key={req.id} className="bg-floating border border-border rounded-xl p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-bold text-primary">{req.clientName}</p>
                      <p className="text-xs font-medium text-secondary">{req.sessionType}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-warning bg-warning-bg px-2 py-0.5 rounded-full">
                      Requested
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-secondary font-mono">
                    <span className="flex items-center gap-1 font-sans"><CalendarIcon size={13} /> {req.preferredDate}</span>
                    <span className="flex items-center gap-1 font-sans"><Clock size={13} /> {req.preferredTime}</span>
                  </div>

                  {req.notes && (
                    <p className="text-xs text-secondary italic bg-card/60 p-2 rounded-lg border border-border">
                      &quot;{req.notes}&quot;
                    </p>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleAcceptBooking(req)}
                      className="flex-1 py-1.5 px-3 bg-primary text-on-primary rounded-lg text-xs font-bold hover:bg-primary-hover transition-colors"
                      data-testid={`accept-booking-${req.id}`}
                    >
                      Accept Request
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeclineBooking(req.id)}
                      className="py-1.5 px-3 border border-border text-secondary hover:text-danger rounded-lg text-xs font-semibold hover:bg-input transition-colors"
                      data-testid={`decline-booking-${req.id}`}
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-card rounded-xl shadow-card border border-border p-4 flex flex-col sm:flex-row justify-between items-center gap-4 ">
          <div className="flex bg-input rounded-lg p-1 ">
            {TRAINER_SESSIONS_SESSION_FILTER_OPTIONS.map((option) => (
              <button key={option.value} type="button" onClick={() => setFilter(option.value)} aria-pressed={filter === option.value} className={`px-4 py-1.5 text-sm font-medium rounded-md motion-safe:transition-colors ${filter === option.value ? 'bg-card text-primary shadow-card' : 'text-secondary hover:text-primary'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid={`trainer_sessions-sessions-filter-${option.value.toLowerCase()}`}>{t(option.labelKey)}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto ">
            <div className="flex items-center gap-2 ">
              <CalendarIcon size={18} strokeWidth={2} className="text-secondary " aria-hidden="true" />
              <label htmlFor="trainer-sessions-date" className="sr-only ">{t('TEXT_SESSION_DATE')}</label>
              <input id="trainer-sessions-date" type="date" value={date} onChange={(event) => setDate(event.target.value)} className="bg-input border border-border text-primary text-sm rounded-lg px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_sessions-trainersessionsmain-input_2" />
            </div>
            <button type="button" onClick={() => setShowScheduleModal(true)} className="min-h-11 flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-hover motion-safe:transition-opacity ms-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_sessions-main-schedule"><Plus size={18} strokeWidth={2} />{t('TEXT_SCHEDULE_PT')}</button>
          </div>
        </div>

        {isPending ? <TrainerSessionsLoadingSkeleton /> : isError ? (
          <div className="flex flex-col items-center justify-center gap-3 py-20 bg-card rounded-xl border border-border ">
            <p role="alert" className="text-danger " data-testid={"trainer_sessions-main-error_state_51_1"}>{t('TEXT_UNABLE_TO_LOAD_SESSIONS_RIGHT_NOW_PLEASE_RETRY')}</p>
            <button type="button" onClick={() => void refetch()} disabled={isFetching} className="min-h-11 min-w-24 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border text-primary hover:bg-primary-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_sessions-trainersessionsmain-button_4">{isFetching ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t('TEXT_RETRYING')}</> : t('TEXT_RETRY')}</button>
          </div>
        ) : (
          <div className="grid gap-4 ">
            {filteredSessions.map((session) => (
              <div key={session.id} className="bg-card rounded-xl shadow-card border border-border p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform">
                <div className="flex items-start gap-4 ">
                  <div className={`p-3 rounded-xl mt-1 ${TRAINER_SESSIONS_SESSION_TYPE_STYLES[session.type]} `}>{session.type === TRAINER_SESSIONS_SESSION_TYPE.PT ? <User size={18} strokeWidth={2} /> : <Users size={18} strokeWidth={2} />}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 ">
                      <h3 className="font-bold text-primary text-lg ">{session.title}</h3>
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${TRAINER_SESSIONS_SESSION_TYPE_STYLES[session.type]} `}>{t(session.type === TRAINER_SESSIONS_SESSION_TYPE.PT ? 'TEXT_PT' : 'TEXT_GROUP')}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-secondary ">
                      <span className="flex items-center gap-1.5 "><Clock size={18} strokeWidth={2} />{session.time} ({session.duration})</span><span>•</span>
                      {session.type === TRAINER_SESSIONS_SESSION_TYPE.PT ? <span className="flex items-center gap-1.5 "><User size={18} strokeWidth={2} />{session.member}</span> : <span className="flex items-center gap-1.5 "><Users size={18} strokeWidth={2} />{session.attendees} / {session.maxAttendees} {t('TEXT_ENROLLED')}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between md:justify-end gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-border md:border-none ">
                  {session.status === TRAINER_SESSIONS_SESSION_STATUS.UPCOMING && (
                    <div className="flex items-center gap-3 ">
                      {session.type === TRAINER_SESSIONS_SESSION_TYPE.PT && (
                        <button
                          type="button"
                          onClick={() => setLiveWorkoutSession(session)}
                          className="min-h-11 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-floating border border-border text-primary hover:bg-input hover:border-primary motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                          data-testid={`trainer_sessions-live-workout-${session.id}`}
                        >
                          <Dumbbell size={15} className="text-primary" /> Track Live
                        </button>
                      )}
                      <button type="button" onClick={() => setEditingSession(session)} className="min-w-11 min-h-11 flex items-center gap-1 text-sm font-semibold text-secondary hover:text-primary hover:underline motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" aria-label={t('TEXT_EDIT_SESSION_ARIA', { title: session.title })} data-testid={`trainer_sessions-sessions-edit-${session.id}`}><Pencil size={18} strokeWidth={2} />{t('TEXT_EDIT')}</button>
                      <button type="button" onClick={() => void handleNoShowSession(session.id)} disabled={markNoShowSessionPending} className="min-h-11 flex items-center gap-1 text-sm font-semibold text-danger hover:text-danger hover:underline motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95 disabled:opacity-50" data-testid={`trainer_sessions-sessions-no-show-${session.id}`}>{markNoShowSessionPending ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t('TEXT_MARKING_NO_SHOW')}</> : t('TEXT_NO_SHOW')}</button>
                      <button type="button" onClick={() => void handleCancelSession(session.id)} disabled={cancelSessionPending} className="min-h-11 flex items-center gap-1 text-sm font-semibold text-danger hover:text-danger hover:underline motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95 disabled:opacity-50" data-testid={`trainer_sessions-sessions-cancel-${session.id}`}><XCircle size={18} strokeWidth={2} />{cancelSessionPending ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t('TEXT_CANCELLING')}</> : t('TEXT_CANCEL_SESSION')}</button>
                      <button type="button" onClick={() => setAttendanceSession(session)} className="min-h-11 text-sm font-medium text-on-primary bg-primary px-4 py-2 rounded-xl hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid={`trainer_sessions-sessions-attendance-${session.id}`}>{t('TEXT_MARK_ATTENDANCE')}</button>
                    </div>
                  )}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${TRAINER_SESSIONS_SESSION_STATUS_STYLES[session.status]} `} data-testid={`trainer_sessions-sessions-main-status-${session.id}`}>{session.status === TRAINER_SESSIONS_SESSION_STATUS.COMPLETED && <CheckCircle size={18} strokeWidth={2} />}{session.status === TRAINER_SESSIONS_SESSION_STATUS.NO_SHOW && <XCircle size={18} strokeWidth={2} />}{t(session.status === TRAINER_SESSIONS_SESSION_STATUS.UPCOMING ? 'TEXT_UPCOMING' : session.status === TRAINER_SESSIONS_SESSION_STATUS.COMPLETED ? 'TEXT_COMPLETED' : 'TEXT_NO_SHOW')}</span>
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
