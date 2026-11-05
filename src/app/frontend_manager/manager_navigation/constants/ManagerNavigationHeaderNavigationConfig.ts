import { MANAGER_NOTIFICATIONS_INBOX_ROUTES } from '@/app/frontend_manager/manager_communications/notifications_inbox/config/manager_notifications_inbox.url_config';
import { MANAGER_BUSINESS_SETTINGS_ROUTES } from '@/app/frontend_manager/manager_dashboard/business_settings/config/manager_business_settings.url_config';
import { MANAGER_PROFILE_AND_SECURITY_ROUTES } from '@/app/frontend_manager/manager_dashboard/profile_and_security/config/manager_profile_and_security.url_config';
import { MANAGER_ATTENDANCE_TRACKING_ROUTES } from '@/app/frontend_manager/manager_attendance/attendance_tracking/config/manager_attendance_tracking.url_config';






/**
 * @description Provides the ManagerHeaderNavigationConfig implementation for the manager infrastructure module.
 * @dependencies Imports the canonical attendance, notifications, profile, and business-settings route registries listed below.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_HEADER_NAVIGATION = {
  scanner: MANAGER_ATTENDANCE_TRACKING_ROUTES.UI.QR_SCANNER,
  notifications: MANAGER_NOTIFICATIONS_INBOX_ROUTES.UI.HOME,
  profile: MANAGER_PROFILE_AND_SECURITY_ROUTES.UI.HOME,
  settings: MANAGER_BUSINESS_SETTINGS_ROUTES.PAGES.SETTINGS,
} as const;
