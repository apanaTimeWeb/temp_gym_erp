// DATA FLOW: seed fixtures → module-owned in-memory mock state → MSW handlers/tests → feature query result (admin_dashboard/dashboard_overview/mocks/fixtures/AdminDashboardOverviewMockFixtures.ts)
import { addDays, format, startOfDay, differenceInCalendarDays } from 'date-fns';
// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin dashboard feature.
import type { DashboardStats } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewTypes';
import type { AdminDashboardRange } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/types/AdminDashboardOverviewRangeTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin dashboard feature.

export const MOCK_ADMIN_DASHBOARD: DashboardStats = {
  currency: 'USD',
  totalMembers: 15400,
  activeMembers: 12500,
  newMembersThisMonth: 850,
  totalRevenue: 24500000,
  monthlyRevenue: 2850000,
  netProfit: 950000,
  totalExpenses: 1900000,
  pendingPayments: 450000,
  totalStaff: 125,
  activeStaff: 110,
  totalProducts: 450,
  lowStockCount: 23,
  totalInquiries: 1200,
  newInquiries: 45,
  cancellationRate: 3.2,
  retentionRate: 85,
  arpm: 2150, // Average Revenue Per Member
  memberGrowth: [
    { month: 'Jan', count: 12000 },
    { month: 'Feb', count: 12500 },
    { month: 'Mar', count: 13100 },
    { month: 'Apr', count: 14000 },
    { month: 'May', count: 14800 },
    { month: 'Jun', count: 15400 },
  ],
  revenueTrend: [
    { month: 'Jan', revenue: 2000000, profit: 500000 },
    { month: 'Feb', revenue: 2100000, profit: 550000 },
    { month: 'Mar', revenue: 2300000, profit: 650000 },
    { month: 'Apr', revenue: 2500000, profit: 750000 },
    { month: 'May', revenue: 2700000, profit: 850000 },
    { month: 'Jun', revenue: 2850000, profit: 950000 },
  ],
  membersByPlan: [
    { plan: 'Annual Pro', count: 5400 },
    { plan: 'Quarterly', count: 3200 },
    { plan: 'Monthly', count: 6800 },
  ],
  membersByStatus: { active: 12500, pending: 1500, expired: 1400 },
  branchLeaderboard: [
    { id: 'b1', name: 'Downtown Branch', revenue: 850000, activeMembers: 4500, trend: 'up' },
    { id: 'b2', name: 'Westside Gym', revenue: 650000, activeMembers: 3200, trend: 'up' },
    { id: 'b3', name: 'Northside Arena', revenue: 450000, activeMembers: 2100, trend: 'flat' },
    { id: 'b4', name: 'Eastside Fitness', revenue: 350000, activeMembers: 1800, trend: 'down' },
  ],
  systemAlerts: [
    { id: 'a1', message: 'Server maintenance scheduled for tonight.', severity: 'medium', date: new Date().toISOString() },
    { id: 'a2', message: 'Payment gateway experiencing delays.', severity: 'high', date: new Date(Date.now() - 86400000).toISOString() },
  ],
  todayAttendance: 2450,
  expiringThisWeek: 350,
  totalInquiriesOpen: 85,
  avgAttendance: 2100,
  renewalsPending: 420,
  expiringMemberships: [
    { id: 'm10', name: 'Pooja Iyer', branch: 'Downtown Core', plan: 'Silver Plan', expiryDate: '2026-10-18', daysLeft: 3 },
    { id: 'm11', name: 'Suresh Kumar', branch: 'Uptown Plaza', plan: 'Gold Plan', expiryDate: '2026-10-16', daysLeft: 1 },
    { id: 'm2', name: 'Priya Patel', branch: 'Uptown Plaza', plan: 'Silver Plan', expiryDate: '2026-10-26', daysLeft: 11 },
    { id: 'm6', name: 'Divya Singh', branch: 'Westside Mall', plan: 'Silver Plan', expiryDate: '2026-11-12', daysLeft: 28 },
    { id: 'm1', name: 'Rahul Sharma', branch: 'Downtown Core', plan: 'Gold Plan', expiryDate: '2026-11-08', daysLeft: 24 },
  ],
  attendanceTrend: [
    { date: '2026-09-10', count: 312 }, { date: '2026-09-11', count: 287 }, { date: '2026-09-12', count: 345 },
    { date: '2026-09-13', count: 298 }, { date: '2026-09-14', count: 378 }, { date: '2026-09-15', count: 421 }, { date: '2026-09-16', count: 395 },
  ],
};


// --- From AdminFinanceMockData.ts ---




