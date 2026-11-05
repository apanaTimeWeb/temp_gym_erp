// RESPONSIBILITY: Renders ManagerMembersDirectoryContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { MANAGER_MEMBERS_DIRECTORY_API } from '@/app/frontend_manager/manager_members/members_directory/config/manager_members_directory.url_config';
import dynamic from 'next/dynamic';

import { useTranslations } from 'next-intl';

import ManagerToast from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryLocalToast';



import ManagerMembersDirectoryKPIs from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryKPIs';
import ManagerMembersDirectoryMessageModal from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryMessageModal';
import ManagerMembersDirectoryTable from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryTable';
import ManagerMembersDirectoryThermalReceipt from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryThermalReceipt';
import ManagerMembersDirectoryToolbar from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryToolbar';
import ManagerMembersDirectoryMemberProfile from '@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryMemberProfile';
import { useManagerMembersDirectoryLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLogic';

/**
 * @description Renders/orchestrates the ManagerMembersDirectoryContent user interface for the members module without owning sibling business logic.
 * @dependencies @/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryLocalToast; @/app/frontend_manager/manager_members/manager_members_components/manager_members_message_modal/ManagerMembersDirectoryMessageModal; @/app/frontend_manager/manager_members/manager_members_components/manager_members_table/ManagerMembersDirectoryTable; @/app/frontend_manager/manager_members/manager_members_components/manager_members_thermal_receipt/ManagerMembersDirectoryThermalReceipt
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const ManagerMembersDirectoryModal = dynamic(() => import('@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryModal'), { ssr: false });

const ManagerMembersDirectoryRenewModal = dynamic(() => import('@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryRenewModal'), { ssr: false });

const ManagerMembersDirectoryAddPaymentModal = dynamic(() => import('@/app/frontend_manager/manager_members/members_directory/components/ManagerMembersDirectoryAddPaymentModal'), { ssr: false });

/** @description Renders the ManagerMembersDirectoryContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (10 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export function ManagerMembersDirectoryContent() {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');

  const { toast, hideToast, msgModal, closeMsg, showToast, printData, isMemberProfileView } = useManagerMembersDirectoryLogic();

  return (
    <div className="min-h-full pb-10">
      <div className="print-hide">
        {!isMemberProfileView ? (
          <>
            
            <div className="p-6 space-y-5">
              <ManagerMembersDirectoryKPIs />
              <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:hover:-translate-y-1">
                <ManagerMembersDirectoryToolbar />
                <ManagerMembersDirectoryTable />
              </div>
            </div>
          </>
        ) : (
          <ManagerMembersDirectoryMemberProfile />
        )}

        <ManagerMembersDirectoryModal />
        <ManagerMembersDirectoryRenewModal />
        <ManagerMembersDirectoryAddPaymentModal />

        {msgModal?.open && (
          <ManagerMembersDirectoryMessageModal data-testid="manager_members-managermemberscontent-managermembersmessagemodal-2" whatsappUrlBuilder={(phone, message) => `${MANAGER_MEMBERS_DIRECTORY_API.INTEGRATIONS.WHATSAPP_WEB_BASE}/${phone}?text=${encodeURIComponent(message)}`} 
            open={msgModal.open}
            type={msgModal.type}
            recipient={msgModal.recipient}
            message={msgModal.message}
            onClose={closeMsg} 
          />
        )}

        {toast && <ManagerToast data-testid="manager_members-managermemberscontent-managertoast-3" message={toast.message} type={toast.type} onClose={hideToast} />}
      </div>

      {printData && (
        <ManagerMembersDirectoryThermalReceipt data={printData} />
      )}
    </div>
  );
}
