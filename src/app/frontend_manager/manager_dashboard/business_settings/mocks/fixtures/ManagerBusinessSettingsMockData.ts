import type { ManagerAllSettings } from '@/app/frontend_manager/manager_dashboard/business_settings/types/manager_business_settings.types';

/**
 * @description Provides the ManagerBusinessSettingsMockData implementation for the settings module.
 * @dependencies @/app/frontend_manager/manager_dashboard/manager_settings_types/ManagerBusinessSettingsTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_MANAGER_BUSINESS_SETTINGS: ManagerAllSettings = {
  preferences: { language: 'en-US', timezone: 'Asia/Kolkata', pushNotificationsEnabled: true, emailDailyReports: true },
  gymProfile: { gymName: 'Smart Gym', address: '123 Fitness St', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', phone: '9876543210', email: 'hello@smartgym.com', website: 'https://smartgym.example', gstin: '27ABCDE1234F1Z5' },
  operatingHours: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day) => ({ day: day as ManagerAllSettings['operatingHours'][number]['day'], isOpen: day !== 'Sunday', openTime: '06:00', closeTime: '22:00' })),
  membershipSettings: { gracePeriodDays: 3, autoSuspendOnExpiry: true, autoSuspendAfterDays: 3, allowFreeze: true, maxFreezeDaysPerYear: 30, reminderDaysBefore: 7 },
  notificationTemplates: [
    { id: 'template-renewal', type: 'renewal_reminder', channel: 'whatsapp', body: 'Hi {{member_name}}, your gym membership expires on {{expiry_date}}. Renew now to continue!', variables: ['{{member_name}}','{{expiry_date}}'], isActive: true, updatedAt: '2026-09-01T09:00:00Z' },
    { id: 'template-payment', type: 'payment_receipt', channel: 'whatsapp', body: 'Hi {{member_name}}, we received your payment of {{amount}}. Thank you!', variables: ['{{member_name}}','{{amount}}'], isActive: true, updatedAt: '2026-09-02T09:00:00Z' },
  ] };
