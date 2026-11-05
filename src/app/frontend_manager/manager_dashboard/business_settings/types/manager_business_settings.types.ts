import type { z } from 'zod';
import type {
  gymProfileSchema,
  managerAllSettingsSchema,
  managerSettingsPreferencesSchema,
  membershipSettingsSchema,
  notificationTemplateSchema,
  operatingHoursDaySchema,
  operatingHoursSchema,
} from '@/app/frontend_manager/manager_dashboard/business_settings/schemas/manager_business_settings.schemas';

// RESPONSIBILITY: TypeScript types for the Manager Settings module.
// Covers all tabs: Region/Notifications, Gym Profile, Operating Hours,
// Membership Settings, and Notification Templates.

// ─── Enums & Literal Types ────────────────────────────────────────────────────
export type { SettingsTab } from '@/app/frontend_manager/manager_dashboard/business_settings/types/manager_business_settings_view.types';
export type ManagerBusinessSettingsNotificationChannel = z.infer<typeof notificationTemplateSchema>['channel'];
export type NotificationTemplateType = z.infer<typeof notificationTemplateSchema>['type'];
export type RecurringFrequency = 'Daily' | 'Weekly' | 'Monthly';

// ─── Region & Notifications ───────────────────────────────────────────────────
export type ManagerBusinessSettingsPreferences = z.infer<typeof managerSettingsPreferencesSchema>;

export interface UpdateManagerBusinessSettingsPayload {
  language?: string;
  timezone?: string;
  pushNotificationsEnabled?: boolean;
  emailDailyReports?: boolean;
}

// ─── Gym Profile ──────────────────────────────────────────────────────────────
export type GymProfile = z.infer<typeof gymProfileSchema>;

export type UpdateGymProfilePayload = Partial<GymProfile>;

// ─── Operating Hours ─────────────────────────────────────────────────────────
export type DayOfWeek = z.infer<typeof operatingHoursDaySchema>['day'];

export type OperatingHoursDay = z.infer<typeof operatingHoursDaySchema>;

export type OperatingHours = z.infer<typeof operatingHoursSchema>;

// ─── Membership Settings ─────────────────────────────────────────────────────
export type MembershipSettings = z.infer<typeof membershipSettingsSchema>;

export type UpdateMembershipSettingsPayload = Partial<MembershipSettings>;

// ─── Notification Templates ───────────────────────────────────────────────────
export type NotificationTemplate = z.infer<typeof notificationTemplateSchema>;

export interface UpdateNotificationTemplatePayload {
  channel?: NotificationTemplate['channel'];
  subject?: string;
  body?: string;
  isActive?: boolean;
}

// ─── Aggregated Settings (fetched together) ───────────────────────────────────
export type ManagerAllSettingsInput = z.input<typeof managerAllSettingsSchema>;
export type ManagerAllSettings = z.output<typeof managerAllSettingsSchema>;
