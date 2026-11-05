// RESPONSIBILITY: Defines regression tests for AdminSettingsManagementSchemas.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_settings/settings_management/tests/schemas/AdminSettingsManagementSchemas.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminSettingsUpdateSchema, GstTaxSettingsSchema, GeneralSettingsSchema, GeneralSettingsFormSchema } from '@/app/frontend_admin/admin_settings/settings_management/schemas/AdminSettingsManagementSchemas';

describe('AdminSettings fixed-option schemas', () => {
  it('accepts configured GST rate and state options', () => {
    expect(GstTaxSettingsSchema.safeParse({ gstNumber: '', businessLegalName: '', taxRate: '18', stateCode: '27', hsnCode: '', showGstOnInvoice: true, taxInclusivePricing: false }).success).toBe(true);
  });

  it('rejects GST rates and state codes absent from the UI option catalog', () => {
    const valid = { gstNumber: '', businessLegalName: '', taxRate: '18', stateCode: '27', hsnCode: '', showGstOnInvoice: true, taxInclusivePricing: false };
    expect(GstTaxSettingsSchema.safeParse({ ...valid, taxRate: '17' }).success).toBe(false);
    expect(GstTaxSettingsSchema.safeParse({ ...valid, stateCode: '99' }).success).toBe(false);
  });

  it('accepts the supported General settings values', () => {
    expect(GeneralSettingsSchema.safeParse({ timezone: 'Asia/Kolkata', language: 'en', dateFormat: 'DD/MM/YYYY', sessionTimeoutMinutes: 60, dataRetentionMonths: 24, autoBackup: true, backupFrequency: 'daily', maintenanceMode: false, twoFactorAuth: false }).success).toBe(true);
  });


  it('keeps 2FA status out of the generic editable form and update contract', () => {
    const withTwoFactor = { timezone: 'Asia/Kolkata', language: 'en', dateFormat: 'DD/MM/YYYY', sessionTimeoutMinutes: 60, dataRetentionMonths: 24, autoBackup: true, backupFrequency: 'daily', maintenanceMode: false, twoFactorAuth: true };
    expect(GeneralSettingsFormSchema.parse(withTwoFactor)).not.toHaveProperty('twoFactorAuth');
    expect(AdminSettingsUpdateSchema.safeParse({ general: withTwoFactor }).success).toBe(false);
  });

  it('rejects unsupported timezone, language, date format, and backup frequency', () => {
    const valid = { timezone: 'Asia/Kolkata', language: 'en', dateFormat: 'DD/MM/YYYY', sessionTimeoutMinutes: 60, dataRetentionMonths: 24, autoBackup: true, backupFrequency: 'daily', maintenanceMode: false, twoFactorAuth: false };
    for (const patch of [{ timezone: 'Mars/Olympus' }, { language: 'fr' }, { dateFormat: 'YYYY-DD-MM' }, { backupFrequency: 'hourly' }]) {
      expect(GeneralSettingsSchema.safeParse({ ...valid, ...patch }).success).toBe(false);
    }
  });
});