const ADMIN_DASHBOARD_BRANCH_FIXTURES: Record<string, DashboardStats> = {
  b1: { currency: 'USD',
    totalMembers: 4928, activeMembers: 4000, newMembersThisMonth: 272, totalRevenue: 7840000, monthlyRevenue: 912000, netProfit: 304000, totalExpenses: 608000, pendingPayments: 144000, totalStaff: 40, activeStaff: 35, totalProducts: 144, lowStockCount: 7, totalInquiries: 384, newInquiries: 14, cancellationRate: 2.9, retentionRate: 87, arpm: 2190,
    memberGrowth: [{month:'Jan',count:3850},{month:'Feb',count:4010},{month:'Mar',count:4180},{month:'Apr',count:4470},{month:'May',count:4700},{month:'Jun',count:4928}],
    revenueTrend: [{month:'Jan',revenue:640000,profit:145000},{month:'Feb',revenue:700000,profit:171000},{month:'Mar',revenue:760000,profit:201000},{month:'Apr',revenue:810000,profit:231000},{month:'May',revenue:860000,profit:268000},{month:'Jun',revenue:912000,profit:304000}],
    membersByPlan:[{plan:'Annual Pro',count:1820},{plan:'Quarterly',count:1040},{plan:'Monthly',count:2068}], membersByStatus:{active:4000,pending:460,expired:468},
    branchLeaderboard:[{id:'b1',name:'Downtown Branch',revenue:912000,activeMembers:4000,trend:'up'}],
    systemAlerts:[{id:'b1-a1',message:'Downtown Branch payment gateway is healthy.',severity:'low',date:'2026-09-16T09:00:00.000Z'}], todayAttendance:790, expiringThisWeek:112, totalInquiriesOpen:29, avgAttendance:682, renewalsPending:134,
    expiringMemberships:[{id:'b1-m1',name:'Pooja Iyer',branch:'Downtown Branch',plan:'Silver Plan',expiryDate:'2026-10-18',daysLeft:3},{id:'b1-m2',name:'Rahul Sharma',branch:'Downtown Branch',plan:'Gold Plan',expiryDate:'2026-11-08',daysLeft:24}],
    attendanceTrend:[{date:'2026-09-10',count:95},{date:'2026-09-11',count:88},{date:'2026-09-12',count:101},{date:'2026-09-13',count:93},{date:'2026-09-14',count:108},{date:'2026-09-15',count:118},{date:'2026-09-16',count:112}],
  },
  b2: { currency: 'USD',
    totalMembers: 3696, activeMembers: 3020, newMembersThisMonth: 204, totalRevenue: 5880000, monthlyRevenue: 684000, netProfit: 221000, totalExpenses: 463000, pendingPayments: 108000, totalStaff: 30, activeStaff: 27, totalProducts: 108, lowStockCount: 6, totalInquiries: 288, newInquiries: 11, cancellationRate: 3.1, retentionRate: 84, arpm: 2110,
    memberGrowth: [{month:'Jan',count:3000},{month:'Feb',count:3090},{month:'Mar',count:3220},{month:'Apr',count:3350},{month:'May',count:3510},{month:'Jun',count:3696}],
    revenueTrend: [{month:'Jan',revenue:490000,profit:118000},{month:'Feb',revenue:520000,profit:136000},{month:'Mar',revenue:561000,profit:158000},{month:'Apr',revenue:610000,profit:180000},{month:'May',revenue:648000,profit:205000},{month:'Jun',revenue:684000,profit:221000}],
    membersByPlan:[{plan:'Annual Pro',count:1280},{plan:'Quarterly',count:812},{plan:'Monthly',count:1604}], membersByStatus:{active:3020,pending:352,expired:324},
    branchLeaderboard:[{id:'b2',name:'Westside Gym',revenue:684000,activeMembers:3020,trend:'up'}],
    systemAlerts:[{id:'b2-a1',message:'Westside Gym renewals are above target.',severity:'low',date:'2026-09-16T10:00:00.000Z'}], todayAttendance:602, expiringThisWeek:84, totalInquiriesOpen:22, avgAttendance:515, renewalsPending:101,
    expiringMemberships:[{id:'b2-m1',name:'Anita Rao',branch:'Westside Gym',plan:'Gold Plan',expiryDate:'2026-10-21',daysLeft:6},{id:'b2-m2',name:'Vikram Singh',branch:'Westside Gym',plan:'Quarterly',expiryDate:'2026-10-27',daysLeft:12}],
    attendanceTrend:[{date:'2026-09-10',count:72},{date:'2026-09-11',count:76},{date:'2026-09-12',count:81},{date:'2026-09-13',count:78},{date:'2026-09-14',count:86},{date:'2026-09-15',count:91},{date:'2026-09-16',count:88}],
  },
  b3: { currency: 'USD',
    totalMembers: 2772, activeMembers: 2295, newMembersThisMonth: 153, totalRevenue: 4410000, monthlyRevenue: 513000, netProfit: 166000, totalExpenses: 347000, pendingPayments: 81000, totalStaff: 23, activeStaff: 20, totalProducts: 81, lowStockCount: 5, totalInquiries: 216, newInquiries: 8, cancellationRate: 3.4, retentionRate: 82, arpm: 2055,
    memberGrowth: [{month:'Jan',count:2210},{month:'Feb',count:2280},{month:'Mar',count:2360},{month:'Apr',count:2470},{month:'May',count:2620},{month:'Jun',count:2772}],
    revenueTrend: [{month:'Jan',revenue:371000,profit:96000},{month:'Feb',revenue:400000,profit:111000},{month:'Mar',revenue:423000,profit:127000},{month:'Apr',revenue:455000,profit:144000},{month:'May',revenue:486000,profit:155000},{month:'Jun',revenue:513000,profit:166000}],
    membersByPlan:[{plan:'Annual Pro',count:970},{plan:'Quarterly',count:582},{plan:'Monthly',count:1220}], membersByStatus:{active:2295,pending:250,expired:227},
    branchLeaderboard:[{id:'b3',name:'Northside Arena',revenue:513000,activeMembers:2295,trend:'flat'}],
    systemAlerts:[{id:'b3-a1',message:'Northside Arena attendance is stable this week.',severity:'low',date:'2026-09-16T11:00:00.000Z'}], todayAttendance:459, expiringThisWeek:61, totalInquiriesOpen:18, avgAttendance:391, renewalsPending:78,
    expiringMemberships:[{id:'b3-m1',name:'Meera Shah',branch:'Northside Arena',plan:'Silver Plan',expiryDate:'2026-10-23',daysLeft:8},{id:'b3-m2',name:'Arjun Mehta',branch:'Northside Arena',plan:'Annual Pro',expiryDate:'2026-10-30',daysLeft:15}],
    attendanceTrend:[{date:'2026-09-10',count:51},{date:'2026-09-11',count:49},{date:'2026-09-12',count:57},{date:'2026-09-13',count:54},{date:'2026-09-14',count:58},{date:'2026-09-15',count:63},{date:'2026-09-16',count:61}],
  },
  b4: { currency: 'USD',
    totalMembers: 1848, activeMembers: 1530, newMembersThisMonth: 102, totalRevenue: 2940000, monthlyRevenue: 342000, netProfit: 109000, totalExpenses: 233000, pendingPayments: 54000, totalStaff: 19, activeStaff: 16, totalProducts: 54, lowStockCount: 5, totalInquiries: 144, newInquiries: 6, cancellationRate: 3.8, retentionRate: 79, arpm: 1985,
    memberGrowth: [{month:'Jan',count:1510},{month:'Feb',count:1560},{month:'Mar',count:1600},{month:'Apr',count:1670},{month:'May',count:1750},{month:'Jun',count:1848}],
    revenueTrend: [{month:'Jan',revenue:251000,profit:72000},{month:'Feb',revenue:268000,profit:79000},{month:'Mar',revenue:286000,profit:85000},{month:'Apr',revenue:301000,profit:92000},{month:'May',revenue:324000,profit:101000},{month:'Jun',revenue:342000,profit:109000}],
    membersByPlan:[{plan:'Annual Pro',count:640},{plan:'Quarterly',count:392},{plan:'Monthly',count:816}], membersByStatus:{active:1530,pending:168,expired:150},
    branchLeaderboard:[{id:'b4',name:'Eastside Fitness',revenue:342000,activeMembers:1530,trend:'down'}],
    systemAlerts:[{id:'b4-a1',message:'Eastside Fitness has elevated overdue payments.',severity:'medium',date:'2026-09-16T12:00:00.000Z'}], todayAttendance:301, expiringThisWeek:44, totalInquiriesOpen:16, avgAttendance:257, renewalsPending:65,
    expiringMemberships:[{id:'b4-m1',name:'Neha Verma',branch:'Eastside Fitness',plan:'Gold Plan',expiryDate:'2026-10-19',daysLeft:4},{id:'b4-m2',name:'Karan Joshi',branch:'Eastside Fitness',plan:'Monthly',expiryDate:'2026-10-25',daysLeft:10}],
    attendanceTrend:[{date:'2026-09-10',count:36},{date:'2026-09-11',count:34},{date:'2026-09-12',count:39},{date:'2026-09-13',count:37},{date:'2026-09-14',count:42},{date:'2026-09-15',count:44},{date:'2026-09-16',count:41}],
  },
};

