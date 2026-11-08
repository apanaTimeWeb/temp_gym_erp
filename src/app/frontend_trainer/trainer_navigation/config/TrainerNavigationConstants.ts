import {
  LayoutDashboard,
  Users,
  Utensils,
  Dumbbell,
  CalendarCheck,
  Clock,
  Bell,
  User,
  IndianRupee,
  Calendar,
  TrendingUp,
  FileText,
  ListPlus,
  BarChart3,
  UserCheck,
  CalendarDays,
  Shield,
} from 'lucide-react';

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
 * Canonical sidebar/command-palette metadata. Each primary navigation destination
 * obtains its href directly from that feature module's typed URL contract.
 */
export const TRAINER_NAVIGATION_GROUPS = [
  { groupKey: 'TEXT_NAV_OVERVIEW', items: [
    { href: TRAINER_DASHBOARD_PAGE_LIST, labelKey: 'TEXT_NAV_DASHBOARD', icon: LayoutDashboard },
  ] },
  { groupKey: 'TEXT_NAV_MEMBERS', items: [
    { href: TRAINER_MEMBERS_PAGE_LIST, labelKey: 'TEXT_NAV_MY_MEMBERS', icon: Users },
    { href: TRAINER_NOTES_PAGE_LIST, labelKey: 'NAV_MEMBER_NOTES', icon: FileText },
  ] },
  { groupKey: 'TEXT_NAV_COACHING', items: [
    { href: TRAINER_WORKOUT_PAGE_LIST, labelKey: 'TEXT_NAV_WORKOUT_EXERCISES', icon: Dumbbell },
    { href: TRAINER_EXERCISES_PAGE_LIST, labelKey: 'NAV_COACHING_EXERCISES', icon: ListPlus },
    { href: TRAINER_LIBRARY_PAGE_LIST, labelKey: 'TEXT_NAV_DIET_LIBRARY', icon: Utensils },
    { href: TRAINER_SESSIONS_PAGE_LIST, labelKey: 'TEXT_NAV_SESSIONS', icon: Clock },
    { href: TRAINER_PROGRESS_TRACKING_PAGE_LIST, labelKey: 'TEXT_NAV_PROGRESS_TRACKING', icon: TrendingUp },
    { href: TRAINER_COMPARISON_PAGE_LIST, labelKey: 'NAV_COACHING_COMPARISON', icon: BarChart3 },
  ] },
  { groupKey: 'TEXT_NAV_OPERATIONS', items: [
    { href: TRAINER_ATTENDANCE_PAGE_LIST, labelKey: 'TEXT_NAV_ATTENDANCE', icon: CalendarCheck },
    { href: TRAINER_TRAINER_ATTENDANCE_PAGE_LIST, labelKey: 'NAV_OPERATIONS_SELF_ATTENDANCE', icon: UserCheck },
    { href: TRAINER_SCHEDULE_PAGE_LIST, labelKey: 'TEXT_NAV_SCHEDULE_LEAVES', icon: Calendar },
    { href: TRAINER_LEAVES_PAGE_LIST, labelKey: 'NAV_OPERATIONS_LEAVES', icon: CalendarDays },
  ] },
  { groupKey: 'TEXT_NAV_EARNINGS_DOMAIN', items: [
    { href: TRAINER_EARNINGS_PAGE_LIST, labelKey: 'TEXT_NAV_EARNINGS', icon: IndianRupee },
  ] },
  { groupKey: 'TEXT_NAV_ACCOUNT', items: [
    { href: TRAINER_NOTIFICATIONS_PAGE_LIST, labelKey: 'TEXT_NAV_NOTIFICATIONS', icon: Bell },
    { href: TRAINER_PROFILE_PAGE_LIST, labelKey: 'TEXT_NAV_MY_PROFILE', icon: User },
    { href: TRAINER_ACCOUNT_SECURITY_PAGE_LIST, labelKey: 'NAV_ACCOUNT_SECURITY', icon: Shield },
  ] },
] as const;

