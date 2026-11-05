// RESPONSIBILITY: Type contract extracted from SuperadminBillingCouponsCouponModal.tsx; no business behavior.
import type { CouponFormData } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types';
import type { UseFormReturn } from 'react-hook-form';



export interface SuperadminBillingCouponsCouponModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: UseFormReturn<CouponFormData>;
    isSubmitting?: boolean;
  onSubmit: (data: CouponFormData) => void;
}
