import { setupServer } from 'msw/node';
import { beforeEach } from 'vitest';

import { managerHandlers } from '@/app/frontend_manager/manager_infrastructure/mocks/ManagerMocksHandlers';

import { resetManagerAttendanceTrackingMockState } from '@/app/frontend_manager/manager_attendance/attendance_tracking/mocks/handlers/ManagerAttendanceTrackingMockHandlers';
import { resetManagerExpenseRegisterAndReportingMockState } from '@/app/frontend_manager/manager_finance_expenses/expense_register_and_reporting/mocks/handlers/ManagerExpenseRegisterAndReportingMockHandlers';
import { resetManagerFinancePaymentsAndSummaryMockState } from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/mocks/handlers/ManagerFinancePaymentsAndSummaryMockHandlers';
import { resetManagerGrievanceResolutionMockState } from '@/app/frontend_manager/manager_grievances/grievance_resolution/mocks/handlers/ManagerGrievanceResolutionMockHandlers';
import { resetManagerInquiriesPipelineMockState } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/mocks/handlers/ManagerInquiriesPipelineMockHandlers';
import { resetManagerLibraryDietPlansMockState } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/mocks/handlers/ManagerLibraryDietPlansMockHandlers';
import { resetManagerMaintenanceRequestsMockState } from '@/app/frontend_manager/manager_maintenance/maintenance_requests/mocks/handlers/ManagerMaintenanceRequestsMockHandlers';
import { resetManagerMembersDirectoryMockState } from '@/app/frontend_manager/manager_members/members_directory/mocks/handlers/ManagerMembersDirectoryMockHandlers';
import { resetManagerNotificationsInboxMockState } from '@/app/frontend_manager/manager_communications/notifications_inbox/mocks/handlers/ManagerNotificationsInboxMockHandlers';
import { resetManagerMembershipLifecycleMockState } from '@/app/frontend_manager/manager_membership_plans/membership_lifecycle/mocks/handlers/ManagerMembershipLifecycleMockHandlers';
import { resetManagerProfileAndSecurityMockState } from '@/app/frontend_manager/manager_dashboard/profile_and_security/mocks/handlers/ManagerProfileAndSecurityMockHandlers';
import { resetManagerPtAssignmentsMockState } from '@/app/frontend_manager/manager_schedule_personal_training/pt_assignments/mocks/handlers/ManagerPtAssignmentsMockHandlers';
import { resetManagerReferralsRewardsMockState } from '@/app/frontend_manager/manager_reports_referrals/referrals_rewards/mocks/handlers/ManagerReferralsRewardsMockHandlers';
import { resetManagerTrainerScheduleMockState } from '@/app/frontend_manager/manager_schedule_personal_training/trainer_schedule/mocks/handlers/ManagerTrainerScheduleMockHandlers';
import { resetManagerBusinessSettingsMockState } from '@/app/frontend_manager/manager_dashboard/business_settings/mocks/handlers/ManagerBusinessSettingsMockHandlers';




