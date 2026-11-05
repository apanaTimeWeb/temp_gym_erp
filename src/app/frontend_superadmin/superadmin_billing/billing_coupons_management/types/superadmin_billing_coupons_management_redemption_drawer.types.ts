// RESPONSIBILITY: Defines the prop contract for SuperadminBillingCouponsRedemptionDrawer.
import type { Coupon } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types';
export interface SuperadminBillingCouponsRedemptionDrawerProps {
  coupon: Coupon | null;
  isOpen: boolean;
  onClose: () => void;
}
