// RESPONSIBILITY: Stable, non-mutating membership report sorting consistent with the visible plan/name column.
import type { MembershipReportItem } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportTypes';
import type { AdminSalesMembershipSortKey } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportUiTypes';
import type { AdminSalesSortDirection } from '@/app/frontend_admin/admin_sales/sales_membership_report/types/AdminSalesMembershipReportSortTypes';

/** Sort by the same label displayed to the user, including API records that use `name` instead of `plan`. */
export function sortAdminSalesMembershipReportRows(
  rows: readonly MembershipReportItem[],
  sortKey: AdminSalesMembershipSortKey,
  sortDirection: AdminSalesSortDirection,
): MembershipReportItem[] {
  const getValue = (row: MembershipReportItem) => sortKey === 'plan' ? (row.plan ?? row.name) : row[sortKey];
  return [...rows].sort((left, right) => {
    const leftValue = getValue(left);
    const rightValue = getValue(right);
    const comparison = typeof leftValue === 'number' && typeof rightValue === 'number'
      ? leftValue - rightValue
      : String(leftValue ?? '').localeCompare(String(rightValue ?? ''), undefined, { numeric: true });
    return sortDirection === 'asc' ? comparison : -comparison;
  });
}
