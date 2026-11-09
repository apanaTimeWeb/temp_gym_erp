// RESPONSIBILITY: Renders ManagerInquiriesPipelineContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';

import ManagerToast from '@/components/ui/manager_toast/ManagerToast';

import ManagerInquiriesPipelineBulkMessageModal from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineBulkMessageModal';
import ManagerInquiriesPipelineConvertLeadModal from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineConvertLeadModal';
import ManagerInquiriesPipelineKPIs from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineKPIs';
import ManagerInquiriesPipelineMessageModal from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineMessageModal';
import ManagerInquiriesPipelineModal from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineModal';
import ManagerInquiriesPipelineTable from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineTable';
import ManagerInquiriesPipelineToolbar from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/components/ManagerInquiriesPipelineToolbar';
import { useManagerInquiriesPipelineLogic } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/hooks/useManagerInquiriesPipelineLogic';


/** @description Renders the ManagerInquiriesPipelineContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (10 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export function ManagerInquiriesPipelineContent() {
  const t = useTranslations('MANAGER_INQUIRIES_PIPELINE');

  const { toast, hideToast, msgModal, closeMsg, showToast, bulkMsgModal, closeBulkMsg, clearSelection } = useManagerInquiriesPipelineLogic();

  return (
    <div className="min-h-full pb-10">
      
      <div className="p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{t('COPY_INQUIRIES')}</h1>
        </div>
        <ManagerInquiriesPipelineKPIs />
        <div className="space-y-4">
          <ManagerInquiriesPipelineToolbar />
          <ManagerInquiriesPipelineTable />
        </div>
      </div>

      <ManagerInquiriesPipelineModal />
      <ManagerInquiriesPipelineConvertLeadModal />

      {msgModal?.open && (
        <ManagerInquiriesPipelineMessageModal data-testid="manager_inquiries-managerinquiriescontent-managerinquiriesmessagemodal-2"
          open={msgModal.open}
          type={msgModal.type}
          recipient={msgModal.recipient}
          message={msgModal.message}
          onClose={closeMsg}
        />
      )}

      {bulkMsgModal?.open && (
        <ManagerInquiriesPipelineBulkMessageModal data-testid="manager_inquiries-managerinquiriescontent-managerinquiriesbulkmessagemodal-3"
          open={bulkMsgModal.open}
          type={bulkMsgModal.type}
          recipients={bulkMsgModal.recipients}
          onClose={() => { closeBulkMsg(); clearSelection(); }}
        />
      )}

      {toast && <ManagerToast data-testid="manager_inquiries-managerinquiriescontent-managertoast-4" message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
