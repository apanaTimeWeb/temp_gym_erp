import { managerAttendanceHandlers } from '@/app/frontend_manager/manager_attendance/attendance_tracking/mocks/handlers/ManagerAttendanceTrackingMockHandlers';
import { managerCommunicationsHandlers } from '@/app/frontend_manager/manager_communications/communications_compose/mocks/handlers/ManagerCommunicationsComposeMockHandlers';
import { managerDashboardHandlers } from '@/app/frontend_manager/manager_dashboard/dashboard_overview/mocks/ManagerDashboardOverviewMockHandlers';
import { managerExpensesHandlers } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/mocks/handlers/ManagerExpenseRegisterAndReportingMockHandlers';
import { managerFinanceHandlers } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/mocks/handlers/ManagerFinancePaymentsAndSummaryMockHandlers';
import { managerGrievanceMockHandlers } from '@/app/frontend_manager/manager_grievances/grievance_resolution/mocks/handlers/ManagerGrievanceResolutionMockHandlers';
import { managerHrHandlers } from '@/app/frontend_manager/manager_staff_hr/staff_directory/mocks/handlers/ManagerStaffDirectoryMockHandlers';
import { managerInquiriesHandlers } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/mocks/handlers/ManagerInquiriesPipelineMockHandlers';
import { managerLibraryHandlers } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/mocks/handlers/ManagerLibraryDietPlansMockHandlers';
import { managerMaintenanceMockHandlers } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/mocks/handlers/ManagerMaintenanceRequestsMockHandlers';
import { managerMembersHandlers } from '@/app/frontend_manager/manager_members/members_directory/mocks/handlers/ManagerMembersDirectoryMockHandlers';
import { managerNotificationsHandlers } from '@/app/frontend_manager/manager_communications/notifications_inbox/mocks/handlers/ManagerNotificationsInboxMockHandlers';
import { managerPlansHandlers } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/mocks/handlers/ManagerMembershipLifecycleMockHandlers';
import { managerProfileHandlers } from '@/app/frontend_manager/manager_dashboard/profile_and_security/mocks/handlers/ManagerProfileAndSecurityMockHandlers';
import { managerPtHandlers } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/mocks/handlers/ManagerPtAssignmentsMockHandlers';
import { managerReferralsHandlers } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/mocks/handlers/ManagerReferralsRewardsMockHandlers';
import { managerReportsHandlers } from '@/app/frontend_manager/manager_reports_referrals/reports_overview/mocks/handlers/ManagerReportsOverviewMockHandlers';
import { managerSalesHandlers } from '@/app/frontend_manager/manager_sales_billing/sales_overview/mocks/handlers/ManagerSalesOverviewMockHandlers';
import { managerScheduleHandlers } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/mocks/handlers/ManagerTrainerScheduleMockHandlers';
import { managerSettingsHandlers } from '@/app/frontend_manager/manager_dashboard/business_settings/mocks/handlers/ManagerBusinessSettingsMockHandlers';
import { managerStoreHandlers } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/mocks/handlers/ManagerStoreProductsCatalogMockHandlers';
import { managerWorkoutHandlers } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/mocks/handlers/ManagerWorkoutPlanManagementMockHandlers';

import { managerCommunicationsHandlers as managerCommunicationsAutomationsHandlers } from '@/app/frontend_manager/manager_communications/communications_automations/mocks/handlers/ManagerCommunicationsAutomationsMockHandlers';
import { managerCommunicationsHandlers as managerCommunicationsChurnRecoveryHandlers } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/mocks/handlers/ManagerCommunicationsChurnRecoveryMockHandlers';
import { managerCommunicationsHandlers as managerCommunicationsHistoryHandlers } from '@/app/frontend_manager/manager_communications/communications_history/mocks/handlers/ManagerCommunicationsHistoryMockHandlers';
import { managerStoreHandlers as managerStoreOrderManagementHandlers } from '@/app/frontend_manager/manager_sales_billing/store_order_management/mocks/handlers/ManagerStoreOrderManagementMockHandlers';
import { managerHrHandlers as managerStaffAttendanceHandlers } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/mocks/handlers/ManagerStaffAttendanceMockHandlers';
import { managerWorkoutHandlers as managerAssignedWorkoutPlansHandlers } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/mocks/handlers/ManagerAssignedWorkoutPlansMockHandlers';
import { managerHrHandlers as managerPayrollAndLedgerHandlers } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/handlers/ManagerPayrollAndLedgerMockHandlers';
import { managerStoreHandlers as managerPointOfSaleHandlers } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/mocks/handlers/ManagerStorePointOfSaleMockHandlers';
import { managerWorkoutHandlers as managerExerciseLibraryHandlers } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/mocks/handlers/ManagerExerciseLibraryMockHandlers';

/**
 * @description Provides the ManagerMockHandlers implementation for the manager infrastructure module.
 * @dependencies Imports the canonical handler arrays from each Manager leaf mock module listed above; aliases are explicit and no retired module paths are referenced.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerHandlers = [
  ...managerCommunicationsHandlers,
  ...managerCommunicationsAutomationsHandlers,
  ...managerCommunicationsChurnRecoveryHandlers,
  ...managerCommunicationsHistoryHandlers,
  ...managerStoreHandlers,
  ...managerPointOfSaleHandlers,
  ...managerStoreOrderManagementHandlers,
  ...managerHrHandlers,
  ...managerPayrollAndLedgerHandlers,
  ...managerStaffAttendanceHandlers,
  ...managerWorkoutHandlers,
  ...managerExerciseLibraryHandlers,
  ...managerAssignedWorkoutPlansHandlers,
  ...managerAttendanceHandlers,
  ...managerMaintenanceMockHandlers,
  ...managerGrievanceMockHandlers,
  ...managerDashboardHandlers,
  ...managerExpensesHandlers,
  ...managerFinanceHandlers,
  ...managerInquiriesHandlers,
  ...managerLibraryHandlers,
  ...managerMembersHandlers,
  ...managerNotificationsHandlers,
  ...managerPlansHandlers,
  ...managerProfileHandlers,
  ...managerPtHandlers,
  ...managerReferralsHandlers,
  ...managerReportsHandlers,
  ...managerSalesHandlers,
  ...managerSettingsHandlers,
  ...managerScheduleHandlers,
];
