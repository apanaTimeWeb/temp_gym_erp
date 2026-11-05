// RESPONSIBILITY: Feature-owned demo server data for the Trainer Dashboard. No financial/business-payment fields.
import { TRAINER_DASHBOARD_MEMBER_STATUS } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/TrainerDashboardOverviewConstants';

import type { TrainerDashboardStats } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/types/TrainerDashboardOverviewTypes';




export const TRAINER_DASHBOARD_MOCK_DASHBOARD_STATS: TrainerDashboardStats = {
  todaysSessions: 8,
  completedSessions: 5,
  pendingSessions: 3,
  myMembersCount: 42,
  todaysAttendance: 35,
  pendingWorkoutPlans: 4,
  memberGoalCompletionRate: 78,
  goalCompletionTrend: [
    { month: 'Jan', rate: 65 },
    { month: 'Feb', rate: 70 },
    { month: 'Mar', rate: 78 },
  ],
  recentMemberProgress: [
    { id: '1', name: 'John Doe', detail: 'Hit new PR on Bench Press (100kg)', time: '2h ago' },
    { id: '2', name: 'Sarah Smith', detail: 'Completed 1-month consistency challenge', time: '5h ago' },
  ],
  upcomingSessions: [
    { id: '1', name: 'John Doe', time: '14:00', type: 'PT' },
    { id: '2', name: 'Evening HIIT', time: '18:00', type: 'Group' },
  ],
  membersByPlan: [
    { plan: 'Premium', count: 20 },
    { plan: 'Gold', count: 15 },
    { plan: 'Basic', count: 7 },
  ],
  recentMembers: [
    { id: '1', name: 'Alex Johnson', plan: 'Premium', status: TRAINER_DASHBOARD_MEMBER_STATUS.ACTIVE, joinDate: '2023-10-12' },
    { id: '2', name: 'Maria Garcia', plan: 'Gold', status: TRAINER_DASHBOARD_MEMBER_STATUS.ACTIVE, joinDate: '2023-10-10' },
    { id: '3', name: 'James Wilson', plan: 'Basic', status: TRAINER_DASHBOARD_MEMBER_STATUS.PENDING, joinDate: '2023-10-09' },
  ],
  trainerProfile: {
    name: 'Michael Trainer',
    shiftStart: '06:00',
    shiftEnd: '14:00',
  },
};
