// RESPONSIBILITY: Filters chart data owned by the Sales Overview workflow.
import type { OverviewDataPoint } from '@/app/frontend_admin/admin_sales/sales_overview/types/AdminSalesOverviewTypes';

export function filterAdminSalesOverviewDataPoints(rows: OverviewDataPoint[], search: string): OverviewDataPoint[] {
  const query = search.trim().toLowerCase();
  if (!query) return rows;
  return rows.filter((point) => point.date.toLowerCase().includes(query));
}
