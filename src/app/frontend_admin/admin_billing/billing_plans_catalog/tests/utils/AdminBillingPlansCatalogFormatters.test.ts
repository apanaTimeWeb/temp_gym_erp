// RESPONSIBILITY: Defines regression tests for AdminBillingPlansCatalogFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_plans/plans_catalog/tests/utils/AdminBillingPlansCatalogFormatters.test.ts)

import { describe, expect, it } from "vitest";
import { formatKPI, formatNumber, formatPercent1dp } from "@/app/frontend_admin/admin_billing/billing_plans_catalog/utils/AdminBillingPlansCatalogFormatters";

describe("AdminPlansFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
  it("formats one-decimal percentages without inventing a symbol", () => { expect(formatPercent1dp(12.34, "en-IN")).toBe("12.3"); });
  it("formats KPI values compactly", () => { expect(formatKPI(125000, "en-IN")).toMatch(/125/); });
});