/** Typed route metadata used to resolve the shell's current page title/subtitle. */
export const TRAINER_ROUTE_TITLE_MAP: Record<string, { titleKey: string; subtitleKey: string }> = {
  [TRAINER_DASHBOARD_PAGE_LIST]: { titleKey: 'TEXT_DASHBOARD_TITLE', subtitleKey: 'TEXT_DASHBOARD_SUBTITLE' },
  [TRAINER_ATTENDANCE_PAGE_LIST]: { titleKey: 'TEXT_ATTENDANCE_TITLE', subtitleKey: 'TEXT_ATTENDANCE_SUBTITLE' },
  [TRAINER_EARNINGS_PAGE_LIST]: { titleKey: 'TEXT_EARNINGS_TITLE', subtitleKey: 'TEXT_EARNINGS_SUBTITLE' },
  [TRAINER_LIBRARY_PAGE_LIST]: { titleKey: 'TEXT_LIBRARY_TITLE', subtitleKey: 'TEXT_LIBRARY_SUBTITLE' },
  [TRAINER_MEMBERS_PAGE_LIST]: { titleKey: 'TEXT_MEMBERS_TITLE', subtitleKey: 'TEXT_MEMBERS_SUBTITLE' },
  [TRAINER_NOTIFICATIONS_PAGE_LIST]: { titleKey: 'TEXT_NOTIFICATIONS_TITLE', subtitleKey: 'TEXT_NOTIFICATIONS_SUBTITLE' },
  [TRAINER_PROFILE_PAGE_LIST]: { titleKey: 'TEXT_PROFILE_TITLE', subtitleKey: 'TEXT_PROFILE_SUBTITLE' },
  [TRAINER_PROGRESS_TRACKING_PAGE_LIST]: { titleKey: 'TEXT_PROGRESS_TITLE', subtitleKey: 'TEXT_PROGRESS_SUBTITLE' },
  [TRAINER_SCHEDULE_PAGE_LIST]: { titleKey: 'TEXT_SCHEDULE_TITLE', subtitleKey: 'TEXT_SCHEDULE_SUBTITLE' },
  [TRAINER_SESSIONS_PAGE_LIST]: { titleKey: 'TEXT_SESSIONS_TITLE', subtitleKey: 'TEXT_SESSIONS_SUBTITLE' },
  [TRAINER_WORKOUT_PAGE_LIST]: { titleKey: 'TEXT_WORKOUT_TITLE', subtitleKey: 'TEXT_WORKOUT_SUBTITLE' },
  [TRAINER_ACCOUNT_SECURITY_PAGE_LIST]: { titleKey: 'TEXT_SECURITY_TITLE', subtitleKey: 'TEXT_SECURITY_SUBTITLE' },
  [TRAINER_EXERCISES_PAGE_LIST]: { titleKey: 'TEXT_EXERCISE_MANAGEMENT_TITLE', subtitleKey: 'TEXT_EXERCISE_MANAGEMENT_SUBTITLE' },
  [TRAINER_COMPARISON_PAGE_LIST]: { titleKey: 'TEXT_PROGRESS_COMPARISON_TITLE', subtitleKey: 'TEXT_PROGRESS_COMPARISON_SUBTITLE' },
  [TRAINER_NOTES_PAGE_LIST]: { titleKey: 'TEXT_TRAINER_NOTES_TITLE', subtitleKey: 'TEXT_TRAINER_NOTES_SUBTITLE' },
  [TRAINER_LEAVES_PAGE_LIST]: { titleKey: 'TEXT_LEAVE_REQUESTS_TITLE', subtitleKey: 'TEXT_LEAVE_REQUESTS_SUBTITLE' },
  [TRAINER_TRAINER_ATTENDANCE_PAGE_LIST]: { titleKey: 'TEXT_TRAINER_ATTENDANCE_TITLE', subtitleKey: 'TEXT_TRAINER_ATTENDANCE_SUBTITLE' },
};
