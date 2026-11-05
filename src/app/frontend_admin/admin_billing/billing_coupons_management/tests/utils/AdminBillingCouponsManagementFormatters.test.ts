// RESPONSIBILITY: Defines regression tests for AdminBillingCouponsManagementFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_coupons/coupons_management/tests/utils/AdminBillingCouponsManagementFormatters.test.ts)

import { afterEach, describe, expect, it, vi } from "vitest";
import { formatNumber, getAdminBillingCouponsManagementUtcTodayKey } from "@/app/frontend_admin/admin_billing/billing_coupons_management/utils/AdminBillingCouponsManagementFormatters";

describe("AdminCouponsFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
});

afterEach(() => { vi.useRealTimers(); });

it('returns the current UTC day key for coupon expiration comparisons', () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-10-28T23:30:00.000Z'));
  expect(getAdminBillingCouponsManagementUtcTodayKey()).toBe('2026-10-28');
});
