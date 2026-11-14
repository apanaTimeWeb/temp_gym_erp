// RESPONSIBILITY: Defines runtime validation schemas for settings_management; it does not determine server-owned business rules without a verified contract.
// DATA FLOW: API/form boundary → Zod schema → validated typed data or field-level errors → owning hook/view (admin_settings/settings_management/schemas/AdminSettingsManagementSchemas.ts)

import { z } from 'zod';
import { isSafeAdminSettingsAppStoreUrl } from '@/app/frontend_admin/admin_settings/settings_management/utils/AdminSettingsManagementSafeAppStoreUrl';
import { BACKUP_FREQUENCY_OPTIONS, GST_STATE_CODES, LANGUAGE_OPTIONS, TAX_RATE_OPTIONS, TIMEZONE_OPTIONS, ADMIN_SETTINGS_DATE_FORMAT_OPTIONS } from '@/app/frontend_admin/admin_settings/settings_management/constants/AdminSettingsManagementConstants';

const isAllowed = (value: string, allowed: readonly { value: string }[]) => allowed.some((option) => option.value === value);

export const GymProfileSchema = z.object({
  gymName: z.string().min(2, '__i18n:settings.validation.gymNameMin'),
  ownerName: z.string().min(2, '__i18n:settings.validation.ownerNameMin'),
  phone: z.string().regex(/^\d{10}$/, '__i18n:settings.validation.phoneInvalid'),
  email: z.string().email('__i18n:settings.validation.emailInvalid'),
  city: z.string().min(2, '__i18n:settings.validation.cityMin'),
  gstNumber: z.string().length(15, '__i18n:settings.validation.gstNumberLength').optional().or(z.literal('')),
});

export const NotificationsSettingsSchema = z.object({
  sms: z.boolean().optional(),
  email: z.boolean().optional(),
  whatsapp: z.boolean().optional(),
  smsonJoin: z.boolean(),
  emailonJoin: z.boolean(),
  whatsapponJoin: z.boolean(),
  smsonExpiry: z.boolean(),
  emailonExpiry: z.boolean(),
  whatsapponExpiry: z.boolean(),
  smsonPayment: z.boolean(),
  emailonPayment: z.boolean(),
  whatsapponPayment: z.boolean(),
  smsonAbsence: z.boolean(),
  emailonAbsence: z.boolean(),
  whatsapponAbsence: z.boolean(),
  expiryReminderDays: z.number().min(1, '__i18n:settings.validation.expiryReminderMin').max(30, '__i18n:settings.validation.expiryReminderMax'),
  absenceThresholdDays: z.number().min(1, '__i18n:settings.validation.absenceThresholdMin').max(30, '__i18n:settings.validation.absenceThresholdMax'),
});

export const AppIntegrationSettingsSchema = z.object({
  memberAppEnabled: z.boolean(),
  qrCheckInEnabled: z.boolean(),
  onlinePaymentsEnabled: z.boolean(),
  dietPlanEnabled: z.boolean(),
  workoutPlanEnabled: z.boolean(),
  progressTrackingEnabled: z.boolean(),
  pushNotificationsEnabled: z.boolean(),
  appStoreLink: z.string().refine(isSafeAdminSettingsAppStoreUrl, '__i18n:settings.validation.urlInvalid').optional().or(z.literal('')),
  playStoreLink: z.string().refine(isSafeAdminSettingsAppStoreUrl, '__i18n:settings.validation.urlInvalid').optional().or(z.literal('')),
  apiKey: z.string().optional(),
  webhookUrl: z.string().url({ message: '__i18n:settings.validation.urlInvalid' }).optional().or(z.literal('')),
});

export const GstTaxSettingsSchema = z.object({
  gstNumber: z.string().length(15, '__i18n:settings.validation.gstNumberLength').optional().or(z.literal('')),
  businessLegalName: z.string().optional().or(z.literal('')),
  taxRate: z.string().refine((value) => isAllowed(value, TAX_RATE_OPTIONS), '__i18n:settings.validation.taxRateUnsupported'),
  stateCode: z.string().refine((value) => isAllowed(value, GST_STATE_CODES), '__i18n:settings.validation.stateCodeUnsupported'),
  hsnCode: z.string().optional().or(z.literal('')),
  showGstOnInvoice: z.boolean(),
  taxInclusivePricing: z.boolean(),
});

export const PaymentGatewaySettingsSchema = z.object({
  razorpayEnabled: z.boolean(),
  razorpayKeyId: z.string().optional().or(z.literal('')),
  razorpayWebhookSecret: z.string().optional().or(z.literal('')),
  upiEnabled: z.boolean(),
  upiId: z.string().optional().or(z.literal('')),
  cashEnabled: z.boolean(),
  autoReceiptEnabled: z.boolean(),
  receiptPrefix: z.string().max(6, '__i18n:settings.validation.receiptPrefixMax').optional().or(z.literal('')),
});

