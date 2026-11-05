// RESPONSIBILITY: Defines all TypeScript types for the Coupons module.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_coupons/coupons_management/types/AdminBillingCouponsManagementTypes.ts)

export type CouponType = 'percentage' | 'flat';
export type CouponStatus = 'active' | 'inactive' | 'expired';

export interface Coupon {
  id: string;
  code: string;
  description: string;
  type: CouponType;
  value: number;
  minOrderAmount: number;
  maxDiscount: number;
  usageLimit: number;
  usedCount: number;
  assignedGyms: string[];
  assignedGymNames: string[];
  validFrom: string;
  validUntil: string;
  status: CouponStatus;
  createdAt: string;
}

/** API write DTO: all monetary fields are integer minor currency units; percentage values remain percentage points. */
export type CouponWritePayload = Pick<Coupon, 'code' | 'description' | 'type' | 'value' | 'minOrderAmount' | 'maxDiscount' | 'usageLimit' | 'assignedGyms' | 'validFrom' | 'validUntil'>;

export interface CouponFormValues {
  code: string;
  description: string;
  type: CouponType;
  value: string;
  minOrderAmount: string;
  maxDiscount: string;
  usageLimit: string;
  assignedGyms: string[];
  validFrom: string;
  validUntil: string;
}

export interface CouponsKPIData {
  totalCoupons: number;
  activeCoupons: number;
  totalRedeemed: number;
  revenueLost: number;
}
export interface AdminCouponsQueryParams {
  page: number;
  limit: number;
  search?: string;
  status?: CouponStatus;
  dateRange?: string;
  startDate?: string;
  endDate?: string;
}
