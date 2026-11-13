import type { ApiResponse } from '@/lib/api';
import type { Staff } from '@/app/frontend_admin/admin_hr/hr_staff_management/types/AdminHrStaffManagementTypes';

// Admin Fixture Imports
import { getAdminDashboardFixture } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/mocks/fixtures/AdminDashboardOverviewMockFixtures';
import { MOCK_MEMBERS_BRANCH_REFERENCES } from '@/app/frontend_admin/admin_members/members_directory/mocks/fixtures/AdminMembersDirectoryBranchReferenceMockFixtures';
import { MOCK_ADMIN_MEMBERS_EXPANDED, MOCK_ADMIN_MEMBERS_SUMMARY } from '@/app/frontend_admin/admin_members/members_directory/mocks/fixtures/AdminMembersDirectoryMockFixtures';
import { MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED, MOCK_ADMIN_ATTENDANCE_SUMMARY } from '@/app/frontend_admin/admin_attendance/attendance_dashboard/mocks/fixtures/AdminAttendanceDashboardMockFixtures';
import { getAdminAttendanceReportsFixture } from '@/app/frontend_admin/admin_attendance/attendance_reports/mocks/fixtures/AdminAttendanceReportsMockFixtures';
import { MOCK_ADMIN_SALES_OVERVIEW, MOCK_ADMIN_SALES_REFERRALS } from '@/app/frontend_admin/admin_sales/sales_overview/mocks/fixtures/AdminSalesOverviewMockFixtures';
import { MOCK_ADMIN_ALL_MEMBERSHIPS } from '@/app/frontend_admin/admin_sales/sales_memberships/mocks/fixtures/AdminSalesMembershipsMockFixtures';
import { MOCK_ADMIN_PENDING_PAYMENTS } from '@/app/frontend_admin/admin_sales/sales_pending_payments/mocks/fixtures/AdminSalesPendingPaymentsMockFixtures';
import { MOCK_ADMIN_MEMBERSHIP_REPORT, MOCK_ADMIN_MEMBERSHIP_TOTALS } from '@/app/frontend_admin/admin_sales/sales_membership_report/mocks/fixtures/AdminSalesMembershipReportMockFixtures';
import { getAdminSalesMembershipGrowthReportFixture } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/mocks/fixtures/AdminSalesMembershipGrowthReportMockFixtures';
import { MOCK_REPORTS_BRANCH_REFERENCES } from '@/app/frontend_admin/admin_sales/sales_membership_growth_report/mocks/fixtures/AdminSalesMembershipGrowthReportBranchReferenceMockFixtures';
import { MOCK_ADMIN_STORE_ORDERS, MOCK_ADMIN_STORE_PRODUCTS } from '@/app/frontend_admin/admin_sales/sales_store_sales/mocks/fixtures/AdminSalesStoreSalesMockFixtures';
import { MOCK_ADMIN_FINANCE_SUMMARY, MOCK_ADMIN_PAYMENTS_EXPANDED, MOCK_ADMIN_EXPENSES } from '@/app/frontend_admin/admin_finance/finance_summary/mocks/fixtures/AdminFinanceSummaryMockFixtures';
import { getAdminFinancePnlFixtureByPeriod } from '@/app/frontend_admin/admin_finance/finance_branch_profit_and_loss/mocks/fixtures/AdminFinanceBranchProfitAndLossFixtureByPeriod';
import { MOCK_ADMIN_PLAN_REVENUE } from '@/app/frontend_admin/admin_finance/finance_plan_revenue_analytics/mocks/fixtures/AdminFinancePlanRevenueAnalyticsMockFixtures';
import { MOCK_PAYOUTS, MOCK_PNL } from '@/app/frontend_admin/admin_finance/finance_payouts_management/mocks/fixtures/AdminFinancePayoutsManagementMockFixtures';
import { getAdminFinanceProfitAndLossReportFixture } from '@/app/frontend_admin/admin_finance/finance_profit_and_loss_report/mocks/fixtures/AdminFinanceProfitAndLossReportMockFixtures';
import { getAdminFinanceRevenueReportFixture } from '@/app/frontend_admin/admin_finance/finance_revenue_report/mocks/fixtures/AdminFinanceRevenueReportMockFixtures';
import { getAdminFinancePayrollReportFixture } from '@/app/frontend_admin/admin_finance/finance_payroll_report/mocks/fixtures/AdminFinancePayrollReportMockFixtures';
import { MOCK_ADMIN_STAFF_EXPANDED, MOCK_ADMIN_PAYROLLS_EXPANDED, MOCK_ADMIN_LEDGER } from '@/app/frontend_admin/admin_finance/finance_payroll_management/mocks/fixtures/AdminFinancePayrollManagementMockFixtures';
import { MOCK_ADMIN_STAFF_PERFORMANCE } from '@/app/frontend_admin/admin_hr/hr_performance_analytics/mocks/fixtures/AdminHrPerformanceAnalyticsMockFixtures';
import { MOCK_BRANCHES } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/mocks/fixtures/AdminGymsBranchesDirectoryMockFixtures';
import { MOCK_GYM_HEALTH_ALERTS, MOCK_GYM_HEALTH_KPI } from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/mocks/fixtures/AdminGymsHealthAlertsMonitoringMockFixtures';
import { MOCK_ADMIN_PLANS } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/mocks/fixtures/AdminBillingPlansCatalogMockFixtures';
import { MOCK_COUPONS_EXPANDED, MOCK_COUPONS_KPI } from '@/app/frontend_admin/admin_billing/billing_coupons_management/mocks/fixtures/AdminBillingCouponsManagementMockFixtures';
import { MOCK_CURRENT_SUBSCRIPTION, MOCK_PAYMENT_METHODS, MOCK_SAAS_PLANS, MOCK_INVOICES, MOCK_SUBSCRIPTION_KPI } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/mocks/fixtures/AdminBillingSubscriptionsOverviewMockFixtures';
import { MOCK_ADMIN_USAGE_DATA } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/mocks/fixtures/AdminBillingUsageAnalyticsMockFixtures';
import { MOCK_ANNOUNCEMENTS, MOCK_ANNOUNCEMENT_KPI } from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/mocks/fixtures/AdminCommunicationNoticesAndAnnouncementsMockFixtures';
import { MOCK_ADMIN_NOTIFICATIONS } from '@/app/frontend_admin/admin_communication/communication_notifications_center/mocks/fixtures/AdminCommunicationNotificationsCenterMockFixtures';
import { ADMIN_CAMPAIGNS_TEMPLATES, ADMIN_CAMPAIGNS_AUDIENCES, ADMIN_CAMPAIGNS_RECIPIENTS_PENDING } from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/mocks/fixtures/AdminCommunicationWhatsAppCampaignsManagementMockFixtures';
import { MOCK_BLACKLIST_EXPANDED } from '@/app/frontend_admin/admin_members/members_blacklist_management/mocks/fixtures/AdminMembersBlacklistManagementMockFixtures';
import { MOCK_AUDIT_LOGS, MOCK_AUDIT_KPI, MOCK_AUDIT_ACTORS } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/mocks/fixtures/AdminSecurityAuditLogsExplorerMockFixtures';
import { MOCK_ADMIN_PERMISSIONS, MOCK_ADMIN_PERMISSION_OVERRIDES } from '@/app/frontend_admin/admin_security/security_permissions_management/mocks/fixtures/AdminSecurityPermissionsManagementMockFixtures';
import { MOCK_ADMIN_SETTINGS } from '@/app/frontend_admin/admin_settings/settings_management/mocks/fixtures/AdminSettingsManagementMockFixtures';
import { MOCK_ADMIN_PROFILE } from '@/app/frontend_admin/admin_profile/profile_overview/mocks/fixtures/AdminProfileOverviewMockFixtures';

