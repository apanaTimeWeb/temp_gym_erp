// RESPONSIBILITY: Owns the Manager sidebar's 14 domain rows and secondary leaf destinations. Store stays routable under Sales & Billing but outside the sidebar; profile/settings/notifications remain header-owned.
import { LayoutDashboard, Users, CalendarCheck, Tags, Wrench, Frown, FileBarChart, Receipt, UserCog, CalendarClock, Dumbbell, Megaphone, Mail, History, Repeat, UserRoundX, ClipboardList, Settings, ShieldCheck, ClipboardCheck, BookOpen, Utensils, Gift, UserCheck } from 'lucide-react';
import type { ManagerNavGroup } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationConfigTypes';
import { MANAGER_BUSINESS_SETTINGS_ROUTES } from '@/app/frontend_manager/manager_dashboard/business_settings/config/manager_business_settings.url_config';
import { MANAGER_PROFILE_AND_SECURITY_ROUTES } from '@/app/frontend_manager/manager_dashboard/profile_and_security/config/manager_profile_and_security.url_config';
import { MANAGER_DASHBOARD_OVERVIEW_ROUTES } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/config/manager_dashboard_overview.url_config';
import { MANAGER_INQUIRIES_PIPELINE_ROUTES } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/config/manager_inquiries_pipeline.url_config';
import { MANAGER_MEMBERS_DIRECTORY_ROUTES } from '@/app/frontend_manager/manager_members/members_directory/config/manager_members_directory.url_config';
import { MANAGER_ATTENDANCE_TRACKING_ROUTES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/config/manager_attendance_tracking.url_config';
import { MANAGER_MEMBERSHIP_LIFECYCLE_ROUTES } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/config/manager_membership_lifecycle.url_config';
import { MANAGER_SALES_OVERVIEW_ROUTES } from '@/app/frontend_manager/manager_sales_billing/sales_overview/config/manager_sales_overview.url_config';
import { MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_ROUTES } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/config/manager_finance_payments_and_summary.url_config';
import { MANAGER_EXPENSE_REGISTER_AND_REPORTING_ROUTES } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/config/manager_expense_register_and_reporting.url_config';
import { MANAGER_MAINTENANCE_REQUESTS_ROUTES } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/config/manager_maintenance_requests.url_config';
import { MANAGER_GRIEVANCE_RESOLUTION_ROUTES } from '@/app/frontend_manager/manager_grievances/grievance_resolution/config/manager_grievance_resolution.url_config';
import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES as STAFF_ATTENDANCE_ROUTES } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/config/manager_staff_hr_staff_attendance.url_config';
import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES as STAFF_DIRECTORY_ROUTES } from '@/app/frontend_manager/manager_staff_hr/staff_directory/config/manager_staff_hr_staff_directory.url_config';
import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES as PAYROLL_ROUTES } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/config/manager_staff_hr_payroll_and_ledger.url_config';
import { MANAGER_PT_ASSIGNMENTS_ROUTES } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/config/manager_pt_assignments.url_config';
import { MANAGER_TRAINER_SCHEDULE_ROUTES } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/config/manager_trainer_schedule.url_config';
import { MANAGER_LIBRARY_DIET_PLANS_ROUTES } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/config/manager_library_diet_plans.url_config';
import { MANAGER_WORKOUT_PLANS_ROUTES as ASSIGNED_WORKOUT_ROUTES } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/config/manager_workout_diet_library_assigned_workout_plans.url_config';
import { MANAGER_WORKOUT_PLANS_ROUTES as EXERCISE_LIBRARY_ROUTES } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/config/manager_workout_diet_library_exercise_library.url_config';
import { MANAGER_WORKOUT_PLANS_ROUTES as WORKOUT_PLANS_ROUTES } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/config/manager_workout_diet_library_workout_plan_management.url_config';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES as COMPOSE_ROUTES } from '@/app/frontend_manager/manager_communications/communications_compose/config/manager_communications_communications_compose.url_config';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES as HISTORY_ROUTES } from '@/app/frontend_manager/manager_communications/communications_history/config/manager_communications_communications_history.url_config';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES as AUTOMATIONS_ROUTES } from '@/app/frontend_manager/manager_communications/communications_automations/config/manager_communications_communications_automations.url_config';
import { MANAGER_COMMUNICATIONS_CAMPAIGNS_ROUTES as CHURN_ROUTES } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/config/manager_communications_communications_churn_recovery.url_config';
import { MANAGER_REFERRALS_REWARDS_ROUTES } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/config/manager_referrals_rewards.url_config';
import { MANAGER_REPORTS_OVERVIEW_ROUTES } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/config/manager_reports_overview.url_config';

