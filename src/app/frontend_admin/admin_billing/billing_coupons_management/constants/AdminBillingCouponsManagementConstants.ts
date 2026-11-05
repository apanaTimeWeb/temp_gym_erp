// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_coupons/coupons_management/constants/AdminBillingCouponsManagementConstants.ts)

import type { Coupon, CouponsKPIData } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';


export const COUPON_TYPE_OPTIONS = [
  { value: 'percentage', labelKey: 'coupons.AdminCouponsCatalog.type.percentage' },
  { value: 'flat', labelKey: 'coupons.AdminCouponsCatalog.type.flat' },
] as const;


export const COUPON_DATE_RANGE_OPTIONS = [
  { value: 'all_time', labelKey: 'coupons.admin_coupons_toolbar.remaining_allTime' },
  { value: 'today', labelKey: 'coupons.AdminAuditRepair.today' },
  { value: 'this_week', labelKey: 'coupons.admin_coupons_toolbar.remaining_thisWeek' },
  { value: 'this_month', labelKey: 'coupons.admin_coupons_toolbar.remaining_thisMonth' },
  { value: 'custom', labelKey: 'coupons.admin_coupons_toolbar.remaining_customRange' },
] as const;

export const COUPON_STATUS = { ACTIVE: 'active', INACTIVE: 'inactive', EXPIRED: 'expired' } as const;

export const COUPON_STATUS_STYLES: Record<string, string> = {
  active: 'bg-success text-on-success',
  inactive: 'bg-warning-bg text-warning',
  expired: 'bg-danger text-on-danger',
};

export const COUPON_STATUS_LABEL_KEYS: Record<string, string> = {
  active: 'coupons.AdminCouponsCatalog.status.active',
  inactive: 'coupons.AdminCouponsCatalog.status.inactive',
  expired: 'coupons.AdminCouponsCatalog.status.expired',
};

export const COUPON_TABLE_HEADER_KEYS = [
  'coupons.AdminCouponsCatalog.table.code',
  'coupons.AdminCouponsCatalog.table.typeValue',
  'coupons.AdminCouponsCatalog.table.assignedGyms',
  'coupons.AdminCouponsCatalog.table.usage',
  'coupons.AdminCouponsCatalog.table.validUntil',
  'coupons.AdminCouponsCatalog.table.status',
  'coupons.AdminCouponsCatalog.table.actions',
] as const;

export const COUPON_STATUS_OPTIONS = [
  { value: 'all', labelKey: 'coupons.AdminCouponsCatalog.status.all' },
  { value: 'active', labelKey: 'coupons.AdminCouponsCatalog.status.active' },
  { value: 'inactive', labelKey: 'coupons.AdminCouponsCatalog.status.inactive' },
  { value: 'expired', labelKey: 'coupons.AdminCouponsCatalog.status.expired' },
] as const;

export const GYM_OPTIONS = [
  { value: 'all', labelKey: 'coupons.AdminCouponsCatalog.gyms.all' },
  { value: 'b1', labelKey: 'coupons.AdminCouponsCatalog.gyms.andheriEast' },
  { value: 'b2', labelKey: 'coupons.AdminCouponsCatalog.gyms.bandraWest' },
  { value: 'b3', labelKey: 'coupons.AdminCouponsCatalog.gyms.powai' },
  { value: 'b4', labelKey: 'coupons.AdminCouponsCatalog.gyms.thane' },
] as const;

export const COUPONS_ITEMS_PER_PAGE = 10;




export const EMPTY_COUPON_FORM = {
  code: '',
  description: '',
  type: 'percentage' as const,
  value: '',
  minOrderAmount: '0',
  maxDiscount: '0',
  usageLimit: '100',
  assignedGyms: ['all'],
  validFrom: '',
  validUntil: '',
};
