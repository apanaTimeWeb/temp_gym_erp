// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
'use client';
import { Loader2, X, Save } from 'lucide-react';
import { useTranslations } from 'next-intl';



import ManagerMembersDirectoryMemberProfilePictureUpload from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryMemberProfilePictureUpload';
import ManagerMembersDirectoryModalIdentityFields from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryModalIdentityFields';
import ManagerMembersDirectoryModalMembershipFields from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryModalMembershipFields';
import { useManagerMembersDirectoryLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLogic';
import { useManagerMembersDirectoryModalForm } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryModalForm';
import { useFetchPlans } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryQueries';


/** @description Renders the ManagerMembersDirectoryModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (10 documented module/import dependencies).. @edge-case Preserves error state, modal lifecycle. */
export default function ManagerMembersDirectoryModal() {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');

  const {
    showAddModal, setShowAddModal, editId, editData,
    saveMember
  } = useManagerMembersDirectoryLogic();

  const { data: plansData } = useFetchPlans();
  const plans = plansData || [];

  const formState = useManagerMembersDirectoryModalForm(editData, showAddModal, plans, setShowAddModal, saveMember, editId);
  const { useFormReturn, handleSubmit, handleClose, isSubmitting } = formState;

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4 overflow-y-auto">
      <div className="my-auto bg-overlay rounded-2xl shadow-dialog w-full max-w-2xl max-h-dialog-desktop flex flex-col overflow-hidden border-2 border-warning" role="dialog" aria-modal="true" aria-labelledby="managermembersmodal-dialog-title">
        <div className="sticky top-0 px-8 py-5 border-b border-border bg-overlay flex items-center justify-between z-20 shrink-0">
          <h3 className="text-xl font-bold text-text-primary" id="managermembersmodal-dialog-title">{editId ? t("TEXT_EDIT_MEMBER") : t("TEXT_ADD_NEW_MEMBER")}</h3>
          <button data-testid="manager_members-manager-members-modal-close-1"
            type="button"
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-primary-subtle motion-safe:transition-all text-text-secondary hover:text-primary motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
            aria-label={t("COPY_CLOSE_MODAL")}
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <form data-testid="manager_members-managermembersmodal-form-1" onSubmit={handleSubmit} className="p-6 overflow-y-auto custom-scrollbar flex-1 min-h-0">
          
          {/* Profile Picture Upload — extracted component (Rule 1: file size ceiling) */}
          <ManagerMembersDirectoryMemberProfilePictureUpload />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            <ManagerMembersDirectoryModalIdentityFields formState={formState} editId={editId} />
            <ManagerMembersDirectoryModalMembershipFields formState={formState} editId={editId} plans={plans} />
          </div>
          
          <div className="sticky bottom-0 bg-overlay border-t border-border pt-4 pb-2 flex justify-end gap-3 z-10 shrink-0 mt-4">
            <button data-testid="manager_members-manager-members-modal-close-2"
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-border text-text-secondary hover:bg-primary-subtle hover:text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
            >{t("COPY_CANCEL_3")}</button>
            <button data-testid="manager_members-manager-members-modal-button-submit"
              type="submit"
              disabled={isSubmitting}
              className="min-w-32 px-8 py-2.5 rounded-xl text-sm font-bold text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all hover:shadow-card hover:shadow-card motion-safe:active:scale-95 bg-primary motion-safe:duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"
            >
              {(() => { if (isSubmitting) { return (
                <Loader2 size={18} strokeWidth={2} className="text-on-primary motion-safe:animate-spin" />
              ); } return (
                <><Save size={18} strokeWidth={2}/> {editId ? t("TEXT_UPDATE_MEMBER") : t("TEXT_ADD_MEMBER")}</>
              ); })()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
