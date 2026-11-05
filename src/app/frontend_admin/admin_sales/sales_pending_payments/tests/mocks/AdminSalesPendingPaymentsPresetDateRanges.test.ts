// Unit coverage for pending-payments date presets with deterministic controlled time.
import { describe, expect, it } from 'vitest';
import { getAdminSalesPendingPaymentsPresetDateRange } from '@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsDateRangeUtils';
describe('pending-payments mock date windows',()=>{
  it('distinguishes this month, last month and year',()=>{
    const clock=new Date('2026-11-15T12:00:00');
    expect(getAdminSalesPendingPaymentsPresetDateRange('this_month',clock)).toEqual({startDate:'2026-11-01',endDate:'2026-11-30'});
    expect(getAdminSalesPendingPaymentsPresetDateRange('last_month',clock)).toEqual({startDate:'2026-10-01',endDate:'2026-10-31'});
    expect(getAdminSalesPendingPaymentsPresetDateRange('this_year',clock)).toEqual({startDate:'2026-01-01',endDate:'2026-12-31'});
  });
});
