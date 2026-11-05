import { z } from 'zod';

import { MANAGER_BUSINESS_SETTINGS_WEEKDAY_VALUES, MANAGER_BUSINESS_SETTINGS_NOTIFICATION_TEMPLATE_TYPE_VALUES, MANAGER_BUSINESS_SETTINGS_NOTIFICATION_CHANNEL_VALUES } from '@/app/frontend_manager/manager_dashboard/business_settings/constants/manager_business_settings.constants';

/**
 * @description Provides the ManagerBusinessSettingsSchema implementation for the settings module.
 * @dependencies Only local module configuration and approved framework primitives.
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerSettingsPreferencesSchema = z.object({
  language: z.string(), timezone: z.string(), pushNotificationsEnabled: z.boolean(), emailDailyReports: z.boolean() });
export const gymProfileSchema = z.object({
  gymName: z.string(), logoUrl: z.string().optional(), address: z.string(), city: z.string(), state: z.string(), pincode: z.string(), phone: z.string(), email: z.string(), website: z.string().optional(), gstin: z.string().optional() });
export const operatingHoursDaySchema = z.object({
  day: z.enum(MANAGER_BUSINESS_SETTINGS_WEEKDAY_VALUES), isOpen: z.boolean(), openTime: z.string(), closeTime: z.string() });
export const operatingHoursSchema = z.array(operatingHoursDaySchema);
export const membershipSettingsSchema = z.object({
  gracePeriodDays: z.number().min(0), autoSuspendOnExpiry: z.boolean(), autoSuspendAfterDays: z.number().min(0), allowFreeze: z.boolean(), maxFreezeDaysPerYear: z.number().min(0), reminderDaysBefore: z.number().min(0) });
export const notificationTemplateSchema = z.object({
  id: z.string(), type: z.enum(MANAGER_BUSINESS_SETTINGS_NOTIFICATION_TEMPLATE_TYPE_VALUES), channel: z.enum(MANAGER_BUSINESS_SETTINGS_NOTIFICATION_CHANNEL_VALUES), subject: z.string().optional(), body: z.string(), variables: z.array(z.string()), isActive: z.boolean(), updatedAt: z.string() });
export const managerAllSettingsSchema = z.object({
  preferences: managerSettingsPreferencesSchema, gymProfile: gymProfileSchema, operatingHours: operatingHoursSchema, membershipSettings: membershipSettingsSchema, notificationTemplates: z.array(notificationTemplateSchema) });
