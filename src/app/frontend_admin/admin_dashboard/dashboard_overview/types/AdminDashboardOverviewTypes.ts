// RESPONSIBILITY: Defines strict types for the Admin Dashboard API and UI data shapes.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_dashboard/dashboard_overview/types/AdminDashboardOverviewTypes.ts)

export interface RecentMember {
  id: string; 
  name: string; 
  plan: string | { name: string }; 
  status: string;
  joinDate: string; 
  paidAmount: number;
}

export interface RecentPayment {
  id: string; 
  invoiceNo: string; 
  amount: number; 
  method: string; 
  paidAt: string;
  member: { name: string };
}

export interface PendingPayment {
  id: string; 
  name: string; 
  pendingAmount: number; 
  expiryDate: string;
}

export type DashboardTrendDirection = 'up' | 'down' | 'flat';
export type DashboardAlertSeverity = 'high' | 'medium' | 'low';

export interface AttendanceTrendPoint {
  date: string;
  count: number;
}

export interface BranchPerformance {
  id: string;
  name: string;
  revenue: number;
  activeMembers: number;
  trend: DashboardTrendDirection;
}

export interface ExpiringMembership { id: string; name: string; branch: string; plan: string; expiryDate: string; daysLeft: number; }

export interface SystemAlert {
  id: string;
  message: string;
  severity: DashboardAlertSeverity;
  date: string;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  totalRevenue: number;
  monthlyRevenue: number;
  netProfit: number;
  totalExpenses: number;
  pendingPayments: number;
  totalStaff: number;
  activeStaff: number;
  totalProducts: number;
  lowStockCount: number;
  totalInquiries: number;
  newInquiries: number;
  cancellationRate: number;
  retentionRate: number;
  arpm: number;
  memberGrowth: { month: string; count: number }[];
  revenueTrend: { month: string; revenue: number; profit: number }[];
  membersByPlan: { plan: string; count: number }[];
  membersByStatus: { active: number; pending: number; expired: number };
  branchLeaderboard: BranchPerformance[];
  systemAlerts: SystemAlert[];
  todayAttendance?: number;
  expiringThisWeek?: number;
  totalInquiriesOpen?: number;
  avgAttendance?: number;
  renewalsPending?: number;
  expiringMemberships?: ExpiringMembership[];
  attendanceTrend?: AttendanceTrendPoint[];
  currency: string;
}
