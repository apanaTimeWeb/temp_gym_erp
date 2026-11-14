// RESPONSIBILITY: Defines regression tests for AdminSalesAnalyticsFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_pending_sales_payments/tests/utils/AdminSalesAnalyticsFormatters.test.ts)

import { afterEach, describe, expect, it, vi } from "vitest";
import { formatDate, formatKPI, formatNumber, getAdminSalesPendingPaymentsCurrentUtcTimestamp } from "@/app/frontend_admin/admin_sales/sales_pending_payments/utils/AdminSalesPendingPaymentsFormatters";

describe("AdminSalesFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
  it("formats KPI values compactly", () => { expect(formatKPI(125000, "en-IN")).toMatch(/125|1\.3L|1\.25L/); });
});

it('formats dates using the requested locale', () => { expect(formatDate('2026-01-05T00:00:00Z', 'en-IN')).toMatch(/05 Jan 2026|5 Jan 2026/); });

afterEach(() => { vi.useRealTimers(); });

it('returns the current receipt timestamp in UTC ISO format', () => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-10-28T14:00:00.000Z'));
  expect(getAdminSalesPendingPaymentsCurrentUtcTimestamp()).toBe('2026-10-28T14:00:00.000Z');
});
