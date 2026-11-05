import type { ApiResponse } from '@/lib/api';

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

function buildMockSuccess<T>(data: T, message = 'Success'): ApiResponse<T> {
  const requestId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `req_${Date.now()}`;
  const envelope = {
    success: true as const,
    message,
    data,
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

    const token = `token_demo_${finalRole.toLowerCase()}_${Date.now()}`;

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

      return buildMockSuccess(user, 'Login successful');
    }

    // GET session check
    const user = {
      id: 'usr_trainer_01',
      name: 'Michael Trainer',
      email: 'trainer@smartgym360.com',
      role: 'TRAINER',
      tenantId: 'gym_demo_01',
    };
    return buildMockSuccess(user, 'Session active');
  }

  if (urlPath === '/auth/me' || urlPath === '/frontend_auth/auth/me') {
    const user = {
      id: 'usr_trainer_01',
      name: 'Michael Trainer',
      email: 'trainer@smartgym360.com',
      role: 'TRAINER',
      tenantId: 'gym_demo_01',
    };
    return buildMockSuccess(user, 'Current user retrieved');
  }

  // 2. TRAINER ENDPOINTS
  // Normalized path by stripping leading /trainer/ or /frontend_trainer/api/
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
    if (trainerPath.startsWith('trainer_workout/workouts/')) {
      return buildMockSuccess(TRAINER_WORKOUT_MOCK_WORKOUTS[0]);
    }
    if (trainerPath.startsWith('trainer_workout/exercises/')) {
      return buildMockSuccess(TRAINER_WORKOUT_MOCK_EXERCISES[0]);
    }

    // Diet Library
    if (trainerPath === 'trainer_library/diet-plans' || trainerPath === 'diet-plans') {
      return buildMockSuccess({
        dietPlans: TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS,
        total: TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS.length,
      });
    }
    if (trainerPath === 'trainer_library/assigned-members') {
      return buildMockSuccess(TRAINER_LIBRARY_MOCK_LIBRARY_ASSIGNED_MEMBERS);
    }

    // Progress Tracking
    if (trainerPath === 'trainer_progress_tracking/members') {
      return buildMockSuccess(TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_MEMBERS);
    }
    if (trainerPath.includes('progress_tracking') && trainerPath.endsWith('/entries')) {
      return buildMockSuccess({
        entries: TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES,
        total: TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES.length,
        page: 1,
        limit: 10,
      });
    }
    if (trainerPath.includes('progress_tracking') && trainerPath.endsWith('/summary')) {
      return buildMockSuccess({
        totalEntries: 12,
        startWeight: 85,
        currentWeight: 78,
        weightChange: -7,
        trend: 'decreasing',
      });
    }

    // Earnings
    if (trainerPath === 'earnings' || trainerPath === 'trainer_earnings' || trainerPath === 'trainer_earnings/data') {
      const page = Number(searchParams.get('page') || '1');
      const limit = Number(searchParams.get('limit') || '10');
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

