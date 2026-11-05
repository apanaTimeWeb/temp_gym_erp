// RESPONSIBILITY: Owns Trainer Dashboard Zod response schemas and derived server-data contracts.
import { z } from 'zod';
export const TrainerDashboardProfileSummarySchema = z.object({ id: z.string().optional(), name: z.string().optional(), shiftStart: z.string().optional(), shiftEnd: z.string().optional() });
export const TrainerDashboardRecentMemberSchema = z.object({ id: z.string(), name: z.string(), plan: z.union([z.string(), z.object({ name: z.string() })]), status: z.string(), joinDate: z.string() });
export const TrainerDashboardStatsSchema = z.object({
  todaysSessions: z.number(), completedSessions: z.number(), pendingSessions: z.number(), myMembersCount: z.number(), todaysAttendance: z.number(), pendingWorkoutPlans: z.number(), memberGoalCompletionRate: z.number(),
  goalCompletionTrend: z.array(z.object({ month: z.string(), rate: z.number() })).optional(),
  recentMemberProgress: z.array(z.object({ id: z.string(), name: z.string(), detail: z.string(), time: z.string() })),
  upcomingSessions: z.array(z.object({ id: z.string(), name: z.string(), time: z.string(), type: z.string() })),
  membersByPlan: z.array(z.object({ plan: z.string(), count: z.number() })).optional(), recentMembers: z.array(TrainerDashboardRecentMemberSchema).optional(), trainerProfile: TrainerDashboardProfileSummarySchema.optional(),
});
