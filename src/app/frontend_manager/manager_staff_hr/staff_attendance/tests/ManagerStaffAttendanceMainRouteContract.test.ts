import { describe, expect, it } from 'vitest';
import { MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES } from '@/app/frontend_manager/manager_staff_hr/staff_attendance/config/manager_staff_hr_staff_attendance.url_config';

describe('Staff Attendance route contract', () => { it('declares the owning autonomous leaf route', () => { expect(MANAGER_STAFF_PAYROLL_AND_ATTENDANCE_ROUTES.PATHS.LEAF).toContain('/staff_attendance'); }); });
