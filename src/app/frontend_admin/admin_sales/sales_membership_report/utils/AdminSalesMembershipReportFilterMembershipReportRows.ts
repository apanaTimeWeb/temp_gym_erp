// RESPONSIBILITY: Filters Sales membership-report rows using the same search semantics as the module mock handler.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_sales/sales_membership_report/utils/AdminSalesAnalyticsFilterMembershipReportRows.ts)

import type { MembershipReportItem } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportTypes';

/** filterAdminSalesMembershipReportRows provides a feature-local utility used by the Admin module without introducing cross-feature business dependencies. @remarks Inputs and outputs stay explicitly typed and deterministic for tests and reuse inside this feature. @description Implements filterAdminSalesMembershipReportRows for the owning feature’s explicitly typed data. @param rows - Input used by this utility as declared by the signature. @param search - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function filterAdminSalesMembershipReportRows(rows: MembershipReportItem[], search: string): MembershipReportItem[] {
  const normalizedSearch = search.trim().toLowerCase();
  if (!normalizedSearch) return rows;
  return rows.filter((row) => [row.plan, row.name, row.id].some((value) => String(value ?? '').toLowerCase().includes(normalizedSearch)));
}
