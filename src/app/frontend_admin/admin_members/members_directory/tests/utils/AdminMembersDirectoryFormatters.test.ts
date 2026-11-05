// RESPONSIBILITY: Defines regression tests for AdminMembersDirectoryFormatters.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_members/members_directory/tests/utils/AdminMembersDirectoryFormatters.test.ts)

import { describe, expect, it } from "vitest";
import { formatDate, formatNumber } from "@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryFormatters";

describe("AdminMembersFormatters", () => {
  it("formats numbers with the supplied locale", () => { expect(formatNumber(123456, "en-IN")).toBe("1,23,456"); });
  it("formats dates deterministically for the supplied locale", () => { expect(formatDate("2026-01-05", "en-IN")).toContain("Jan"); });
});
