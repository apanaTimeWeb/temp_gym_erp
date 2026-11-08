import { renderHook } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_staff_hr/staff_directory/hooks/useManagerStaffDirectoryStaffForm';
import { ManagerStaffDirectoryProvider } from '@/app/frontend_manager/manager_staff_hr/staff_directory/hooks/useManagerStaffDirectoryUIState';

describe('useManagerStaffPayrollAndAttendanceStaffForm co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerStaffPayrollAndAttendanceStaffForm).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const mockContext: any = {
      showModal: false,
      setShowModal: vi.fn(),
      editId: null,
      editData: null,
      saveStaff: vi.fn(),
      saving: false,
    };
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(ManagerStaffDirectoryProvider, { value: mockContext }, children);
    const { result } = renderHook(() => moduleUnderTest.useManagerStaffPayrollAndAttendanceStaffForm(), { wrapper });
    expect(result.current).toBeDefined();
  });
});
