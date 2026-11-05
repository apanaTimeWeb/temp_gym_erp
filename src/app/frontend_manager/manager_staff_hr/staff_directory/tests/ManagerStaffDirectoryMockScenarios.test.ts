// Guards this autonomous leaf's complete transport and UI scenario catalog.
import { describe, expect, it } from 'vitest';
import { MANAGERSTAFFDIRECTORY_MOCK_SCENARIOS } from '@/app/frontend_manager/manager_staff_hr/staff_directory/mocks/scenarios/ManagerStaffDirectoryMockScenarios';

describe('staff_directory mock scenario catalog', () => {
  it('declares the required transport and UI states', () => {
    expect(Object.keys(MANAGERSTAFFDIRECTORY_MOCK_SCENARIOS)).toEqual(['ACTIVE', 'EMPTY', 'SERVER_500', 'TIMEOUT', 'UNAUTHORIZED', 'INVALID', 'CANCELLED', 'RETRY']);
  });
});
