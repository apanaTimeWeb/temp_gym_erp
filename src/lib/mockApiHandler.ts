import type { ApiResponse } from '@/lib/api';
import { handleManagerMockApiRequest } from '@/lib/managerMockHandlers';

// Trainer Mock Fixture Imports
import {
  TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS,
} from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/mocks/TrainerDashboardOverviewMockData';

import {
  TRAINER_MEMBERS_MOCK_MEMBERS,
  TRAINER_MEMBERS_MOCK_MEMBER_STATS,
} from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/mocks/handlers/TrainerMembersDirectoryAndProfileMockData';

import {
  TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS,
  TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS,
} from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/mocks/fixtures/TrainerCoachingSessionsMockData';

import {
  TRAINER_WORKOUT_MOCK_WORKOUTS,
  TRAINER_WORKOUT_MOCK_EXERCISES,
} from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/mocks/handlers/TrainerCoachingWorkoutPlansMockData';

import {
  TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS,
  TRAINER_LIBRARY_MOCK_LIBRARY_ASSIGNED_MEMBERS,
} from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/mocks/fixtures/TrainerCoachingDietLibraryAndAssignmentsMockData';

import {
  TRAINER_EARNINGS_MOCK_EARNINGS_DATA,
} from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/mocks/fixtures/TrainerEarningsOverviewAndLedgerEarningsMockData';

import {
  TRAINER_ATTENDANCE_MOCK_STATS,
  TRAINER_ATTENDANCE_MOCK_MEMBERS,
  TRAINER_ATTENDANCE_MOCK_RECORDS,
} from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/mocks/fixtures/TrainerOperationsMemberAttendanceAttendanceMockData';

import {
  TRAINER_SCHEDULE_MOCK_AVAILABILITY,
  TRAINER_SCHEDULE_MOCK_LEAVES,
} from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/mocks/fixtures/TrainerOperationsWeeklyAvailabilityScheduleMockData';

import {
  TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_MEMBERS,
  TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES,
} from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/mocks/fixtures/TrainerCoachingIndividualProgressProgressTrackingMockData';

import {
  TRAINER_PROFILE_MOCK_TRAINER_PROFILE,
} from '@/app/frontend_trainer/trainer_account/account_personal_profile/mocks/fixtures/TrainerAccountPersonalProfileProfileMockData';

import {
  TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS,
} from '@/app/frontend_trainer/trainer_account/account_notifications/mocks/fixtures/TrainerAccountNotificationsNotificationsMockData';

// Admin Mock Fixture Imports
import {
  getAdminDashboardFixture,
} from '@/app/frontend_admin/admin_dashboard/dashboard_overview/mocks/fixtures/AdminDashboardOverviewMockFixtures';

import {
  MOCK_MEMBERS_BRANCH_REFERENCES,
} from '@/app/frontend_admin/admin_members/members_directory/mocks/fixtures/AdminMembersDirectoryBranchReferenceMockFixtures';

import {
  MOCK_ADMIN_MEMBERS_EXPANDED,
  MOCK_ADMIN_MEMBERS_SUMMARY,
} from '@/app/frontend_admin/admin_members/members_directory/mocks/fixtures/AdminMembersDirectoryMockFixtures';

import {
  MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED,
} from '@/app/frontend_admin/admin_attendance/attendance_dashboard/mocks/fixtures/AdminAttendanceDashboardMockFixtures';

import {
  getAdminAttendanceReportsFixture,
} from '@/app/frontend_admin/admin_attendance/attendance_reports/mocks/fixtures/AdminAttendanceReportsMockFixtures';

import {
  MOCK_ADMIN_SALES_OVERVIEW,
  MOCK_ADMIN_SALES_REFERRALS,
} from '@/app/frontend_admin/admin_sales/sales_overview/mocks/fixtures/AdminSalesOverviewMockFixtures';

import {
  MOCK_ADMIN_ALL_MEMBERSHIPS,
} from '@/app/frontend_admin/admin_sales/sales_memberships/mocks/fixtures/AdminSalesMembershipsMockFixtures';

import {
  MOCK_ADMIN_STORE_ORDERS,
  MOCK_ADMIN_STORE_PRODUCTS,
} from '@/app/frontend_admin/admin_sales/sales_store_sales/mocks/fixtures/AdminSalesStoreSalesMockFixtures';

