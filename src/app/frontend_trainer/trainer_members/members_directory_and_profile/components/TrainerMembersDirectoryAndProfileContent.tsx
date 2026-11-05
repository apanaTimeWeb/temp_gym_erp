"use client";
// RESPONSIBILITY: Owns the Members list/profile screen boundary while URL state identifies the selected record and profile view.
import TrainerMembersKPIs from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileKPIs';
import TrainerMembersMessageModal from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileMessageModal';
import TrainerMembersProfileView from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileProfileView';
import TrainerMembersTable from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileTable';
import TrainerMembersToolbar from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/components/TrainerMembersDirectoryAndProfileToolbar';
import { useTrainerMembersSelectedMember } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileSelectedMember';
import { useTrainerMembersViewState } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/hooks/useTrainerMembersDirectoryAndProfileViewState';
import { useTranslations } from 'next-intl';
import { useTrainerMembersStore } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/state/useTrainerMembersDirectoryAndProfileStore';
import type { TrainerMembersProfileTab } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/types/TrainerMembersDirectoryAndProfileProfileTypes';

/** URL is the source of truth for the selected member and view; TanStack Query continues to own profile data. */
export default function TrainerMembersContent() {
  const t = useTranslations('TRAINER_MEMBERS');
  const msgModal = useTrainerMembersStore((state) => state.msgModal);
  const closeMsg = useTrainerMembersStore((state) => state.closeMsg);
  const viewState = useTrainerMembersViewState();
  const selectedMemberQuery = useTrainerMembersSelectedMember();
  const { member: selectedMember, memberId: storeMemberId, isPending, isError, refetch } = selectedMemberQuery;
  const routeMemberId = viewState.memberId;
  const isSelectionSyncing = viewState.isProfileView && storeMemberId !== routeMemberId;
  const hasMatchingRecordIdentity = Boolean(selectedMember && selectedMember.id === routeMemberId);

  return (
    <div className="min-h-full pb-10 print-hide">
      {viewState.isProfileView ? (
        isSelectionSyncing || isPending ? (
          <div className="p-6" role="status" aria-live="polite" aria-busy="true" data-testid="trainer_members-profile-loading">
            <div className="rounded-xl border border-border bg-card p-6 text-secondary">{t('TEXT_LOADING_MEMBER_PROFILE')}</div>
          </div>
        ) : isError ? (
          <div className="p-6" role="alert" data-testid="trainer_members-profile-error">
            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <p className="text-primary font-semibold">{t('TEXT_MEMBER_PROFILE_LOAD_FAILED')}</p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => void refetch()} className="min-h-11 px-4 rounded-lg bg-primary text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_RETRY')}</button>
                <button type="button" onClick={viewState.backToList} className="min-h-11 px-4 rounded-lg border border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_BACK_TO_MEMBERS')}</button>
              </div>
            </div>
          </div>
        ) : hasMatchingRecordIdentity ? (
          <TrainerMembersProfileView
            activeView={viewState.view as TrainerMembersProfileTab}
            onBackToList={viewState.backToList}
            onSelectView={viewState.setProfileView}
          />
        ) : (
          <div className="p-6" role="status" data-testid="trainer_members-profile-not-found">
            {t('TEXT_MEMBER_PROFILE_UNAVAILABLE')} <button type="button" onClick={viewState.backToList} className="underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">{t('TEXT_BACK_TO_MEMBERS')}</button>
          </div>
        )
      ) : (
        <div className="p-6 space-y-5">
          <TrainerMembersKPIs />
          <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
            <TrainerMembersToolbar />
            <TrainerMembersTable onOpenMember={viewState.openMember} />
          </div>
        </div>
      )}

      {msgModal?.open && (
        <TrainerMembersMessageModal
          open={msgModal.open}
          type={msgModal.type}
          recipient={msgModal.recipient}
          message={msgModal.message}
          onClose={closeMsg}
          onSuccess={closeMsg}
        />
      )}
    </div>
  );
}
