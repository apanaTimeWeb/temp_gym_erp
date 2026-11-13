import type { ApiResponse } from '@/lib/api';

// Trainer Mock Fixture Imports
import { TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/mocks/TrainerDashboardOverviewMockData';
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
import { TRAINER_EARNINGS_MOCK_EARNINGS_DATA } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/mocks/fixtures/TrainerEarningsOverviewAndLedgerEarningsMockData';
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
import { TRAINER_PROFILE_MOCK_TRAINER_PROFILE } from '@/app/frontend_trainer/trainer_account/account_personal_profile/mocks/fixtures/TrainerAccountPersonalProfileProfileMockData';
import { TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS } from '@/app/frontend_trainer/trainer_account/account_notifications/mocks/fixtures/TrainerAccountNotificationsNotificationsMockData';

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
let currentMembers = JSON.parse(JSON.stringify(TRAINER_MEMBERS_MOCK_MEMBERS));
let currentWorkouts = JSON.parse(JSON.stringify(TRAINER_WORKOUT_MOCK_WORKOUTS));
let currentExercises = JSON.parse(JSON.stringify(TRAINER_WORKOUT_MOCK_EXERCISES));
let currentDietPlans = JSON.parse(JSON.stringify(TRAINER_LIBRARY_MOCK_LIBRARY_DIET_PLANS));
let currentAssignedMembers = JSON.parse(JSON.stringify(TRAINER_LIBRARY_MOCK_LIBRARY_ASSIGNED_MEMBERS));
let currentSessions = JSON.parse(JSON.stringify(TRAINER_SESSIONS_MOCK_TRAINER_SESSIONS));
function generateTrainerMockAttendance() {
  const base = JSON.parse(JSON.stringify(TRAINER_ATTENDANCE_MOCK_RECORDS));
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Generate for last month
  let lastYear = currentYear;
  let lastMonth = currentMonth - 1;
  if (lastMonth < 0) {
    lastMonth = 11;
    lastYear -= 1;
  }
  const lastMonthDays = new Date(lastYear, lastMonth + 1, 0).getDate();
  for (let d = 1; d <= lastMonthDays; d++) {
    const dateObj = new Date(lastYear, lastMonth, d);
    if (dateObj.getDay() !== 0) {
      const dateStr = `${lastYear}-${String(lastMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      base.push({
        id: `att-staff-last-${d}`,
        type: 'STAFF',
        date: dateStr,
        checkIn: `${dateStr}T08:00:00Z`,
        checkOut: `${dateStr}T17:00:00Z`,
        durationMinutes: 540,
        checkInMethod: 'Biometric',
        staffId: 'trainer_demo_user',
        staff: { id: 'trainer_demo_user', name: 'Michael Trainer' },
      });
    }
  }

  // Generate for current month up to today
  for (let d = 1; d < now.getDate(); d++) {
    const dateObj = new Date(currentYear, currentMonth, d);
    if (dateObj.getDay() !== 0) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      base.push({
        id: `att-staff-curr-${d}`,
        type: 'STAFF',
        date: dateStr,
        checkIn: `${dateStr}T08:00:00Z`,
        checkOut: `${dateStr}T17:00:00Z`,
        durationMinutes: 540,
        checkInMethod: 'Biometric',
        staffId: 'trainer_demo_user',
        staff: { id: 'trainer_demo_user', name: 'Michael Trainer' },
      });
    }
  }

  return base;
}

let currentAttendance = generateTrainerMockAttendance();
let currentAvailability = JSON.parse(JSON.stringify(TRAINER_SCHEDULE_MOCK_AVAILABILITY));
let currentLeaves = JSON.parse(JSON.stringify(TRAINER_SCHEDULE_MOCK_LEAVES));
let currentProgressMembers = JSON.parse(JSON.stringify(TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_MEMBERS));
let currentProgressEntries = JSON.parse(JSON.stringify(TRAINER_PROGRESS_TRACKING_MOCK_PROGRESS_ENTRIES));
let currentTrainerProfile = JSON.parse(JSON.stringify(TRAINER_PROFILE_MOCK_TRAINER_PROFILE));
let currentNotifications = JSON.parse(JSON.stringify(TRAINER_NOTIFICATIONS_MOCK_TRAINER_NOTIFICATIONS));

export function handleTrainerMockApiRequest(
  urlPath: string,
  method: string,
  searchParams: URLSearchParams,
  options: RequestInit = {}
): ApiResponse<any> | null {
  let trainerPath = '';
  if (urlPath.startsWith('/trainer/')) {
    trainerPath = urlPath.slice('/trainer/'.length);
  } else if (urlPath.startsWith('/frontend_trainer/api/')) {
    trainerPath = urlPath.slice('/frontend_trainer/api/'.length);
  } else if (urlPath.startsWith('/api/v1/trainer/')) {
    trainerPath = urlPath.slice('/api/v1/trainer/'.length);
  } else if (urlPath.startsWith('/api/trainer/')) {
    trainerPath = urlPath.slice('/api/trainer/'.length);
  }

  if (!trainerPath) return null;

  // 1. DASHBOARD OVERVIEW
  if (trainerPath === 'trainer_dashboard/stats' || trainerPath === 'stats') {
    const range = searchParams.get('range') || 'this_month';
    let stats = { ...TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS };
    if (range === 'last_month') {
      stats = {
        ...stats,
        todaysSessions: 22,
        completedSessions: 20,
        pendingSessions: 2,
        myMembersCount: 38,
        todaysAttendance: 31,
        pendingWorkoutPlans: 2,
        memberGoalCompletionRate: 82,
        goalCompletionTrend: [
          { month: 'Sep', rate: 74 },
          { month: 'Oct', rate: 82 },
        ],
      };
    } else if (range === 'last_3_months') {
      stats = {
        ...stats,
        todaysSessions: 68,
        completedSessions: 61,
        pendingSessions: 7,
        myMembersCount: 36,
        todaysAttendance: 92,
        pendingWorkoutPlans: 1,
        memberGoalCompletionRate: 85,
        goalCompletionTrend: [
          { month: 'Aug', rate: 68 },
          { month: 'Sep', rate: 74 },
          { month: 'Oct', rate: 82 },
        ],
      };
    } else if (range === 'last_6_months') {
      stats = {
        ...stats,
        todaysSessions: 135,
        completedSessions: 122,
        pendingSessions: 13,
        myMembersCount: 35,
        todaysAttendance: 180,
        pendingWorkoutPlans: 3,
        memberGoalCompletionRate: 86,
        goalCompletionTrend: [
          { month: 'May', rate: 60 },
          { month: 'Jun', rate: 64 },
          { month: 'Jul', rate: 67 },
          { month: 'Aug', rate: 68 },
          { month: 'Sep', rate: 74 },
          { month: 'Oct', rate: 82 },
        ],
      };
    } else if (range === 'this_year') {
      stats = {
        ...stats,
        todaysSessions: 275,
        completedSessions: 254,
        pendingSessions: 21,
        myMembersCount: 42,
        todaysAttendance: 340,
        pendingWorkoutPlans: 4,
        memberGoalCompletionRate: 88,
        goalCompletionTrend: [
          { month: 'Q1', rate: 65 },
          { month: 'Q2', rate: 72 },
          { month: 'Q3', rate: 80 },
          { month: 'Q4', rate: 88 },
        ],
      };
    } else if (range === 'custom') {
      stats = {
        ...stats,
        todaysSessions: 15,
        completedSessions: 14,
        pendingSessions: 1,
        myMembersCount: 40,
        todaysAttendance: 28,
        pendingWorkoutPlans: 2,
        memberGoalCompletionRate: 80,
      };
    }
    return buildMockSuccess(stats, 'Dashboard statistics retrieved successfully');
  }

  // 2. DIET LIBRARY & ASSIGNMENTS
  if (
    trainerPath === 'trainer_library/diet-plans' ||
    trainerPath === 'diet-plans' ||
    trainerPath === 'trainer_diet/diet-plans'
  ) {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newPlan = {
          id: `diet_${Date.now()}`,
          name: body.name || 'New Custom Diet Plan',
          goal: body.goal || 'Weight Loss',
          calories: body.calories || 2200,
          protein: body.protein || 150,
          carbs: body.carbs || 200,
          fats: body.fats || 65,
          description: body.description || 'Custom tailored nutrition plan',
          meals: body.meals || [
            { name: 'Breakfast', time: '08:00', items: 'Oats, berries, whey protein' },
            { name: 'Lunch', time: '13:00', items: 'Grilled chicken, brown rice, broccoli' },
            { name: 'Dinner', time: '19:30', items: 'Salmon, sweet potato, green salad' },
          ],
        };
        currentDietPlans.unshift(newPlan);
        return buildMockSuccess(newPlan, 'Diet plan created successfully');
      } catch {
        return buildMockSuccess(currentDietPlans[0], 'Diet plan created');
      }
    }

    const search = searchParams.get('search')?.toLowerCase() || '';
    const goal = searchParams.get('goal') || '';
    let filtered = currentDietPlans;
    if (search) {
      filtered = filtered.filter((d: any) => d.name.toLowerCase().includes(search) || d.description?.toLowerCase().includes(search));
    }
    if (goal && goal !== 'ALL' && goal !== 'All Goals') {
      filtered = filtered.filter((d: any) => d.goal?.toLowerCase() === goal.toLowerCase());
    }

    return buildMockSuccess({
      dietPlans: filtered,
      total: filtered.length,
    }, 'Diet plans loaded successfully');
  }

  if (
    trainerPath.startsWith('trainer_library/diet-plans/') ||
    trainerPath.startsWith('diet-plans/') ||
    trainerPath.startsWith('trainer_diet/diet-plans/')
  ) {
    const segments = trainerPath.split('/');
    const isDeletionRequest = trainerPath.endsWith('/request-deletion');
    const planId = isDeletionRequest ? segments[segments.length - 2] : segments[segments.length - 1];

    if (isDeletionRequest) {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const plan = currentDietPlans.find((p: any) => p.id === planId);
        if (plan) {
          plan.deletionRequested = true;
          plan.deletionReason = body.reason || 'Trainer requested deletion approval';
          return buildMockSuccess(plan, 'Diet plan deletion requested successfully');
        }
        return buildMockSuccess(null, 'Diet plan deletion requested');
      } catch {
        return buildMockSuccess(null, 'Diet plan deletion requested');
      }
    }

    if (method === 'PATCH' || method === 'PUT') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const idx = currentDietPlans.findIndex((p: any) => p.id === planId);
        if (idx >= 0) {
          currentDietPlans[idx] = { ...currentDietPlans[idx], ...body, id: planId };
          return buildMockSuccess(currentDietPlans[idx], 'Diet plan updated successfully');
        }
      } catch {
        // fallback
      }
    }
  }

  if (
    trainerPath === 'trainer_library/assigned-members' ||
    trainerPath === 'diet-plans/assigned-members' ||
    trainerPath === 'trainer_diet/assigned-members'
  ) {
    return buildMockSuccess(currentAssignedMembers, 'Assigned members retrieved successfully');
  }

  // 3. PROGRESS TRACKING (Individual & Comparison)
  if (trainerPath === 'trainer_progress_tracking/members' || trainerPath === 'progress-tracking/members') {
    return buildMockSuccess(currentProgressMembers, 'Progress members retrieved successfully');
  }

  if (trainerPath.startsWith('trainer_progress_tracking/') || trainerPath.startsWith('progress-tracking/')) {
    const parts = trainerPath.split('/');
    const memberId = parts[1];
    const sub = parts[2];
    const entryId = parts[3];

    if (sub === 'entries') {
      if (method === 'POST') {
        try {
          const body = options.body ? JSON.parse(options.body as string) : {};
          const height = body.heightCm || 175;
          const weight = body.weightKg || 75;
          const bmi = Math.round((weight / ((height / 100) * (height / 100))) * 10) / 10;
          const newEntry = {
            id: `prog_${Date.now()}`,
            memberId,
            date: body.date || new Date().toISOString().split('T')[0],
            weightKg: weight,
            heightCm: height,
            bmi,
            bodyFatPercent: body.bodyFatPercent || 20,
            muscleMassKg: body.muscleMassKg || 32,
            chestCm: body.chestCm || 100,
            waistCm: body.waistCm || 85,
            hipCm: body.hipCm || 95,
            notes: body.notes || 'Routine checkup',
            recordedBy: 'Michael Trainer',
          };
          currentProgressEntries.push(newEntry);
          return buildMockSuccess(newEntry, 'Progress entry recorded successfully');
        } catch {
          return buildMockSuccess(currentProgressEntries[0], 'Progress entry recorded');
        }
      }

      if (entryId) {
        if (method === 'PATCH') {
          const entry = currentProgressEntries.find((e: any) => e.id === entryId);
          if (entry) {
            try {
              const body = options.body ? JSON.parse(options.body as string) : {};
              Object.assign(entry, body);
            } catch {}
          }
          return buildMockSuccess(entry || currentProgressEntries[0], 'Progress entry updated');
        }
        if (method === 'DELETE') {
          currentProgressEntries = currentProgressEntries.filter((e: any) => e.id !== entryId);
          return buildMockSuccess(null, 'Progress entry deleted');
        }
        const entry = currentProgressEntries.find((e: any) => e.id === entryId) || currentProgressEntries[0];
        return buildMockSuccess(entry, 'Progress entry detail retrieved');
      }

      // Member entries list
      let memberEntries = currentProgressEntries.filter((e: any) => e.memberId === memberId);
      if (memberEntries.length === 0) {
        // Fallback default entries for unpopulated members
        memberEntries = [
          {
            id: `prog_${memberId}_1`,
            memberId,
            date: '2026-08-01',
            weightKg: 80.0,
            heightCm: 175,
            bmi: 26.1,
            bodyFatPercent: 22.0,
            muscleMassKg: 34.0,
            chestCm: 102,
            waistCm: 90,
            recordedBy: 'Michael Trainer',
          },
          {
            id: `prog_${memberId}_2`,
            memberId,
            date: '2026-09-01',
            weightKg: 78.5,
            heightCm: 175,
            bmi: 25.6,
            bodyFatPercent: 20.5,
            muscleMassKg: 34.8,
            chestCm: 101,
            waistCm: 88,
            recordedBy: 'Michael Trainer',
          },
        ];
        currentProgressEntries.push(...memberEntries);
      }

      // If page param is provided, return paginated object expected by progress tracking views
      if (searchParams.has('page') || searchParams.has('limit')) {
        const page = Math.max(1, Number(searchParams.get('page') || '1'));
        const limit = Math.max(1, Number(searchParams.get('limit') || '10'));
        const total = memberEntries.length;
        const paginated = memberEntries.slice((page - 1) * limit, page * limit);
        return buildMockSuccess({
          entries: paginated,
          total,
          page,
          limit,
        }, 'Progress entries retrieved successfully');
      }

      // If no page param, return the raw array expected by member profile modal
      return buildMockSuccess(memberEntries, 'Progress entries retrieved successfully');
    }

    if (sub === 'summary') {
      const member = currentProgressMembers.find((m: any) => m.id === memberId) || { id: memberId, name: 'Member' };
      const memberEntries = currentProgressEntries.filter((e: any) => e.memberId === memberId);
      const latest = memberEntries[memberEntries.length - 1] || null;
      const first = memberEntries[0] || null;
      const weightChange = latest && first ? Math.round((latest.weightKg - first.weightKg) * 10) / 10 : 0;
      const bmiChange = latest && first ? Math.round((latest.bmi - first.bmi) * 10) / 10 : 0;

      const summary = {
        memberId,
        memberName: member.name,
        totalEntries: memberEntries.length,
        latestEntry: latest,
        firstEntry: first,
        weightChangeKg: weightChange,
        bmiChange: bmiChange,
        targetWeightKg: 75,
        targetBodyFatPercent: 18,
        targetDate: '2026-12-31',
        goalStatus: 'On Track',
      };
      return buildMockSuccess(summary, 'Progress summary retrieved successfully');
    }
  }

  // 4. MEMBERS DIRECTORY, PROFILE & NOTES
  if (trainerPath === 'members') {
    const search = searchParams.get('search')?.toLowerCase() || '';
    const status = searchParams.get('status') || '';
    const progressStatus = searchParams.get('progressStatus') || '';
    let filtered = currentMembers;

    if (search) {
      filtered = filtered.filter((m: any) =>
        (m.name && m.name.toLowerCase().includes(search)) ||
        (m.email && m.email.toLowerCase().includes(search)) ||
        (m.phone && m.phone.includes(search))
      );
    }
    if (status && status.toUpperCase() !== 'ALL') {
      filtered = filtered.filter((m: any) => m.status?.toUpperCase() === status.toUpperCase());
    }
    if (progressStatus && progressStatus.toUpperCase() !== 'ALL') {
      filtered = filtered.filter((m: any) => m.progressStatus?.toUpperCase() === progressStatus.toUpperCase());
    }

    const page = Math.max(1, Number(searchParams.get('page') || '1'));
    const limit = Math.max(1, Number(searchParams.get('limit') || '50'));
    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return buildMockSuccess({
      members: paginated,
      total,
      page,
      limit,
    }, 'Members retrieved successfully');
  }

  if (trainerPath === 'trainer_members/stats' || trainerPath === 'members/stats') {
    return buildMockSuccess(TRAINER_MEMBERS_MOCK_MEMBER_STATS, 'Member stats retrieved');
  }

  if (trainerPath.startsWith('trainer_members/') || trainerPath.startsWith('members/')) {
    const parts = trainerPath.split('/');
    const memberId = parts[1];
    const sub = parts[2];

    const member = currentMembers.find((m: any) => m.id === memberId) || currentMembers[0];

    if (sub === 'diet' && method === 'PATCH') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        if (member) member.assignedDietId = body.dietPlanId;
      } catch {}
      return buildMockSuccess({ memberId, ...member }, 'Diet plan assigned');
    }

    if (sub === 'workout' && method === 'PATCH') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        if (member) member.assignedWorkoutId = body.workoutId;
      } catch {}
      return buildMockSuccess({ memberId, ...member }, 'Workout plan assigned');
    }

    if (sub === 'notes') {
      if (method === 'POST') {
        try {
          const body = options.body ? JSON.parse(options.body as string) : {};
          const newNote = {
            id: `note_${Date.now()}`,
            text: body.text || 'Trainer observation',
            date: new Date().toISOString().split('T')[0],
          };
          if (!member.trainerNotes) member.trainerNotes = [];
          member.trainerNotes.unshift(newNote);
          return buildMockSuccess(member, 'Trainer note added');
        } catch {
          return buildMockSuccess(member, 'Trainer note added');
        }
      }
      return buildMockSuccess(member.trainerNotes || [], 'Trainer notes retrieved');
    }

    if (sub === 'attendance') {
      const attendanceDots = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        status: i % 7 === 0 ? 'REST' : i % 5 === 0 ? 'ABSENT' : 'PRESENT',
      }));
      return buildMockSuccess(attendanceDots, 'Member attendance retrieved');
    }

    if (method === 'PATCH') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        Object.assign(member, body);
      } catch {}
      return buildMockSuccess(member, 'Member profile updated');
    }

    return buildMockSuccess(member, 'Member retrieved');
  }

  // 5. WORKOUTS & EXERCISES
  if (trainerPath === 'trainer_workout/workouts' || trainerPath === 'workouts' || trainerPath === 'workout/workouts') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newWorkout = {
          id: `wkt_${Date.now()}`,
          name: body.name || 'New Workout Routine',
          level: body.level || 'Intermediate',
          duration: body.duration || '45 mins',
          focus: body.focus || 'Full Body',
          days: body.days || 3,
          instructions: body.instructions || 'Follow warm-up routine first',
          workoutExercises: body.workoutExercises || [],
        };
        currentWorkouts.unshift(newWorkout);
        return buildMockSuccess(newWorkout, 'Workout routine created');
      } catch {
        return buildMockSuccess(currentWorkouts[0], 'Workout routine created');
      }
    }

    const search = searchParams.get('search')?.toLowerCase() || '';
    const level = searchParams.get('level') || '';
    let filtered = currentWorkouts;
    if (search) filtered = filtered.filter((w: any) => w.name.toLowerCase().includes(search) || w.focus?.toLowerCase().includes(search));
    if (level && level !== 'ALL') filtered = filtered.filter((w: any) => w.level?.toLowerCase() === level.toLowerCase());

    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit') || '50');

    return buildMockSuccess({
      workouts: filtered,
      total: filtered.length,
      page,
      limit,
    }, 'Workouts retrieved successfully');
  }

  if (trainerPath.startsWith('trainer_workout/workouts/')) {
    const id = trainerPath.split('/')[2];
    const workout = currentWorkouts.find((w: any) => w.id === id) || currentWorkouts[0];
    if (method === 'PATCH') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        Object.assign(workout, body);
      } catch {}
      return buildMockSuccess(workout, 'Workout updated');
    }
    if (method === 'DELETE') {
      currentWorkouts = currentWorkouts.filter((w: any) => w.id !== id);
      return buildMockSuccess(null, 'Workout deleted');
    }
    return buildMockSuccess(workout, 'Workout detail retrieved');
  }

  if (trainerPath === 'trainer_workout/exercises' || trainerPath === 'exercises' || trainerPath === 'workout/exercises') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const muscle = body.muscle || body.primaryMuscle || 'Chest';
        const newExercise = {
          id: `ex_${Date.now()}`,
          name: body.name || 'Custom Exercise',
          category: body.category || 'Strength',
          primaryMuscle: muscle,
          muscleGroup: body.muscleGroup || [muscle],
          secondaryMuscles: body.secondaryMuscles || ['Triceps'],
          equipment: body.equipment || 'Barbell',
          difficulty: body.difficulty || 'Intermediate',
          instructions: body.instructions || 'Perform with controlled tempo',
          videoUrl: body.videoUrl || '',
          imageUrl: body.imageUrl || '',
          thumbnailUrl: body.thumbnailUrl || '',
          isActive: true,
        };
        currentExercises.unshift(newExercise);
        return buildMockSuccess(newExercise, 'Exercise created');
      } catch {
        return buildMockSuccess(currentExercises[0], 'Exercise created');
      }
    }

    const search = searchParams.get('search')?.toLowerCase() || '';
    const category = searchParams.get('category') || '';
    let filtered = currentExercises;
    if (search) filtered = filtered.filter((e: any) => e.name.toLowerCase().includes(search) || e.primaryMuscle?.toLowerCase().includes(search) || (Array.isArray(e.muscleGroup) && e.muscleGroup.some((m: string) => m.toLowerCase().includes(search))));
    if (category && category !== 'ALL' && category !== 'All') filtered = filtered.filter((e: any) => e.category?.toLowerCase() === category.toLowerCase());

    const page = Number(searchParams.get('page') || '1');
    const limit = Number(searchParams.get('limit') || '50');

    return buildMockSuccess({
      exercises: filtered,
      total: filtered.length,
      page,
      limit,
    }, 'Exercises retrieved successfully');
  }

  if (trainerPath.startsWith('trainer_workout/exercises/')) {
    const id = trainerPath.split('/')[2];
    const exercise = currentExercises.find((e: any) => e.id === id) || currentExercises[0];
    if (method === 'PATCH') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        if (body.muscle && !body.muscleGroup) {
          body.muscleGroup = [body.muscle];
          body.primaryMuscle = body.muscle;
        }
        Object.assign(exercise, body);
        if (exercise.isActive === undefined) exercise.isActive = true;
      } catch {}
      return buildMockSuccess(exercise, 'Exercise updated');
    }
    if (method === 'DELETE') {
      currentExercises = currentExercises.filter((e: any) => e.id !== id);
      return buildMockSuccess(null, 'Exercise deleted');
    }
    return buildMockSuccess(exercise, 'Exercise detail retrieved');
  }

  // 6. COACHING SESSIONS
  if (trainerPath === 'trainer_sessions/members' || trainerPath === 'sessions/members') {
    return buildMockSuccess(TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS, 'Session members retrieved');
  }

  if (trainerPath === 'sessions' || trainerPath === 'trainer_sessions') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const member = TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS.find((m: any) => m.id === body.memberId) || TRAINER_SESSIONS_MOCK_TRAINER_SESSION_MEMBERS[0];
        const newSession = {
          id: `s_${Date.now()}`,
          title: body.type === 'PT' ? `PT - ${member?.name || 'Rahul Sharma'}` : (body.title || 'Group Session'),
          type: body.type || 'PT',
          time: body.time || '10:00 AM',
          sessionDate: body.date || new Date().toISOString().split('T')[0],
          duration: body.duration || '60 min',
          status: 'Upcoming',
          attendees: 1,
          maxAttendees: body.type === 'PT' ? 1 : 15,
          member: member?.name || 'Rahul Sharma',
          enrolledMembers: member ? [{ id: member.id, name: member.name }] : [{ id: 'm1', name: 'Rahul Sharma' }],
          isOnline: false,
          location: body.location || 'Studio A',
          room: body.room || 'Room 1',
        };
        currentSessions.unshift(newSession);
        return buildMockSuccess(newSession, 'Session scheduled successfully');
      } catch {
        return buildMockSuccess(currentSessions[0], 'Session scheduled successfully');
      }
    }

    const date = searchParams.get('date');
    const filter = searchParams.get('filter');
    let filtered = currentSessions.map((s: any) => ({
      ...s,
      sessionDate: date || s.sessionDate,
    }));
    if (date) {
      filtered = filtered.filter((s: any) => s.sessionDate === date || s.date === date);
    }
    if (filter && filter.toUpperCase() !== 'ALL') {
      filtered = filtered.filter((s: any) => s.type === filter || s.sessionType === filter || s.status === filter);
    }

    return buildMockSuccess(filtered, 'Sessions retrieved successfully');
  }

  if (trainerPath.startsWith('trainer_sessions/') || trainerPath.startsWith('sessions/')) {
    const parts = trainerPath.split('/');
    const id = parts[1];
    const sub = parts[2];
    const session = currentSessions.find((s: any) => s.id === id) || currentSessions[0];

    if (method === 'DELETE') {
      currentSessions = currentSessions.filter((s: any) => s.id !== id);
      return buildMockSuccess(null, 'Session cancelled successfully');
    }

    if (sub === 'attendance') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : null;
        if (session) {
          if (body && Array.isArray(body.memberIds) && body.memberIds.length > 0) {
            session.status = 'Completed';
            session.attendees = body.memberIds.length;
          } else {
            session.status = 'No Show';
            session.attendees = 0;
          }
        }
      } catch {
        if (session) session.status = 'Completed';
      }
      return buildMockSuccess(null, 'Attendance marked successfully');
    }

    if (method === 'PATCH') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        if (session) Object.assign(session, body);
      } catch {}
      return buildMockSuccess(session, 'Session updated successfully');
    }

    return buildMockSuccess(session, 'Session detail retrieved');
  }

  // 7. EARNINGS
  if (trainerPath === 'trainer_earnings/export' || trainerPath === 'earnings/export') {
    return buildMockSuccess({ downloadUrl: '/__mocks__/trainer/earnings_export.csv', fileName: 'trainer_earnings_statement.csv' }, 'Export generated successfully');
  }

  if (trainerPath === 'trainer_earnings/advance-request' || trainerPath === 'earnings/advance-request') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const amount = Number(body.amount) || 1000000;
        const advanceEntry = {
          id: `ADV-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: 'Commission' as const,
          description: body.reason ? `Advance Commission: ${body.reason}` : 'Salary & Commission Advance',
          amount: amount,
          currency: 'INR',
          status: 'settled' as const,
          tdsDeducted: 0,
          netPayout: amount,
          invoiceNumber: `ADV-${Date.now().toString().slice(-4)}`,
        };
        TRAINER_EARNINGS_MOCK_EARNINGS_DATA.history.unshift(advanceEntry);
        TRAINER_EARNINGS_MOCK_EARNINGS_DATA.kpis.pendingPayouts = Math.max(0, TRAINER_EARNINGS_MOCK_EARNINGS_DATA.kpis.pendingPayouts - amount);
        return buildMockSuccess(advanceEntry, 'Advance request submitted successfully');
      } catch {
        return buildMockSuccess(null, 'Advance request processed');
      }
    }
  }

  if (trainerPath === 'earnings' || trainerPath === 'trainer_earnings') {
    const page = Math.max(1, Number(searchParams.get('page') || searchParams.get('historyPage') || '1'));
    const limit = Math.max(1, Number(searchParams.get('limit') || searchParams.get('historyLimit') || '10'));
    const range = searchParams.get('range');

    let kpis = { ...TRAINER_EARNINGS_MOCK_EARNINGS_DATA.kpis };
    let history = [...TRAINER_EARNINGS_MOCK_EARNINGS_DATA.history];

    if (range === 'last_month') {
      kpis = {
        ...kpis,
        totalEarnings: 3820000,
        pendingPayouts: 0,
        sessionsCompleted: 118,
        taxDeduction: 191000,
      };
      history = [
        { id: 'INV-101', date: '2026-10-31', type: 'Commission', description: 'October PT Commission', amount: 3200000, currency: 'INR', status: 'settled', tdsDeducted: 160000, netPayout: 3040000, invoiceNumber: 'INV-2026-101' },
        { id: 'BON-101', date: '2026-10-15', type: 'Bonus', description: 'October Target Bonus', amount: 620000, currency: 'INR', status: 'settled', tdsDeducted: 31000, netPayout: 589000, invoiceNumber: 'INV-2026-102' },
      ];
    } else if (range === 'last_3_months') {
      kpis = {
        ...kpis,
        totalEarnings: 11450000,
        pendingPayouts: 840000,
        sessionsCompleted: 356,
        taxDeduction: 572500,
      };
      history = history.slice(0, 5);
    } else if (range === 'this_year') {
      kpis = {
        ...kpis,
        totalEarnings: 38400000,
        pendingPayouts: 2090000,
        sessionsCompleted: 1120,
        taxDeduction: 1920000,
      };
    } else if (range === 'custom') {
      kpis = {
        ...kpis,
        totalEarnings: 2200000,
        pendingPayouts: 0,
        sessionsCompleted: 68,
        taxDeduction: 110000,
      };
      history = history.slice(0, 2);
    }

    const total = history.length;
    const paginated = history.slice((page - 1) * limit, page * limit);

    return buildMockSuccess({
      ...TRAINER_EARNINGS_MOCK_EARNINGS_DATA,
      kpis,
      history: paginated,
      historyTotal: total,
      historyPage: page,
      historyLimit: limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    }, 'Earnings data retrieved');
  }
  if (trainerPath === 'trainer_earnings/kpis') {
    const range = searchParams.get('range');
    let kpis = { ...TRAINER_EARNINGS_MOCK_EARNINGS_DATA.kpis };
    if (range === 'last_month') {
      kpis = { ...kpis, totalEarnings: 3820000, pendingPayouts: 0, sessionsCompleted: 118, taxDeduction: 191000 };
    } else if (range === 'last_3_months') {
      kpis = { ...kpis, totalEarnings: 11450000, pendingPayouts: 840000, sessionsCompleted: 356, taxDeduction: 572500 };
    } else if (range === 'this_year') {
      kpis = { ...kpis, totalEarnings: 38400000, pendingPayouts: 2090000, sessionsCompleted: 1120, taxDeduction: 1920000 };
    } else if (range === 'custom') {
      kpis = { ...kpis, totalEarnings: 2200000, pendingPayouts: 0, sessionsCompleted: 68, taxDeduction: 110000 };
    }
    return buildMockSuccess(kpis, 'Earnings KPIs retrieved');
  }
  if (trainerPath === 'trainer_earnings/pending') {
    return buildMockSuccess(TRAINER_EARNINGS_MOCK_EARNINGS_DATA.pendingPayouts, 'Pending payouts retrieved');
  }
  if (trainerPath === 'trainer_earnings/history') {
    return buildMockSuccess(TRAINER_EARNINGS_MOCK_EARNINGS_DATA.history, 'Earnings history retrieved');
  }

  // 8. OPERATIONS - ATTENDANCE
  if (trainerPath === 'trainer_attendance/export' || trainerPath === 'attendance/export') {
    return buildMockSuccess({ downloadUrl: '/__mocks__/trainer/attendance_export.csv', fileName: 'trainer_attendance_report.csv' }, 'Export generated successfully');
  }

  if (trainerPath === 'attendance' || trainerPath === 'trainer_attendance') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const isStaff = Boolean(body.isSelfCheckIn || body.staffId || body.type === 'STAFF');
        const memberId = String(body.memberId || '');
        const allMembers = [
          ...currentMembers.map((m: any) => ({ id: String(m.id), name: m.name, phone: m.phone || '' })),
          ...TRAINER_ATTENDANCE_MOCK_MEMBERS.map((m: any) => ({ id: String(m.id), name: m.name, phone: m.phone || '' })),
        ];
        const matchedMember = allMembers.find((m: any) => m.id === memberId) || { id: memberId || 'm1', name: 'Member', phone: '' };

        const now = new Date();
        const dateStr = body.date || now.toISOString().split('T')[0];
        const checkInTime = body.checkIn 
          ? (body.checkIn.includes('T') ? body.checkIn : `${dateStr}T${body.checkIn}:00Z`)
          : now.toISOString();
        const checkOutTime = body.checkOut
          ? (body.checkOut.includes('T') ? body.checkOut : `${dateStr}T${body.checkOut}:00Z`)
          : undefined;

        const staffId = body.staffId || 'trainer_demo_user';
        const newRecord = {
          id: `att_${Date.now()}`,
          type: (isStaff ? 'STAFF' : (body.type || 'MEMBER')) as 'MEMBER' | 'STAFF',
          date: dateStr,
          checkIn: checkInTime,
          checkOut: checkOutTime,
          durationMinutes: checkOutTime ? 60 : undefined,
          checkInMethod: body.checkInMethod || (isStaff ? 'Biometric' : 'Manual'),
          notes: body.notes || (isStaff ? 'Trainer Self Check-in' : undefined),
          ...(isStaff
            ? {
                staffId,
                staff: {
                  id: staffId,
                  name: 'Michael Trainer',
                },
              }
            : {
                memberId: matchedMember.id,
                member: {
                  id: String(matchedMember.id),
                  name: matchedMember.name,
                  phone: matchedMember.phone || undefined,
                },
              }),
        };

        currentAttendance.unshift(newRecord);
        TRAINER_ATTENDANCE_MOCK_STATS.totalCheckIns += 1;
        if (isStaff) {
          TRAINER_ATTENDANCE_MOCK_STATS.staffCheckIns = (TRAINER_ATTENDANCE_MOCK_STATS.staffCheckIns || 0) + 1;
        } else {
          TRAINER_ATTENDANCE_MOCK_STATS.memberCheckIns += 1;
        }

        return buildMockSuccess(newRecord, isStaff ? 'Trainer check-in recorded successfully' : 'Attendance check-in recorded');
      } catch (err) {
        return buildMockSuccess(currentAttendance[0], 'Attendance check-in recorded');
      }
    }

    const page = Math.max(1, Number(searchParams.get('page') || '1'));
    const limit = Math.max(1, Number(searchParams.get('limit') || '20'));
    const search = (searchParams.get('search') || '').trim().toLowerCase();
    const filterDate = searchParams.get('filterDate') || searchParams.get('date');
    const range = searchParams.get('range');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type');

    let filtered = [...currentAttendance];

    if (type) {
      filtered = filtered.filter((r: any) => r.type === type);
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (filterDate === 'TODAY') {
      filtered = filtered.filter((r: any) => r.date === todayStr);
    } else if (filterDate === 'YESTERDAY') {
      const yest = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      filtered = filtered.filter((r: any) => r.date === yest);
    } else if (filterDate === 'THIS_MONTH' || range === 'this_month') {
      const monthPrefix = todayStr.substring(0, 7);
      filtered = filtered.filter((r: any) => r.date && r.date.startsWith(monthPrefix));
    } else if (filterDate === 'LAST_MONTH' || range === 'last_month') {
      const d = new Date();
      d.setMonth(d.getMonth() - 1);
      const lastMonthPrefix = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      filtered = filtered.filter((r: any) => r.date && r.date.startsWith(lastMonthPrefix));
    } else if (filterDate === 'THIS_YEAR' || range === 'this_year') {
      const yearPrefix = todayStr.substring(0, 4);
      filtered = filtered.filter((r: any) => r.date && r.date.startsWith(yearPrefix));
    } else if (startDate || endDate) {
      filtered = filtered.filter((r: any) => (!startDate || r.date >= startDate) && (!endDate || r.date <= endDate));
    }

    if (filtered.length === 0 && currentAttendance.length > 0 && !search) {
      filtered = currentAttendance.filter((r: any) => !type || r.type === type).slice(0, 10);
    }

    if (search) {
      filtered = filtered.filter((r: any) => {
        const name = (r.type === 'MEMBER' ? r.member?.name : r.staff?.name) || '';
        const phone = (r.type === 'MEMBER' ? r.member?.phone : '') || '';
        const id = r.id || '';
        return name.toLowerCase().includes(search) || phone.toLowerCase().includes(search) || id.toLowerCase().includes(search);
      });
    }

    const total = filtered.length;
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return buildMockSuccess({
      attendance: paginated,
      total,
      page,
      limit,
    }, 'Attendance records retrieved');
  }

  if (trainerPath === 'trainer_attendance/stats' || trainerPath === 'attendance/stats') {
    const range = searchParams.get('range');
    const date = searchParams.get('date');
    let stats = { ...TRAINER_ATTENDANCE_MOCK_STATS };

    if (range === 'last_month') {
      stats = { totalCheckIns: 540, memberCheckIns: 412, staffCheckIns: 128 };
    } else if (range === 'last_3_months') {
      stats = { totalCheckIns: 1680, memberCheckIns: 1290, staffCheckIns: 390 };
    } else if (range === 'this_year') {
      stats = { totalCheckIns: 6420, memberCheckIns: 4920, staffCheckIns: 1500 };
    } else if (range === 'custom') {
      stats = { totalCheckIns: 180, memberCheckIns: 140, staffCheckIns: 40 };
    } else if (date === 'YESTERDAY') {
      stats = { totalCheckIns: 19, memberCheckIns: 14, staffCheckIns: 5 };
    } else if (date === 'LAST_7_DAYS') {
      stats = { totalCheckIns: 148, memberCheckIns: 112, staffCheckIns: 36 };
    } else if (date === 'THIS_MONTH') {
      stats = { totalCheckIns: 540, memberCheckIns: 412, staffCheckIns: 128 };
    } else if (date === 'ALL_TIME') {
      stats = { totalCheckIns: 2450, memberCheckIns: 1880, staffCheckIns: 570 };
    }

    return buildMockSuccess(stats, 'Attendance statistics retrieved');
  }

  if (trainerPath === 'trainer_attendance/members-basic' || trainerPath === 'attendance/members-basic') {
    const allMembers = [
      ...currentMembers.map((m: any) => ({
        id: String(m.id),
        name: m.name,
        phone: m.phone || '',
      })),
      ...TRAINER_ATTENDANCE_MOCK_MEMBERS.map((m: any) => ({
        id: String(m.id),
        name: m.name,
        phone: m.phone || '',
      })),
    ];
    const unique = Array.from(new Map(allMembers.map(m => [m.id, m])).values());
    return buildMockSuccess(unique, 'Basic member list retrieved');
  }

  if (trainerPath === 'trainer_attendance/today-stats' || trainerPath === 'attendance/today-stats') {
    return buildMockSuccess({ present: 18, absent: 4, late: 2 }, 'Today attendance summary retrieved');
  }

  if (trainerPath.startsWith('trainer_attendance/checkout/') || trainerPath.startsWith('attendance/checkout/')) {
    const id = trainerPath.split('/')[2];
    const rec = currentAttendance.find((r: any) => (r.id === id || r.memberId === id || r.staffId === id || (id && id.includes('trainer') && r.staffId)) && !r.checkOut)
      || currentAttendance.find((r: any) => r.id === id || r.memberId === id || r.staffId === id);
    if (rec) {
      rec.checkOut = new Date().toISOString();
      if (rec.checkIn) {
        const diffMs = new Date(rec.checkOut).getTime() - new Date(rec.checkIn).getTime();
        rec.durationMinutes = Math.max(1, Math.round(diffMs / 60000));
      } else {
        rec.durationMinutes = 60;
      }
    }
    return buildMockSuccess(null, 'Checkout recorded');
  }

  // 9. OPERATIONS - SCHEDULE & LEAVES
  if (trainerPath === 'schedule' || trainerPath === 'trainer_schedule') {
    return buildMockSuccess({
      availability: currentAvailability,
      leaves: currentLeaves,
    }, 'Schedule retrieved');
  }

  if (trainerPath === 'trainer_schedule/availability' || trainerPath === 'schedule/availability') {
    if (method === 'PATCH') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : [];
        if (Array.isArray(body)) currentAvailability = body;
      } catch {}
      return buildMockSuccess(currentAvailability, 'Availability updated');
    }
    return buildMockSuccess(currentAvailability, 'Availability retrieved');
  }

  if (trainerPath === 'trainer_schedule/leaves' || trainerPath === 'schedule/leaves') {
    if (method === 'POST') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        const newLeave = {
          id: `leave_${Date.now()}`,
          startDate: body.startDate || '2026-10-01',
          endDate: body.endDate || '2026-10-05',
          reason: body.reason || 'Personal leave',
          leaveType: body.leaveType || 'CASUAL',
          status: 'PENDING',
        };
        currentLeaves.unshift(newLeave);
        return buildMockSuccess(newLeave, 'Leave request submitted');
      } catch {
        return buildMockSuccess(currentLeaves[0], 'Leave request submitted');
      }
    }
    return buildMockSuccess(currentLeaves, 'Leaves retrieved');
  }

  // 10. ACCOUNT - PROFILE, SECURITY, NOTIFICATIONS
  if (trainerPath === 'profile' || trainerPath === 'trainer_profile') {
    if (method === 'PATCH') {
      try {
        const body = options.body ? JSON.parse(options.body as string) : {};
        Object.assign(currentTrainerProfile, body);
      } catch {}
      return buildMockSuccess(currentTrainerProfile, 'Profile updated successfully');
    }
    return buildMockSuccess(currentTrainerProfile, 'Profile retrieved');
  }

  if (trainerPath === 'trainer_profile/password' || trainerPath === 'profile/password') {
    return buildMockSuccess(null, 'Password updated successfully');
  }

  if (trainerPath === 'notifications' || trainerPath === 'trainer_notifications') {
    const page = Math.max(1, Number(searchParams.get('page') || '1'));
    const limit = Math.max(1, Number(searchParams.get('limit') || '20'));
    const total = currentNotifications.length;
    const paginated = currentNotifications.slice((page - 1) * limit, page * limit);
    return buildMockSuccess({
      notifications: paginated,
      total,
    }, 'Notifications retrieved');
  }

  if (trainerPath === 'trainer_notifications/read-all' || trainerPath === 'notifications/read-all') {
    currentNotifications.forEach((n: any) => { n.isRead = true; });
    return buildMockSuccess(null, 'All notifications marked as read');
  }

  if (
    (trainerPath.startsWith('trainer_notifications/') || trainerPath.startsWith('notifications/')) &&
    trainerPath.endsWith('/read')
  ) {
    const parts = trainerPath.split('/');
    const id = parts[1];
    const n = currentNotifications.find((item: any) => item.id === id);
    if (n) n.isRead = true;
    return buildMockSuccess(null, 'Notification marked as read');
  }

  if (trainerPath === 'trainer_notifications/preferences' || trainerPath === 'notifications/preferences') {
    return buildMockSuccess({ email: true, push: true, sms: false }, 'Preferences updated');
  }

  return buildMockSuccess({}, 'Resource processed');
}
