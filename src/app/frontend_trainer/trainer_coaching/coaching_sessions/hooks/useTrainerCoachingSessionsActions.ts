"use client";
// DATA FLOW: Session UI events → action hook → Sessions API client → TanStack Query invalidation → Sessions screen.
import { useTranslations } from 'next-intl';

import { useTrainerInfrastructureConfirm } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureConfirm';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureIdempotencyKey';

import { useTrainerSessionsMutations } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/useTrainerCoachingSessionsMutations';

import type { TrainerSessionsActionStateSetters } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsActionStateTypes';

import type { TrainerSessionsCreateSessionDto } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsTypes';

/**
 * @description Coordinates Trainer session mutations, confirmation, idempotency keys, modal state, and backend feedback.
 * @dependencies Trainer Sessions mutation hooks plus approved Trainer confirmation, feedback, and idempotency infrastructure.
 * @edge-case Reuses the same idempotency key during retries and preserves form/modal state when a mutation fails.
 */
export function useTrainerSessionsActions({ setShowScheduleModal, setAttendanceSession, setEditingSession }: TrainerSessionsActionStateSetters) {
  const t = useTranslations('TRAINER_SESSIONS');
  const { createSession, createSessionPending, markNoShowSession, markNoShowSessionPending, cancelSession, cancelSessionPending, markAttendance, markAttendancePending, updateSessionPending } = useTrainerSessionsMutations();
  const { confirm } = useTrainerInfrastructureConfirm();
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  const actionKeys = useTrainerInfrastructureIdempotencyKey();

  const handleAttendanceSubmit = async (sessionId: string, attendedMemberIds: string[]) => {
    const actionId = `session-attendance-${sessionId}`;
    try {
      const response = await markAttendance({ id: sessionId, memberIds: attendedMemberIds, idempotencyKey: actionKeys.begin(actionId) });
      actionKeys.clear(actionId);
      setAttendanceSession(null);
      showSuccess(response.message, actionId);
    } catch (error) {
      showError(error, 'trainer-sessions-attendance-error');
    }
  };

  const handleCancelSession = async (sessionId: string) => {
    const confirmed = await confirm({ title: t('TEXT_CANCEL_SESSION_TITLE'), message: t('TEXT_CANCEL_SESSION_MESSAGE'), type: 'danger', confirmText: t('TEXT_CANCEL_SESSION'), requireTypedConfirmation: true, confirmationPhrase: t('TEXT_CANCEL_SESSION_CONFIRMATION') });
    if (!confirmed) return;
    const actionId = `session-cancel-${sessionId}`;
    try {
      const response = await cancelSession({ id: sessionId, idempotencyKey: actionKeys.begin(actionId) });
      actionKeys.clear(actionId);
      showSuccess(response.message, actionId);
    } catch (error) {
      showError(error, 'trainer-sessions-cancel-error');
    }
  };

  const handleNoShowSession = async (sessionId: string) => {
    const confirmed = await confirm({ title: t('TEXT_MARK_NO_SHOW_TITLE'), message: t('TEXT_MARK_NO_SHOW_MESSAGE'), type: 'danger', confirmText: t('TEXT_MARK_NO_SHOW'), requireTypedConfirmation: true, confirmationPhrase: t('TEXT_MARK_NO_SHOW_CONFIRMATION') });
    if (!confirmed) return;
    const actionId = `session-no-show-${sessionId}`;
    try {
      const response = await markNoShowSession({ id: sessionId, idempotencyKey: actionKeys.begin(actionId) });
      actionKeys.clear(actionId);
      showSuccess(response.message, actionId);
    } catch (error) {
      showError(error, 'trainer-sessions-noshow-error');
    }
  };

  const handleScheduleSubmit = async (dto: TrainerSessionsCreateSessionDto): Promise<boolean> => {
    const actionId = 'session-schedule-create';
    try {
      const response = await createSession({ dto, idempotencyKey: actionKeys.begin(actionId) });
      actionKeys.clear(actionId);
      setShowScheduleModal(false);
      showSuccess(response.message, actionId);
      return true;
    } catch (error) {
      showError(error, 'trainer-sessions-schedule-error');
      return false;
    }
  };

  const handleEditSuccess = (message: string) => {
    setEditingSession(null);
    showSuccess(message, 'trainer-sessions-update-success');
  };

  return {
    handleAttendanceSubmit,
    handleNoShowSession,
    handleCancelSession,
    handleScheduleSubmit,
    handleEditSuccess,
    createSessionPending,
    markNoShowSessionPending,
    cancelSessionPending,
    markAttendancePending,
    updateSessionPending,
  };
}
