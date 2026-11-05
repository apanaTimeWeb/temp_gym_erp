// RESPONSIBILITY: Defines feature-local TypeScript contracts for coupons_management; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_coupons/coupons_management/types/AdminBillingCouponsManagementStoreTypes.ts)

// Type contract owned by this module; kept outside implementation files for AI isolation.

import type { CouponFormValues } from '@/app/frontend_admin/admin_billing/billing_coupons_management/types/AdminBillingCouponsManagementTypes';
export interface AdminCouponsStore {
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  editId: string | null;
  setEditId: (id: string | null) => void;
  form: CouponFormValues;
  setForm: (f: CouponFormValues) => void;
  search: string;
  setSearch: (s: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  dateRange: string;
  setDateRange: (s: string) => void;
}
