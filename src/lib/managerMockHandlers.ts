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
let currentPtAssignments = [...MOCK_PT_ASSIGNMENTS];
let currentExercises = [...MOCK_MANAGER_WORKOUT_EXERCISES];
let currentWorkouts = [...MOCK_MANAGER_WORKOUT_PLANSS];
let currentDietPlans = [...MOCK_MANAGER_DIET_PLANS];
let currentAttendanceRecords = [...MOCK_ATTENDANCE_RECORDS];
let currentPlans = [...MOCK_PLANS];
let currentProducts = [...MOCK_PRODUCTS];
let currentReferrals = [...MOCK_REFERRALS];
let currentPayments = [...MOCK_PAYMENTS];
let currentCampaigns = [...MOCK_CAMPAIGNS];
let currentAutomations = [...MOCK_AUTOMATIONS];

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
    const range = searchParams.get('range');
    let stats = { ...MOCK_DASHBOARD_STATS };
    if (range === 'last_month') {
      stats = {
        ...stats,
        newMembersThisMonth: 38,
        monthlyRevenue: 7800000,
        todayCollection: 7800000,
        todayAttendance: 185,
        pendingPayments: 18500,
        newInquiries: 29,
        revenueGrowthPercent: 8.4,
        totalPTRevenue: 22000,
        churnRate: 3.8,
        revenueChart: [
          { month: 'Dec', revenue: 7200000 },
          { month: 'Jan', revenue: 7500000 },
          { month: 'Feb', revenue: 8000000 },
          { month: 'Mar', revenue: 7800000 },
          { month: 'Apr', revenue: 8200000 },
        ],
        memberGrowth: [
          { month: 'Dec', count: 1050 },
          { month: 'Jan', count: 1100 },
          { month: 'Feb', count: 1150 },
          { month: 'Mar', count: 1200 },
          { month: 'Apr', count: 1220 },
        ],
      };
    } else if (range === 'last_3_months') {
      stats = {
        ...stats,
        newMembersThisMonth: 122,
        monthlyRevenue: 24500000,
        todayCollection: 24500000,
        todayAttendance: 195,
        pendingPayments: 24000,
        newInquiries: 98,
        revenueGrowthPercent: 15.2,
        totalPTRevenue: 71000,
        churnRate: 4.0,
      };
    } else if (range === 'this_year' || range === 'yearly') {
      stats = {
        ...stats,
        newMembersThisMonth: 480,
        monthlyRevenue: 95000000,
        totalRevenue: 95000000,
        todayCollection: 95000000,
        todayAttendance: 210,
        pendingPayments: 45000,
        newInquiries: 380,
        revenueGrowthPercent: 24.0,
        totalPTRevenue: 285000,
        churnRate: 4.1,
      };
    } else if (range === 'weekly') {
      stats = {
        ...stats,
        newMembersThisMonth: 12,
        monthlyRevenue: 1950000,
        todayCollection: 1950000,
        todayAttendance: 195,
        pendingPayments: 8000,
        newInquiries: 8,
        revenueGrowthPercent: 5.0,
        totalPTRevenue: 6000,
      };
    } else if (range === 'custom') {
      stats = {
        ...stats,
        newMembersThisMonth: 25,
        monthlyRevenue: 4800000,
        newInquiries: 19,
        revenueGrowthPercent: 9.1,
        totalPTRevenue: 15000,
      };
    }
    return buildMockSuccess(stats, 'Dashboard statistics loaded');
  }

  // 2. ATTENDANCE
  if (path === 'attendance/stats') {
    const range = searchParams.get('range');
    let stats = { ...MOCK_ATTENDANCE_STATS };
    if (range === 'last_month') {
      stats = { totalCheckIns: 3240, memberCheckIns: 2850, staffCheckIns: 390 };
    } else if (range === 'last_3_months') {
      stats = { totalCheckIns: 9800, memberCheckIns: 8600, staffCheckIns: 1200 };
    } else if (range === 'this_year') {
      stats = { totalCheckIns: 38500, memberCheckIns: 33800, staffCheckIns: 4700 };
    } else if (range === 'custom') {
      stats = { totalCheckIns: 860, memberCheckIns: 750, staffCheckIns: 110 };
    }
    return buildMockSuccess(stats, 'Attendance stats loaded');
  }
  if (path.startsWith('attendance/checkout/') || (path.startsWith('attendance/') && path.endsWith('/checkout'))) {
    const id = path.includes('/checkout/') ? path.split('/')[2] : path.split('/')[1];
    const rec = currentAttendanceRecords.find((r: any) => String(r.id) === String(id) || String(r.memberId) === String(id) || String(r.staffId) === String(id));
    if (rec) {
      const now = new Date();
      const checkOutTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      let durationMinutes = 60;
      if (rec.checkIn) {
        try {
          const [inH, inM] = rec.checkIn.split(':').map(Number);
          const [outH, outM] = checkOutTime.split(':').map(Number);
          if (!isNaN(inH) && !isNaN(outH)) {
            durationMinutes = Math.max(1, (outH * 60 + outM) - (inH * 60 + inM));
          }
        } catch {}
      }
      const updatedRec = {
        ...rec,
        checkOut: checkOutTime,
        checkOutTime,
        durationMinutes,
      };
      currentAttendanceRecords = currentAttendanceRecords.map((r: any) => (String(r.id) === String(rec.id) ? updatedRec : r));
      return buildMockSuccess(updatedRec, 'Checkout recorded');
    }
    return buildMockSuccess(currentAttendanceRecords[0], 'Checkout recorded');
  }
  if (path === 'attendance/members') {
    return buildMockSuccess({ members: MANAGER_ATTENDANCE_TRACKING_MEMBER_SNAPSHOTS }, 'Attendance member snapshots loaded');
  }
  if (path === 'attendance/staff') {
    return buildMockSuccess({ staff: MANAGER_ATTENDANCE_TRACKING_STAFF_SNAPSHOTS }, 'Attendance staff snapshots loaded');
  }
  if (path === 'attendance/history') {
    return buildMockSuccess(currentAttendanceRecords, 'Attendance history loaded');
  }
  if (path === 'attendance') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const dateStr = body.date
          ? (typeof body.date === 'string' && body.date.includes('T') ? body.date.split('T')[0] : body.date)
          : new Date().toISOString().split('T')[0];
        let checkInTime = body.checkIn;
        if (!checkInTime) {
          const now = new Date();
          checkInTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        }
        const memberObj = body.member || (body.memberId ? { name: MANAGER_ATTENDANCE_TRACKING_MEMBER_SNAPSHOTS.find((m) => String(m.id) === String(body.memberId))?.name || 'Rahul Sharma' } : undefined);
        const staffObj = body.staff || (body.staffId ? { name: MANAGER_ATTENDANCE_TRACKING_STAFF_SNAPSHOTS.find((s) => String(s.id) === String(body.staffId))?.name || 'Amit Kumar' } : undefined);

        const newRecord = {
          id: `att_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          memberId: body.memberId ? Number(body.memberId) || undefined : undefined,
          staffId: body.staffId ? Number(body.staffId) || undefined : undefined,
          date: dateStr,
          checkIn: typeof checkInTime === 'string' && checkInTime.includes('T') ? checkInTime.split('T')[1].slice(0, 5) : String(checkInTime),
          checkOut: body.checkOut || undefined,
          type: (body.type || 'MEMBER').toUpperCase() as 'MEMBER' | 'STAFF',
          status: (body.status || 'PRESENT').toUpperCase(),
          member: memberObj,
          staff: staffObj,
          checkInMethod: body.checkInMethod || 'Manual',
        };
        currentAttendanceRecords = [newRecord as any, ...currentAttendanceRecords];
        return buildMockSuccess(newRecord, 'Attendance marked successfully');
      } catch {
        return buildMockSuccess(currentAttendanceRecords[0], 'Attendance marked');
      }
    }

    const search = (searchParams.get('search') || '').trim().toLowerCase();
    const date = searchParams.get('date') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    const status = (searchParams.get('status') || '').trim().toUpperCase();
    const type = (searchParams.get('type') || '').trim().toUpperCase();
    const page = Math.max(Number(searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(searchParams.get('limit') || '10'), 1);

    const filtered = currentAttendanceRecords.filter((record) => {
      const name = (record.member?.name || record.staff?.name || '').toLowerCase();
      const matchesSearch = !search || name.includes(search);
      const matchesDateRange = (!startDate || record.date >= startDate) && (!endDate || record.date <= endDate);
      const matchesDate = date ? record.date === date : matchesDateRange;
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
  if (path === 'members/export') {
    return buildMockSuccess({ members: MOCK_MEMBERS, total: MOCK_MEMBERS.length }, 'Members exported');
  }
  if (path === 'members/plans') {
    return buildMockSuccess(MOCK_PLANS, 'Membership plans loaded');
  }
  if (path === 'members/trainers') {
    const trainers = hrData.staff.filter((s) => s.role.toLowerCase().includes('trainer') || s.role.toLowerCase().includes('coach'));
    return buildMockSuccess(
      { staff: trainers.map((t) => ({ id: t.id, name: t.name, role: t.role })) },
      'Trainers loaded'
    );
  }
  if (path === 'members/diet-plans') {
    return buildMockSuccess(MOCK_MANAGER_DIET_PLANS, 'Diet plans loaded');
  }
  if (path === 'members/workouts') {
    return buildMockSuccess(MOCK_MANAGER_WORKOUT_PLANSS, 'Workouts loaded');
  }
  if (path.startsWith('members/') && path.endsWith('/diet')) {
    return buildMockSuccess({ success: true }, 'Diet plan assigned');
  }
  if (path.startsWith('members/') && path.endsWith('/workout')) {
    return buildMockSuccess({ success: true }, 'Workout plan assigned');
  }
  if (path.startsWith('members/') && path.endsWith('/renew')) {
    const memberId = path.split('/')[1];
    const found = MOCK_MEMBERS.find((m) => m.id === memberId) || MOCK_MEMBERS[0];
    return buildMockSuccess({ ...found, status: 'ACTIVE' }, 'Member renewed');
  }
  if (path.startsWith('members/') && path.endsWith('/attendance')) {
    return buildMockSuccess(currentAttendanceRecords.slice(0, 5), 'Member attendance loaded');
  }
  if (path.startsWith('members/') && path.endsWith('/payments')) {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newPayment = {
          ...currentPayments[0],
          ...body,
          id: `pay-${Date.now()}`,
          paidAt: new Date().toISOString(),
          status: 'PAID',
          invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
        };
        currentPayments = [newPayment, ...currentPayments];
        return buildMockSuccess(newPayment, 'Payment recorded');
      } catch {
        return buildMockSuccess(currentPayments[0], 'Payment recorded');
      }
    }
    return buildMockSuccess(currentPayments.slice(0, 5), 'Member payments loaded');
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
    const gender = (searchParams.get('gender') || '').trim().toUpperCase();
    const plan = (searchParams.get('plan') || '').trim();
    const expiryFrom = searchParams.get('expiryFrom') || '';
    const expiryTo = searchParams.get('expiryTo') || '';
    const page = Math.max(Number(searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(searchParams.get('limit') || '10'), 1);

    const filtered = MOCK_MEMBERS.filter((m) => {
      const matchesSearch = !search || m.name.toLowerCase().includes(search) || m.phone.includes(search) || (m.email && m.email.toLowerCase().includes(search));
      const matchesStatus = !status || status === 'ALL' || m.status?.toUpperCase() === status;
      const matchesGender = !gender || gender === 'ALL' || m.gender?.toUpperCase() === gender;
      const matchesPlan = !plan || plan === 'All' || m.planId === plan || (m.plan && m.plan.id === plan) || (m.plan && m.plan.name === plan);
      let matchesExpiry = true;
      if (expiryFrom && m.expiryDate) {
        matchesExpiry = matchesExpiry && new Date(m.expiryDate) >= new Date(expiryFrom);
      }
      if (expiryTo && m.expiryDate) {
        matchesExpiry = matchesExpiry && new Date(m.expiryDate) <= new Date(expiryTo);
      }
      return matchesSearch && matchesStatus && matchesGender && matchesPlan && matchesExpiry;
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
    if (method === 'DELETE') {
      return buildMockSuccess({ id: memberId }, 'Member deleted');
    }
    if (method === 'PATCH' || method === 'PUT') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const found = MOCK_MEMBERS.find((m) => m.id === memberId) || MOCK_MEMBERS[0];
        const updated = { ...found, ...body, id: memberId };
        return buildMockSuccess(updated, 'Member updated');
      } catch {
        return buildMockSuccess(MOCK_MEMBERS[0], 'Member updated');
      }
    }
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
  if (path.startsWith('notifications/') && method === 'DELETE') {
    const id = path.split('/')[1];
    currentNotifications = currentNotifications.filter((n) => n.id !== id);
    return buildMockSuccess(null, 'Notification deleted');
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
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newCamp = {
          ...MOCK_CAMPAIGNS[0],
          ...body,
          id: `camp-${Date.now()}`,
          status: 'SENT',
          sentAt: new Date().toISOString(),
        };
        currentCampaigns = [newCamp, ...currentCampaigns];
        return buildMockSuccess(newCamp, 'Campaign sent');
      } catch {
        return buildMockSuccess(MOCK_CAMPAIGNS[0], 'Campaign sent');
      }
    }
    return buildMockSuccess({ campaigns: currentCampaigns, total: currentCampaigns.length }, 'Campaigns loaded');
  }
  if (path.startsWith('communications/automations/')) {
    const id = path.split('/')[2];
    const found = currentAutomations.find((a) => a.id === id) || currentAutomations[0];
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const updated = { ...found, ...body, id };
      currentAutomations = currentAutomations.map((a) => (a.id === id ? updated : a));
      return buildMockSuccess(updated, 'Automation updated');
    } catch {
      return buildMockSuccess(found, 'Automation updated');
    }
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
    const range = searchParams.get('range');
    let summary = { ...MOCK_FINANCE_SUMMARY };
    if (range === 'last_month') {
      summary = {
        ...summary,
        monthlyRevenue: 11800000,
        totalPayments: 420,
        pendingAmount: 1200000,
        gstCollected: 2124000,
        totalRefunds: 350000,
      };
    } else if (range === 'last_3_months') {
      summary = {
        ...summary,
        monthlyRevenue: 35300000,
        totalPayments: 1280,
        pendingAmount: 2800000,
        gstCollected: 6354000,
        totalRefunds: 1100000,
      };
    } else if (range === 'last_6_months') {
      summary = {
        ...summary,
        monthlyRevenue: 71500000,
        totalPayments: 2500,
        pendingAmount: 3900000,
        gstCollected: 12870000,
        totalRefunds: 2200000,
      };
    } else if (range === 'this_year') {
      summary = {
        ...summary,
        monthlyRevenue: 145000000,
        totalPayments: 5100,
        pendingAmount: 4500000,
        gstCollected: 26100000,
        totalRefunds: 4200000,
      };
    } else if (range === 'custom') {
      summary = {
        ...summary,
        monthlyRevenue: 8500000,
        totalPayments: 310,
        pendingAmount: 900000,
        gstCollected: 1530000,
        totalRefunds: 200000,
      };
    }
    return buildMockSuccess(summary, 'Finance summary loaded');
  }
  if (path === 'finance/payments' || path === 'finance') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newPay = {
          ...currentPayments[0],
          ...body,
          id: `pay-${Date.now()}`,
          paidAt: new Date().toISOString(),
          status: 'PAID',
          invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
        };
        currentPayments = [newPay, ...currentPayments];
        return buildMockSuccess(newPay, 'Payment recorded');
      } catch {
        return buildMockSuccess(currentPayments[0], 'Payment recorded');
      }
    }
    const page = Math.max(Number(searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(searchParams.get('limit') || '10'), 1);
    const start = (page - 1) * limit;
    const paginated = currentPayments.slice(start, start + limit);
    return buildMockSuccess(
      { payments: paginated, total: currentPayments.length },
      'Payments loaded',
      { total: currentPayments.length, page, limit, totalPages: Math.ceil(currentPayments.length / limit) || 1 }
    );
  }
  if (path === 'finance/export') {
    const format = searchParams.get('format') || 'pdf';
    const downloadUrl = format === 'csv' ? '/__mocks__/manager/finance_export.csv' : '/__mocks__/manager/finance_export.pdf';
    return buildMockSuccess({ url: downloadUrl }, 'Finance export generated');
  }
  if (path === 'export' || path === 'data-export' || path === 'reports/export') {
    const type = (searchParams.get('type') || 'full_report').toLowerCase();
    const format = (searchParams.get('format') || 'csv').toLowerCase();
    let fileUrl = '/__mocks__/manager/reports_export.csv';
    if (type.includes('member')) fileUrl = '/__mocks__/manager/members_export.csv';
    else if (type.includes('payment') || type.includes('finance')) fileUrl = format === 'pdf' ? '/__mocks__/manager/finance_export.pdf' : '/__mocks__/manager/finance_export.csv';
    else if (type.includes('attend')) fileUrl = '/__mocks__/manager/attendance_export.csv';
    else if (type.includes('staff')) fileUrl = '/__mocks__/manager/staff_export.csv';
    else if (format === 'pdf') fileUrl = '/__mocks__/manager/finance_export.pdf';
    return buildMockSuccess({ url: fileUrl, status: 'SUCCESS' }, 'Export generated successfully');
  }

  if (path === 'expenses/stats') {
    const range = searchParams.get('range');
    const totalAmount = currentExpenses.reduce((s, e) => s + e.amount, 0);
    const paidAmount = currentExpenses.filter((e) => e.status === 'PAID').reduce((s, e) => s + e.amount, 0);
    let thisMonthAmount = paidAmount;
    let pendingAmount = totalAmount - paidAmount;
    if (range === 'last_month') {
      thisMonthAmount = Math.round(paidAmount * 0.85);
      pendingAmount = 35000;
    } else if (range === 'last_3_months') {
      thisMonthAmount = Math.round(paidAmount * 2.6);
      pendingAmount = 95000;
    } else if (range === 'this_year') {
      thisMonthAmount = Math.round(paidAmount * 11.2);
      pendingAmount = 240000;
    } else if (range === 'custom') {
      thisMonthAmount = Math.round(paidAmount * 0.5);
      pendingAmount = 20000;
    }
    return buildMockSuccess(
      { totalAmount, paidAmount, pendingAmount, thisMonthAmount },
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
  if (path === 'hr/staff' || path === 'hr/staff/') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newStaff = {
          ...hrData.staff[0],
          ...body,
          id: `staff-${Date.now()}`,
          isActive: true,
        };
        hrData.staff.unshift(newStaff);
        return buildMockSuccess(newStaff, 'Staff member added');
      } catch {
        return buildMockSuccess(hrData.staff[0], 'Staff member added');
      }
    }
    const search = (searchParams.get('search') || '').trim().toLowerCase();
    const role = (searchParams.get('role') || '').trim();
    let staffList = [...hrData.staff];
    if (search) {
      staffList = staffList.filter((s) => s.name.toLowerCase().includes(search) || s.phone.includes(search) || s.email.toLowerCase().includes(search));
    }
    if (role && role !== 'All' && role !== 'all') {
      staffList = staffList.filter((s) => s.role.toLowerCase() === role.toLowerCase());
    }
    return buildMockSuccess({ staff: staffList, total: staffList.length }, 'Staff list loaded');
  }
  if (path.startsWith('hr/staff/') && path.endsWith('/attendance')) {
    const parts = path.split('/');
    const staffId = parts[2];
    const month = searchParams.get('month') || searchParams.get('attendanceMonth') || new Date().toISOString().slice(0, 7);
    const records = Array.from({ length: 28 }, (_, i) => ({
      date: `${month}-${String(i + 1).padStart(2, '0')}`,
      status: i % 7 === 0 ? 'LEAVE' : (i % 11 === 0 ? 'ABSENT' : 'PRESENT'),
      checkIn: i % 7 === 0 || i % 11 === 0 ? undefined : '09:00 AM',
      checkOut: i % 7 === 0 || i % 11 === 0 ? undefined : '06:00 PM',
    }));
    return buildMockSuccess({ history: records }, 'Staff attendance history loaded');
  }
  if (path.startsWith('hr/staff/')) {
    const parts = path.split('/');
    const id = parts[2];
    const idx = hrData.staff.findIndex((s) => s.id === id);
    const existing = idx >= 0 ? hrData.staff[idx] : hrData.staff[0];
    if (method === 'DELETE') {
      if (idx >= 0) hrData.staff.splice(idx, 1);
      return buildMockSuccess({ id }, 'Staff member deleted');
    }
    if (method === 'PATCH' || method === 'PUT') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const updated = { ...existing, ...body };
        if (idx >= 0) hrData.staff[idx] = updated;
        return buildMockSuccess(updated, 'Staff member updated');
      } catch {
        return buildMockSuccess(existing, 'Staff member updated');
      }
    }
    return buildMockSuccess(existing, 'Staff member loaded');
  }
  if (path === 'hr/payrolls/generate') {
    return buildMockSuccess({ payrolls: hrData.payrolls }, 'Payroll generation complete');
  }
  if (path === 'hr/ledger/advance') {
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const amountMajor = Number(body.amount) || 5000;
      const amountMinor = amountMajor * 100;
      const staffId = body.staffId || hrData.staff[0]?.id;
      const staffMember = hrData.staff.find((s) => s.id === staffId);
      if (staffMember) {
        staffMember.advanceSalary = (staffMember.advanceSalary || 0) + amountMinor;
      }
      const newLedgerEntry = {
        id: `ledger-adv-${Date.now()}`,
        staffId: staffId || 'staff-0001',
        date: new Date().toISOString(),
        type: 'Advance Given' as const,
        notes: body.notes || 'Staff salary advance disbursed',
        credit: 0,
        debit: amountMinor,
        balance: staffMember ? -(staffMember.advanceSalary || 0) : -amountMinor,
        paymentMode: body.paymentMode || 'Cash',
      };
      hrData.ledger = [newLedgerEntry, ...hrData.ledger];
      return buildMockSuccess({ advanceAmount: amountMajor }, 'Advance granted');
    } catch {
      return buildMockSuccess({ advanceAmount: 5000 }, 'Advance granted');
    }
  }
  if (path === 'hr/ledger/paydue') {
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const amountMajor = Number(body.amount) || 5000;
      const amountMinor = amountMajor * 100;
      const staffId = body.staffId || hrData.staff[0]?.id;
      const staffMember = hrData.staff.find((s) => s.id === staffId);
      if (staffMember) {
        staffMember.currentDue = Math.max(0, (staffMember.currentDue || 0) - amountMinor);
      }
      const newLedgerEntry = {
        id: `ledger-due-${Date.now()}`,
        staffId: staffId || 'staff-0001',
        date: new Date().toISOString(),
        type: 'Due Paid' as const,
        notes: body.notes || 'Pending staff dues settled',
        credit: amountMinor,
        debit: 0,
        balance: staffMember?.currentDue || 0,
        paymentMode: body.paymentMode || 'Bank Transfer',
      };
      hrData.ledger = [newLedgerEntry, ...hrData.ledger];
      return buildMockSuccess({ paidAmount: amountMajor }, 'Due paid');
    } catch {
      return buildMockSuccess({ paidAmount: 5000 }, 'Due paid');
    }
  }
  if (path.startsWith('hr/payrolls/')) {
    const parts = path.split('/');
    const id = parts[2];
    const isStatus = parts[3] === 'status';
    const found = hrData.payrolls.find((p) => p.id === id) || hrData.payrolls[0];
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const updated = { ...found, ...body };
      return buildMockSuccess(updated, isStatus ? 'Payroll status updated' : 'Payroll updated');
    } catch {
      return buildMockSuccess(found, 'Payroll updated');
    }
  }
  if (path === 'hr/payrolls') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newPayroll = {
          ...hrData.payrolls[0],
          ...body,
          id: `pr-${Date.now()}`,
          deductions: body.deductions || { tds: 0, pf: 0, esi: 0, other: 0 },
        };
        hrData.payrolls.push(newPayroll);
        return buildMockSuccess(newPayroll, 'Payroll created');
      } catch {
        return buildMockSuccess(hrData.payrolls[0], 'Payroll created');
      }
    }
    return buildMockSuccess({ payrolls: hrData.payrolls, total: hrData.payrolls.length }, 'Payrolls loaded');
  }
  if (path.startsWith('hr/ledger')) {
    const parts = path.split('/');
    const staffIdParam = parts[2] || searchParams.get('staffId');
    const filteredLedger = staffIdParam
      ? hrData.ledger.filter((entry) => entry.staffId === staffIdParam)
      : hrData.ledger;
    return buildMockSuccess(
      { ledger: filteredLedger.length > 0 ? filteredLedger : hrData.ledger, total: filteredLedger.length || hrData.ledger.length },
      'Ledger loaded'
    );
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
    const range = searchParams.get('range');
    let overview = [...MOCK_SALES_OVERVIEW];
    if (range === 'last_month') {
      overview = [
        { month: 'Dec', revenue: 4200000, storeRevenue: 450000, newMembers: 11 },
        { month: 'Jan', revenue: 4500000, storeRevenue: 500000, newMembers: 12 },
        { month: 'Feb', revenue: 5200000, storeRevenue: 600000, newMembers: 18 },
        { month: 'Mar', revenue: 4800000, storeRevenue: 400000, newMembers: 10 },
        { month: 'Apr', revenue: 6100000, storeRevenue: 800000, newMembers: 22 },
      ];
    } else if (range === 'last_3_months') {
      overview = [
        { month: 'Feb', revenue: 5200000, storeRevenue: 600000, newMembers: 18 },
        { month: 'Mar', revenue: 4800000, storeRevenue: 400000, newMembers: 10 },
        { month: 'Apr', revenue: 6100000, storeRevenue: 800000, newMembers: 22 },
      ];
    } else if (range === 'this_year') {
      overview = [
        { month: 'Jan', revenue: 4500000, storeRevenue: 500000, newMembers: 12 },
        { month: 'Feb', revenue: 5200000, storeRevenue: 600000, newMembers: 18 },
        { month: 'Mar', revenue: 4800000, storeRevenue: 400000, newMembers: 10 },
        { month: 'Apr', revenue: 6100000, storeRevenue: 800000, newMembers: 22 },
        { month: 'May', revenue: 5900000, storeRevenue: 750000, newMembers: 20 },
        { month: 'Jun', revenue: 6500000, storeRevenue: 900000, newMembers: 25 },
        { month: 'Jul', revenue: 6800000, storeRevenue: 950000, newMembers: 28 },
      ];
    }
    return buildMockSuccess({ monthlyRevenue: overview }, 'Sales overview loaded');
  }
  if (path === 'sales/membership-report') {
    const range = searchParams.get('range');
    let totals = { activeCount: 450, revenue: 15000000, totalReceivable: 15000000, totalReceived: 14500000, remaining: 500000, refunds: 0 };
    if (range === 'last_month') {
      totals = { activeCount: 420, revenue: 13800000, totalReceivable: 13800000, totalReceived: 13400000, remaining: 400000, refunds: 0 };
    } else if (range === 'last_3_months') {
      totals = { activeCount: 435, revenue: 41000000, totalReceivable: 41000000, totalReceived: 39500000, remaining: 1500000, refunds: 0 };
    } else if (range === 'this_year') {
      totals = { activeCount: 510, revenue: 165000000, totalReceivable: 165000000, totalReceived: 158000000, remaining: 7000000, refunds: 0 };
    }
    return buildMockSuccess(
      {
        report: MOCK_MEMBERSHIP_REPORT,
        totals,
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
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newProd = {
          ...MOCK_PRODUCTS[0],
          ...body,
          id: `prod-${Date.now()}`,
          isActive: body.isActive ?? true,
        };
        currentProducts = [newProd, ...currentProducts];
        return buildMockSuccess(newProd, 'Product created');
      } catch {
        return buildMockSuccess(MOCK_PRODUCTS[0], 'Product created');
      }
    }
    return buildMockSuccess({ products: currentProducts, total: currentProducts.length }, 'Store products loaded');
  }
  if (path.startsWith('store/products/')) {
    const id = path.split('/')[2];
    if (method === 'DELETE') {
      currentProducts = currentProducts.filter((p) => p.id !== id);
      return buildMockSuccess({ id }, 'Product deleted');
    }
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const found = currentProducts.find((p) => p.id === id) || currentProducts[0];
      const updated = { ...found, ...body, id };
      currentProducts = currentProducts.map((p) => (p.id === id ? updated : p));
      return buildMockSuccess(updated, 'Product updated');
    } catch {
      return buildMockSuccess({ ...MOCK_PRODUCTS[0], id }, 'Product updated');
    }
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
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newAssignment = {
          ...MOCK_PT_ASSIGNMENTS[0],
          ...body,
          id: `pa-${Date.now()}`,
          memberName: body.memberName || 'Member',
          trainerName: body.trainerName || 'Trainer',
          packageName: body.packageName || 'Package',
          completedSessions: 0,
          totalSessions: body.totalSessions || 12,
          startDate: body.startDate || new Date().toISOString(),
        };
        currentPtAssignments = [newAssignment, ...currentPtAssignments];
        return buildMockSuccess(newAssignment, 'PT Assignment created');
      } catch {
        return buildMockSuccess(MOCK_PT_ASSIGNMENTS[0], 'PT Assignment created');
      }
    }
    const page = Math.max(Number(searchParams.get('page') || '1'), 1);
    const limit = Math.max(Number(searchParams.get('limit') || '10'), 1);
    return buildMockSuccess({ assignments: currentPtAssignments, total: currentPtAssignments.length, page, limit }, 'PT Assignments loaded');
  }
  if (path.startsWith('pt/assignments/') && path.endsWith('/complete-session')) {
    const id = path.split('/')[1];
    const match = currentPtAssignments.find((a) => a.id === id) || currentPtAssignments[0];
    const updated = { ...match, completedSessions: Math.min(match.completedSessions + 1, match.totalSessions) };
    currentPtAssignments = currentPtAssignments.map((a) => (a.id === id ? updated : a));
    return buildMockSuccess(updated, 'Session marked complete');
  }
  if (path === 'schedule/shifts') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const trainer = MOCK_TRAINERS.find((t) => t.trainerId === body.trainerId) || MOCK_TRAINERS[0];
        const newShift = {
          id: `sh-${Date.now()}`,
          trainerId: body.trainerId || trainer.trainerId,
          trainerName: trainer.trainerName,
          trainerRole: trainer.trainerRole,
          day: body.day || 'Monday',
          startTime: body.startTime || '06:00',
          endTime: body.endTime || '14:00',
          status: body.status || 'Scheduled',
          notes: body.notes || '',
        };
        return buildMockSuccess(newShift, 'Shift created');
      } catch {
        return buildMockSuccess(MOCK_TRAINERS[0].shifts[0], 'Shift created');
      }
    }
    return buildMockSuccess(MOCK_TRAINERS[0]?.shifts ?? [], 'Shifts loaded');
  }
  if (path.startsWith('schedule/shifts/')) {
    const id = path.split('/').pop() || 'shift-1';
    if (method === 'DELETE') {
      return buildMockSuccess({ id }, 'Shift deleted');
    }
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const trainer = MOCK_TRAINERS.find((t) => t.trainerId === body.trainerId) || MOCK_TRAINERS[0];
      const updated = {
        id,
        trainerId: body.trainerId || trainer.trainerId,
        trainerName: trainer.trainerName,
        trainerRole: trainer.trainerRole,
        day: body.day || 'Monday',
        startTime: body.startTime || '06:00',
        endTime: body.endTime || '14:00',
        status: body.status || 'Scheduled',
        notes: body.notes || '',
      };
      return buildMockSuccess(updated, 'Shift updated');
    } catch {
      return buildMockSuccess({ ...MOCK_TRAINERS[0].shifts[0], id }, 'Shift updated');
    }
  }
  if (path === 'schedule') {
    return buildMockSuccess({ trainers: MOCK_TRAINERS, kpis: buildMockScheduleKpis(MOCK_TRAINERS) }, 'Schedule loaded');
  }

  // 10. INQUIRIES & CRM
  if (path === 'inquiries/stats') {
    const range = searchParams.get('range') || searchParams.get('date');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    let stats = { ...MOCK_INQUIRY_STATS };
    if (startDate && endDate) {
      const s = new Date(startDate).getTime();
      const e = new Date(endDate).setHours(23, 59, 59, 999);
      const filtered = currentInquiries.filter((i) => {
        const t = new Date(i.createdAt).getTime();
        return t >= s && t <= e;
      });
      const newCount = filtered.filter((i) => i.status === 'NEW').length;
      const followUpCount = filtered.filter((i) => i.status === 'FOLLOW_UP').length;
      const convertedCount = filtered.filter((i) => i.status === 'CONVERTED').length;
      const lostCount = filtered.filter((i) => i.status === 'LOST').length;
      stats = { total: filtered.length, new: newCount, followUp: followUpCount, converted: convertedCount, lost: lostCount };
    } else if (range === 'last_month') {
      stats = { total: 42, new: 10, followUp: 14, converted: 12, lost: 6 };
    } else if (range === 'last_3_months') {
      stats = { total: 135, new: 35, followUp: 45, converted: 38, lost: 17 };
    } else if (range === 'this_year') {
      stats = { total: 480, new: 120, followUp: 160, converted: 140, lost: 60 };
    }
    return buildMockSuccess(stats, 'Inquiry stats loaded');
  }
  if (path === 'inquiries/plans' || path === 'inquiries/plans-snapshot') {
    return buildMockSuccess(currentPlans, 'Inquiry plans loaded');
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
    const search = (searchParams.get('search') || '').trim().toLowerCase();
    const status = (searchParams.get('status') || '').trim();
    const date = searchParams.get('date') || searchParams.get('range');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let list = [...currentInquiries];
    if (search) {
      list = list.filter((i) =>
        i.name.toLowerCase().includes(search) ||
        i.phone.includes(search) ||
        (i.email && i.email.toLowerCase().includes(search)) ||
        (i.interest && i.interest.toLowerCase().includes(search))
      );
    }
    if (status && status !== 'ALL' && status !== 'all') {
      list = list.filter((i) => i.status === status);
    }
    if (startDate && endDate) {
      const s = new Date(startDate).getTime();
      const e = new Date(endDate).setHours(23, 59, 59, 999);
      list = list.filter((i) => {
        const t = new Date(i.createdAt).getTime();
        return t >= s && t <= e;
      });
    } else if (date === 'last_month') {
      const now = new Date();
      const firstDayPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).getTime();
      const lastDayPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999).getTime();
      list = list.filter((i) => {
        const t = new Date(i.createdAt).getTime();
        return t >= firstDayPrevMonth && t <= lastDayPrevMonth;
      });
    } else if (date === 'this_month') {
      const now = new Date();
      const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
      list = list.filter((i) => new Date(i.createdAt).getTime() >= firstDayThisMonth);
    } else if (date === 'last_3_months') {
      const threeMonthsAgo = Date.now() - 90 * 86400000;
      list = list.filter((i) => new Date(i.createdAt).getTime() >= threeMonthsAgo);
    } else if (date === 'this_year') {
      const firstDayThisYear = new Date(new Date().getFullYear(), 0, 1).getTime();
      list = list.filter((i) => new Date(i.createdAt).getTime() >= firstDayThisYear);
    }
    return buildMockSuccess({ inquiries: list, total: list.length }, 'Inquiries loaded');
  }
  if (path.startsWith('inquiries/') && path.endsWith('/convert')) {
    const id = path.split('/')[1];
    currentInquiries = currentInquiries.map((inq) => (inq.id === id ? { ...inq, status: 'CONVERTED' } : inq));
    return buildMockSuccess({ memberId: `m-${Date.now()}` }, 'Inquiry converted to member');
  }
  if (path.startsWith('inquiries/')) {
    const id = path.split('/')[1];
    if (method === 'DELETE') {
      currentInquiries = currentInquiries.filter((i) => i.id !== id);
      return buildMockSuccess({ id }, 'Inquiry deleted');
    }
    if (method === 'PATCH' || method === 'PUT') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const found = currentInquiries.find((i) => i.id === id) || currentInquiries[0];
        const updated = { ...found, ...body, id };
        currentInquiries = currentInquiries.map((i) => (i.id === id ? updated : i));
        return buildMockSuccess(updated, 'Inquiry updated');
      } catch {
        return buildMockSuccess(currentInquiries[0], 'Inquiry updated');
      }
    }
    const found = currentInquiries.find((i) => i.id === id) || currentInquiries[0];
    return buildMockSuccess(found, 'Inquiry retrieved');
  }

  // 11. MEMBERSHIP LIFECYCLE PLANS
  if (path === 'plans' || path === 'plans/') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newPlan = {
          ...MOCK_PLANS[0],
          ...body,
          id: `p-${Date.now()}`,
          isActive: body.isActive ?? true,
        };
        currentPlans = [newPlan, ...currentPlans];
        return buildMockSuccess(newPlan, 'Plan created');
      } catch {
        return buildMockSuccess(MOCK_PLANS[0], 'Plan created');
      }
    }
    return buildMockSuccess({ plans: currentPlans, total: currentPlans.length }, 'Plans loaded');
  }
  if (path === 'plans/change-requests') {
    return buildMockSuccess({ success: true, requestId: `cr-${Date.now()}` }, 'Change request submitted');
  }
  if (path.startsWith('plans/memberships/') || path === 'plans/membership-activate' || path === 'plans/membership-renew' || path === 'plans/membership-freeze') {
    return buildMockSuccess({ success: true, message: 'Membership updated successfully' }, 'Membership updated');
  }
  if (path === 'plans/memberships' || path === 'membership-lifecycle' || path === 'plans/membership-overview') {
    return buildMockSuccess(MOCK_PLANS_MEMBERSHIP_OVERVIEW, 'Membership overview loaded');
  }
  if (path.startsWith('plans/')) {
    const id = path.split('/')[1];
    if (method === 'DELETE') {
      currentPlans = currentPlans.filter((p) => p.id !== id);
      return buildMockSuccess({ id }, 'Plan deleted');
    }
    if (method === 'PATCH' || method === 'PUT') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const found = currentPlans.find((p) => p.id === id) || currentPlans[0];
        const updated = { ...found, ...body, id };
        currentPlans = currentPlans.map((p) => (p.id === id ? updated : p));
        return buildMockSuccess(updated, 'Plan updated');
      } catch {
        return buildMockSuccess({ ...MOCK_PLANS[0], id }, 'Plan updated');
      }
    }
    const found = currentPlans.find((p) => p.id === id) || currentPlans[0];
    return buildMockSuccess(found, 'Plan retrieved');
  }

  // 12. WORKOUT & DIET LIBRARY
  if (path === 'workout/assignments' || path === 'workouts/assignments') {
    return buildMockSuccess(MOCK_WORKOUT_ASSIGNMENTS, 'Workout assignments loaded');
  }
  if (path === 'workouts' || path === 'workouts/') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newWorkout = {
          ...MOCK_MANAGER_WORKOUT_PLANSS[0],
          ...body,
          id: `wp-${Date.now()}`,
        };
        currentWorkouts = [newWorkout, ...currentWorkouts];
        return buildMockSuccess(newWorkout, 'Workout plan created');
      } catch {
        return buildMockSuccess(MOCK_MANAGER_WORKOUT_PLANSS[0], 'Workout plan created');
      }
    }
    return buildMockSuccess({ workouts: currentWorkouts, total: currentWorkouts.length }, 'Workout plans loaded');
  }
  if (path.startsWith('workouts/') && !path.includes('exercises') && !path.includes('assignments')) {
    const id = path.split('/').pop() || 'wp-1';
    if (method === 'DELETE') {
      currentWorkouts = currentWorkouts.filter((w) => w.id !== id);
      return buildMockSuccess({ id }, 'Workout plan deleted');
    }
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const updated = { ...MOCK_MANAGER_WORKOUT_PLANSS[0], ...body, id };
      currentWorkouts = currentWorkouts.map((w) => (w.id === id ? updated : w));
      return buildMockSuccess(updated, 'Workout plan updated');
    } catch {
      return buildMockSuccess({ id }, 'Workout plan updated');
    }
  }
  if (path === 'workouts/exercises' || path === 'library/exercises') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newExercise = {
          ...MOCK_MANAGER_WORKOUT_EXERCISES[0],
          ...body,
          id: `ex-${Date.now()}`,
        };
        currentExercises = [newExercise, ...currentExercises];
        return buildMockSuccess(newExercise, 'Exercise created');
      } catch {
        return buildMockSuccess(MOCK_MANAGER_WORKOUT_EXERCISES[0], 'Exercise created');
      }
    }
    return buildMockSuccess({ exercises: currentExercises, total: currentExercises.length }, 'Exercises loaded');
  }
  if (path.startsWith('workouts/exercises/') || path.startsWith('library/exercises/')) {
    const id = path.split('/').pop() || 'ex-1';
    if (method === 'DELETE') {
      currentExercises = currentExercises.filter((e) => e.id !== id);
      return buildMockSuccess({ id }, 'Exercise deleted');
    }
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const updated = { ...MOCK_MANAGER_WORKOUT_EXERCISES[0], ...body, id };
      currentExercises = currentExercises.map((e) => (e.id === id ? updated : e));
      return buildMockSuccess(updated, 'Exercise updated');
    } catch {
      return buildMockSuccess({ id }, 'Exercise updated');
    }
  }
  if (path === 'library/diet-plans') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newDiet = {
          ...MOCK_MANAGER_DIET_PLANS[0],
          ...body,
          id: `dp-${Date.now()}`,
        };
        currentDietPlans = [newDiet, ...currentDietPlans];
        return buildMockSuccess(newDiet, 'Diet plan created');
      } catch {
        return buildMockSuccess(MOCK_MANAGER_DIET_PLANS[0], 'Diet plan created');
      }
    }
    return buildMockSuccess({ dietPlans: currentDietPlans, total: currentDietPlans.length }, 'Diet plans loaded');
  }
  if (path.startsWith('library/diet-plans/')) {
    const id = path.split('/').pop() || 'dp-1';
    if (method === 'DELETE') {
      currentDietPlans = currentDietPlans.filter((d) => d.id !== id);
      return buildMockSuccess({ id }, 'Diet plan deleted');
    }
    try {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const updated = { ...MOCK_MANAGER_DIET_PLANS[0], ...body, id };
      currentDietPlans = currentDietPlans.map((d) => (d.id === id ? updated : d));
      return buildMockSuccess(updated, 'Diet plan updated');
    } catch {
      return buildMockSuccess({ id }, 'Diet plan updated');
    }
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
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newRef = {
          ...MOCK_REFERRALS[0],
          ...body,
          id: `ref-${Date.now()}`,
          dateReferred: new Date().toISOString(),
          status: body.status || 'PENDING',
          rewardStatus: body.rewardStatus || 'PENDING',
          rewardAmount: Number(body.rewardAmount) || 500,
          rewardType: body.rewardType || 'CASH',
        };
        currentReferrals = [newRef, ...currentReferrals];
        return buildMockSuccess(newRef, 'Referral created');
      } catch {
        return buildMockSuccess(MOCK_REFERRALS[0], 'Referral created');
      }
    }
    return buildMockSuccess(currentReferrals, 'Referrals loaded', { total: currentReferrals.length, page: 1, limit: 10, totalPages: 1 });
  }
  if (path.startsWith('referrals/') && path.endsWith('/claim')) {
    const id = path.split('/')[1];
    const found = currentReferrals.find((r) => r.id === id) || currentReferrals[0];
    const updated = { ...found, rewardStatus: 'CLAIMED' as const };
    currentReferrals = currentReferrals.map((r) => (r.id === id ? updated : r));
    return buildMockSuccess(updated, 'Reward claimed');
  }

  if (path === 'reports/summary' || path === 'reports/overview' || path === 'reports') {
    const range = searchParams.get('range');
    let summary = { ...MOCK_REPORT_SUMMARY };
    if (range === 'last_month') {
      summary = {
        ...summary,
        kpis: {
          ...summary.kpis,
          totalRevenue: 13800000,
          totalExpenses: 220000,
          netProfit: 1160000,
          newMembersThisMonth: 19,
          churnRate: 2.1,
          avgAttendanceRate: 68,
        },
        revenueData: [
          { month: 'Wk 1', revenue: 3200000, expenses: 500000, profit: 2700000 },
          { month: 'Wk 2', revenue: 3500000, expenses: 550000, profit: 2950000 },
          { month: 'Wk 3', revenue: 3600000, expenses: 600000, profit: 3000000 },
          { month: 'Wk 4', revenue: 3500000, expenses: 550000, profit: 2950000 },
        ],
        attendanceData: [
          { date: 'Mon', present: 165, absent: 35, rate: 82 },
          { date: 'Tue', present: 155, absent: 45, rate: 77 },
          { date: 'Wed', present: 170, absent: 30, rate: 85 },
          { date: 'Thu', present: 145, absent: 55, rate: 72 },
          { date: 'Fri', present: 180, absent: 20, rate: 90 },
        ],
      };
    } else if (range === 'last_3_months') {
      summary = {
        ...summary,
        kpis: {
          ...summary.kpis,
          totalRevenue: 41000000,
          totalExpenses: 680000,
          netProfit: 3420000,
          newMembersThisMonth: 64,
          churnRate: 2.4,
          avgAttendanceRate: 67,
        },
        revenueData: [
          { month: 'Aug', revenue: 13200000, expenses: 2200000, profit: 11000000 },
          { month: 'Sep', revenue: 13800000, expenses: 2300000, profit: 11500000 },
          { month: 'Oct', revenue: 14000000, expenses: 2300000, profit: 11700000 },
        ],
        attendanceData: [
          { date: 'Aug', present: 3900, absent: 900, rate: 81 },
          { date: 'Sep', present: 4100, absent: 850, rate: 83 },
          { date: 'Oct', present: 4250, absent: 800, rate: 84 },
        ],
      };
    } else if (range === 'last_6_months' || range === 'monthly') {
      summary = {
        ...summary,
        kpis: {
          ...summary.kpis,
          totalRevenue: 82500000,
          totalExpenses: 1350000,
          netProfit: 6900000,
          newMembersThisMonth: 135,
          churnRate: 2.2,
          avgAttendanceRate: 69,
        },
        revenueData: [
          { month: 'Jun', revenue: 12500000, expenses: 2100000, profit: 10400000 },
          { month: 'Jul', revenue: 13000000, expenses: 2200000, profit: 10800000 },
          { month: 'Aug', revenue: 13500000, expenses: 2200000, profit: 11300000 },
          { month: 'Sep', revenue: 14200000, expenses: 2300000, profit: 11900000 },
          { month: 'Oct', revenue: 14500000, expenses: 2350000, profit: 12150000 },
          { month: 'Nov', revenue: 14800000, expenses: 2350000, profit: 12450000 },
        ],
      };
    } else if (range === 'this_year' || range === 'yearly') {
      summary = {
        ...summary,
        kpis: {
          ...summary.kpis,
          totalRevenue: 165000000,
          totalExpenses: 2800000,
          netProfit: 13700000,
          newMembersThisMonth: 280,
          churnRate: 2.3,
          avgAttendanceRate: 66,
        },
        revenueData: [
          { month: 'Jan', revenue: 11000000, expenses: 2000000, profit: 9000000 },
          { month: 'Feb', revenue: 11500000, expenses: 2200000, profit: 9300000 },
          { month: 'Mar', revenue: 12000000, expenses: 2100000, profit: 9900000 },
          { month: 'Apr', revenue: 12800000, expenses: 2300000, profit: 10500000 },
          { month: 'May', revenue: 13200000, expenses: 2250000, profit: 10950000 },
          { month: 'Jun', revenue: 13500000, expenses: 2300000, profit: 11200000 },
          { month: 'Jul', revenue: 13800000, expenses: 2350000, profit: 11450000 },
          { month: 'Aug', revenue: 14200000, expenses: 2400000, profit: 11800000 },
          { month: 'Sep', revenue: 14500000, expenses: 2400000, profit: 12100000 },
          { month: 'Oct', revenue: 15000000, expenses: 2450000, profit: 12550000 },
          { month: 'Nov', revenue: 15400000, expenses: 2500000, profit: 12900000 },
          { month: 'Dec', revenue: 15800000, expenses: 2500000, profit: 13300000 },
        ],
      };
    }
    return buildMockSuccess(summary, 'Reports summary loaded');
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
