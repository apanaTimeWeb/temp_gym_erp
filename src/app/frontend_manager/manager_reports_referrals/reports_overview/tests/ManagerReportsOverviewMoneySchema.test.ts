import { describe, expect, it } from 'vitest';

import { managerReportSummarySchema } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/schemas/manager_reports_overview.schemas';

describe('Reports API money schema', () => { it('rejects fractional minor-unit revenue', () => { const summary = { kpis: { totalRevenue: 1000, totalMembers: 4, avgAttendanceRate: 90, totalExpenses: 500, netProfit: 500, newMembersThisMonth: 1, churnRate: 0, activeMembers: 4 }, revenueData: [{ month: 'Oct', revenue: 1000, expenses: 500, profit: 500 }], attendanceData: [], memberChurnData: [], expenseBreakdown: [{ category: 'Other', amount: 500, percentage: 100 }] }; expect(managerReportSummarySchema.safeParse(summary).success).toBe(true); expect(managerReportSummarySchema.safeParse({ ...summary, kpis: { ...summary.kpis, totalRevenue: 1000.5 } }).success).toBe(false); }); });
