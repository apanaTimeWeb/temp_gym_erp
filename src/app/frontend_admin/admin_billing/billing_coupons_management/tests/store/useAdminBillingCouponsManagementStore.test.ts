// RESPONSIBILITY: Defines regression tests for useAdminBillingCouponsManagementStore.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_coupons/coupons_management/tests/store/useAdminBillingCouponsManagementStore.test.ts)

import { beforeEach, describe, expect, it } from 'vitest';
import { COUPON_STATUS_OPTIONS } from '@/app/frontend_admin/admin_billing/billing_coupons_management/constants/AdminBillingCouponsManagementConstants';
import { useAdminCouponsStore } from '@/app/frontend_admin/admin_billing/billing_coupons_management/state/useAdminBillingCouponsManagementStore';

describe('useAdminCouponsStore', () => {
  beforeEach(() => useAdminCouponsStore.setState({ currentPage: 4, showModal: false, editId: null, search: '', statusFilter: 'all', dateRange: 'all_time' }));

  it('resets pagination for search, status, and date filters', () => {
    useAdminCouponsStore.getState().setSearch('SAVE');
    expect(useAdminCouponsStore.getState().currentPage).toBe(1);
    useAdminCouponsStore.setState({ currentPage: 2 });
    useAdminCouponsStore.getState().setStatusFilter(COUPON_STATUS_OPTIONS[1]?.value ?? COUPON_STATUS_OPTIONS[0]?.value ?? '');
    expect(useAdminCouponsStore.getState().currentPage).toBe(1);
    useAdminCouponsStore.setState({ currentPage: 3 });
    useAdminCouponsStore.getState().setDateRange('this_month');
    expect(useAdminCouponsStore.getState().currentPage).toBe(1);
  });

  it('tracks add/edit modal state', () => {
    const store = useAdminCouponsStore.getState();
    store.setEditId('coupon-12');
    store.setShowModal(true);
    expect(useAdminCouponsStore.getState()).toMatchObject({ editId: 'coupon-12', showModal: true });
  });
});
