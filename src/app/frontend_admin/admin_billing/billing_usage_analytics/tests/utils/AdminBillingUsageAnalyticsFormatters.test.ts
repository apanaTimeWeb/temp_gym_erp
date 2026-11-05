// RESPONSIBILITY: Defines regression tests for AdminBillingUsageAnalyticsFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_usage/usage_analytics/tests/utils/AdminBillingUsageAnalyticsFormatters.test.ts)

import { describe, expect, it } from "vitest";
import { formatDate, formatNumber } from "@/app/frontend_admin/admin_billing/billing_usage_analytics/utils/AdminBillingUsageAnalyticsFormatters";

describe("AdminUsageFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
});

it('formats dates using the requested locale', () => { expect(formatDate('2026-01-05T00:00:00Z', 'en-IN')).toMatch(/05 Jan 2026|5 Jan 2026/); });
