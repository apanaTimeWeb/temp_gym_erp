// RESPONSIBILITY: Defines regression tests for AdminDashboardOverviewFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_dashboard/dashboard_overview/tests/utils/AdminDashboardOverviewFormatters.test.ts)

import { describe, expect, it } from "vitest";
import { formatAdminDashboardMonthLabel, formatDate, formatKPI, formatNumber, formatWeekday } from "@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewFormatters";

describe("AdminDashboardFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
  it("formats KPI values compactly", () => { expect(formatKPI(125000, "en-IN")).toMatch(/125/); });
});

it('formats dates and weekdays using the requested locale', () => { expect(formatDate('2026-01-05T00:00:00Z', 'en-IN')).toMatch(/05 Jan 2026|5 Jan 2026/); expect(formatWeekday('2026-01-05T00:00:00Z', 'en-IN')).toMatch(/[A-Za-z]{3}/); });

it('formats month labels with the active locale and preserves an unparseable value', () => { expect(formatAdminDashboardMonthLabel('Jan', 'en-IN')).toBe('Jan'); expect(formatAdminDashboardMonthLabel('invalid-month', 'en-IN')).toBe('invalid-month'); });
