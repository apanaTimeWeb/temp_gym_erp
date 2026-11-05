import { describe, expect, it } from 'vitest';
import { getAdminHrStaffJoinDateIso } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementJoinDate';
import { AdminHrToMinorUnits } from '@/app/frontend_admin/admin_hr/hr_staff_management/utils/AdminHrStaffManagementCurrencyUnits';

describe('HR joining-date and money boundaries', () => {
  it.each([['2026-02-28','2026-02-28T00:00:00.000Z'],['2024-02-29','2024-02-29T00:00:00.000Z'],['2026-01-01T10:30:00+05:30','2026-01-01T05:00:00.000Z']])('preserves valid date %s', (input, expected) => {
    expect(getAdminHrStaffJoinDateIso(input)).toBe(expected);
  });
  it.each(['2026-02-30','2025-02-29','2026-13-01','2026-00-01','Jan 2, 2026','2026-01-01T00:00:00','not-a-date',''])('rejects invalid date %s', (value) => {
    expect(() => getAdminHrStaffJoinDateIso(value)).toThrow(RangeError);
  });
  it('rejects invalid Date instances and preserves valid ones', () => {
    expect(() => getAdminHrStaffJoinDateIso(new Date(NaN))).toThrow(RangeError);
    expect(getAdminHrStaffJoinDateIso(new Date('2026-01-02T00:00:00Z'))).toBe('2026-01-02T00:00:00.000Z');
  });
  it.each([0,1,1.01,12.55])('preserves exact paise for %s', (amount) => {
    expect(AdminHrToMinorUnits(amount)).toBe(Math.round(amount*100));
  });
  it.each([-1, 0.001, 1.234, Infinity, NaN])('rejects unsupported money input %s', (amount) => {
    expect(() => AdminHrToMinorUnits(amount)).toThrow(RangeError);
  });
});
