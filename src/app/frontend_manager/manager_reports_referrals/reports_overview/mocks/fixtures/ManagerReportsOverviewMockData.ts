import type { ReportSummary } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/types/manager_reports_overview.types';

/**
 * @description Provides the ManagerReportsOverviewMockData implementation for the reports module.
 * @dependencies @/app/frontend_manager/manager_reports_referrals/manager_reports_types/ManagerReportsOverviewTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_REPORT_SUMMARY: ReportSummary = {
  kpis: {
    totalRevenue: 150000000,
    totalMembers: 450,
    avgAttendanceRate: 65,
    totalExpenses: 250000,
    netProfit: 1250000,
    newMembersThisMonth: 25,
    churnRate: 2.5,
    activeMembers: 420 },
  revenueData: [
    { month: 'Jan', revenue: 11000000, expenses: 2000000, profit: 9000000 },
    { month: 'Feb', revenue: 11500000, expenses: 2200000, profit: 9300000 },
    { month: 'Mar', revenue: 12000000, expenses: 2100000, profit: 9900000 },
    { month: 'Apr', revenue: 11800000, expenses: 2500000, profit: 9300000 },
    { month: 'May', revenue: 12500000, expenses: 2000000, profit: 10500000 },
  ],
  attendanceData: [
    { date: 'Mon', present: 150, absent: 50, rate: 75 },
    { date: 'Tue', present: 140, absent: 60, rate: 70 },
    { date: 'Wed', present: 160, absent: 40, rate: 80 },
    { date: 'Thu', present: 130, absent: 70, rate: 65 },
    { date: 'Fri', present: 170, absent: 30, rate: 85 },
  ],
  memberChurnData: [
    { month: 'Jan', newMembers: 30, churned: 10, active: 400 },
    { month: 'Feb', newMembers: 25, churned: 12, active: 413 },
    { month: 'Mar', newMembers: 35, churned: 8, active: 440 },
  ],
  expenseBreakdown: [
    { category: 'Rent', amount: 10000000, percentage: 40 },
    { category: 'Salaries', amount: 9000000, percentage: 36 },
    { category: 'Equipment Maintenance', amount: 3500000, percentage: 14 },
    { category: 'Utilities', amount: 2500000, percentage: 10 },
  ]
};
