import { MANAGER_DASHBOARD_OVERVIEW_STATUS_VALUES } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/constants/manager_dashboard_overview.constants';
import type { ManagerDashboardOverviewStats } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/types/manager_dashboard_overview.types';

/**
 * @description Provides the ManagerDashboardOverviewMockData implementation for the dashboard module.
 * @dependencies @/app/frontend_manager/manager_dashboard/dashboard_overview/types/manager_dashboard_overview.types
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_DASHBOARD_STATS: ManagerDashboardOverviewStats = {
  totalMembers: 1245,
  activeMembers: 1100,
  newMembersThisMonth: 45,
  totalRevenue: 45000000,
  monthlyRevenue: 8500000,
  pendingPayments: 12000,
  totalStaff: 25,
  activeStaff: 22,
  totalProducts: 450,
  lowStockCount: 12,
  totalInquiries: 156,
  newInquiries: 34,
  todayAttendance: 245,
  trainerAttendance: { present: 18, total: 20 },
  memberGrowth: [
    { month: 'Jan', count: 1100 },
    { month: 'Feb', count: 1150 },
    { month: 'Mar', count: 1200 },
    { month: 'Apr', count: 1220 },
    { month: 'May', count: 1245 },
  ],
  revenueChart: [
    { month: 'Jan', revenue: 7500000 },
    { month: 'Feb', revenue: 8000000 },
    { month: 'Mar', revenue: 7800000 },
    { month: 'Apr', revenue: 8200000 },
    { month: 'May', revenue: 8500000 },
  ],
  membersByPlan: [
    { plan: 'Annual', count: 450 },
    { plan: 'Half-Yearly', count: 300 },
    { plan: 'Quarterly', count: 250 },
    { plan: 'Monthly', count: 245 },
  ],
  membersByStatus: { active: 1100, pending: 45, expired: 100 },
  recentMembers: [
    { id: '1', name: 'John Doe', plan: 'Annual', status: MANAGER_DASHBOARD_OVERVIEW_STATUS_VALUES.ACTIVE, joinDate: '2024-05-01', paidAmount: 1500000 },
    { id: '2', name: 'Jane Smith', plan: 'Quarterly', status: MANAGER_DASHBOARD_OVERVIEW_STATUS_VALUES.PENDING, joinDate: '2024-05-05', paidAmount: 0 },
    { id: '3', name: 'Bob Johnson', plan: 'Monthly', status: MANAGER_DASHBOARD_OVERVIEW_STATUS_VALUES.ACTIVE, joinDate: '2024-05-10', paidAmount: 150000 },
  ],
  totalRecentMembers: 3,
  recentPayments: [
    { id: '1', invoiceNumber: 'INV-001', amount: 1500000, method: 'UPI', paidAt: '2024-05-01T10:00:00Z', member: { name: 'John Doe' } },
    { id: '2', invoiceNumber: 'INV-002', amount: 150000, method: 'Card', paidAt: '2024-05-10T14:30:00Z', member: { name: 'Bob Johnson' } },
  ],
  pendingPaymentsList: [
    { id: '2', name: 'Jane Smith', pendingAmount: 400000, expiryDate: '2024-06-05' },
    { id: '4', name: 'Alice Brown', pendingAmount: 1500000, expiryDate: '2024-06-15' },
  ],
  expiringMemberships: [
    { id: '5', name: 'Charlie Davis', pendingAmount: 0, expiryDate: '2024-05-20' },
    { id: '6', name: 'Eve Wilson', pendingAmount: 0, expiryDate: '2024-05-25' },
  ],
  churnRate: 4.2,
  revenueGrowthPercent: 12.5,
  todayCollection: 4500,
  frozenMembershipsCount: 15,
  totalPTRevenue: 25000 };
