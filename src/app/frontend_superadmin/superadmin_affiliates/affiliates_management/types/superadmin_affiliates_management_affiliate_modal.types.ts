// RESPONSIBILITY: Type contract extracted from SuperadminAffiliatesAffiliateModal.tsx; no business behavior.
import type { AffiliateFormData } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/types/superadmin_affiliates_management.types';
import type { UseFormReturn } from 'react-hook-form';



export interface SuperadminAffiliatesAffiliateModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: UseFormReturn<AffiliateFormData>;
    onSubmit: (data: AffiliateFormData) => void;
    isEdit?: boolean;
    isMutating?: boolean;
}
