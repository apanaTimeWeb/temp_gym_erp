import authLoginEn from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/locales/en.json';
import publicLandingEn from '@/app/frontend_public/public_landing/landing_experience/locales/public_landing_en.json';

// Trainer Locales
import trainerAccountNotificationsEn from '@/app/frontend_trainer/trainer_account/account_notifications/locales/trainer_account_notifications_en.json';
import trainerAccountProfileEn from '@/app/frontend_trainer/trainer_account/account_personal_profile/locales/trainer_account_personal_profile_en.json';
import trainerAccountSecurityEn from '@/app/frontend_trainer/trainer_account/account_security/locales/trainer_account_security_en.json';
import trainerDietEn from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/locales/coaching_diet_library_and_assignments_en.json';
import trainerExerciseEn from '@/app/frontend_trainer/trainer_coaching/coaching_exercise_management/locales/trainer_coaching_exercise_management_en.json';
import trainerIndividualProgressEn from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/locales/trainer_coaching_individual_progress_tracking_en.json';
import trainerProgressComparisonEn from '@/app/frontend_trainer/trainer_coaching/coaching_progress_comparison/locales/trainer_coaching_progress_comparison_tracking_en.json';
import trainerSessionsEn from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/locales/coaching_sessions_en.json';
import trainerWorkoutPlansEn from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/locales/trainer_coaching_workout_plans_en.json';
import trainerDashboardOverviewEn from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/locales/trainer_dashboard_overview_en.json';
import trainerEarningsEn from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/locales/trainer_earnings_overview_and_ledger_en.json';
import trainerMembersEn from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/locales/trainer_members_directory_and_profile_en.json';
import trainerNotesEn from '@/app/frontend_trainer/trainer_members/members_trainer_notes/locales/trainer_members_trainer_notes_en.json';
import trainerNavigationEn from '@/app/frontend_trainer/trainer_navigation/locales/trainer_navigation_en.json';
import trainerLeaveRequestsEn from '@/app/frontend_trainer/trainer_operations/operations_leave_requests/locales/trainer_operations_leave_requests_en.json';
import trainerMemberAttendanceEn from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/locales/trainer_operations_member_attendance_en.json';
import trainerAttendanceEn from '@/app/frontend_trainer/trainer_operations/operations_trainer_attendance/locales/trainer_operations_trainer_attendance_en.json';
import trainerWeeklyAvailabilityEn from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/locales/trainer_operations_weekly_availability_en.json';

function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

const allSources: Record<string, any>[] = [
  authLoginEn,
  publicLandingEn,
  trainerNavigationEn,
  trainerDashboardOverviewEn,
  trainerAccountNotificationsEn,
  trainerAccountProfileEn,
  trainerAccountSecurityEn,
  trainerDietEn,
  trainerExerciseEn,
  trainerIndividualProgressEn,
  trainerProgressComparisonEn,
  trainerSessionsEn,
  trainerWorkoutPlansEn,
  trainerEarningsEn,
  trainerMembersEn,
  trainerNotesEn,
  trainerLeaveRequestsEn,
  trainerMemberAttendanceEn,
  trainerAttendanceEn,
  trainerWeeklyAvailabilityEn,
];

export const appMessages: Record<string, any> = {};

for (const src of allSources) {
  deepMerge(appMessages, src);
}

export default appMessages;

