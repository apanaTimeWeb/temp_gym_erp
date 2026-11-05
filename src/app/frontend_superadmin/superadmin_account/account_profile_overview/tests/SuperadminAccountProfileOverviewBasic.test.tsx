// RESPONSIBILITY: Renders the SuperadminAccountProfileBasic.test UI for the profile feature. Business/data orchestration is delegated to module-owned hooks.
import { beforeEach, describe, expect, it } from 'vitest';

import { MOCK_SUPERADMIN_ACCOUNT_PROFILE } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/mocks/fixtures/SuperadminAccountProfileOverviewMockFixtures';
import { resetSuperadminAccountProfileMockState } from '@/app/frontend_superadmin/superadmin_account/account_profile_overview/mocks/handlers/SuperadminAccountProfileOverviewMockHandlers';



beforeEach(() => resetSuperadminAccountProfileMockState());

describe('Superadmin Profile fixture behavior', () => {
  it('contains the identity, role, timezone, and security fields required by profile tabs', () => {
    expect(MOCK_SUPERADMIN_ACCOUNT_PROFILE).toMatchObject({ id: 'sa_123', role: 'SUPERADMIN', timezone: 'Asia/Kolkata', language: 'en', twoFactorEnabled: false });
    expect(MOCK_SUPERADMIN_ACCOUNT_PROFILE.email).toContain('@');
    expect(MOCK_SUPERADMIN_ACCOUNT_PROFILE.createdAt).toBeTruthy();
  });
});
