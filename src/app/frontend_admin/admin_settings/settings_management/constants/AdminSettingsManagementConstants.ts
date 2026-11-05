// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
// DATA FLOW: feature hook/API/component → stable feature constants → requests, cache keys, and UI behavior (admin_settings/settings_management/constants/AdminSettingsManagementConstants.ts)

import { Building, Bell, Shield, Smartphone, Settings as SettingsIcon, Receipt, CreditCard } from 'lucide-react';



export const SETTINGS_TABS = [
  { id: 'profile', icon: Building, titleKey: 'settings.AdminSettingsTabs.gymProfile', descKey: 'settings.AdminSettingsTabs.gymProfileDesc', color: 'text-info', bg: 'bg-info-bg' },
  { id: 'notifications', icon: Bell, titleKey: 'settings.AdminSettingsTabs.notifications', descKey: 'settings.AdminSettingsTabs.notificationsDesc', color: 'text-warning', bg: 'bg-warning-bg' },
  { id: 'roles', icon: Shield, titleKey: 'settings.AdminSettingsTabs.roles', descKey: 'settings.AdminSettingsTabs.rolesDesc', color: 'text-purple', bg: 'bg-purple-bg' },
  { id: 'integration', icon: Smartphone, titleKey: 'settings.AdminSettingsTabs.integration', descKey: 'settings.AdminSettingsTabs.integrationDesc', color: 'text-success', bg: 'bg-success-bg' },
  { id: 'gst', icon: Receipt, titleKey: 'settings.AdminSettingsTabs.gst', descKey: 'settings.AdminSettingsTabs.gstDesc', color: 'text-warning', bg: 'bg-warning-bg' },
  { id: 'payment', icon: CreditCard, titleKey: 'settings.AdminSettingsTabs.payment', descKey: 'settings.AdminSettingsTabs.paymentDesc', color: 'text-success', bg: 'bg-success-bg' },
  { id: 'general', icon: SettingsIcon, titleKey: 'settings.AdminSettingsTabs.general', descKey: 'settings.AdminSettingsTabs.generalDesc', color: 'text-secondary', bg: 'bg-card' },
] as const;

export const GST_STATE_CODES = [
  { value: '27', labelKey: 'settings.admin_settings_gst.stateMaharashtra' },
  { value: '07', labelKey: 'settings.admin_settings_gst.stateDelhi' },
  { value: '29', labelKey: 'settings.admin_settings_gst.stateKarnataka' },
  { value: '33', labelKey: 'settings.admin_settings_gst.stateTamilNadu' },
  { value: '06', labelKey: 'settings.admin_settings_gst.stateHaryana' },
  { value: '24', labelKey: 'settings.admin_settings_gst.stateGujarat' },
  { value: '36', labelKey: 'settings.admin_settings_gst.stateTelangana' },
] as const;

export const TAX_RATE_OPTIONS = [
  { value: '0', labelKey: 'settings.admin_settings_gst.taxExempt' },
  { value: '5', labelKey: 'settings.admin_settings_gst.tax5' },
  { value: '12', labelKey: 'settings.admin_settings_gst.tax12' },
  { value: '18', labelKey: 'settings.admin_settings_gst.tax18' },
  { value: '28', labelKey: 'settings.admin_settings_gst.tax28' },
] as const;


export const TIMEZONE_OPTIONS = [
  { value: 'Asia/Kolkata', labelKey: 'settings.admin_settings_general.timezoneKolkata' },
  { value: 'Asia/Dubai', labelKey: 'settings.admin_settings_general.timezoneDubai' },
  { value: 'UTC', labelKey: 'settings.admin_settings_general.timezoneUtc' },
] as const;

export const LANGUAGE_OPTIONS = [
  { value: 'en', labelKey: 'settings.admin_settings_general.languageEnglish' },
  { value: 'hi', labelKey: 'settings.admin_settings_general.languageHindi' },
] as const;

export const BACKUP_FREQUENCY_OPTIONS = [
  { value: 'daily', labelKey: 'settings.admin_settings_general.backupDaily' },
  { value: 'weekly', labelKey: 'settings.admin_settings_general.backupWeekly' },
  { value: 'monthly', labelKey: 'settings.admin_settings_general.backupMonthly' },
] as const;

export const ADMIN_SETTINGS_DATE_FORMAT_OPTIONS = [
  { value: 'DD/MM/YYYY', labelKey: 'settings.admin_settings_general.text_5d95adc03d' },
  { value: 'MM/DD/YYYY', labelKey: 'settings.admin_settings_general.text_119c608ac4' },
  { value: 'YYYY-MM-DD', labelKey: 'settings.admin_settings_general.text_d3f8f7b810' },
] as const;

export const ADMIN_SETTINGS_NOTIFICATION_CHANNELS = [
  { key: 'sms', labelKey: 'settings.AdminAuditRepair.sms', color: 'text-info' },
  { key: 'email', labelKey: 'settings.AdminAuditRepair.email', color: 'text-warning' },
  { key: 'whatsapp', labelKey: 'settings.AdminAuditRepair.whatsapp', color: 'text-success' },
] as const;

export const ADMIN_SETTINGS_NOTIFICATION_EVENTS = [
  { key: 'onJoin', labelKey: 'settings.AdminAuditRepair.newMemberJoins' },
  { key: 'onExpiry', labelKey: 'settings.AdminAuditRepair.membershipExpiryReminder' },
  { key: 'onPayment', labelKey: 'settings.AdminAuditRepair.paymentReceived' },
  { key: 'onAbsence', labelKey: 'settings.AdminAuditRepair.memberAbsenceAlert' },
] as const;

export const ADMIN_SETTINGS_GENERAL_SELECT_FIELDS = [
  { labelKey: 'settings.AdminAuditRepair.timezone', key: 'timezone', options: TIMEZONE_OPTIONS },
  { labelKey: 'settings.AdminAuditRepair.language', key: 'language', options: LANGUAGE_OPTIONS },
  { labelKey: 'settings.AdminAuditRepair.backupFrequency', key: 'backupFrequency', options: BACKUP_FREQUENCY_OPTIONS },
] as const;

export const ADMIN_SETTINGS_GENERAL_TOGGLE_FIELDS = [
  { key: 'autoBackup', labelKey: 'settings.AdminAuditRepair.automaticDailyBackup' },
  { key: 'maintenanceMode', labelKey: 'settings.AdminAuditRepair.maintenanceMode' },
] as const;
