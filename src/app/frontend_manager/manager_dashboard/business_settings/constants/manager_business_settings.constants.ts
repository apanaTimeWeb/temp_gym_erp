// RESPONSIBILITY: Owns static Manager Settings UI configuration and business option registries.

import type { SettingsTab } from '@/app/frontend_manager/manager_dashboard/business_settings/types/manager_business_settings_view.types';

/**
 * @description Centralizes settings dropdown and tab configuration so static UI data has a single feature-local owner.
 * @dependencies Uses only Manager Settings type definitions.
 * @edge-case Locale labels are stored as translation keys; UI text is resolved by the feature's next-intl namespace rather than rendered from these English fallback labels.
 */
export const MANAGER_BUSINESS_SETTINGS_LANGUAGE_OPTIONS = [
  { label: 'English (US)', labelKey: 'TEXT_LANGUAGE_EN_US', value: 'en-US' },
  { label: 'Hindi (IN)', labelKey: 'TEXT_LANGUAGE_HI_IN', value: 'hi-IN' },
] as const;

export const MANAGER_BUSINESS_SETTINGS_TIMEZONE_OPTIONS = [
  { label: 'Asia/Kolkata (IST)', labelKey: 'TEXT_TZ_ASIA_KOLKATA', value: 'Asia/Kolkata' },
  { label: 'America/New_York (EST)', labelKey: 'TEXT_TZ_NEW_YORK', value: 'America/New_York' },
  { label: 'Europe/London (GMT)', labelKey: 'TEXT_TZ_LONDON', value: 'Europe/London' },
] as const;

export const MANAGER_BUSINESS_SETTINGS_TABS: ReadonlyArray<{ id: SettingsTab; label: string; labelKey: string }> = [
  { id: 'region', label: 'Region & Notifications', labelKey: 'TEXT_TAB_REGION' },
  { id: 'gym_profile', label: 'Gym Profile', labelKey: 'TEXT_TAB_GYM_PROFILE' },
  { id: 'operating_hours', label: 'Operating Hours', labelKey: 'TEXT_TAB_OPERATING_HOURS' },
  { id: 'subscription', label: 'SaaS Subscription & Quota', labelKey: 'TEXT_TAB_SUBSCRIPTION' },
];

export const MANAGER_BUSINESS_SETTINGS_WEEKDAY_VALUES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

export const MANAGER_BUSINESS_SETTINGS_NOTIFICATION_TEMPLATE_TYPE_VALUES = ['renewal_reminder', 'payment_receipt', 'welcome_message', 'expiry_alert', 'payment_due'] as const;

export const MANAGER_BUSINESS_SETTINGS_NOTIFICATION_CHANNEL_VALUES = ['whatsapp', 'email', 'both'] as const;