export const MANAGER_NAV_GROUPS: ManagerNavGroup[] = [
  { groupKey: 'NAV_DOMAIN_DASHBOARD', domainHref: '/frontend_manager/manager_dashboard', collapsible: true, items: [{ href: MANAGER_DASHBOARD_OVERVIEW_ROUTES.PATHS.LEAF, labelKey: 'NAV_DOMAIN_DASHBOARD', icon: LayoutDashboard }, { href: MANAGER_BUSINESS_SETTINGS_ROUTES.PATHS.LEAF, labelKey: 'NAV_BUSINESS_SETTINGS', icon: Settings }, { href: MANAGER_PROFILE_AND_SECURITY_ROUTES.PATHS.LEAF, labelKey: 'NAV_PROFILE_SECURITY', icon: ShieldCheck }] },
  { groupKey: 'NAV_DOMAIN_INQUIRIES_CRM', domainHref: '/frontend_manager/manager_inquiries_crm', collapsible: false, items: [{ href: MANAGER_INQUIRIES_PIPELINE_ROUTES.PATHS.LEAF, labelKey: 'NAV_DOMAIN_INQUIRIES_CRM', icon: Users }] },
  { groupKey: 'NAV_DOMAIN_MEMBERS', domainHref: '/frontend_manager/manager_members', collapsible: false, items: [{ href: MANAGER_MEMBERS_DIRECTORY_ROUTES.PATHS.LEAF, labelKey: 'NAV_DOMAIN_MEMBERS', icon: Users }] },
  { groupKey: 'NAV_DOMAIN_ATTENDANCE', domainHref: '/frontend_manager/manager_attendance', collapsible: false, items: [{ href: MANAGER_ATTENDANCE_TRACKING_ROUTES.PATHS.LEAF, labelKey: 'NAV_DOMAIN_ATTENDANCE', icon: CalendarCheck }] },
  { groupKey: 'NAV_DOMAIN_MEMBERSHIP_PLANS', domainHref: '/frontend_manager/manager_membership_plans', collapsible: false, items: [{ href: MANAGER_MEMBERSHIP_LIFECYCLE_ROUTES.PATHS.LEAF, labelKey: 'NAV_DOMAIN_MEMBERSHIP_PLANS', icon: Tags }] },
  { groupKey: 'NAV_DOMAIN_SALES_BILLING', domainHref: '/frontend_manager/manager_sales_billing', collapsible: false, items: [{ href: MANAGER_SALES_OVERVIEW_ROUTES.PATHS.LEAF, labelKey: 'NAV_DOMAIN_SALES_BILLING', icon: FileBarChart }] },
  { groupKey: 'NAV_DOMAIN_FINANCE_EXPENSES', domainHref: '/frontend_manager/manager_finance_expenses', collapsible: true, items: [
    { href: MANAGER_FINANCE_PAYMENTS_AND_SUMMARY_ROUTES.PATHS.LEAF, labelKey: 'NAV_FINANCE_SUMMARY', icon: Receipt },
    { href: MANAGER_EXPENSE_REGISTER_AND_REPORTING_ROUTES.PATHS.LEAF, labelKey: 'NAV_EXPENSE_REGISTER', icon: ClipboardList },
  ] },
  { groupKey: 'NAV_DOMAIN_MAINTENANCE', domainHref: '/frontend_manager/manager_maintenance', collapsible: false, items: [{ href: MANAGER_MAINTENANCE_REQUESTS_ROUTES.PATHS.LEAF, labelKey: 'NAV_DOMAIN_MAINTENANCE', icon: Wrench }] },
  { groupKey: 'NAV_DOMAIN_GRIEVANCES', domainHref: '/frontend_manager/manager_grievances', collapsible: false, items: [{ href: MANAGER_GRIEVANCE_RESOLUTION_ROUTES.PATHS.LEAF, labelKey: 'NAV_DOMAIN_GRIEVANCES', icon: Frown }] },
  { groupKey: 'NAV_DOMAIN_STAFF_HR', domainHref: '/frontend_manager/manager_staff_hr', collapsible: true, items: [
    { href: STAFF_DIRECTORY_ROUTES.PATHS.LEAF, labelKey: 'NAV_STAFF_DIRECTORY', icon: UserCog },
    { href: STAFF_ATTENDANCE_ROUTES.PATHS.LEAF, labelKey: 'NAV_STAFF_ATTENDANCE', icon: UserCheck },
    { href: PAYROLL_ROUTES.PATHS.LEAF, labelKey: 'NAV_PAYROLL_LEDGER', icon: Receipt },
  ] },
  { groupKey: 'NAV_DOMAIN_SCHEDULE_PT', domainHref: '/frontend_manager/manager_schedule_personal_training', collapsible: true, items: [{ href: MANAGER_TRAINER_SCHEDULE_ROUTES.PATHS.LEAF, labelKey: 'NAV_TRAINER_SCHEDULE', icon: CalendarClock }, { href: MANAGER_PT_ASSIGNMENTS_ROUTES.PATHS.LEAF, labelKey: 'NAV_PT_ASSIGNMENTS', icon: ClipboardCheck }] },
  { groupKey: 'NAV_DOMAIN_WORKOUT_DIET_LIBRARY', domainHref: '/frontend_manager/manager_workout_diet_library', collapsible: true, items: [{ href: WORKOUT_PLANS_ROUTES.PATHS.LEAF, labelKey: 'NAV_WORKOUT_PLANS', icon: Dumbbell }, { href: ASSIGNED_WORKOUT_ROUTES.PATHS.LEAF, labelKey: 'NAV_ASSIGNED_WORKOUTS', icon: ClipboardList }, { href: EXERCISE_LIBRARY_ROUTES.PATHS.LEAF, labelKey: 'NAV_EXERCISE_LIBRARY', icon: BookOpen }, { href: MANAGER_LIBRARY_DIET_PLANS_ROUTES.PATHS.LEAF, labelKey: 'NAV_DIET_LIBRARY', icon: Utensils }] },
  { groupKey: 'NAV_DOMAIN_COMMUNICATIONS', domainHref: '/frontend_manager/manager_communications', collapsible: true, items: [
    { href: COMPOSE_ROUTES.PATHS.LEAF, labelKey: 'NAV_COMMUNICATIONS_COMPOSE', icon: Mail },
    { href: HISTORY_ROUTES.PATHS.LEAF, labelKey: 'NAV_COMMUNICATIONS_HISTORY', icon: History },
    { href: AUTOMATIONS_ROUTES.PATHS.LEAF, labelKey: 'NAV_COMMUNICATIONS_AUTOMATIONS', icon: Repeat },
    { href: CHURN_ROUTES.PATHS.LEAF, labelKey: 'NAV_CHURN_RECOVERY', icon: UserRoundX },
  ] },
  { groupKey: 'NAV_DOMAIN_REPORTS_REFERRALS', domainHref: '/frontend_manager/manager_reports_referrals', collapsible: true, items: [{ href: MANAGER_REPORTS_OVERVIEW_ROUTES.PATHS.LEAF, labelKey: 'NAV_REPORTS_OVERVIEW', icon: FileBarChart }, { href: MANAGER_REFERRALS_REWARDS_ROUTES.PATHS.LEAF, labelKey: 'NAV_REFERRALS_REWARDS', icon: Gift }] },
];

export const MANAGER_DEFAULT_HOME = MANAGER_DASHBOARD_OVERVIEW_ROUTES.PATHS.LEAF;
