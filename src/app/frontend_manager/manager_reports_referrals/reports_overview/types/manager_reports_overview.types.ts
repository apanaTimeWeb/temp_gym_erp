// RESPONSIBILITY: All TypeScript types for the Manager Reports module.

export type ReportTab = 'Revenue' | 'Attendance' | 'Members' | 'Expenses' | 'Trainers';

export interface TrainerPerformanceItem {
  id: string;
  trainerName: string;
  specialization: string;
  activeClients: number;
  sessionsCompleted: number;
  completionRate: number;
  avgRating: number;
  revenueGenerated: number;
  retentionRate: number;
}

export interface ReportKPIData {
  totalRevenue: number;
  totalMembers: number;
  avgAttendanceRate: number;
  totalExpenses: number;
  netProfit: number;
  newMembersThisMonth: number;
  churnRate: number;
  activeMembers: number;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface AttendanceDataPoint {
  date: string;
  present: number;
  absent: number;
  rate: number;
}

export interface MemberChurnDataPoint {
  month: string;
  newMembers: number;
  churned: number;
  active: number;
}

export interface ExpenseBreakdownItem {
  category: string;
  amount: number;
  percentage: number;
}

export interface ReportSummary {
  kpis: ReportKPIData;
  revenueData: RevenueDataPoint[];
  attendanceData: AttendanceDataPoint[];
  memberChurnData: MemberChurnDataPoint[];
  expenseBreakdown: ExpenseBreakdownItem[];
  trainerPerformance?: TrainerPerformanceItem[];
}

export type ManagerReportsOverviewDateRange = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'monthly' | 'yearly';
