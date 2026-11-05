// RESPONSIBILITY: Defines all TypeScript types for the Settings module. Derived from Zod schemas — no inline interfaces.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_settings/settings_management/types/AdminSettingsManagementTypes.ts)

import { type z } from 'zod';
import type { GymProfileSchema, NotificationsSettingsSchema, AppIntegrationSettingsSchema, GstTaxSettingsSchema, PaymentGatewaySettingsSchema, GeneralSettingsSchema, GeneralSettingsFormSchema, AdminSettingsResponseSchema } from '@/app/frontend_admin/admin_settings/settings_management/schemas/AdminSettingsManagementSchemas';

export type GymProfileType = z.infer<typeof GymProfileSchema>;
export type NotificationsSettingsType = z.infer<typeof NotificationsSettingsSchema>;
export type AppIntegrationSettingsType = z.infer<typeof AppIntegrationSettingsSchema>;
export type GstTaxSettingsType = z.infer<typeof GstTaxSettingsSchema>;
export type PaymentGatewaySettingsType = z.infer<typeof PaymentGatewaySettingsSchema>;
export type GeneralSettingsType = z.infer<typeof GeneralSettingsSchema>;
export type GeneralSettingsFormType = z.infer<typeof GeneralSettingsFormSchema>;
export type AdminSettingsResponse = z.infer<typeof AdminSettingsResponseSchema>;

export type AdminSettingsUpdatePayload =
  | { general: GeneralSettingsFormType }
  | { gst: GstTaxSettingsType }
  | { profile: GymProfileType }
  | { notifications: NotificationsSettingsType }
  | { payment: PaymentGatewaySettingsType }
  | { integration: AppIntegrationSettingsType };
