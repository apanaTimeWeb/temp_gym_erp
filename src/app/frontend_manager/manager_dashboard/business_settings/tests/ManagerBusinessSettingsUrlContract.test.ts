import { MANAGER_BUSINESS_SETTINGS_API } from '@/app/frontend_manager/manager_dashboard/business_settings/config/manager_business_settings.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_settings API URL contract', () => {
  it('matches the feature API contract for BASE', () => { expect(MANAGER_BUSINESS_SETTINGS_API.BASE).toBe("/api/v1/manager/settings"); });
});
