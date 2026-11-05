// RESPONSIBILITY: Defines regression tests for AdminFinanceRevenueReportFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_revenue_report/tests/utils/AdminFinanceRevenueReportFormatters.test.ts)

import { describe, expect, it } from "vitest";
import { formatNumber, formatPercent1dp } from "@/app/frontend_admin/admin_finance/finance_revenue_report/utils/AdminFinanceRevenueReportFormatters";

describe("AdminReportsFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
  it("formats one-decimal percentages without inventing a symbol", () => { expect(formatPercent1dp(12.34, "en-IN")).toBe("12.3"); });
});
