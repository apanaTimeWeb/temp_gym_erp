// RESPONSIBILITY: Regression tests for the sales memberships date/number formatting utilities.
// DATA FLOW: Controlled clock and typed date input → owning utility → deterministic assertion.

import { afterEach, describe, expect, it, vi } from 'vitest';
import { getAdminSalesMembershipsDaysLeft } from '@/app/frontend_admin/admin_sales/sales_memberships/utils/AdminSalesMembershipsFormatters';

afterEach(() => { vi.useRealTimers(); });

describe('getAdminSalesMembershipsDaysLeft', () => {
  it('preserves full 24-hour interval semantics for ISO expiry timestamps', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-10-28T12:00:00.000Z'));
    expect(getAdminSalesMembershipsDaysLeft('2026-10-29T12:00:00.000Z')).toBe(1);
    expect(getAdminSalesMembershipsDaysLeft('2026-10-27T12:00:00.000Z')).toBe(-1);
    expect(Number.isNaN(getAdminSalesMembershipsDaysLeft('not-an-expiry-date'))).toBe(true);
  });
  it('rejects impossible calendar dates instead of allowing Date.parse to normalize them', () => {
    for (const invalid of [
      '2026-02-30', '2025-02-29', '2026-04-31', '2026-13-01',
      '2026-00-10', '2026-01-00', '2026-02-30T12:00:00Z',
      '2026-11-15T25:00:00Z', 'Nov 15 2026', '2026-11-15junk',
    ]) {
      expect(Number.isNaN(getAdminSalesMembershipsDaysLeft(invalid))).toBe(true);
    }
  });

  it('preserves valid leap dates, ISO offset timestamps, and existing day arithmetic', () => {
    const observedAt = Date.parse('2024-02-28T12:00:00.000Z');
    expect(getAdminSalesMembershipsDaysLeft('2024-02-29T12:00:00.000Z', observedAt)).toBe(1);
    expect(getAdminSalesMembershipsDaysLeft('2024-02-29', observedAt)).toBe(0);
    expect(getAdminSalesMembershipsDaysLeft('2024-02-29T17:30:00+05:30', observedAt)).toBe(1);
    expect(getAdminSalesMembershipsDaysLeft('2024-02-29T07:00:00-05:00', observedAt)).toBe(1);
    expect(Number.isNaN(getAdminSalesMembershipsDaysLeft('2024-02-29', Number.NaN))).toBe(true);
  });
});
