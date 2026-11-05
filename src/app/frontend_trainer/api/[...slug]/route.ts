import { NextResponse } from 'next/server';

// Mock Fixture Imports
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

function ok(data: unknown, message = 'Success') {
  return NextResponse.json({
    success: true,
    message,
    data,
    requestId: crypto.randomUUID(),
  });
}

function handleRoute(path: string, method: string, url: URL) {
  // 0. Dashboard Stats
  if (path === 'trainer_dashboard/stats' || path === 'dashboard/stats' || path === 'stats') {
    return ok(TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS, 'Dashboard statistics retrieved successfully');
  }

  // 1. Members
  if (path === 'members') {
    return ok({
      members: TRAINER_MEMBERS_MOCK_MEMBERS,
      total: TRAINER_MEMBERS_MOCK_MEMBERS.length,
      page: 1,
      limit: 50,
    });
  }
  if (path === 'trainer_members/stats' || path === 'members/stats') {
    return ok(TRAINER_MEMBERS_MOCK_MEMBER_STATS);
  }
  if (path.startsWith('trainer_members/') || path.startsWith('members/')) {
    const parts = path.split('/');
    const memberId = parts[1];
    const sub = parts[2];
    if (sub === 'notes') {
      return ok((TRAINER_MEMBERS_MOCK_MEMBERS[0] as any).trainerNotes || []);
    }
    if (sub === 'attendance') {
      return ok([]);
    }
    const member = TRAINER_MEMBERS_MOCK_MEMBERS.find((m) => m.id === memberId) || TRAINER_MEMBERS_MOCK_MEMBERS[0];
    return ok(member);
  }

  // 2. Coaching: Sessions
  if (path === 'sessions/members' || path === 'trainer_sessions/members') {
    return ok(TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS);
  }
  if (path === 'sessions' || path === 'trainer_sessions' || path.startsWith('sessions?') || path.startsWith('trainer_sessions?')) {
    return ok(TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS);
  }
  if (path.startsWith('trainer_sessions/') || path.startsWith('sessions/')) {
    return ok(TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS[0]);
  }

  // 3. Coaching: Workouts & Exercises
  if (path === 'trainer_workout/workouts' || path === 'workouts' || path === 'workout/workouts') {
    return ok({
      workouts: TRAINER_WORKOUT_MOCK_WORKOUTS,
      total: TRAINER_WORKOUT_MOCK_WORKOUTS.length,
      page: 1,
      limit: 50,
    });
  }
  if (path === 'trainer_workout/exercises' || path === 'exercises' || path === 'workout/exercises') {
    return ok({
      exercises: TRAINER_WORKOUT_MOCK_EXERCISES,
      total: TRAINER_WORKOUT_MOCK_EXERCISES.length,
      page: 1,
      limit: 50,
    });
  }
  if (path.startsWith('trainer_workout/workouts/')) {
    return ok(TRAINER_WORKOUT_MOCK_WORKOUTS[0]);
  }
  if (path.startsWith('trainer_workout/exercises/')) {
    return ok(TRAINER_WORKOUT_MOCK_EXERCISES[0]);
  }

  // 4. Coaching: Diet Library
  if (path === 'trainer_library/diet-plans' || path === 'diet-plans') {
    return ok({
      dietPlans: TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS,
      total: TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS.length,
    });
  }
  if (path === 'trainer_library/assigned-members') {
    return ok(TRAINER_LIBRARY_MOCK_LIBRARY_ASSIGNED_MEMBERS);
  }

  // 5. Coaching: Progress Tracking
  if (path === 'trainer_progress_tracking/members') {
    return ok(TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_MEMBERS);
  }
  if (path.includes('progress_tracking') && path.endsWith('/entries')) {
    return ok({
      entries: TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES,
      total: TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES.length,
      page: 1,
      limit: 10,
    });
  }
  if (path.includes('progress_tracking') && path.endsWith('/summary')) {
    return ok({
      totalEntries: 12,
      startWeight: 85,
      currentWeight: 78,
      weightChange: -7,
      trend: 'decreasing',
    });
  }

  // 6. Earnings
  if (path === 'earnings' || path === 'trainer_earnings' || path === 'trainer_earnings/data') {
    const page = Number(url.searchParams.get('page') || '1');
    const limit = Number(url.searchParams.get('limit') || '10');
    return ok({
      ...TRAINER_EARNINGS_MOCK_EARNINGS_DATA,
      historyTotal: TRAINER_EARNINGS_MOCK_EARNINGS_DATA.history.length,
      historyPage: page,
      historyLimit: limit,
    });
  }

  // 7. Operations: Attendance
  if (path === 'attendance' || path === 'trainer_attendance') {
    const page = Number(url.searchParams.get('page') || '1');
    const limit = Number(url.searchParams.get('limit') || '10');
    return ok({
      attendance: TRAINER_ATTENDANCE_MOCK_RECORDS,
      total: TRAINER_ATTENDANCE_MOCK_RECORDS.length,
      page,
      limit,
    });
  }
  if (path === 'trainer_attendance/stats' || path === 'attendance/stats') {
    return ok(TRAINER_ATTENDANCE_MOCK_STATS);
  }
  if (path === 'trainer_attendance/members-basic' || path === 'attendance/members-basic') {
    return ok(TRAINER_ATTENDANCE_MOCK_MEMBERS);
  }
  if (path === 'trainer_attendance/today-stats') {
    return ok({ present: 18, absent: 4, late: 2 });
  }
  if (path.startsWith('trainer_attendance/checkout/')) {
    return ok(null, 'Checkout recorded');
  }

  // 8. Operations: Schedule & Availability & Leaves
  if (path === 'schedule' || path === 'trainer_schedule') {
    return ok({
      availability: TRAINER_SCHEDULE_MOCK_AVAILABILITY,
      leaves: TRAINER_SCHEDULE_MOCK_LEAVES,
    });
  }
  if (path === 'trainer_schedule/availability') {
    return ok(TRAINER_SCHEDULE_MOCK_AVAILABILITY);
  }
  if (path === 'trainer_schedule/leaves') {
    return ok(TRAINER_SCHEDULE_MOCK_LEAVES);
  }

  // 9. Profile & Notifications
  if (path === 'profile' || path === 'trainer_profile') {
    return ok(TRAINER_PROFILE_MOCK_TRAINER_PROFILE);
  }
  if (path === 'trainer_profile/password') {
    return ok(null, 'Password updated');
  }
  if (path === 'notifications' || path === 'trainer_notifications') {
    return ok({
      notifications: TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS,
      total: TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS.length,
      page: 1,
      limit: 20,
    });
  }
  if (path === 'trainer_notifications/read-all') {
    return ok(null, 'All marked as read');
  }
  if (path.startsWith('trainer_notifications/') && path.endsWith('/read')) {
    return ok(null, 'Marked as read');
  }

  // Generic fallback
  return ok({}, 'Resource processed');
}

export async function GET(request: Request, context: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await context.params;
  const path = (slug || []).join('/');
  const url = new URL(request.url);
  return handleRoute(path, 'GET', url);
}

export async function POST(request: Request, context: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await context.params;
  const path = (slug || []).join('/');
  const url = new URL(request.url);
  return handleRoute(path, 'POST', url);
}

export async function PATCH(request: Request, context: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await context.params;
  const path = (slug || []).join('/');
  const url = new URL(request.url);
  return handleRoute(path, 'PATCH', url);
}

export async function DELETE(request: Request, context: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await context.params;
  const path = (slug || []).join('/');
  const url = new URL(request.url);
  return handleRoute(path, 'DELETE', url);
}

