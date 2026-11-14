// RESPONSIBILITY: Defines regression tests for AdminFinanceOverviewFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_expenses/tests/utils/AdminFinanceOverviewFormatters.test.ts)

import { describe, expect, it } from "vitest";
import { formatDate, formatKPI, formatPercent1dp } from "@/app/frontend_admin/admin_finance/finance_expenses/utils/AdminFinanceExpensesFormatters";

describe("AdminFinanceFormatters", () => {
  it("formats one-decimal percentages without inventing a symbol", () => { expect(formatPercent1dp(12.34, "en-IN")).toBe("12.3"); });
  it("formats KPI values compactly", () => { expect(formatKPI(125000, "en-IN")).toMatch(/125|1\.3L|1\.25L/); });
});

it('formats dates using the requested locale', () => { expect(formatDate('2026-01-05T00:00:00Z', 'en-IN')).toMatch(/05 Jan 2026|5 Jan 2026/); });
