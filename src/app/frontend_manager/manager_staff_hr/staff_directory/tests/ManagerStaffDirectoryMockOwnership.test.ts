import { describe, expect, it } from 'vitest';
import { managerHrHandlers, resetManagerStaffDirectoryMockState } from '@/app/frontend_manager/manager_staff_hr/staff_directory/mocks/handlers/ManagerStaffDirectoryMockHandlers';

describe('staff_directory mock ownership', () => {
  it('exports a route-local handler collection and explicit state reset', () => {
    expect(Array.isArray(managerHrHandlers)).toBe(true);
    expect(typeof resetManagerStaffDirectoryMockState).toBe('function');
  });
});
