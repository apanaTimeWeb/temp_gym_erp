// RESPONSIBILITY: Type contract extracted from SuperadminBillingCouponsTable.tsx; no business behavior.
import type { Coupon, CouponStatus } from '@/app/frontend_superadmin/superadmin_billing/billing_coupons_management/types/superadmin_billing_coupons_management.types';

export interface SuperadminBillingCouponsTableProps {
    coupons: Coupon[];
    onToggleStatus: (id: string, currentStatus: CouponStatus) => void;
    onEdit: (coupon: Coupon) => void;
    onDelete: (id: string) => void;
    onRestore: (id: string) => void;
    onCreateClick: () => void;
}
