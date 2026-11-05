// RESPONSIBILITY: Defines regression tests for AdminFinanceStaffLedgerManagementFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_staff_ledger_management/tests/utils/AdminFinanceStaffLedgerManagementFormatters.test.ts)

import { describe, expect, it } from "vitest";
import { formatDate, formatDecimal, formatNumber, formatPercent1dp } from "@/app/frontend_admin/admin_finance/finance_staff_ledger_management/utils/AdminFinanceStaffLedgerManagementFormatters";

describe("AdminFinanceStaffLedgerManagementFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
  it("formats one-decimal percentages without inventing a symbol", () => { expect(formatPercent1dp(12.34, "en-IN")).toBe("12.3"); });
  it("formats decimal metrics with one decimal", () => { expect(formatDecimal(4.56, "en-IN")).toBe("4.6"); });
});

it('formats dates using the requested locale', () => { expect(formatDate('2026-01-05T00:00:00Z', 'en-IN')).toMatch(/05 Jan 2026|5 Jan 2026/); });
