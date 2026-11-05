"use client";
// RESPONSIBILITY: Displays trainer notes and owns the note-entry UI; mutation behavior is delegated to the Members mutation hook.
import { useState, useRef } from 'react';

import { Loader2, Plus, X } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { TrainerInfrastructureUserSafeError } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileTrainerInfrastructureUserSafeError';

import { useTrainerInfrastructureFeedback } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/TrainerMembersDirectoryAndProfileuseTrainerInfrastructureFeedback';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/TrainerMembersDirectoryAndProfileuseTrainerInfrastructureIdempotencyKey';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/TrainerMembersDirectoryAndProfileuseTrainerInfrastructureUnsavedChangesGuard';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/TrainerMembersDirectoryAndProfileuseTrainerInfrastructureDialogFocusTrap';

import { useTrainerMembersMutations } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileMutations';

import { useTrainerMembersSelectedMember } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileSelectedMember';

import { TrainerMembersFormatDate } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/utils/TrainerMembersDirectoryAndProfileDisplayFormatters';













/**
 * @description Displays trainer notes and owns the note-entry UI; mutation behavior is delegated to the Members mutation hook.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the members feature UI responsibility represented by TrainerMembersProfileNotes, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersProfileNotes() {
  const t = useTranslations('TRAINER_MEMBERS');
  const locale = useLocale();
  const dialogRef = useRef<HTMLDivElement>(null);
  const { member: selectedMember } = useTrainerMembersSelectedMember();
  const { addNote, addNotePending, addNoteIsError, addNoteError } = useTrainerMembersMutations();
  const [noteText, setNoteText] = useState('');
  const [open, setOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const lastPayload = useRef<string | null>(null);
  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(open && isDirty && !addNotePending);
  const { showSuccess, showError } = useTrainerInfrastructureFeedback();
  useTrainerInfrastructureDialogFocusTrap({ isOpen: open, dialogRef, onEscape: () => void guardNavigation(() => setOpen(false)) });
  if (!selectedMember) return null;
  const notes = selectedMember.trainerNotes || [];
  const submit = async () => {
    const text = noteText.trim();
    if (!text) return;
    const actionId = `add-member-note-${selectedMember.id}`;
    try {
      const fingerprint = JSON.stringify({ memberId: selectedMember.id, text });
      if (lastPayload.current !== null && lastPayload.current !== fingerprint) actionKeys.clear(actionId);
      lastPayload.current = fingerprint;
      const response = await addNote({ memberId: selectedMember.id, text, idempotencyKey: actionKeys.begin(actionId) });
      showSuccess(response.message, actionId);
      actionKeys.clear(actionId);
      setNoteText('');
      setIsDirty(false);
      setOpen(false);
    } catch (error) { showError(error, actionId); }
  };
  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between gap-3 ">
        <h3 className="text-lg font-bold text-primary ">{t("TEXT_TRAINER_NOTES")}</h3>
        <button type="button" onClick={() => { setNoteText(''); setIsDirty(false); setOpen(true); }} className="min-h-11 inline-flex items-center gap-2 px-4 py-2 bg-primary text-on-primary text-sm font-semibold rounded-lg hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermembersprofilenotes-button_1"><Plus size={18}  strokeWidth={2}/>{t("TEXT_ADD_NOTE")}</button>
      </div>
      {notes.length === 0 ? (
        <div className="text-secondary p-4 bg-input rounded-xl border border-border ">{t("TEXT_NO_NOTES_HAVE_BEEN_ADDED_FOR_THIS_MEMBER_YET")}</div>
      ) : notes.map(note => (
        <div key={note.id} className="p-4 bg-card border border-border rounded-xl ">
          <div className="text-xs text-secondary mb-1 ">{TrainerMembersFormatDate(note.date, locale)}</div>
          <p className="text-sm text-primary ">{note.text}</p>
        </div>
      ))}
      {open && (
        <div className="fixed inset-0 z-40 bg-overlay-backdrop flex items-center justify-center p-4 " role="presentation">
          <div className="w-full max-w-md bg-overlay border border-border rounded-xl shadow-dialog p-5 " ref={dialogRef} role="dialog" aria-modal={true} aria-labelledby="trainer-member-note-title">
            <div className="flex items-center justify-between mb-4 "><h4 id="trainer-member-note-title" className="font-semibold text-primary ">{t("TEXT_ADD_TRAINER_NOTE")}</h4><button type="button" aria-label={t("TEXT_CLOSE_ADD_NOTE_DIALOG")} onClick={() => void guardNavigation(() => setOpen(false))} className="min-w-11 min-h-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermembersprofilenotes-button_2"><X size={18}  strokeWidth={2}/></button></div>
            <label htmlFor="trainer-member-note" className="block text-sm font-medium text-secondary mb-1 ">{t("TEXT_NOTE")}</label>
            <textarea id="trainer-member-note" value={noteText} onChange={e => { setNoteText(e.target.value); setIsDirty(Boolean(e.target.value)); }} rows={5} aria-describedby="trainer-member-note-help" className="w-full bg-input border border-border rounded-lg p-3 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring  motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"  data-testid="trainer_members-trainermembersprofilenotes-textarea_3"/>
            <p id="trainer-member-note-help" className="text-xs text-secondary mt-1 ">{t("TEXT_ADD_A_PRIVATE_COACHING_NOTE_FOR_THIS_MEMBER")}</p>
            {addNoteIsError && <p role="alert" className="text-xs text-danger mt-2 " data-testid="trainer_members-members-profile_notes_control">{TrainerInfrastructureUserSafeError(addNoteError, t('TEXT_GENERIC_REQUEST_ERROR'))}</p>}
            <div className="flex justify-end gap-2 mt-5 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"><button type="button" onClick={() => void guardNavigation(() => setOpen(false))} className="min-h-11 px-4 py-2 border border-border rounded-lg text-secondary hover:bg-primary-subtle motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermembersprofilenotes-button_4">{t("TEXT_CANCEL")}</button><button type="button" onClick={() => void submit()} disabled={!noteText.trim() || addNotePending} className="min-h-11 min-w-28 px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold motion-safe:transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page " data-testid="trainer_members-trainermembersprofilenotes-button_5">{addNotePending ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t("TEXT_SAVING")}</> : t("TEXT_SAVE_NOTE")}</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