export const GeneralSettingsSchema = z.object({
  timezone: z.string().refine((value) => isAllowed(value, TIMEZONE_OPTIONS), '__i18n:settings.validation.timezoneUnsupported'),
  language: z.string().refine((value) => isAllowed(value, LANGUAGE_OPTIONS), '__i18n:settings.validation.languageUnsupported'),
  dateFormat: z.string().refine((value) => isAllowed(value, ADMIN_SETTINGS_DATE_FORMAT_OPTIONS), '__i18n:settings.validation.dateFormatUnsupported'),
  sessionTimeoutMinutes: z.number().min(15, '__i18n:settings.validation.sessionTimeoutMin').max(480, '__i18n:settings.validation.sessionTimeoutMax'),
  dataRetentionMonths: z.number().min(6, '__i18n:settings.validation.dataRetentionMin').max(120, '__i18n:settings.validation.dataRetentionMax'),
  autoBackup: z.boolean(),
  backupFrequency: z.string().refine((value) => isAllowed(value, BACKUP_FREQUENCY_OPTIONS), '__i18n:settings.validation.backupFrequencyUnsupported'),
  maintenanceMode: z.boolean(),
  twoFactorAuth: z.boolean(),
});

// 2FA status belongs to its dedicated security lifecycle, not the generic settings form.
export const GeneralSettingsFormSchema = GeneralSettingsSchema.omit({ twoFactorAuth: true });

export const AdminSettingsResponseSchema = z.object({
  success: z.boolean().default(true),
  message: z.string().default(''),
  data: z.object({
    profile: GymProfileSchema.optional().default({ gymName: '', ownerName: '', phone: '', email: '', city: '', gstNumber: '' }),
    notifications: NotificationsSettingsSchema.optional().default({
      sms: false, email: false, whatsapp: false,
      smsonJoin: false, emailonJoin: false, whatsapponJoin: false,
      smsonExpiry: false, emailonExpiry: false, whatsapponExpiry: false,
      smsonPayment: false, emailonPayment: false, whatsapponPayment: false,
      smsonAbsence: false, emailonAbsence: false, whatsapponAbsence: false,
      expiryReminderDays: 7, absenceThresholdDays: 3
    }),
    integration: AppIntegrationSettingsSchema.optional().default({
      memberAppEnabled: false, qrCheckInEnabled: false, onlinePaymentsEnabled: false,
      dietPlanEnabled: false, workoutPlanEnabled: false, progressTrackingEnabled: false,
      pushNotificationsEnabled: false, appStoreLink: '', playStoreLink: '', apiKey: '', webhookUrl: ''
    }),
    gst: GstTaxSettingsSchema.optional().default({
      gstNumber: '', businessLegalName: '', taxRate: '18', stateCode: '27', hsnCode: '', showGstOnInvoice: true, taxInclusivePricing: false
    }),
    payment: PaymentGatewaySettingsSchema.optional().default({
      razorpayEnabled: false, razorpayKeyId: '', razorpayWebhookSecret: '', upiEnabled: false, upiId: '', cashEnabled: true, autoReceiptEnabled: true, receiptPrefix: ''
    }),
    general: GeneralSettingsSchema.optional().default({
      timezone: 'Asia/Kolkata', language: 'en', dateFormat: 'DD/MM/YYYY', sessionTimeoutMinutes: 60, dataRetentionMonths: 24, autoBackup: false, backupFrequency: 'daily', maintenanceMode: false, twoFactorAuth: false
    }),
  }),
});

export const AdminSettingsRolePermissionSchema = z.object({
  role: z.enum(['manager', 'trainer', 'receptionist']),
  permissions: z.record(z.string(), z.boolean()),
});

export const AdminSettingsRolePermissionReferenceSchema = z.object({
  roleDefaults: z.array(AdminSettingsRolePermissionSchema),
  gymOverrides: z.array(z.object({
    gymId: z.string(),
    gymName: z.string(),
    role: z.enum(['manager', 'trainer', 'receptionist']),
    overrides: z.record(z.string(), z.boolean()),
  })),
});

export const AdminSettingsUpdateSchema = z.object({
  profile: GymProfileSchema.partial().optional(),
  notifications: NotificationsSettingsSchema.partial().optional(),
  integration: AppIntegrationSettingsSchema.partial().optional(),
  gst: GstTaxSettingsSchema.partial().optional(),
  payment: PaymentGatewaySettingsSchema.partial().optional(),
  general: GeneralSettingsFormSchema.partial().strict().optional(),
}).strict().refine((value) => Object.keys(value).length > 0, {
  message: 'At least one settings section is required',
});
