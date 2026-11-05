// RESPONSIBILITY: Invalid expiry timestamps must not appear as fabricated day-count or expired status.
import { describe, expect, it } from 'vitest';
import { getAdminSalesMembershipsDaysLeft } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsFormatters';

describe('invalid membership expiry', () => {
  it('does not manufacture a numeric day count from malformed input', () => {
    expect(Number.isFinite(getAdminSalesMembershipsDaysLeft('invalid'))).toBe(false);
    expect(Number.isFinite(getAdminSalesMembershipsDaysLeft(''))).toBe(false);
    expect(Number.isFinite(getAdminSalesMembershipsDaysLeft('2026-02-30'))).toBe(false);
    expect(Number.isFinite(getAdminSalesMembershipsDaysLeft('2025-02-29T08:00:00Z'))).toBe(false);
  });
});
