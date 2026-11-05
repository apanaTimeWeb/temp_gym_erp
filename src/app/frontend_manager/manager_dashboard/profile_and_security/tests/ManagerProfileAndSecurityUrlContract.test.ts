import { MANAGER_PROFILE_AND_SECURITY_API } from '@/app/frontend_manager/manager_dashboard/profile_and_security/config/manager_profile_and_security.url_config';
import { describe, expect, it } from 'vitest';



describe('manager_profile API URL contract', () => {
  it('matches the feature API contract for BASE', () => { expect(MANAGER_PROFILE_AND_SECURITY_API.BASE).toBe("/api/v1/manager/profile"); });
  it('matches the feature API contract for PASSWORD', () => { expect(MANAGER_PROFILE_AND_SECURITY_API.PASSWORD).toBe("/api/v1/manager/profile/password"); });
});
