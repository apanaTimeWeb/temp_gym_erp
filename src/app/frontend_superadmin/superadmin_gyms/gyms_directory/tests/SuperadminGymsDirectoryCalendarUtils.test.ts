import { describe, expect, it } from 'vitest';

import { getSuperadminGymsCalendarGrid } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryCalendarUtils';



describe('SuperadminGymsCalendarUtils', () => {
  it('calculates month geometry', () => {
    expect(getSuperadminGymsCalendarGrid(2026, 8)).toEqual({ year: 2026, month: 8, daysInMonth: 30, leadingEmptyDays: 2 });
  });
});
