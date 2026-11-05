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
} from 'lucide-react';

import { TRAINER_DASHBOARD_PAGE_LIST } from '@/app/frontend_trainer/trainer_dashboard/dashboard_overview/config/trainer_dashboard_overview.url_config';
import { TRAINER_ATTENDANCE_PAGE_LIST } from '@/app/frontend_trainer/trainer_operations/operations_member_attendance/config/trainer_operations_member_attendance.url_config';
import { TRAINER_EARNINGS_PAGE_LIST } from '@/app/frontend_trainer/trainer_earnings/earnings_overview_and_ledger/config/trainer_earnings_overview_and_ledger.url_config';
import { TRAINER_LIBRARY_PAGE_LIST } from '@/app/frontend_trainer/trainer_coaching/coaching_diet_library_and_assignments/config/trainer_coaching_diet_library_and_assignments.url_config';
import { TRAINER_MEMBERS_PAGE_LIST } from '@/app/frontend_trainer/trainer_members/members_directory_and_profile/config/members_directory_and_profile.url_config';
import { TRAINER_NOTIFICATIONS_PAGE_LIST } from '@/app/frontend_trainer/trainer_account/account_notifications/config/trainer_account_notifications.url_config';
import { TRAINER_PROFILE_PAGE_LIST } from '@/app/frontend_trainer/trainer_account/account_personal_profile/config/trainer_account_personal_profile.url_config';
import { TRAINER_PROGRESS_TRACKING_PAGE_LIST } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/config/trainer_coaching_individual_progress.url_config';
import { TRAINER_SCHEDULE_PAGE_LIST } from '@/app/frontend_trainer/trainer_operations/operations_weekly_availability/config/trainer_operations_weekly_availability.url_config';
import { TRAINER_SESSIONS_PAGE_LIST } from '@/app/frontend_trainer/trainer_coaching/coaching_sessions/config/trainer_coaching_sessions.url_config';
import { TRAINER_WORKOUT_PAGE_LIST } from '@/app/frontend_trainer/trainer_coaching/coaching_workout_plans/config/trainer_coaching_workout_plans.url_config';

/**
 * Canonical sidebar/command-palette metadata. Each primary navigation destination
 * obtains its href directly from that feature module's typed URL contract.
 */
export const TRAINER_NAVIGATION_GROUPS = [
  { groupKey: 'TEXT_NAV_OVERVIEW', items: [{ href: TRAINER_DASHBOARD_PAGE_LIST, labelKey: 'TEXT_NAV_DASHBOARD', icon: LayoutDashboard }] },
  { groupKey: 'TEXT_NAV_MEMBERS', items: [{ href: TRAINER_MEMBERS_PAGE_LIST, labelKey: 'TEXT_NAV_MY_MEMBERS', icon: Users }] },
  { groupKey: 'TEXT_NAV_COACHING', items: [
    { href: TRAINER_WORKOUT_PAGE_LIST, labelKey: 'TEXT_NAV_WORKOUT_EXERCISES', icon: Dumbbell },
    { href: TRAINER_LIBRARY_PAGE_LIST, labelKey: 'TEXT_NAV_DIET_LIBRARY', icon: Utensils },
    { href: TRAINER_SESSIONS_PAGE_LIST, labelKey: 'TEXT_NAV_SESSIONS', icon: Clock },
    { href: TRAINER_PROGRESS_TRACKING_PAGE_LIST, labelKey: 'TEXT_NAV_PROGRESS_TRACKING', icon: TrendingUp },
  ] },
  { groupKey: 'TEXT_NAV_OPERATIONS', items: [
    { href: TRAINER_ATTENDANCE_PAGE_LIST, labelKey: 'TEXT_NAV_ATTENDANCE', icon: CalendarCheck },
    { href: TRAINER_SCHEDULE_PAGE_LIST, labelKey: 'TEXT_NAV_SCHEDULE_LEAVES', icon: Calendar },
  ] },
  { groupKey: 'TEXT_NAV_EARNINGS_DOMAIN', items: [{ href: TRAINER_EARNINGS_PAGE_LIST, labelKey: 'TEXT_NAV_EARNINGS', icon: IndianRupee }] },
  { groupKey: 'TEXT_NAV_ACCOUNT', items: [
    { href: TRAINER_NOTIFICATIONS_PAGE_LIST, labelKey: 'TEXT_NAV_NOTIFICATIONS', icon: Bell },
    { href: TRAINER_PROFILE_PAGE_LIST, labelKey: 'TEXT_NAV_MY_PROFILE', icon: User },
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
};
