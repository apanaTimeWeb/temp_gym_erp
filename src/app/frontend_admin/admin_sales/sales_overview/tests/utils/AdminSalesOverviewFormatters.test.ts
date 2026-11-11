// RESPONSIBILITY: Defines regression tests for AdminSalesAnalyticsFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_sales/sales_overview/tests/utils/AdminSalesAnalyticsFormatters.test.ts)

import { describe, expect, it } from "vitest";
import { formatDate, formatKPI, formatNumber } from "@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewFormatters";

describe("AdminSalesFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
  it("formats KPI values compactly", () => { expect(formatKPI(125000, "en-IN")).toMatch(/125|1\.3L|1\.25L/); });
});

it('formats dates using the requested locale', () => { expect(formatDate('2026-01-05T00:00:00Z', 'en-IN')).toMatch(/05 Jan 2026|5 Jan 2026/); });