/**
 * getAdminDashboardFixture is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export function getAdminDashboardFixture(branchId: string | undefined, range: AdminDashboardRange): DashboardStats | null {
  const base = branchId ? structuredClone(ADMIN_DASHBOARD_BRANCH_FIXTURES[branchId]) : structuredClone(MOCK_ADMIN_DASHBOARD);
  if (!base) return null;
  const today = startOfDay(new Date());
  base.expiringMemberships = base.expiringMemberships?.map((membership) => {
    const targetExpiry = addDays(today, membership.daysLeft);
    return { ...membership, expiryDate: format(targetExpiry, 'yyyy-MM-dd'), daysLeft: differenceInCalendarDays(targetExpiry, today) };
  });

  // Keep revenueTrend intact (6 months trailing) as UI chart expects it for trailing view.
  // Other trends (member growth, attendance) can be sliced based on the filter range if needed.
  const trendLength = range === 'last_month' || range === 'this_month' ? 1 : range === 'last_3_months' ? 3 : range === 'last_6_months' || range === 'this_year' ? 6 : base.revenueTrend.length;
  base.revenueTrend = base.revenueTrend.slice(-trendLength);
  base.memberGrowth = base.memberGrowth.slice(-trendLength);
  base.attendanceTrend = base.attendanceTrend?.slice(-Math.min(7, trendLength * 2)) ?? [];
  return base;
}
