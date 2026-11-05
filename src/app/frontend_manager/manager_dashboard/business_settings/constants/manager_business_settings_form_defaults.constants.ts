// RESPONSIBILITY: Owns canonical initial/default values for module form state.
import type { ManagerAllSettings } from '@/app/frontend_manager/manager_dashboard/business_settings/types/manager_business_settings.types';

export const EMPTY_MANAGER_BUSINESS_SETTINGS: ManagerAllSettings = { preferences: { language: 'en-US', timezone: 'Asia/Kolkata', pushNotificationsEnabled: true, emailDailyReports: true }, gymProfile: { gymName: '', address: '', city: '', state: '', pincode: '', phone: '', email: '' }, operatingHours: [], membershipSettings: { gracePeriodDays: 0, autoSuspendOnExpiry: false, autoSuspendAfterDays: 0, allowFreeze: false, maxFreezeDaysPerYear: 0, reminderDaysBefore: 0 }, notificationTemplates: [] };
