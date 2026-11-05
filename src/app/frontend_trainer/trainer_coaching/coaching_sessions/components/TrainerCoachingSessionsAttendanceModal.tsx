"use client";
// RESPONSIBILITY: Renders session attendance selection UI and delegates persistence to the owning Sessions mutation boundary.
// DATA FLOW: session.enrolledMembers -> local selection state -> confirmation -> onSubmit mutation -> refreshed session query.
import { useRef, useState } from 'react';

import { Check, Loader2, Users, X } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/hooks/TrainerCoachingSessionsuseTrainerInfrastructureDialogFocusTrap';

import type { TrainerSessionsAttendanceModalProps } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/types/TrainerCoachingSessionsAttendanceModalProps';







/**
 * @description Renders session attendance selection UI and delegates persistence to the owning Sessions mutation boundary.
 * @dependencies session.enrolledMembers -> local selection state -> confirmation -> onSubmit mutation -> refreshed session query.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Collects attendance decisions for a scheduled Trainer session and submits them through the session mutation boundary.
 * @dependencies Session-owned member/session contracts and mutation hook.
 * @edge-case Duplicate submission is blocked and cancellation preserves the original session state.
 */
/**
 * @description Renders and coordinates the sessions feature form/modal surface for SessionsAttendanceModal, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented sessions module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerSessionsAttendanceModal({ session, onClose, onSubmit, testId }: TrainerSessionsAttendanceModalProps) {
  const t = useTranslations('TRAINER_SESSIONS');
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendedIds, setAttendedIds] = useState<Set<string>>(
    new Set(session.enrolledMembers?.map((member) => member.id) ?? []),
  );

  useTrainerInfrastructureDialogFocusTrap({ isOpen: true, dialogRef, onEscape: () => { if (!isSubmitting) onClose(); } });

  const members = session.enrolledMembers ?? [];
  const allSelected = members.length > 0 && attendedIds.size === members.length;

  const handleToggleAttendance = (memberId: string) => {
    setAttendedIds((current) => {
      const next = new Set(current);
      if (next.has(memberId)) next.delete(memberId);
      else next.add(memberId);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setAttendedIds(new Set());
      return;
    }
    setAttendedIds(new Set(members.map((member) => member.id)));
  };

  const handleSubmit = async () => {
    if (isSubmitting || members.length === 0) return;
    setIsSubmitting(true);
    try {
      await onSubmit(session.id, Array.from(attendedIds));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-overlay-backdrop p-4" data-testid={testId ?? "trainer_sessions-attendance-modal"}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal={true}
        aria-labelledby="trainer-session-attendance-title"
        tabIndex={-1}
        className="bg-overlay w-full max-w-lg rounded-2xl shadow-dialog border border-border flex flex-col max-h-screen overflow-hidden motion-safe:transition-opacity motion-safe:duration-base"
      >
        <div className="flex items-center justify-between gap-4 p-5 border-b border-border bg-header">
          <div className="min-w-0">
            <h3 id="trainer-session-attendance-title" className="text-lg font-bold text-primary truncate">{t("TEXT_MARK_ATTENDANCE")}</h3>
            <p className="text-sm text-secondary mt-0.5 truncate">{session.title} — {session.time}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="min-w-11 min-h-11 inline-flex items-center justify-center rounded-xl text-secondary hover:text-primary hover:bg-input motion-safe:transition-colors motion-safe:duration-base disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95"
            aria-label={t("TEXT_CLOSE_ATTENDANCE_DIALOG")}
           data-testid="trainer_sessions-trainersessionsattendancemodal-button_1">
            <X size={18} aria-hidden="true"  strokeWidth={2}/>
          </button>
        </div>

        <div className="p-5 overflow-y-auto custom-scrollbar flex-1">
          {members.length === 0 ? (
            <div className="text-center py-10">
              <Users size={18} className="mx-auto text-disabled mb-3" aria-hidden="true"  strokeWidth={2}/>
              <p className="text-sm font-semibold text-primary">{t("TEXT_NO_MEMBERS_ENROLLED")}</p>
              <p className="text-xs text-secondary mt-1">{t("TEXT_CANNOT_MARK_ATTENDANCE_FOR_AN_EMPTY_SESSION")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-primary">{t("TEXT_ENROLLED_MEMBERS")}{members.length})</span>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  disabled={isSubmitting}
                  className="min-h-11 px-3 text-xs font-semibold text-primary hover:bg-primary-subtle rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:opacity-50 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"
                 data-testid="trainer_sessions-trainersessionsattendancemodal-button_2">
                  {allSelected ? t("TEXT_DESELECT_ALL") : t("TEXT_SELECT_ALL")}
                </button>
              </div>

              <div className="grid gap-2">
                {members.map((member) => {
                  const isPresent = attendedIds.has(member.id);
                  return (
                    <button
                      key={member.id}
                      type="button"
                      aria-pressed={isPresent}
                      disabled={isSubmitting}
                      onClick={() => handleToggleAttendance(member.id)}
                      className={`w-full flex items-center justify-between gap-3 min-h-11 p-3 rounded-xl border text-start motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:opacity-60 ${isPresent ? 'border-focus bg-surface-highlight' : 'border-border bg-input hover:border-focus'} motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95`}
                     data-testid={`trainer_sessions-session-attendance-member-${member.id}`}>
                      <span className="text-sm font-medium text-primary truncate">{member.name}</span>
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border ${isPresent ? 'bg-primary border-focus text-on-primary' : 'border-border text-transparent'}`} aria-hidden="true">
                        {isPresent && <Check size={18} strokeWidth={2} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-border bg-header flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="min-h-11 px-4 text-sm font-semibold text-secondary hover:text-primary hover:bg-input rounded-xl motion-safe:transition-colors motion-safe:duration-base disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95"
           data-testid="trainer_sessions-trainersessionsattendancemodal-button_4">
            {t("TEXT_CANCEL")}</button>
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={isSubmitting || members.length === 0}
            className="min-h-11 min-w-40 inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-bold text-on-primary bg-primary rounded-xl hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95"
           data-testid="trainer_sessions-trainersessionsattendancemodal-button_5">
            {isSubmitting && <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true"  strokeWidth={2}/>}
            {isSubmitting ? t("TEXT_SAVING_ATTENDANCE") : t("TEXT_SAVE_ATTENDANCE")}
          </button>
        </div>
      </div>
    </div>
  );
}
