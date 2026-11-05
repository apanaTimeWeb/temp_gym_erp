import { describe, expect, it } from 'vitest';
import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES } from '@/app/frontend_manager/manager_staff_hr/payroll_and_ledger/config/manager_staff_hr_payroll_and_ledger.url_config';

describe('Payroll and Staff Ledger route contract', () => { it('declares the owning autonomous leaf route', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES.PATHS.LEAF).toContain('/payroll_and_ledger'); }); });
