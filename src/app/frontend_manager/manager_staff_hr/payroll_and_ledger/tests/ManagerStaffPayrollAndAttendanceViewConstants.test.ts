import { describe, expect, it } from 'vitest';

import { resolveManagerStaffPayrollAndAttendanceView } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/utils/ManagerStaffPayrollAndAttendanceResolveView';
describe('Manager HR view URL contract', () => { it.each(['trainer-list','trainer-attendance','salary-payments','staff-ledger','give-advance','pay-due'])('accepts %s', (view) => expect(resolveManagerStaffPayrollAndAttendanceView(view)).toBe(view)); it('defaults invalid values safely', () => expect(resolveManagerStaffPayrollAndAttendanceView('invalid')).toBe('trainer-list')); });