import { resetManagerCommunicationsAutomationsMockState } from '@/app/frontend_manager/manager_communications/communications_automations/mocks/handlers/ManagerCommunicationsAutomationsMockHandlers';
import { resetManagerCommunicationsChurnRecoveryMockState } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/mocks/handlers/ManagerCommunicationsChurnRecoveryMockHandlers';
import { resetManagerCommunicationsComposeMockState } from '@/app/frontend_manager/manager_communications/communications_compose/mocks/handlers/ManagerCommunicationsComposeMockHandlers';
import { resetManagerCommunicationsHistoryMockState } from '@/app/frontend_manager/manager_communications/communications_history/mocks/handlers/ManagerCommunicationsHistoryMockHandlers';
import { resetManagerStoreOrderManagementMockState } from '@/app/frontend_manager/manager_sales_billing/store_order_management/mocks/handlers/ManagerStoreOrderManagementMockHandlers';
import { resetManagerStorePointOfSaleMockState } from '@/app/frontend_manager/manager_sales_billing/store_point_of_sale/mocks/handlers/ManagerStorePointOfSaleMockHandlers';
import { resetManagerStoreProductsCatalogMockState } from '@/app/frontend_manager/manager_sales_billing/store_products_catalog/mocks/handlers/ManagerStoreProductsCatalogMockHandlers';
import { resetManagerPayrollAndLedgerMockState } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/mocks/handlers/ManagerPayrollAndLedgerMockHandlers';
import { resetManagerStaffAttendanceMockState } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/mocks/handlers/ManagerStaffAttendanceMockHandlers';
import { resetManagerStaffDirectoryMockState } from '@/app/frontend_manager/manager_staff_hr/staff_directory/mocks/handlers/ManagerStaffDirectoryMockHandlers';
import { resetManagerAssignedWorkoutPlansMockState } from '@/app/frontend_manager/manager_workout_diet_library/assigned_workout_plans/mocks/handlers/ManagerAssignedWorkoutPlansMockHandlers';
import { resetManagerExerciseLibraryMockState } from '@/app/frontend_manager/manager_workout_diet_library/exercise_library/mocks/handlers/ManagerExerciseLibraryMockHandlers';
import { resetManagerWorkoutPlanManagementMockState } from '@/app/frontend_manager/manager_workout_diet_library/workout_plan_management/mocks/handlers/ManagerWorkoutPlanManagementMockHandlers';

/**
 * @description Provides the ManagerMswTestServer implementation for the manager infrastructure module.
 * @dependencies @/app/frontend_manager/manager_attendance/manager_attendance_mocks/manager_attendance_mocks_handlers/ManagerAttendanceTrackingMockHandlers; @/app/frontend_manager/manager_communications/manager_communications_mocks/manager_communications_mocks_handlers/ManagerCommunicationsAutomationsMockHandlers; @/app/frontend_manager/manager_finance_expenses/manager_expenses_mocks/manager_expenses_mocks_handlers/ManagerExpenseRegisterAndReportingMockHandlers; @/app/frontend_manager/manager_finance_expenses/manager_finance_mocks/manager_finance_mocks_handlers/ManagerFinancePaymentsAndSummaryMockHandlers; @/app/frontend_manager/manager_grievances/manager_grievance_mocks/manager_grievance_mocks_handlers/ManagerGrievanceResolutionMockHandlers
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerMswServer = setupServer(...managerHandlers);

beforeEach(() => {
  resetManagerCommunicationsAutomationsMockState();
  resetManagerCommunicationsChurnRecoveryMockState();
  resetManagerCommunicationsComposeMockState();
  resetManagerCommunicationsHistoryMockState();
  resetManagerStoreOrderManagementMockState();
  resetManagerStorePointOfSaleMockState();
  resetManagerStoreProductsCatalogMockState();
  resetManagerPayrollAndLedgerMockState();
  resetManagerStaffAttendanceMockState();
  resetManagerStaffDirectoryMockState();
  resetManagerAssignedWorkoutPlansMockState();
  resetManagerExerciseLibraryMockState();
  resetManagerWorkoutPlanManagementMockState();
  resetManagerAttendanceTrackingMockState();
  resetManagerExpenseRegisterAndReportingMockState();
  resetManagerFinancePaymentsAndSummaryMockState();
  resetManagerGrievanceResolutionMockState();
  resetManagerInquiriesPipelineMockState();
  resetManagerLibraryDietPlansMockState();
  resetManagerMaintenanceRequestsMockState();
  resetManagerMembersDirectoryMockState();
  resetManagerNotificationsInboxMockState();
  resetManagerMembershipLifecycleMockState();
  resetManagerProfileAndSecurityMockState();
  resetManagerPtAssignmentsMockState();
  resetManagerReferralsRewardsMockState();
  resetManagerTrainerScheduleMockState();
  resetManagerBusinessSettingsMockState();
});
