// RESPONSIBILITY: Guards the required eight-state mock catalog for members_directory.
import { describe, expect, it } from 'vitest';
import { MANAGERMEMBERSDIRECTORY_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_members/members_directory/mocks/scenarios/ManagerMembersDirectoryMockScenarios';

describe('ManagerMembersDirectory mock scenario catalog', () => {
  it('declares all required transport and UI states', () => {
    expect(Object.keys(MANAGERMEMBERSDIRECTORY_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