function buildMockSuccess<T>(data: T, message = 'Success', meta?: any): ApiResponse<T> {
  const requestId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `req_${Date.now()}`;
  const envelope = {
    success: true as const,
    message,
    data,
    meta,
    requestId,
    status: 200,
    ok: true,
    json: async () => envelope,
    text: async () => JSON.stringify(envelope),
  };
  return envelope as unknown as ApiResponse<T>;
}

// In-memory mutable states for Admin
let currentAdminBlacklist = [...MOCK_BLACKLIST_EXPANDED];
let currentSubscriptionState = structuredClone(MOCK_CURRENT_SUBSCRIPTION);
let currentPaymentMethodsState = structuredClone(MOCK_PAYMENT_METHODS);
let currentAdminStaff = structuredClone(MOCK_ADMIN_STAFF_EXPANDED);
let currentAdminPayrolls = structuredClone(MOCK_ADMIN_PAYROLLS_EXPANDED);
let currentAdminLedger = structuredClone(MOCK_ADMIN_LEDGER);
let currentAdminPermissionOverrides = structuredClone(MOCK_ADMIN_PERMISSION_OVERRIDES);
let currentAdminNotifications = [...MOCK_ADMIN_NOTIFICATIONS];
let currentAdminPendingPayments = [...MOCK_ADMIN_PENDING_PAYMENTS];
let currentAdminPlans = structuredClone(MOCK_ADMIN_PLANS);
let currentAdminProfile = structuredClone(MOCK_ADMIN_PROFILE);
let currentAdminSettings = structuredClone(MOCK_ADMIN_SETTINGS);

