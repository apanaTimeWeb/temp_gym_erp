import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useManagerStaffPayrollAndAttendancePaymentModalState } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/hooks/useManagerStaffPayrollAndAttendancePaymentModalState';

describe('useManagerStaffPayrollAndAttendancePaymentModalState', () => {
  it('hydrates the amount from pending minor units', () => {
    const { result } = renderHook(() => useManagerStaffPayrollAndAttendancePaymentModalState({ payrollId: 'p1', staffName: 'A', pendingAmount: 125000 } as never));
    expect(result.current.amount).toBe(1250);
  });
});
