import type { ApiResponse } from '@/lib/api';

// Manager Mock Fixture Imports
import { MOCK_DASHBOARD_STATS } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/mocks/ManagerDashboardOverviewMockData';
import { MOCK_MEMBERS, MOCK_MEMBER_STATS } from '@/app/frontend_manager/manager_members/members_directory/mocks/fixtures/ManagerMembersDirectoryMockData';
import { MOCK_ATTENDANCE_STATS, MOCK_ATTENDANCE_RECORDS } from '@/app/frontend_manager/manager_attendance/attendance_tracking/mocks/fixtures/ManagerAttendanceTrackingMockData';
import { MANAGER_ATTENDANCE_TRACKING_MEMBER_SNAPSHOTS, MANAGER_ATTENDANCE_TRACKING_STAFF_SNAPSHOTS } from '@/app/frontend_manager/manager_attendance/attendance_tracking/mocks/fixtures/ManagerAttendanceTrackingQrMockData';
import { MOCK_FINANCE_SUMMARY, MOCK_PAYMENTS } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/mocks/fixtures/ManagerFinancePaymentsAndSummaryMockData';
import { MOCK_EXPENSES_LIST } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/mocks/fixtures/ManagerExpenseRegisterAndReportingMockData';
import { createManagerPayrollAndLedgerFixtureSet, MOCK_PAYROLL_AND_LEDGER_MONTH } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/fixtures/ManagerPayrollAndLedgerMockData';
import { MOCK_NOTIFICATIONS, MOCK_NOTIFICATION_KPIS } from '@/app/frontend_manager/manager_communications/notifications_inbox/mocks/fixtures/ManagerNotificationsInboxMockData';
import { MOCK_CAMPAIGNS, MOCK_AUTOMATIONS, MOCK_COMM_KPI, MOCK_CANCELLED_MEMBERS, MOCK_CANCELLATIONS_KPI } from '@/app/frontend_manager/manager_communications/communications_automations/mocks/fixtures/ManagerCommunicationsAutomationsMockData';
import { MOCK_SEGMENT_MEMBERS } from '@/app/frontend_manager/manager_communications/communications_compose/mocks/handlers/ManagerCommunicationsComposeMockHandlers';
import { MOCK_SALES_OVERVIEW, MOCK_MEMBERSHIP_REPORT, MOCK_PENDING_PAYMENTS, MOCK_ALL_MEMBERSHIPS } from '@/app/frontend_manager/manager_sales_billing/sales_overview/mocks/fixtures/ManagerSalesOverviewMockData';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_STORE_SUMMARY } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/mocks/fixtures/ManagerStoreProductsCatalogMockData';
import { MOCK_PT_KPIS, MOCK_PT_PACKAGES, MOCK_PT_WORKLOAD, MOCK_PT_ASSIGNMENTS } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/mocks/fixtures/ManagerPtAssignmentsMockData';
import { MOCK_TRAINERS, buildMockScheduleKpis } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/mocks/fixtures/ManagerTrainerScheduleMockData';
import { MOCK_INQUIRIES, MOCK_INQUIRY_STATS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/mocks/fixtures/ManagerInquiriesPipelineMockData';
import { MOCK_REFERRALS, MOCK_REFERRALS_KPIS } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/mocks/fixtures/ManagerReferralsRewardsMockData';
import { MOCK_REPORT_SUMMARY } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/mocks/fixtures/ManagerReportsOverviewMockData';
import { MOCK_PLANS } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/mocks/fixtures/ManagerMembershipLifecycleMockData';
import { MOCK_PLANS_MEMBERSHIP_OVERVIEW } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/mocks/fixtures/ManagerMembershipLifecycleMembershipMockData';
import { MOCK_MANAGER_WORKOUT_PLANSS } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/mocks/fixtures/ManagerAssignedWorkoutPlansMockData';
import { MOCK_WORKOUT_ASSIGNMENTS } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/mocks/fixtures/ManagerWorkoutPlansAssignmentMockData';
import { MOCK_MANAGER_WORKOUT_EXERCISES } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/mocks/fixtures/ManagerExerciseLibraryExerciseMockData';
import { MOCK_MANAGER_DIET_PLANS } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/mocks/fixtures/ManagerLibraryDietPlansDietMockData';
import { MOCK_MANAGER_BUSINESS_SETTINGS } from '@/app/frontend_manager/manager_dashboard/business_settings/mocks/fixtures/ManagerBusinessSettingsMockData';
import { MOCK_PROFILE } from '@/app/frontend_manager/manager_dashboard/profile_and_security/mocks/fixtures/ManagerProfileAndSecurityMockData';
import { MOCK_GRIEVANCE_TICKETS } from '@/app/frontend_manager/manager_grievances/grievance_resolution/mocks/fixtures/ManagerGrievanceResolutionMockFixtures';
import { MOCK_MAINTENANCE_TICKETS } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/mocks/fixtures/ManagerMaintenanceRequestsMockFixtures';

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

// In-memory mutable states
const hrData = createManagerPayrollAndLedgerFixtureSet(15, MOCK_PAYROLL_AND_LEDGER_MONTH);
let currentNotifications = [...MOCK_NOTIFICATIONS];
let currentGrievances = [...MOCK_GRIEVANCE_TICKETS];
let currentMaintenance = [...MOCK_MAINTENANCE_TICKETS];
let currentInquiries = [...MOCK_INQUIRIES];
let currentExpenses = [...MOCK_EXPENSES_LIST];
let currentSettings = { ...MOCK_MANAGER_BUSINESS_SETTINGS };
let currentProfile = { ...MOCK_PROFILE };

export function handleManagerMockApiRequest(
  urlPath: string,
  method: string,
  searchParams: URLSearchParams,
  options: RequestInit = {}
): ApiResponse<any> | null {
  // Normalize manager prefix: "/api/v1/manager/..." or "/manager/..."
  let path = urlPath;
  if (path.startsWith('/api/v1/manager/')) {
    path = path.slice('/api/v1/manager/'.length);
  } else if (path.startsWith('/api/v1/manager')) {
    path = path.slice('/api/v1/manager'.length);
  } else if (path.startsWith('/manager/')) {
    path = path.slice('/manager/'.length);
  } else {
    return null;
  }

  // 1. DASHBOARD
  if (path === 'dashboard/stats' || path === 'dashboard') {
    return buildMockSuccess(MOCK_DASHBOARD_STATS, 'Dashboard statistics loaded');
  }

  // 2. ATTENDANCE
  if (path === 'attendance/stats') {
    return buildMockSuccess(MOCK_ATTENDANCE_STATS, 'Attendance stats loaded');
  }
  if (path === 'attendance/members') {
    return buildMockSuccess(MANAGER_ATTENDANCE_TRACKING_MEMBER_SNAPSHOTS, 'Attendance member snapshots loaded');
  }
  if (path === 'attendance/staff') {
    return buildMockSuccess(MANAGER_ATTENDANCE_TRACKING_STAFF_SNAPSHOTS, 'Attendance staff snapshots loaded');
  }
  if (path === 'attendance/history') {
    return buildMockSuccess(MOCK_ATTENDANCE_RECORDS, 'Attendance history loaded');
  }
  if (path === 'attendance') {
    const search = (searchParams.get('search') || '').trim().toLowerCase();
    const date = searchParams.get('date') || '';
    const status = (searchParams.get('status') || '').trim().toUpperCase();
    const type = (searchParams.get('type') || '').trim().toUpperCase();
    const page = Math.max(Number(searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(searchParams.get('limit') || '10'), 1);

    const filtered = MOCK_ATTENDANCE_RECORDS.filter((record) => {
      const name = (record.member?.name || record.staff?.name || '').toLowerCase();
      const matchesSearch = !search || name.includes(search);
      const matchesDate = !date || record.date === date;
      const recordStatus = (record.status || '').toUpperCase();
      const matchesStatus =
        !status ||
        status === 'ALL' ||
        status === 'ALL_FILTER' ||
        recordStatus === status ||
        (status === 'PRESENT' && (recordStatus.includes('PRESENT') || Boolean(record.checkIn))) ||
        (status === 'ABSENT' && recordStatus.includes('ABSENT')) ||
        (status === 'LATE' && recordStatus.includes('LATE'));
      const matchesType = !type || record.type === type;
      return matchesSearch && matchesDate && matchesStatus && matchesType;
    });

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return buildMockSuccess(
      { attendances: paginated, total: filtered.length },
      'Attendance records loaded',
      { total: filtered.length, page, limit, totalPages: Math.ceil(filtered.length / limit) || 1 }
    );
  }

  // 3. MEMBERS
  if (path === 'members/stats') {
    return buildMockSuccess(MOCK_MEMBER_STATS, 'Member stats loaded');
  }
  if (path === 'members/plans') {
    return buildMockSuccess(MOCK_PLANS, 'Membership plans loaded');
  }
  if (path === 'members/trainers') {
    return buildMockSuccess(
      hrData.staff.filter((s) => s.role.toLowerCase().includes('trainer') || s.role.toLowerCase().includes('coach')),
      'Trainers loaded'
    );
  }
  if (path === 'members/diet-plans') {
    return buildMockSuccess(MOCK_MANAGER_DIET_PLANS, 'Diet plans loaded');
  }
  if (path === 'members/workouts') {
    return buildMockSuccess(MOCK_MANAGER_WORKOUT_PLANSS, 'Workouts loaded');
  }
  if (path.startsWith('members/') && path.endsWith('/attendance')) {
    return buildMockSuccess(MOCK_ATTENDANCE_RECORDS.slice(0, 5), 'Member attendance loaded');
  }
  if (path.startsWith('members/') && path.endsWith('/payments')) {
    return buildMockSuccess(MOCK_PAYMENTS.slice(0, 5), 'Member payments loaded');
  }
  if (path === 'members' || path === 'members/') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newMember = { ...MOCK_MEMBERS[0], ...body, id: `m-${Date.now()}` };
        return buildMockSuccess(newMember, 'Member added successfully');
      } catch {
        return buildMockSuccess(MOCK_MEMBERS[0], 'Member added');
      }
    }
    const search = (searchParams.get('search') || '').trim().toLowerCase();
    const status = (searchParams.get('status') || '').trim().toUpperCase();
    const page = Math.max(Number(searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(searchParams.get('limit') || '10'), 1);

    const filtered = MOCK_MEMBERS.filter((m) => {
      const matchesSearch = !search || m.name.toLowerCase().includes(search) || m.phone.includes(search) || (m.email && m.email.toLowerCase().includes(search));
      const matchesStatus = !status || status === 'ALL' || m.status?.toUpperCase() === status;
      return matchesSearch && matchesStatus;
    });

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return buildMockSuccess(
      { members: paginated, total: filtered.length },
      'Members list loaded',
      { total: filtered.length, page, limit, totalPages: Math.ceil(filtered.length / limit) || 1 }
    );
  }
  if (path.startsWith('members/')) {
    const memberId = path.split('/')[1];
    const found = MOCK_MEMBERS.find((m) => m.id === memberId) || MOCK_MEMBERS[0];
    return buildMockSuccess(found, 'Member retrieved');
  }

  // 4. COMMUNICATIONS & NOTIFICATIONS
  if (path === 'notifications/kpis') {
    return buildMockSuccess(MOCK_NOTIFICATION_KPIS, 'Notification KPIs loaded');
  }
  if (path === 'notifications/read-all') {
    currentNotifications = currentNotifications.map((n) => ({ ...n, status: 'READ' as const }));
    return buildMockSuccess(null, 'All marked as read');
  }
  if (path.startsWith('notifications/') && path.endsWith('/read')) {
    return buildMockSuccess(null, 'Notification marked as read');
  }
  if (path === 'notifications') {
    return buildMockSuccess({ notifications: currentNotifications, total: currentNotifications.length }, 'Notifications loaded');
  }

  if (path.startsWith('communications/segments/')) {
    const segment = path.replace('communications/segments/', '');
    const recipients = (MOCK_SEGMENT_MEMBERS as Record<string, any>)[segment] || MOCK_SEGMENT_MEMBERS.all_active;
    return buildMockSuccess(recipients, 'Segment recipients loaded');
  }

  if (path === 'communications/kpis') {
    return buildMockSuccess(MOCK_COMM_KPI, 'Communications KPIs loaded');
  }
  if (path === 'communications/campaigns') {
    return buildMockSuccess({ campaigns: MOCK_CAMPAIGNS, total: MOCK_CAMPAIGNS.length }, 'Campaigns loaded');
  }
  if (path === 'communications/automations') {
    return buildMockSuccess(MOCK_AUTOMATIONS, 'Automations loaded');
  }
  if (path === 'communications/churn-kpis') {
    return buildMockSuccess(MOCK_CANCELLATIONS_KPI, 'Churn KPIs loaded');
  }
  if (path === 'communications/churned-members') {
    return buildMockSuccess(MOCK_CANCELLED_MEMBERS, 'Churned members loaded');
  }
  if (path === 'communications/win-back') {
    return buildMockSuccess({ success: true }, 'Win-back campaign triggered');
  }
  if (path === 'communications') {
    return buildMockSuccess({ campaigns: MOCK_CAMPAIGNS }, 'Communications loaded');
  }

  // 5. FINANCE & EXPENSES
  if (path === 'finance/summary') {
    return buildMockSuccess(MOCK_FINANCE_SUMMARY, 'Finance summary loaded');
  }
  if (path === 'finance/payments' || path === 'finance') {
    const page = Math.max(Number(searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(searchParams.get('limit') || '10'), 1);
    const start = (page - 1) * limit;
    const paginated = MOCK_PAYMENTS.slice(start, start + limit);
    return buildMockSuccess(
      { payments: paginated, total: MOCK_PAYMENTS.length },
      'Payments loaded',
      { total: MOCK_PAYMENTS.length, page, limit, totalPages: Math.ceil(MOCK_PAYMENTS.length / limit) || 1 }
    );
  }
  if (path === 'finance/export') {
    return buildMockSuccess({ url: '#' }, 'Finance export generated');
  }

  if (path === 'expenses/stats') {
    const totalAmount = currentExpenses.reduce((s, e) => s + e.amount, 0);
    const paidAmount = currentExpenses.filter((e) => e.status === 'PAID').reduce((s, e) => s + e.amount, 0);
    return buildMockSuccess(
      { totalAmount, paidAmount, pendingAmount: totalAmount - paidAmount, thisMonthAmount: paidAmount },
      'Expense stats loaded'
    );
  }
  if (path === 'expenses' || path === 'expenses/') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newExpense = {
          ...currentExpenses[0],
          ...body,
          id: String(currentExpenses.length + 1),
          createdAt: new Date().toISOString(),
          isRecurring: body.isRecurring ?? false,
        };
        currentExpenses = [newExpense, ...currentExpenses];
        return buildMockSuccess(newExpense, 'Expense recorded');
      } catch {
        return buildMockSuccess(currentExpenses[0], 'Expense recorded');
      }
    }
    const page = Math.max(Number(searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(searchParams.get('limit') || '10'), 1);
    const start = (page - 1) * limit;
    const paginated = currentExpenses.slice(start, start + limit);
    return buildMockSuccess(
      { expenses: paginated, total: currentExpenses.length, page, limit },
      'Expenses loaded',
      { total: currentExpenses.length, page, limit, totalPages: Math.ceil(currentExpenses.length / limit) || 1 }
    );
  }

  // 6. HR & PAYROLL
  if (path === 'hr/summary') {
    return buildMockSuccess(hrData.summary, 'HR summary loaded');
  }
  if (path === 'hr/staff') {
    return buildMockSuccess({ staff: hrData.staff, total: hrData.staff.length }, 'Staff list loaded');
  }
  if (path === 'hr/payrolls') {
    return buildMockSuccess({ payrolls: hrData.payrolls, total: hrData.payrolls.length }, 'Payrolls loaded');
  }
  if (path === 'hr/payrolls/generate') {
    return buildMockSuccess({ count: hrData.payrolls.length }, 'Payroll generation complete');
  }
  if (path.startsWith('hr/ledger')) {
    return buildMockSuccess({ ledger: hrData.ledger, total: hrData.ledger.length }, 'Ledger loaded');
  }
  if (path.includes('attendance')) {
    const records = Array.from({ length: 28 }, (_, i) => ({
      date: `2026-09-${String(i + 1).padStart(2, '0')}`,
      status: i % 7 === 0 ? 'LEAVE' : 'PRESENT',
      checkIn: '09:00',
      checkOut: '18:00',
    }));
    return buildMockSuccess({ history: records }, 'Staff attendance history loaded');
  }

  // 7. SALES & BILLING
  if (path === 'sales/overview') {
    return buildMockSuccess({ monthlyRevenue: MOCK_SALES_OVERVIEW }, 'Sales overview loaded');
  }
  if (path === 'sales/membership-report') {
    return buildMockSuccess(
      {
        report: MOCK_MEMBERSHIP_REPORT,
        totals: { activeCount: 450, revenue: 15000000, totalReceivable: 15000000, totalReceived: 14500000, remaining: 500000, refunds: 0 },
        total: MOCK_MEMBERSHIP_REPORT.length,
      },
      'Membership report loaded'
    );
  }
  if (path === 'sales/pending-payments') {
    return buildMockSuccess({ members: MOCK_PENDING_PAYMENTS, total: MOCK_PENDING_PAYMENTS.length }, 'Pending payments loaded');
  }
  if (path === 'sales/all-memberships') {
    return buildMockSuccess({ members: MOCK_ALL_MEMBERSHIPS, total: MOCK_ALL_MEMBERSHIPS.length }, 'All memberships loaded');
  }

  // 8. STORE POS & CATALOG
  if (path === 'store/summary') {
    return buildMockSuccess(MOCK_STORE_SUMMARY, 'Store summary loaded');
  }
  if (path === 'store/products') {
    return buildMockSuccess({ products: MOCK_PRODUCTS, total: MOCK_PRODUCTS.length }, 'Store products loaded');
  }
  if (path === 'store/orders') {
    if (method === 'POST') {
      return buildMockSuccess({ ...MOCK_ORDERS[0], id: `ord-${Date.now()}` }, 'Order created');
    }
    return buildMockSuccess({ orders: MOCK_ORDERS, total: MOCK_ORDERS.length }, 'Store orders loaded');
  }

  // 9. PT & SCHEDULE
  if (path === 'pt/kpis') {
    return buildMockSuccess(MOCK_PT_KPIS, 'PT KPIs loaded');
  }
  if (path === 'pt/workload') {
    return buildMockSuccess(MOCK_PT_WORKLOAD, 'PT Workload loaded');
  }
  if (path === 'pt/packages') {
    return buildMockSuccess(MOCK_PT_PACKAGES, 'PT Packages loaded');
  }
  if (path === 'pt/assignments') {
    return buildMockSuccess({ assignments: MOCK_PT_ASSIGNMENTS, total: MOCK_PT_ASSIGNMENTS.length }, 'PT Assignments loaded');
  }
  if (path === 'schedule/shifts') {
    return buildMockSuccess(MOCK_TRAINERS[0]?.shifts ?? [], 'Shifts loaded');
  }
  if (path === 'schedule') {
    return buildMockSuccess({ trainers: MOCK_TRAINERS, kpis: buildMockScheduleKpis(MOCK_TRAINERS) }, 'Schedule loaded');
  }

  // 10. INQUIRIES & CRM
  if (path === 'inquiries/stats') {
    return buildMockSuccess(MOCK_INQUIRY_STATS, 'Inquiry stats loaded');
  }
  if (path === 'inquiries/plans' || path === 'inquiries/plans-snapshot') {
    return buildMockSuccess(MOCK_PLANS, 'Inquiry plans loaded');
  }
  if (path === 'inquiries' || path === 'inquiries/') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newInq = { ...MOCK_INQUIRIES[0], ...body, id: `inq-${Date.now()}` };
        currentInquiries = [newInq, ...currentInquiries];
        return buildMockSuccess(newInq, 'Inquiry logged');
      } catch {
        return buildMockSuccess(MOCK_INQUIRIES[0], 'Inquiry logged');
      }
    }
    return buildMockSuccess({ inquiries: currentInquiries, total: currentInquiries.length }, 'Inquiries loaded');
  }
  if (path.startsWith('inquiries/') && path.endsWith('/convert')) {
    return buildMockSuccess({ success: true }, 'Inquiry converted to member');
  }

  // 11. MEMBERSHIP LIFECYCLE PLANS
  if (path === 'plans' || path === 'plans/') {
    return buildMockSuccess({ plans: MOCK_PLANS, total: MOCK_PLANS.length }, 'Plans loaded');
  }
  if (path === 'plans/memberships' || path === 'membership-lifecycle') {
    return buildMockSuccess(MOCK_PLANS_MEMBERSHIP_OVERVIEW, 'Membership overview loaded');
  }

  // 12. WORKOUT & DIET LIBRARY
  if (path === 'workout/assignments' || path === 'workouts/assignments') {
    return buildMockSuccess(MOCK_WORKOUT_ASSIGNMENTS, 'Workout assignments loaded');
  }
  if (path === 'workouts' || path === 'workouts/') {
    return buildMockSuccess({ workouts: MOCK_MANAGER_WORKOUT_PLANSS, total: MOCK_MANAGER_WORKOUT_PLANSS.length }, 'Workout plans loaded');
  }
  if (path === 'workouts/exercises' || path === 'library/exercises') {
    return buildMockSuccess({ exercises: MOCK_MANAGER_WORKOUT_EXERCISES, total: MOCK_MANAGER_WORKOUT_EXERCISES.length }, 'Exercises loaded');
  }
  if (path === 'library/diet-plans') {
    return buildMockSuccess({ dietPlans: MOCK_MANAGER_DIET_PLANS, total: MOCK_MANAGER_DIET_PLANS.length }, 'Diet plans loaded');
  }

  // 13. GRIEVANCES & MAINTENANCE
  if (path === 'grievance' || path === 'grievances' || path === 'grievance/' || path === 'grievances/') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const ticket = { ...currentGrievances[0], ...body, id: `gt-${Date.now()}`, loggedAt: new Date().toISOString() };
        currentGrievances = [ticket, ...currentGrievances];
        return buildMockSuccess(ticket, 'Grievance submitted');
      } catch {
        return buildMockSuccess(currentGrievances[0], 'Grievance submitted');
      }
    }
    return buildMockSuccess(currentGrievances, 'Grievance tickets loaded');
  }
  if ((path.startsWith('grievance/') || path.startsWith('grievances/')) && path.endsWith('/resolve')) {
    return buildMockSuccess(currentGrievances[0], 'Grievance resolved');
  }

  if (path === 'maintenance' || path === 'maintenance/') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const ticket = { ...currentMaintenance[0], ...body, id: `mt-${Date.now()}`, reportedAt: new Date().toISOString() };
        currentMaintenance = [ticket, ...currentMaintenance];
        return buildMockSuccess(ticket, 'Maintenance ticket created');
      } catch {
        return buildMockSuccess(currentMaintenance[0], 'Maintenance ticket created');
      }
    }
    return buildMockSuccess(currentMaintenance, 'Maintenance tickets loaded');
  }
  if (path.startsWith('maintenance/') && path.endsWith('/resolve')) {
    return buildMockSuccess(currentMaintenance[0], 'Maintenance ticket resolved');
  }

  // 14. REFERRALS & REPORTS
  if (path === 'referrals/kpis') {
    return buildMockSuccess(MOCK_REFERRALS_KPIS, 'Referral KPIs loaded');
  }
  if (path === 'referrals') {
    return buildMockSuccess(MOCK_REFERRALS, 'Referrals loaded', { total: MOCK_REFERRALS.length, page: 1, limit: 10, totalPages: 1 });
  }
  if (path.startsWith('referrals/') && path.endsWith('/claim')) {
    return buildMockSuccess({ success: true }, 'Reward claimed');
  }

  if (path === 'reports/summary' || path === 'reports/overview' || path === 'reports') {
    return buildMockSuccess(MOCK_REPORT_SUMMARY, 'Reports summary loaded');
  }

  // 15. SETTINGS & PROFILE
  if (path === 'settings') {
    if (method === 'PATCH' || method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        currentSettings = { ...currentSettings, ...body };
      } catch {}
      return buildMockSuccess(currentSettings, 'Settings saved');
    }
    return buildMockSuccess(currentSettings, 'Settings loaded');
  }
  if (path === 'profile') {
    if (method === 'PATCH' || method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        currentProfile = { ...currentProfile, ...body };
      } catch {}
      return buildMockSuccess(currentProfile, 'Profile updated');
    }
    return buildMockSuccess(currentProfile, 'Profile loaded');
  }
  if (path === 'profile/password') {
    return buildMockSuccess({ success: true }, 'Password changed');
  }

  // Generic fallback for any other /api/v1/manager/* route
  return buildMockSuccess({}, 'Manager resource processed');
}