export function handleAdminMockApiRequest(
  urlPath: string,
  method: string,
  searchParams: URLSearchParams,
  options?: RequestInit
): ApiResponse<any> | null {
  // 1. Dashboard
  if (
    urlPath === '/admin/dashboard' ||
    urlPath === '/admin/dashboard/overview' ||
    urlPath === '/admin/dashboard/fetchDashboardStats'
  ) {
    const branchId = searchParams.get('branchId') || undefined;
    const rawRange = searchParams.get('range') || 'this_month';
    const fixture = getAdminDashboardFixture(branchId === 'all' ? undefined : branchId, rawRange as any);
    return buildMockSuccess(fixture, 'Dashboard data loaded');
  }

  // 2. Members Directory & Summary
  if (urlPath === '/admin/members/summary') {
    return buildMockSuccess(MOCK_ADMIN_MEMBERS_SUMMARY);
  }
  if (urlPath === '/admin/members/branch-reference') {
    return buildMockSuccess(MOCK_MEMBERS_BRANCH_REFERENCES);
  }
  if (
    urlPath === '/admin/members' ||
    urlPath === '/admin/members/directory' ||
    urlPath === '/admin/members/list'
  ) {
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const search = searchParams.get('search')?.toLowerCase() || '';
    const branch = searchParams.get('branch') || 'all';
    const status = searchParams.get('status') || 'all';

    let filtered = [...MOCK_ADMIN_MEMBERS_EXPANDED];
    if (search) {
      filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(search) ||
        m.phone.toLowerCase().includes(search) ||
        m.email.toLowerCase().includes(search)
      );
    }
    if (branch !== 'all') {
      filtered = filtered.filter(m => m.branchId === branch);
    }
    if (status !== 'all') {
      filtered = filtered.filter(m => m.status.toLowerCase() === status.toLowerCase());
    }

    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const pageData = filtered.slice(start, start + limit);

    return buildMockSuccess(pageData, 'Success', {
      total: filtered.length,
      page: safePage,
      limit,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    });
  }

  if (urlPath === '/admin/members/export' || urlPath.startsWith('/admin/members/')) {
    const memberId = urlPath.replace('/admin/members/', '');
    if (urlPath === '/admin/members/export' || memberId === 'export') {
      const csvRows = [
        'id,name,email,phone,branchName,planName,status,joinDate',
        ...MOCK_ADMIN_MEMBERS_EXPANDED.map(
          (m) => `${m.id},"${m.name}",${m.email},"${m.phone}","${m.branchName || 'Andheri East'}","${m.planName || 'Gold'}","${m.status}","${m.joinDate || '2026-01-15'}"`
        ),
      ];
      return buildMockSuccess(csvRows.join('\n'), 'Member export ready');
    }
    const member = MOCK_ADMIN_MEMBERS_EXPANDED.find((m) => m.id === memberId) || MOCK_ADMIN_MEMBERS_EXPANDED[0];
    return buildMockSuccess(member, 'Member retrieved');
  }

  // 3. Blacklist Management
  if (urlPath === '/admin/blacklist/kpis') {
    return buildMockSuccess({
      totalBlacklisted: currentAdminBlacklist.filter(e => e.isActive).length,
      globalBans: currentAdminBlacklist.filter(e => e.isActive && e.scope === 'global').length,
      gymSpecificBans: currentAdminBlacklist.filter(e => e.isActive && e.scope === 'specific').length,
      addedThisMonth: currentAdminBlacklist.filter(e => e.blacklistedAt?.startsWith('2026-11')).length || 2,
    });
  }
  if (urlPath === '/admin/blacklist') {
    if (method === 'POST') {
      let body: any = {};
      try { body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}; } catch {}
      const newEntry = {
        id: `bl_${Date.now()}`,
        memberId: body.memberId || `M-${Date.now()}`,
        memberName: body.memberName || 'New Member',
        memberPhone: body.memberPhone || '9876543210',
        memberEmail: body.memberEmail || 'member@example.com',
        reason: body.reason || 'Violation',
        blacklistedBy: 'Admin',
        blacklistedAt: new Date().toISOString().slice(0, 10),
        scope: body.scope || 'global',
        assignedGyms: body.assignedGyms || ['all'],
        assignedGymNames: body.assignedGymNames || ['All Gyms'],
        isActive: true,
      };
      currentAdminBlacklist.unshift(newEntry as any);
      return buildMockSuccess(newEntry, 'Member added to blacklist');
    }

    const search = (searchParams.get('search') || '').toLowerCase();
    const scope = searchParams.get('scope') || 'all';
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;

    let filtered = currentAdminBlacklist.filter(e => {
      const matchSearch = !search || e.memberName.toLowerCase().includes(search) || e.memberPhone.includes(search);
      const matchScope = scope === 'all' || e.scope === scope;
      return matchSearch && matchScope;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const pageData = filtered.slice(start, start + limit);

    return buildMockSuccess(pageData, 'Success', {
      total: filtered.length,
      page: safePage,
      limit,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    });
  }
  if (urlPath.startsWith('/admin/blacklist/')) {
    const id = urlPath.replace('/admin/blacklist/', '').replace('/remove', '').replace('/propagate', '');
    if (urlPath.endsWith('/remove') || method === 'DELETE') {
      currentAdminBlacklist = currentAdminBlacklist.filter(e => e.id !== id);
      return buildMockSuccess(null, 'Member removed from blacklist');
    }
    if (urlPath.endsWith('/propagate')) {
      const entry = currentAdminBlacklist.find(e => e.id === id);
      if (entry) {
        entry.scope = 'global';
        entry.assignedGyms = ['all'];
        entry.assignedGymNames = ['All Gyms'];
      }
      return buildMockSuccess(entry, 'Blacklist propagated');
    }
    const entry = currentAdminBlacklist.find(e => e.id === id);
    if (entry) {
      entry.isActive = !entry.isActive;
    }
    return buildMockSuccess(entry, 'Blacklist updated');
  }

  // 4. Attendance
  if (urlPath === '/admin/attendance/summary') {
    const range = searchParams.get('dateRange') || 'today';
    let summary = { ...MOCK_ADMIN_ATTENDANCE_SUMMARY };
    if (range === 'this_week') {
      summary = { ...summary, todayTotal: 16800, todayPresent: 15200, todayLate: 840, weeklyAverage: 2400 };
    } else if (range === 'this_month') {
      summary = { ...summary, todayTotal: 68500, todayPresent: 61000, todayLate: 3400, weeklyAverage: 2280 };
    } else if (range === 'last_month') {
      summary = { ...summary, todayTotal: 64200, todayPresent: 58000, todayLate: 3200, weeklyAverage: 2140 };
    }
    return buildMockSuccess(summary);
  }
  if (urlPath === '/admin/attendance/trend') {
    return buildMockSuccess([
      { date: '2026-10-01', count: 520 },
      { date: '2026-10-02', count: 480 },
      { date: '2026-10-03', count: 410 },
      { date: '2026-10-04', count: 390 },
      { date: '2026-10-05', count: 550 },
      { date: '2026-10-06', count: 580 },
      { date: '2026-10-07', count: 600 },
    ]);
  }
  if (urlPath === '/admin/attendance/records') {
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const search = (searchParams.get('search') || '').toLowerCase();
    const branchId = searchParams.get('branchId') || 'all';
    const status = (searchParams.get('status') || 'all').toLowerCase();

    let filtered = [...MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED];
    if (search) {
      filtered = filtered.filter(r => r.memberName.toLowerCase().includes(search) || r.memberPhone.includes(search));
    }
    if (branchId !== 'all') {
      filtered = filtered.filter(r => r.branchId === branchId);
    }
    if (status !== 'all') {
      filtered = filtered.filter(r => r.status.toLowerCase() === status);
    }

    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const pageData = filtered.slice(start, start + limit);

    return buildMockSuccess(pageData, 'Success', {
      total: filtered.length,
      page: safePage,
      limit,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    });
  }
  if (urlPath === '/admin/attendance/reports' || urlPath === '/admin/reports/attendance') {
    const from = searchParams.get('from') || '2026-10-01';
    const to = searchParams.get('to') || '2026-10-31';
    const gymId = searchParams.get('gymId') || 'all';
    return buildMockSuccess(getAdminAttendanceReportsFixture({ gymId, from, to }));
  }

  // 5. Sales & Orders
  if (urlPath === '/admin/sales/overview') {
    const range = searchParams.get('range');
    let overview = [...MOCK_ADMIN_SALES_OVERVIEW];
    if (range === 'last_month') {
      overview = [
        { date: '2026-09-01', newMembers: 12, revenue: 13500 },
        { date: '2026-09-08', newMembers: 13, revenue: 14000 },
        { date: '2026-09-15', newMembers: 13, revenue: 14500 },
        { date: '2026-09-22', newMembers: 14, revenue: 15200 },
      ];
    } else if (range === 'last_3_months') {
      overview = [
        { date: '2026-07-01', newMembers: 12, revenue: 13500 },
        { date: '2026-08-01', newMembers: 13, revenue: 14000 },
        { date: '2026-09-01', newMembers: 14, revenue: 15200 },
      ];
    } else if (range === 'this_year' || range === 'yearly') {
      overview = [
        { date: '2026-01-01', newMembers: 8, revenue: 9000 },
        { date: '2026-02-01', newMembers: 9, revenue: 10000 },
        { date: '2026-03-01', newMembers: 10, revenue: 11000 },
        { date: '2026-04-01', newMembers: 11, revenue: 12000 },
        { date: '2026-05-01', newMembers: 11, revenue: 12500 },
        { date: '2026-06-01', newMembers: 12, revenue: 13000 },
        { date: '2026-07-01', newMembers: 12, revenue: 13500 },
        { date: '2026-08-01', newMembers: 13, revenue: 14000 },
        { date: '2026-09-01', newMembers: 13, revenue: 14500 },
        { date: '2026-10-01', newMembers: 18, revenue: 20500 },
      ];
    }
    return buildMockSuccess({ monthlyRevenue: overview });
  }
  if (urlPath === '/admin/sales/referral-sources') {
    return buildMockSuccess(MOCK_ADMIN_SALES_REFERRALS);
  }
  if (urlPath === '/admin/sales/summary') {
    const range = searchParams.get('range');
    let summary = {
      totalRevenue: 154000,
      newMembers: 34,
      conversionRate: 14.2,
      activeLeads: 88,
    };
    if (range === 'last_month') {
      summary = { totalRevenue: 138000, newMembers: 29, conversionRate: 13.5, activeLeads: 82 };
    } else if (range === 'last_3_months') {
      summary = { totalRevenue: 425000, newMembers: 95, conversionRate: 15.1, activeLeads: 240 };
    } else if (range === 'this_year' || range === 'yearly') {
      summary = { totalRevenue: 1720000, newMembers: 380, conversionRate: 16.4, activeLeads: 950 };
    }
    return buildMockSuccess(summary);
  }
  if (urlPath === '/admin/sales/all-memberships') {
    return buildMockSuccess({
      members: MOCK_ADMIN_ALL_MEMBERSHIPS,
      total: MOCK_ADMIN_ALL_MEMBERSHIPS.length,
    });
  }
  if (urlPath === '/admin/sales/pending-payments') {
    const search = (searchParams.get('search') || '').toLowerCase();
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;

    let filtered = currentAdminPendingPayments.filter(p =>
      !search || p.name.toLowerCase().includes(search) || p.phone.includes(search) || p.email.toLowerCase().includes(search)
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const pageData = filtered.slice(start, start + limit);

    return buildMockSuccess({
      members: pageData,
      total: filtered.length,
    }, 'Pending payments fetched', {
      total: filtered.length,
      page: safePage,
      limit,
      totalPages,
    });
  }
  if (urlPath === '/admin/sales/membership-report') {
    const search = (searchParams.get('search') || '').toLowerCase();
    const branchId = searchParams.get('branchId') || 'all';

    let branchRows = branchId === 'all'
      ? [...MOCK_ADMIN_MEMBERSHIP_REPORT]
      : MOCK_ADMIN_MEMBERSHIP_REPORT.filter(r => (r.name || '').toLowerCase().includes(branchId));

    if (search) {
      branchRows = branchRows.filter(r => (r.name || '').toLowerCase().includes(search));
    }

    return buildMockSuccess({
      report: branchRows,
      totals: MOCK_ADMIN_MEMBERSHIP_TOTALS,
    });
  }
  if (urlPath === '/admin/sales/store-orders') {
    return buildMockSuccess({
      orders: MOCK_ADMIN_STORE_ORDERS,
      total: MOCK_ADMIN_STORE_ORDERS.length,
    });
  }
  if (urlPath === '/admin/sales/store-summary') {
    const totalRevenue = MOCK_ADMIN_STORE_ORDERS.reduce((sum, order) => sum + order.total, 0);
    return buildMockSuccess({
      summary: {
        totalProducts: MOCK_ADMIN_STORE_PRODUCTS.length,
        totalOrders: MOCK_ADMIN_STORE_ORDERS.length,
        totalRevenue,
        lowStockProducts: MOCK_ADMIN_STORE_PRODUCTS.filter((product) => product.stock <= 10),
      },
    });
  }

  // 6. Reports Endpoints (Members, PnL, Revenue, Payroll, Export, Branches)
  if (urlPath === '/admin/reports/members') {
    const branchId = searchParams.get('branchId') || searchParams.get('gymId') || 'all';
    return buildMockSuccess(getAdminSalesMembershipGrowthReportFixture({ gymId: branchId }));
  }
  if (urlPath === '/admin/reports/pnl') {
    const branchId = searchParams.get('branchId') || searchParams.get('gymId') || 'all';
    return buildMockSuccess(getAdminFinanceProfitAndLossReportFixture({ gymId: branchId }));
  }
  if (urlPath === '/admin/reports/revenue') {
    const branchId = searchParams.get('branchId') || searchParams.get('gymId') || 'all';
    return buildMockSuccess(getAdminFinanceRevenueReportFixture({ gymId: branchId }));
  }
  if (urlPath === '/admin/reports/payroll') {
    const branchId = searchParams.get('branchId') || searchParams.get('gymId') || 'all';
    return buildMockSuccess(getAdminFinancePayrollReportFixture({ gymId: branchId }));
  }
  if (urlPath === '/admin/reports/export') {
    return buildMockSuccess({ exportId: `exp_${Date.now()}` }, 'Export initiated');
  }
  if (urlPath === '/admin/branches/fetchBranches' || urlPath === '/admin/branches') {
    const consumer = searchParams.get('consumer');
    if (consumer === 'members') {
      return buildMockSuccess({ items: MOCK_MEMBERS_BRANCH_REFERENCES });
    }
    if (consumer) {
      return buildMockSuccess({ items: MOCK_REPORTS_BRANCH_REFERENCES });
    }
    return buildMockSuccess(MOCK_BRANCHES);
  }

  if (urlPath.startsWith('/admin/branches/') && urlPath !== '/admin/branches/fetchBranches') {
    const branchId = urlPath.replace('/admin/branches/', '');
    const found = MOCK_BRANCHES.find((b) => b.id === branchId) || MOCK_BRANCHES[0];
    return buildMockSuccess(found);
  }

  // 7. Finance PnL, Plan Revenue, Payouts, Summary
  if (urlPath === '/frontend_admin/admin_finance_performance/admin_finance/admin_finance_pnl') {
    const period = (searchParams.get('period') || 'THIS_MONTH') as any;
    const sortKey = searchParams.get('sortKey') || 'netProfit';
    const sortDir = searchParams.get('sortDir') || 'desc';
    const rows = getAdminFinancePnlFixtureByPeriod(period);
    const sorted = [...rows].sort((a: any, b: any) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const res = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? res : -res;
    });
    return buildMockSuccess(sorted);
  }
  if (urlPath === '/admin/plans/fetchPlanRevenue') {
    const search = (searchParams.get('search') || '').toLowerCase();
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const sortKey = searchParams.get('sortKey') || 'totalRevenue';
    const sortDir = searchParams.get('sortDir') || 'desc';

    let filtered = MOCK_ADMIN_PLAN_REVENUE.filter(p =>
      !search || `${p.planName} ${p.tier}`.toLowerCase().includes(search)
    );

    const sorted = [...filtered].sort((a: any, b: any) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const res = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? res : -res;
    });

    const totalPages = Math.max(1, Math.ceil(sorted.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const pageData = sorted.slice(start, start + limit);

    return buildMockSuccess(pageData, 'Success', {
      total: sorted.length,
      page: safePage,
      limit,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    });
  }
  if (urlPath === '/admin/payouts/kpis') {
    return buildMockSuccess({
      totalNetProfit: MOCK_PAYOUTS.reduce((sum, item) => sum + item.netProfit, 0),
      totalGrossRevenue: MOCK_PAYOUTS.reduce((sum, item) => sum + item.grossRevenue, 0),
      totalExpenses: MOCK_PAYOUTS.reduce((sum, item) => sum + item.staffPayroll + item.operationalExpenses + item.platformFee, 0),
      pendingPayouts: MOCK_PAYOUTS.filter(item => item.payoutStatus === 'pending').length,
    });
  }
  if (urlPath === '/admin/payouts/pnl') {
    return buildMockSuccess(MOCK_PNL);
  }
  if (urlPath === '/admin/payouts') {
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const totalPages = Math.max(1, Math.ceil(MOCK_PAYOUTS.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const pageData = MOCK_PAYOUTS.slice(start, start + limit);
    return buildMockSuccess(pageData, 'Success', {
      total: MOCK_PAYOUTS.length,
      page: safePage,
      limit,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    });
  }
  if (urlPath === '/admin/finance/pending-dues') {
    return buildMockSuccess({
      dues: [
        { id: 'due_1', memberName: 'Rahul Verma', phone: '9876543210', amount: 3500, dueDate: '2026-11-20', plan: 'Gold Annual', branchName: 'Andheri East' },
        { id: 'due_2', memberName: 'Simran Kaur', phone: '9876543211', amount: 1500, dueDate: '2026-11-22', plan: 'Silver Pro', branchName: 'Bandra West' },
        { id: 'due_3', memberName: 'Amit Shah', phone: '9876543212', amount: 2000, dueDate: '2026-11-25', plan: 'Quarterly Flex', branchName: 'Powai' },
      ],
      totalPendingAmount: 7000,
      count: 3,
    });
  }
  if (urlPath === '/admin/finance/summary') {
    const range = searchParams.get('range');
    let summary = { ...MOCK_ADMIN_FINANCE_SUMMARY };
    if (range === 'last_month') {
      summary = { ...summary, monthlyRevenue: 1150000, totalPayments: 810, pendingAmount: 310000, totalExpenses: 2650000, netProfit: 2450000 };
    } else if (range === 'last_3_months') {
      summary = { ...summary, monthlyRevenue: 3450000, totalPayments: 2420, pendingAmount: 750000, totalExpenses: 7900000, netProfit: 7400000 };
    } else if (range === 'this_year' || range === 'yearly') {
      summary = { ...summary, monthlyRevenue: 13800000, totalPayments: 9800, pendingAmount: 1200000, totalExpenses: 31000000, netProfit: 29500000 };
    }
    return buildMockSuccess(summary);
  }
  if (urlPath === '/admin/finance/payments/fetchPayments' || urlPath === '/admin/finance/payments') {
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const totalPages = Math.max(1, Math.ceil(MOCK_ADMIN_PAYMENTS_EXPANDED.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const pageData = MOCK_ADMIN_PAYMENTS_EXPANDED.slice(start, start + limit);
    return buildMockSuccess(pageData, 'Success', {
      total: MOCK_ADMIN_PAYMENTS_EXPANDED.length,
      page: safePage,
      limit,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    });
  }
  if (urlPath === '/admin/finance/payments/fetchExpenses' || urlPath === '/admin/finance/expenses') {
    return buildMockSuccess(MOCK_ADMIN_EXPENSES);
  }

  // 8. Staff & HR
  if (urlPath === '/admin/hr/summary') {
    const payrolls = currentAdminPayrolls;
    const totalSalaryThisMonth = payrolls.reduce((sum, item) => sum + item.amount, 0);
    const totalSalaryPaid = payrolls.reduce((sum, item) => sum + item.paidAmount, 0);
    const totalSalaryDue = payrolls.reduce((sum, item) => sum + item.pendingAmount, 0) + currentAdminStaff.reduce((sum, item) => sum + (item.currentDue ?? 0), 0);
    const totalAdvanceGiven = currentAdminLedger.filter((entry) => entry.type === 'Advance Given').reduce((sum, entry) => sum + entry.debit, 0);
    const pendingPaymentsCount = payrolls.filter((item) => item.pendingAmount > 0).length + currentAdminStaff.filter((item) => (item.currentDue ?? 0) > 0).length;
    return buildMockSuccess({
      totalSalaryThisMonth,
      totalSalaryPaid,
      totalSalaryDue,
      totalAdvanceGiven,
      pendingPaymentsCount,
      totalStaff: currentAdminStaff.length,
      activeStaff: currentAdminStaff.filter((item) => item.isActive).length,
      totalPayrollThisMonth: totalSalaryThisMonth,
      paidCount: payrolls.filter((item) => item.pendingAmount === 0).length,
      pendingCount: payrolls.filter((item) => item.pendingAmount > 0).length,
    });
  }
  if (urlPath === '/admin/hr/payrolls') {
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const totalPages = Math.max(1, Math.ceil(currentAdminPayrolls.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const pageData = currentAdminPayrolls.slice(start, start + limit);
    return buildMockSuccess({ payrolls: pageData, total: currentAdminPayrolls.length }, 'Success', {
      total: currentAdminPayrolls.length,
      page: safePage,
      limit,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    });
  }
  if (urlPath === '/admin/hr/advances') {
    return buildMockSuccess(null, 'Salary advance recorded');
  }
  if (urlPath === '/admin/hr/dues/pay') {
    return buildMockSuccess(null, 'Staff due payment recorded');
  }
  if (urlPath === '/frontend_admin/admin_staff_franchise/admin_hr/admin_hr_performance') {
    const search = (searchParams.get('search') || '').toLowerCase();
    let filtered = MOCK_ADMIN_STAFF_PERFORMANCE.filter(s =>
      !search || `${s.name} ${s.role} ${s.branchName}`.toLowerCase().includes(search)
    );
    return buildMockSuccess(filtered);
  }
  if (urlPath.startsWith('/admin/hr/staff')) {
    if (urlPath.endsWith('/ledger')) {
      return buildMockSuccess(currentAdminLedger);
    }
    if (urlPath === '/admin/hr/staff/bulk-deactivate') {
      let body: any = {};
      try { body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}; } catch {}
      const ids: string[] = Array.isArray(body.ids) ? body.ids : [];
      currentAdminStaff.forEach((s) => {
        if (ids.includes(s.id)) {
          s.isActive = false;
        }
      });
      return buildMockSuccess(null, 'Staff members deactivated successfully');
    }
    if (urlPath === '/admin/hr/staff') {
      if (method === 'POST') {
        let body: any = {};
        try { body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}; } catch {}
        const newStaff: Staff = {
          id: `staff_${Date.now()}`,
          name: body.name || 'New Staff Member',
          role: body.role || 'Trainer',
          email: body.email || 'staff@smartgym.com',
          phone: body.phone || '9876543210',
          branch: body.branch || 'Andheri East',
          gender: body.gender || 'Male',
          salary: Number(body.salary) || 30000,
          isActive: body.isActive !== undefined ? body.isActive : true,
          joinDate: new Date().toISOString().slice(0, 10),
          department: body.department || 'Fitness',
          ...body,
        };
        currentAdminStaff.unshift(newStaff);
        return buildMockSuccess(newStaff, 'Staff created successfully');
      }

      const page = parseInt(searchParams.get('page') || '1', 10) || 1;
      const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
      const totalPages = Math.max(1, Math.ceil(currentAdminStaff.length / limit));
      const safePage = Math.min(page, totalPages);
      const start = (safePage - 1) * limit;
      const pageData = currentAdminStaff.slice(start, start + limit);
      return buildMockSuccess({
        staff: pageData,
        total: currentAdminStaff.length,
      }, 'Success', {
        total: currentAdminStaff.length,
        page: safePage,
        limit,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
      });
    }

    const staffId = urlPath.replace('/admin/hr/staff/', '');
    if (method === 'PATCH') {
      let body: any = {};
      try { body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}; } catch {}
      const idx = currentAdminStaff.findIndex((s) => s.id === staffId);
      if (idx !== -1) {
        currentAdminStaff[idx] = { ...currentAdminStaff[idx], ...body };
        return buildMockSuccess(currentAdminStaff[idx], 'Staff updated successfully');
      }
      return buildMockSuccess(currentAdminStaff[0], 'Staff updated');
    }
    if (method === 'DELETE') {
      currentAdminStaff = currentAdminStaff.filter((s) => s.id !== staffId);
      return buildMockSuccess(null, 'Staff deleted successfully');
    }
    const found = currentAdminStaff.find((s) => s.id === staffId) || currentAdminStaff[0];
    return buildMockSuccess(found);
  }

  // 9. Subscriptions & Billing
  if (urlPath === '/admin/subscriptions/fetchSubscription') {
    return buildMockSuccess(currentSubscriptionState);
  }
  if (urlPath === '/admin/subscriptions/fetchKPIs') {
    return buildMockSuccess(MOCK_SUBSCRIPTION_KPI);
  }
  if (urlPath === '/admin/subscriptions/fetchPlans') {
    return buildMockSuccess(MOCK_SAAS_PLANS);
  }
  if (urlPath === '/admin/subscriptions/fetchInvoices') {
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const totalPages = Math.max(1, Math.ceil(MOCK_INVOICES.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const pageData = MOCK_INVOICES.slice(start, start + limit);
    return buildMockSuccess(pageData, 'Invoice history loaded', {
      total: MOCK_INVOICES.length,
      page: safePage,
      limit,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    });
  }
  if (urlPath === '/admin/subscriptions/fetchPaymentMethods') {
    return buildMockSuccess(currentPaymentMethodsState);
  }
  if (urlPath === '/admin/subscriptions/upgradePlan') {
    return buildMockSuccess(null, 'Plan upgraded');
  }
  if (urlPath === '/admin/subscriptions/toggleAutoRenew') {
    currentSubscriptionState.autoRenew = !currentSubscriptionState.autoRenew;
    return buildMockSuccess(null, 'Auto-renewal updated');
  }
  if (urlPath === '/admin/subscriptions/setDefaultPaymentMethod') {
    return buildMockSuccess(null, 'Default payment method updated');
  }
  if (urlPath === '/admin/subscriptions/removePaymentMethod') {
    return buildMockSuccess(null, 'Payment method removed');
  }
  if (urlPath === '/admin/usage') {
    return buildMockSuccess(MOCK_ADMIN_USAGE_DATA);
  }
  if (urlPath === '/admin/usage/upgrade-request') {
    return buildMockSuccess({ requestId: `up_${Date.now()}` }, 'Upgrade request recorded');
  }

  // 10. Gyms & Branches
  if (urlPath === '/admin/gyms/branches' || urlPath === '/admin/gyms/branches_directory') {
    return buildMockSuccess(MOCK_BRANCHES);
  }
  if (urlPath === '/admin/gym-health-alerts/summary') {
    return buildMockSuccess(MOCK_GYM_HEALTH_KPI);
  }
  if (urlPath === '/frontend_admin/admin_gyms/gyms_health_alerts_monitoring' || urlPath.startsWith('/admin/gym-health-alerts')) {
    if (urlPath.includes('/dismiss')) {
      return buildMockSuccess(null, 'Alert dismissed');
    }
    const severity = searchParams.get('severity');
    const search = searchParams.get('search')?.trim().toLowerCase() ?? '';
    let alerts = MOCK_GYM_HEALTH_ALERTS;
    if (severity && severity !== 'all') {
      alerts = alerts.filter((item) => item.severity === severity);
    }
    if (search) {
      alerts = alerts.filter((item) => `${item.title} ${item.description} ${item.gymName}`.toLowerCase().includes(search));
    }
    return buildMockSuccess(alerts);
  }

  // 11. Plans & Coupons Catalog
  if (urlPath === '/admin/plans/fetchAllPlans' || urlPath === '/admin/plans') {
    return buildMockSuccess(currentAdminPlans);
  }
  if (urlPath === '/admin/plans/fetchPlanById') {
    const id = searchParams.get('id');
    const found = currentAdminPlans.find((p) => p.id === id) || currentAdminPlans[0];
    return buildMockSuccess(found);
  }
  if (urlPath === '/admin/plans/createPlan') {
    let body: any = {};
    try { body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}; } catch {}
    const newPlan: any = {
      id: `p_${Date.now()}`,
      name: body.name || 'New Membership Plan',
      tier: body.tier || 'Silver',
      price1Month: Number(body.price1Month) || 1500,
      price3Month: Number(body.price3Month) || 4000,
      price6Month: Number(body.price6Month) || 7500,
      price12Month: Number(body.price12Month) || 14000,
      features: Array.isArray(body.features) && body.features.length > 0 ? body.features : ['All equipment access', 'Locker room'],
      isActive: body.isActive !== undefined ? body.isActive : true,
      freezeAllowed: Boolean(body.freezeAllowed),
      joiningFee: Number(body.joiningFee) || 500,
      ptSessionsIncluded: Number(body.ptSessionsIncluded) || 0,
      taxRate: Number(body.taxRate) || 18,
    };
    currentAdminPlans.push(newPlan);
    return buildMockSuccess(newPlan, 'Plan created successfully');
  }
  if (urlPath === '/admin/plans/updatePlan') {
    let body: any = {};
    try { body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}; } catch {}
    const idx = currentAdminPlans.findIndex((p) => p.id === body.id);
    if (idx !== -1) {
      currentAdminPlans[idx] = { ...currentAdminPlans[idx], ...body };
      return buildMockSuccess(currentAdminPlans[idx], 'Plan updated successfully');
    }
    return buildMockSuccess(currentAdminPlans[0], 'Plan updated');
  }
  if (urlPath === '/admin/plans/deletePlan') {
    let body: any = {};
    try { body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}; } catch {}
    const id = body.id || searchParams.get('id');
    currentAdminPlans = currentAdminPlans.filter((p) => p.id !== id);
    return buildMockSuccess(null, 'Plan deleted successfully');
  }
  if (urlPath.startsWith('/admin/coupons')) {
    if (urlPath === '/admin/coupons/kpis') {
      return buildMockSuccess(MOCK_COUPONS_KPI);
    }
    return buildMockSuccess(MOCK_COUPONS_EXPANDED);
  }

  // 12. Communication & Announcements
  if (urlPath.startsWith('/admin/announcements')) {
    if (urlPath === '/admin/announcements/kpis') {
      return buildMockSuccess(MOCK_ANNOUNCEMENT_KPI);
    }
    return buildMockSuccess(MOCK_ANNOUNCEMENTS);
  }
  if (urlPath.startsWith('/admin/notifications')) {
    if (urlPath === '/admin/notifications/read-all' || urlPath.endsWith('/read')) {
      return buildMockSuccess(null, 'Marked as read');
    }
    return buildMockSuccess(currentAdminNotifications);
  }
  if (urlPath.startsWith('/admin/campaigns')) {
    if (urlPath === '/admin/campaigns/templates') {
      return buildMockSuccess(ADMIN_CAMPAIGNS_TEMPLATES);
    }
    if (urlPath === '/admin/campaigns/audiences') {
      return buildMockSuccess(ADMIN_CAMPAIGNS_AUDIENCES);
    }
    if (urlPath === '/admin/campaigns/recipients') {
      return buildMockSuccess(ADMIN_CAMPAIGNS_RECIPIENTS_PENDING);
    }
  }

  // 13. Security Permissions & Audit Logs
  if (
    urlPath === '/frontend_admin/admin_security/security_permissions_management' ||
    urlPath === '/admin/permissions' ||
    urlPath === '/admin/permissions/fetchPermissions'
  ) {
    return buildMockSuccess(MOCK_ADMIN_PERMISSIONS);
  }
  if (urlPath === '/admin/permissions/overrides') {
    return buildMockSuccess(currentAdminPermissionOverrides);
  }
  if (urlPath.startsWith('/admin/permissions/')) {
    if (urlPath.endsWith('/reset')) {
      return buildMockSuccess(null, 'Permissions reset to role defaults');
    }
    return buildMockSuccess(null, 'Permission updated');
  }
  if (urlPath.startsWith('/admin/audit-logs')) {
    if (urlPath === '/admin/audit-logs/kpis') {
      return buildMockSuccess(MOCK_AUDIT_KPI);
    }
    if (urlPath === '/admin/audit-logs/actors') {
      return buildMockSuccess({ actors: MOCK_AUDIT_ACTORS });
    }
    if (urlPath === '/admin/audit-logs/export') {
      return buildMockSuccess({ downloadUrl: '/__mocks__/admin/audit.csv' }, 'Export generated');
    }
    const logId = urlPath.replace('/admin/audit-logs/', '');
    if (logId && logId !== '/admin/audit-logs') {
      const found = MOCK_AUDIT_LOGS.find((l) => l.id === logId);
      if (found) {
        return buildMockSuccess(found);
      }
      return buildMockSuccess({
        ...MOCK_AUDIT_LOGS[0],
        id: logId,
      });
    }

    const search = searchParams.get('search')?.toLowerCase() || '';
    const actor = searchParams.get('actor') || 'all';
    const action = searchParams.get('action') || 'all';
    const severity = searchParams.get('severity') || 'all';

    let filtered = [...MOCK_AUDIT_LOGS];
    if (search) {
      filtered = filtered.filter(
        (l) =>
          l.details.toLowerCase().includes(search) ||
          l.action.toLowerCase().includes(search) ||
          l.actor.toLowerCase().includes(search) ||
          l.entityType.toLowerCase().includes(search)
      );
    }
    if (actor !== 'all') {
      filtered = filtered.filter((l) => l.actor === actor);
    }
    if (action !== 'all') {
      filtered = filtered.filter((l) => l.action === action);
    }
    if (severity !== 'all') {
      filtered = filtered.filter((l) => l.severity === severity);
    }

    return buildMockSuccess(filtered);
  }

  // 14. Settings & Profile
  if (urlPath === '/admin/settings/fetchSettings' || urlPath === '/admin/settings') {
    return buildMockSuccess(currentAdminSettings);
  }
  if (urlPath === '/admin/settings/updateSettings') {
    let body: any = {};
    try { body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}; } catch {}
    currentAdminSettings = {
      ...currentAdminSettings,
      ...body,
    };
    return buildMockSuccess(currentAdminSettings, 'Settings saved successfully');
  }
  if (urlPath === '/admin/settings/2fa/status') {
    return buildMockSuccess({ enabled: (currentAdminSettings as any).general?.twoFactorAuth ?? false });
  }
  if (urlPath === '/admin/settings/2fa/enable' || urlPath === '/admin/settings/2fa/verify') {
    if ((currentAdminSettings as any).general) {
      (currentAdminSettings as any).general.twoFactorAuth = true;
    }
    return buildMockSuccess({ enabled: true }, '2FA enabled successfully');
  }
  if (urlPath === '/admin/settings/2fa/disable') {
    if ((currentAdminSettings as any).general) {
      (currentAdminSettings as any).general.twoFactorAuth = false;
    }
    return buildMockSuccess({ enabled: false }, '2FA disabled successfully');
  }
  if (urlPath === '/admin/settings/notifications') {
    return buildMockSuccess(currentAdminSettings.notifications, 'Notification preferences updated');
  }

  if (urlPath === '/admin/adminProfile/fetchProfile' || urlPath === '/admin/profile') {
    return buildMockSuccess(currentAdminProfile);
  }
  if (urlPath === '/admin/adminProfile/updateProfile') {
    let body: any = {};
    try { body = typeof options?.body === 'string' ? JSON.parse(options.body) : {}; } catch {}
    currentAdminProfile = {
      ...currentAdminProfile,
      name: body.name || currentAdminProfile.name,
      phone: body.phone || currentAdminProfile.phone,
      avatarInitial: (body.name || currentAdminProfile.name).charAt(0).toUpperCase(),
    };
    return buildMockSuccess(currentAdminProfile, 'Profile updated successfully');
  }
  if (urlPath === '/admin/adminProfile/updatePassword') {
    return buildMockSuccess(null, 'Password updated successfully');
  }

  return null;
}
