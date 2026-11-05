// RESPONSIBILITY: Type contract extracted from SuperadminCommunicationBroadcastsBroadcastModal.tsx; no business behavior.
import type { BroadcastFormData } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/types/superadmin_communication_broadcasts_campaigns.types';
import type { UseFormReturn } from 'react-hook-form';



export interface SuperadminCommunicationBroadcastsBroadcastModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: UseFormReturn<BroadcastFormData>;
    onSubmit: (data: BroadcastFormData) => void;
    isEditMode?: boolean;
    isMutating?: boolean;
}
