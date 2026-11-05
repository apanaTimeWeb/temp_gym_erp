// RESPONSIBILITY: Type contract extracted from SuperadminBillingCouponsCouponEditModal.tsx; no business behavior.
import type { Coupon, CouponFormData } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types';

export interface SuperadminBillingCouponsCouponEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    isSubmitting?: boolean;
  onSubmit: (id: string, data: Partial<CouponFormData>) => void;
    coupon: Coupon | null;
}
