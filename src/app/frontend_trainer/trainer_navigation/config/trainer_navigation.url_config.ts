import { TRAINER_DASHBOARD_PAGE_LIST } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';
import { TRAINER_ATTENDANCE_PAGE_LIST } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/config/trainer_operations_member_attendance.url_config';
import { TRAINER_ATTENDANCE_PAGE_LIST as TRAINER_TRAINER_ATTENDANCE_PAGE_LIST } from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/config/trainer_operations_trainer_attendance.url_config';
import { TRAINER_SCHEDULE_PAGE_LIST } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/config/trainer_operations_weekly_availability.url_config';
import { TRAINER_SCHEDULE_PAGE_LIST as TRAINER_LEAVES_PAGE_LIST } from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/config/trainer_operations_leave_requests.url_config';
import { TRAINER_EARNINGS_PAGE_LIST } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/config/trainer_earnings_overview_and_ledger.url_config';
import { TRAINER_LIBRARY_PAGE_LIST } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/trainer_coaching_diet_library_and_assignments.url_config';
import { TRAINER_MEMBERS_PAGE_LIST } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/members_directory_and_profile.url_config';
import { TRAINER_NOTES_PAGE_LIST } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/config/trainer_members_trainer_notes.url_config';
import { TRAINER_NOTIFICATIONS_PAGE_LIST } from '@/app/frontend_trainer/trainer_account/account_notifications/config/trainer_account_notifications.url_config';
import { TRAINER_PROFILE_PAGE_LIST } from '@/app/frontend_trainer/trainer_account/account_personal_profile/config/trainer_account_personal_profile.url_config';
import { TRAINER_ACCOUNT_SECURITY_PAGE_LIST } from '@/app/frontend_trainer/trainer_account/account_security/config/trainer_account_security.url_config';
import { TRAINER_PROGRESS_TRACKING_PAGE_LIST } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/config/trainer_coaching_individual_progress.url_config';
import { TRAINER_PROGRESS_TRACKING_PAGE_LIST as TRAINER_COMPARISON_PAGE_LIST } from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/config/trainer_coaching_progress_comparison.url_config';
import { TRAINER_SESSIONS_PAGE_LIST } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/trainer_coaching_sessions.url_config';
import { TRAINER_WORKOUT_PAGE_LIST } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/trainer_coaching_workout_plans.url_config';
import { TRAINER_WORKOUT_PAGE_LIST as TRAINER_EXERCISES_PAGE_LIST } from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/config/trainer_coaching_exercise_management.url_config';

/**
 * Route registry for validating Trainer shell navigation coverage. Every value is
 * imported from the owning feature module; this file does not own route literals.
 */
export const TRAINER_NAVIGATION_URL_CONFIG = {
  ROUTES: {
    DASHBOARD: TRAINER_DASHBOARD_PAGE_LIST,
    ATTENDANCE: TRAINER_ATTENDANCE_PAGE_LIST,
    TRAINER_ATTENDANCE: TRAINER_TRAINER_ATTENDANCE_PAGE_LIST,
    EARNINGS: TRAINER_EARNINGS_PAGE_LIST,
    LIBRARY: TRAINER_LIBRARY_PAGE_LIST,
    MEMBERS: TRAINER_MEMBERS_PAGE_LIST,
    MEMBERS_NOTES: TRAINER_NOTES_PAGE_LIST,
    NOTIFICATIONS: TRAINER_NOTIFICATIONS_PAGE_LIST,
    PROFILE: TRAINER_PROFILE_PAGE_LIST,
    SECURITY: TRAINER_ACCOUNT_SECURITY_PAGE_LIST,
    PROGRESS_TRACKING: TRAINER_PROGRESS_TRACKING_PAGE_LIST,
    PROGRESS_COMPARISON: TRAINER_COMPARISON_PAGE_LIST,
    SCHEDULE: TRAINER_SCHEDULE_PAGE_LIST,
    LEAVES: TRAINER_LEAVES_PAGE_LIST,
    SESSIONS: TRAINER_SESSIONS_PAGE_LIST,
    WORKOUT: TRAINER_WORKOUT_PAGE_LIST,
    EXERCISES: TRAINER_EXERCISES_PAGE_LIST,
  } as const,
  API: {} as const,
} as const;
