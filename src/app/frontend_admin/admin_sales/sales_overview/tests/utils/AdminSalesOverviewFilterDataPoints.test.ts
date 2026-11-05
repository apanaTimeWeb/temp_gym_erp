import { describe, expect, it } from 'vitest';
import type { OverviewDataPoint } from '@/app/frontend_admin/admin_sales/sales_overview/types/AdminSalesOverviewTypes';
import { filterAdminSalesOverviewDataPoints } from '@/app/frontend_admin/admin_sales/sales_overview/utils/AdminSalesOverviewFilterDataPoints';

const points: OverviewDataPoint[] = [{ date: '2026-08', revenue: 1000, newMembers: 5 }, { date: '2026-09', revenue: 1800, newMembers: 8 }];
describe('filterAdminSalesOverviewDataPoints', () => {
  it('filters by the chart period key', () => expect(filterAdminSalesOverviewDataPoints(points, '2026-09')).toEqual([points[1]]));
  it('returns all points for blank search', () => expect(filterAdminSalesOverviewDataPoints(points, ' ')).toEqual(points));
});
