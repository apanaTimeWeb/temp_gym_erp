import { describe, expect, it } from 'vitest';
import { managerAllSettingsSchema } from '@/app/frontend_manager/manager_dashboard/business_settings/schemas/manager_business_settings.schemas';
import { EMPTY_MANAGER_BUSINESS_SETTINGS } from '@/app/frontend_manager/manager_dashboard/business_settings/constants/manager_business_settings_form_defaults.constants';

describe('Manager Settings aggregate schema parity', () => {
  it('accepts the canonical settings defaults', () => {
    expect(managerAllSettingsSchema.safeParse(EMPTY_MANAGER_BUSINESS_SETTINGS).success).toBe(true);
  });
});
