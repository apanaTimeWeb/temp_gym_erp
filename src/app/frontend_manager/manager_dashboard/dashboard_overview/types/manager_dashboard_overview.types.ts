// RESPONSIBILITY: Defines strict types for the Dashboard module, including comprehensive KPI stats
// and chart data shapes. CRITICAL: 5 missing KPIs added — churnRate, revenueGrowthPercent,
// todayCollection, frozenMembershipsCount, totalPTRevenue.

export type ManagerDashboardOverviewTimeRange = 'weekly' | 'monthly' | 'yearly' | 'custom';

export interface ManagerDashboardOverviewRecentMember {
  id: string; 
  name: string; 
  plan: string | { name: string }; 
  status: string;
  joinDate: string; 
  paidAmount: number;
}

export interface ManagerDashboardOverviewRecentPayment {
  id: string; 
  invoiceNumber: string; 
  amount: number; 
  method: string; 
  paidAt: string;
  member: { name: string };
}

export interface ManagerDashboardOverviewPendingPayment {
  id: string; 
  name: string; 
  pendingAmount: number; 
  expiryDate: string;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export interface ManagerDashboardOverviewGrowthChartData {
  month: string;
  count: number;
}

export interface ManagerDashboardOverviewRevenueChartData {
  month: string;
  revenue: number;
}

export interface ManagerDashboardOverviewStats {
  // Core member metrics
  totalMembers: number;
  activeMembers: number;
  newMembersThisMonth: number;
  // Revenue metrics
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
  // Staff metrics
  totalStaff: number;
  activeStaff: number;
  // Store metrics
  totalProducts: number;
  lowStockCount: number;
  // Inquiry metrics
  totalInquiries: number;
  newInquiries: number;
  // Attendance
  todayAttendance: number;
  trainerAttendance: { present: number; total: number };
  // Chart data (existing — but no chart was rendering them — fixed separately)
  memberGrowth: ManagerDashboardOverviewGrowthChartData[];
  revenueChart: ManagerDashboardOverviewRevenueChartData[];
  membersByPlan: { plan: string; count: number }[];
  membersByStatus: { active: number; pending: number; expired: number };
  // Lists
  recentMembers: ManagerDashboardOverviewRecentMember[];
  totalRecentMembers?: number;
  recentPayments: ManagerDashboardOverviewRecentPayment[];
  pendingPaymentsList: ManagerDashboardOverviewPendingPayment[];
  expiringMemberships: ManagerDashboardOverviewPendingPayment[];
  // CRITICAL — missing KPIs
  churnRate: number;                // percentage, e.g. 4.2
  revenueGrowthPercent: number;     // MoM % change
  todayCollection: number;          // INR collected today
  frozenMembershipsCount: number;   // currently frozen members
  totalPTRevenue: number;           // personal training revenue this month
}

export type ManagerDashboardOverviewDateRange = 'weekly' | 'monthly' | 'yearly' | 'custom';
export type ManagerDashboardOverviewDateField = 'startDate' | 'endDate';