import {
  MOCK_ADMIN_FINANCE_SUMMARY,
  MOCK_ADMIN_PAYMENTS_EXPANDED,
  MOCK_ADMIN_EXPENSES,
} from '@/app/frontend_admin/admin_finance/finance_summary/mocks/fixtures/AdminFinanceSummaryMockFixtures';

import {
  MOCK_ADMIN_STAFF_EXPANDED,
} from '@/app/frontend_admin/admin_hr/hr_staff_management/mocks/fixtures/AdminHrStaffManagementMockFixtures';

import {
  MOCK_BRANCHES,
} from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/mocks/fixtures/AdminGymsBranchesDirectoryMockFixtures';

import {
  MOCK_GYM_HEALTH_ALERTS,
  MOCK_GYM_HEALTH_KPI,
} from '@/app/frontend_admin/admin_gyms/gyms_health_alerts_monitoring/mocks/fixtures/AdminGymsHealthAlertsMonitoringMockFixtures';

import {
  MOCK_ADMIN_PLANS,
} from '@/app/frontend_admin/admin_billing/billing_plans_catalog/mocks/fixtures/AdminBillingPlansCatalogMockFixtures';

import {
  MOCK_COUPONS_EXPANDED,
  MOCK_COUPONS_KPI,
} from '@/app/frontend_admin/admin_billing/billing_coupons_management/mocks/fixtures/AdminBillingCouponsManagementMockFixtures';

import {
  MOCK_ANNOUNCEMENTS,
  MOCK_ANNOUNCEMENT_KPI,
} from '@/app/frontend_admin/admin_communication/communication_notices_and_announcements/mocks/fixtures/AdminCommunicationNoticesAndAnnouncementsMockFixtures';

import {
  MOCK_ADMIN_NOTIFICATIONS,
} from '@/app/frontend_admin/admin_communication/communication_notifications_center/mocks/fixtures/AdminCommunicationNotificationsCenterMockFixtures';

import {
  ADMIN_CAMPAIGNS_TEMPLATES,
  ADMIN_CAMPAIGNS_AUDIENCES,
  ADMIN_CAMPAIGNS_RECIPIENTS_PENDING,
} from '@/app/frontend_admin/admin_communication/communication_whatsapp_campaigns/mocks/fixtures/AdminCommunicationWhatsAppCampaignsManagementMockFixtures';

import {
  MOCK_AUDIT_LOGS,
  MOCK_AUDIT_KPI,
  MOCK_AUDIT_ACTORS,
} from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/mocks/fixtures/AdminSecurityAuditLogsExplorerMockFixtures';

import {
  MOCK_ADMIN_SETTINGS,
} from '@/app/frontend_admin/admin_settings/settings_management/mocks/fixtures/AdminSettingsManagementMockFixtures';

import {
  MOCK_ADMIN_PROFILE,
} from '@/app/frontend_admin/admin_profile/profile_overview/mocks/fixtures/AdminProfileOverviewMockFixtures';

function getStoredUser() {
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('gymsmart_user');
      if (raw) return JSON.parse(raw);
    } catch {
      // Storage access fallback
    }
  }
  return null;
}

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

export function handleMockApiRequest(endpoint: string, options: RequestInit = {}): ApiResponse<any> | null {
  const method = (options.method || 'GET').toUpperCase();
  const urlPath = endpoint.split('?')[0];
  const queryStr = endpoint.includes('?') ? endpoint.split('?')[1] : '';
  const searchParams = new URLSearchParams(queryStr);

  // MANAGER ENDPOINTS
  if (urlPath.startsWith('/api/v1/manager') || urlPath.startsWith('/manager')) {
    const managerResponse = handleManagerMockApiRequest(urlPath, method, searchParams, options);
    if (managerResponse) return managerResponse;
  }

  // 1. AUTH ENDPOINTS
  if (
    urlPath === '/frontend_auth/auth/demo_login' ||
    urlPath === '/frontend_auth/auth/demo-login' ||
    urlPath === '/auth/demo-login' ||
    urlPath === '/auth/demo_login'
  ) {
    let role = 'TRAINER';
    try {
      if (options.body && typeof options.body === 'string') {
        const parsed = JSON.parse(options.body);
        if (parsed.role) role = String(parsed.role).toUpperCase();
      }
    } catch {
      // Use default
    }

    const validRoles = ['SUPERADMIN', 'ADMIN', 'MANAGER', 'TRAINER'] as const;
    const finalRole = validRoles.includes(role as any) ? role : 'TRAINER';

    const roleNameMap: Record<string, string> = {
      TRAINER: 'Michael Trainer',
      SUPERADMIN: 'Super Admin',
      ADMIN: 'Branch Admin',
      MANAGER: 'Operations Manager',
    };

    const user = {
      id: `usr_${finalRole.toLowerCase()}_01`,
      name: roleNameMap[finalRole] || `${finalRole} User`,
      email: `${finalRole.toLowerCase()}@smartgym360.com`,
      role: finalRole,
      tenantId: 'gym_demo_01',
    };

    const token = `mock_access_${finalRole.toLowerCase()}_${Date.now()}`;

    // Set browser session cookies and storage
    if (typeof document !== 'undefined') {
      document.cookie = `gymsmart_token=${token}; path=/; max-age=86400`;
      document.cookie = `gymsmart_user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400`;
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('gymsmart_token', token);
        localStorage.setItem('gymsmart_user', JSON.stringify(user));
      } catch {
        // Storage access fallback
      }
    }

    return buildMockSuccess(user, 'Demo authentication successful');
  }

  if (urlPath === '/frontend_auth/auth/session' || urlPath === '/auth/session') {
    if (method === 'POST') {
      let email = 'trainer@smartgym360.com';
      try {
        if (options.body && typeof options.body === 'string') {
          const parsed = JSON.parse(options.body);
          if (parsed.email) email = parsed.email;
        }
      } catch {
        // Fallback
      }

      let role = 'TRAINER';
      if (email.includes('superadmin')) role = 'SUPERADMIN';
      else if (email.includes('admin')) role = 'ADMIN';
      else if (email.includes('manager')) role = 'MANAGER';

      const user = {
        id: `usr_${role.toLowerCase()}_01`,
        name: role === 'TRAINER' ? 'Michael Trainer' : 'Authorized User',
        email,
        role,
        tenantId: 'gym_demo_01',
      };

      const token = `token_${role.toLowerCase()}_${Date.now()}`;
      if (typeof document !== 'undefined') {
        document.cookie = `gymsmart_token=${token}; path=/; max-age=86400`;
        document.cookie = `gymsmart_user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=86400`;
      }
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('gymsmart_token', token);
          localStorage.setItem('gymsmart_user', JSON.stringify(user));
        } catch {
          // Storage fallback
        }
      }

      return buildMockSuccess(user, 'Login successful');
    }

    // GET session check: prioritize active stored user
    const stored = getStoredUser();
    const user = stored || {
      id: 'usr_trainer_01',
      name: 'Michael Trainer',
      email: 'trainer@smartgym360.com',
      role: 'TRAINER',
      tenantId: 'gym_demo_01',
    };
    return buildMockSuccess(user, 'Session active');
  }

  if (urlPath === '/auth/me' || urlPath === '/frontend_auth/auth/me') {
    const stored = getStoredUser();
    const user = stored || {
      id: 'usr_trainer_01',
      name: 'Michael Trainer',
      email: 'trainer@smartgym360.com',
      role: 'TRAINER',
      tenantId: 'gym_demo_01',
    };
    return buildMockSuccess(user, 'Current user retrieved');
  }

  // 2. ADMIN ENDPOINTS
  if (urlPath === '/admin/dashboard/fetchDashboardStats') {
    const branchId = searchParams.get('branchId') || undefined;
    const rawRange = searchParams.get('range') || 'this_month';
    const fixture = getAdminDashboardFixture(branchId === 'all' ? undefined : branchId, rawRange as any);
    return buildMockSuccess(fixture, 'Dashboard data loaded');
  }

  if (urlPath === '/admin/branches/fetchBranches' || urlPath === '/admin/branches') {
    if (searchParams.get('consumer') === 'members') {
      return buildMockSuccess({ items: MOCK_MEMBERS_BRANCH_REFERENCES });
    }
    return buildMockSuccess(MOCK_BRANCHES);
  }

  if (urlPath.startsWith('/admin/branches/') && urlPath !== '/admin/branches/fetchBranches') {
    const branchId = urlPath.replace('/admin/branches/', '');
    const found = MOCK_BRANCHES.find((b) => b.id === branchId) || MOCK_BRANCHES[0];
    return buildMockSuccess(found);
  }

  if (urlPath === '/admin/members/summary') {
    return buildMockSuccess(MOCK_ADMIN_MEMBERS_SUMMARY);
  }

  if (urlPath === '/admin/members/list' || urlPath === '/admin/members') {
    const search = (searchParams.get('search') || '').trim().toLowerCase();
    const status = searchParams.get('status');
    const branchId = searchParams.get('branchId');
    let filtered = MOCK_ADMIN_MEMBERS_EXPANDED;
    if (search) {
      filtered = filtered.filter((m) => `${m.name} ${m.email} ${m.phone}`.toLowerCase().includes(search));
    }
    if (status && status !== 'all') {
      filtered = filtered.filter((m) => m.status === status);
    }
    if (branchId && branchId !== 'all') {
      filtered = filtered.filter((m) => m.branchId === branchId);
    }
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
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

  if (urlPath.startsWith('/admin/members/')) {
    const memberId = urlPath.replace('/admin/members/', '');
    if (memberId === 'export') {
      return buildMockSuccess('id,name,email,phone\nm1,Rahul,rahul@example.com,9876543210', 'Member export ready');
    }
    const member = MOCK_ADMIN_MEMBERS_EXPANDED.find((m) => m.id === memberId) || MOCK_ADMIN_MEMBERS_EXPANDED[0];
    return buildMockSuccess(member, 'Member retrieved');
  }

  if (urlPath === '/admin/attendance/summary') {
    return buildMockSuccess({
      todayTotal: 2450,
      todayPresent: 2180,
      todayLate: 120,
      weeklyAverage: 2100,
      peakHour: '18:00',
      trendVsLastWeek: 4.5,
      uniqueMembersThisMonth: 3850,
    });
  }

  if (urlPath === '/admin/attendance/records') {
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
    const totalPages = Math.max(1, Math.ceil(MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED.length / limit));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * limit;
    const pageData = MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED.slice(start, start + limit);
    return buildMockSuccess(pageData, 'Success', {
      total: MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED.length,
      page: safePage,
      limit,
      totalPages,
      hasNextPage: safePage < totalPages,
      hasPrevPage: safePage > 1,
    });
  }

  if (urlPath === '/admin/attendance/trend') {
    return buildMockSuccess([
      { date: '2026-10-01', count: 312 },
      { date: '2026-10-02', count: 287 },
      { date: '2026-10-03', count: 345 },
      { date: '2026-10-04', count: 298 },
      { date: '2026-10-05', count: 378 },
      { date: '2026-10-06', count: 421 },
      { date: '2026-10-07', count: 395 },
    ]);
  }

  if (urlPath === '/admin/reports/attendance') {
    const from = searchParams.get('from') || '2026-10-01';
    const to = searchParams.get('to') || '2026-10-31';
    const gymId = searchParams.get('gymId') || 'all';
    return buildMockSuccess(getAdminAttendanceReportsFixture({ gymId, from, to }));
  }

  if (urlPath === '/admin/sales/overview') {
    return buildMockSuccess({ monthlyRevenue: MOCK_ADMIN_SALES_OVERVIEW });
  }

  if (urlPath === '/admin/sales/referral-sources') {
    return buildMockSuccess(MOCK_ADMIN_SALES_REFERRALS);
  }

  if (urlPath === '/admin/sales/summary') {
    return buildMockSuccess({
      totalRevenue: 154000,
      newMembers: 34,
      conversionRate: 14.2,
      activeLeads: 88,
    });
  }

  if (urlPath === '/admin/sales/all-memberships') {
    return buildMockSuccess({
      members: MOCK_ADMIN_ALL_MEMBERSHIPS,
      total: MOCK_ADMIN_ALL_MEMBERSHIPS.length,
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

  if (urlPath === '/admin/finance/summary') {
    return buildMockSuccess(MOCK_ADMIN_FINANCE_SUMMARY);
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

  if (urlPath.startsWith('/admin/hr/staff')) {
    if (urlPath === '/admin/hr/staff') {
      const page = parseInt(searchParams.get('page') || '1', 10) || 1;
      const limit = parseInt(searchParams.get('limit') || '10', 10) || 10;
      const totalPages = Math.max(1, Math.ceil(MOCK_ADMIN_STAFF_EXPANDED.length / limit));
      const safePage = Math.min(page, totalPages);
      const start = (safePage - 1) * limit;
      const pageData = MOCK_ADMIN_STAFF_EXPANDED.slice(start, start + limit);
      return buildMockSuccess({
        staff: pageData,
        total: MOCK_ADMIN_STAFF_EXPANDED.length,
      }, 'Success', {
        total: MOCK_ADMIN_STAFF_EXPANDED.length,
        page: safePage,
        limit,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
      });
    }
    const staffId = urlPath.replace('/admin/hr/staff/', '');
    const found = MOCK_ADMIN_STAFF_EXPANDED.find((s) => s.id === staffId) || MOCK_ADMIN_STAFF_EXPANDED[0];
    return buildMockSuccess(found);
  }

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

  if (urlPath === '/admin/plans/fetchAllPlans' || urlPath === '/admin/plans') {
    return buildMockSuccess(MOCK_ADMIN_PLANS);
  }

  if (urlPath.startsWith('/admin/coupons')) {
    if (urlPath === '/admin/coupons/kpis') {
      return buildMockSuccess(MOCK_COUPONS_KPI);
    }
    return buildMockSuccess(MOCK_COUPONS_EXPANDED);
  }

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
    return buildMockSuccess(MOCK_ADMIN_NOTIFICATIONS);
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

  if (urlPath.startsWith('/admin/audit-logs')) {
    if (urlPath === '/admin/audit-logs/kpis') {
      return buildMockSuccess(MOCK_AUDIT_KPI);
    }
    if (urlPath === '/admin/audit-logs/actors') {
      return buildMockSuccess(MOCK_AUDIT_ACTORS);
    }
    return buildMockSuccess(MOCK_AUDIT_LOGS);
  }

  if (urlPath === '/admin/settings/fetchSettings' || urlPath === '/admin/settings') {
    return buildMockSuccess(MOCK_ADMIN_SETTINGS);
  }

  if (urlPath === '/admin/adminProfile/fetchProfile' || urlPath === '/admin/profile') {
    return buildMockSuccess(MOCK_ADMIN_PROFILE);
  }

  // 3. TRAINER ENDPOINTS
  let trainerPath = '';
  if (urlPath.startsWith('/trainer/')) {
    trainerPath = urlPath.slice('/trainer/'.length);
  } else if (urlPath.startsWith('/frontend_trainer/api/')) {
    trainerPath = urlPath.slice('/frontend_trainer/api/'.length);
  }

  if (trainerPath) {
    // Dashboard Stats
    if (trainerPath === 'trainer_dashboard/stats' || trainerPath === 'stats') {
      return buildMockSuccess(TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS, 'Dashboard statistics retrieved successfully');
    }

    // Members
    if (trainerPath === 'members') {
      return buildMockSuccess({
        members: TRAINER_MEMBERS_MOCK_MEMBERS,
        total: TRAINER_MEMBERS_MOCK_MEMBERS.length,
        page: 1,
        limit: 50,
      });
    }
    if (trainerPath === 'trainer_members/stats' || trainerPath === 'members/stats') {
      return buildMockSuccess(TRAINER_MEMBERS_MOCK_MEMBER_STATS);
    }
    if (trainerPath.startsWith('trainer_members/') || trainerPath.startsWith('members/')) {
      const parts = trainerPath.split('/');
      const memberId = parts[1];
      const sub = parts[2];
      if (sub === 'notes') {
        return buildMockSuccess((TRAINER_MEMBERS_MOCK_MEMBERS[0] as any).trainerNotes || []);
      }
      if (sub === 'attendance') {
        return buildMockSuccess([]);
      }
      const member = TRAINER_MEMBERS_MOCK_MEMBERS.find((m) => m.id === memberId) || TRAINER_MEMBERS_MOCK_MEMBERS[0];
      return buildMockSuccess(member);
    }

    // Sessions
    if (trainerPath === 'sessions/members' || trainerPath === 'trainer_sessions/members') {
      return buildMockSuccess(TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS);
    }
    if (trainerPath === 'sessions' || trainerPath === 'trainer_sessions') {
      return buildMockSuccess(TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS);
    }
    if (trainerPath.startsWith('trainer_sessions/') || trainerPath.startsWith('sessions/')) {
      return buildMockSuccess(TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS[0]);
    }

    // Workouts & Exercises
    if (trainerPath === 'trainer_workout/workouts' || trainerPath === 'workouts') {
      return buildMockSuccess({
        workouts: TRAINER_WORKOUT_MOCK_WORKOUTS,
        total: TRAINER_WORKOUT_MOCK_WORKOUTS.length,
        page: 1,
        limit: 50,
      });
    }
    if (trainerPath === 'trainer_workout/exercises' || trainerPath === 'exercises') {
      return buildMockSuccess({
        exercises: TRAINER_WORKOUT_MOCK_EXERCISES,
        total: TRAINER_WORKOUT_MOCK_EXERCISES.length,
        page: 1,
        limit: 50,
      });
    }

    // Diet Plans
    if (trainerPath === 'diet-plans' || trainerPath === 'trainer_diet/diet-plans') {
      return buildMockSuccess(TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS);
    }
    if (trainerPath === 'diet-plans/assigned-members' || trainerPath === 'trainer_diet/assigned-members') {
      return buildMockSuccess(TRAINER_LIBRARY_MOCK_LIBRARY_ASSIGNED_MEMBERS);
    }

    // Earnings
    if (trainerPath === 'earnings' || trainerPath === 'trainer_earnings') {
      const page = Number(searchParams.get('historyPage') || '1');
      const limit = Number(searchParams.get('historyLimit') || '10');
      return buildMockSuccess({
        ...TRAINER_EARNINGS_MOCK_EARNINGS_DATA,
        historyTotal: TRAINER_EARNINGS_MOCK_EARNINGS_DATA.history.length,
        historyPage: page,
        historyLimit: limit,
      });
    }

    // Attendance
    if (trainerPath === 'attendance' || trainerPath === 'trainer_attendance') {
      const page = Number(searchParams.get('page') || '1');
      const limit = Number(searchParams.get('limit') || '10');
      return buildMockSuccess({
        attendance: TRAINER_ATTENDANCE_MOCK_RECORDS,
        total: TRAINER_ATTENDANCE_MOCK_RECORDS.length,
        page,
        limit,
      });
    }
    if (trainerPath === 'trainer_attendance/stats' || trainerPath === 'attendance/stats') {
      return buildMockSuccess(TRAINER_ATTENDANCE_MOCK_STATS);
    }
    if (trainerPath === 'trainer_attendance/members-basic' || trainerPath === 'attendance/members-basic') {
      return buildMockSuccess(TRAINER_ATTENDANCE_MOCK_MEMBERS);
    }
    if (trainerPath === 'trainer_attendance/today-stats') {
      return buildMockSuccess({ present: 18, absent: 4, late: 2 });
    }
    if (trainerPath.startsWith('trainer_attendance/checkout/')) {
      return buildMockSuccess(null, 'Checkout recorded');
    }

    // Schedule & Leaves
    if (trainerPath === 'schedule' || trainerPath === 'trainer_schedule') {
      return buildMockSuccess({
        availability: TRAINER_SCHEDULE_MOCK_AVAILABILITY,
        leaves: TRAINER_SCHEDULE_MOCK_LEAVES,
      });
    }
    if (trainerPath === 'trainer_schedule/availability') {
      return buildMockSuccess(TRAINER_SCHEDULE_MOCK_AVAILABILITY);
    }
    if (trainerPath === 'trainer_schedule/leaves') {
      return buildMockSuccess(TRAINER_SCHEDULE_MOCK_LEAVES);
    }

    // Profile & Notifications
    if (trainerPath === 'profile' || trainerPath === 'trainer_profile') {
      return buildMockSuccess(TRAINER_PROFILE_MOCK_TRAINER_PROFILE);
    }
    if (trainerPath === 'trainer_profile/password') {
      return buildMockSuccess(null, 'Password updated');
    }
    if (trainerPath === 'notifications' || trainerPath === 'trainer_notifications') {
      return buildMockSuccess({
        notifications: TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS,
        total: TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS.length,
        page: 1,
        limit: 20,
      });
    }
    if (trainerPath === 'trainer_notifications/read-all') {
      return buildMockSuccess(null, 'All marked as read');
    }
    if (trainerPath.startsWith('trainer_notifications/') && trainerPath.endsWith('/read')) {
      return buildMockSuccess(null, 'Marked as read');
    }

    return buildMockSuccess({}, 'Resource processed');
  }

  return null;
}
