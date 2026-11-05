// RESPONSIBILITY: Verifies the canonical Gyms pagination, search, and status presentation contract.
import { describe, expect, it } from 'vitest';

import { GYMS_TABLE_PAGE_SIZE, GYMS_SEARCH_MIN_LENGTH, GYMS_STATUS_LABELS, GYMS_PLAN_COLORS, SUPERADMIN_GYM_STATUS_CODES, SUPERADMIN_GYM_STATUS_VALUES, getSuperadminGymStatusBadgeClasses } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants';



describe('SuperadminGymsConstants', () => {
  it('uses a bounded page size and positive search threshold', () => {
    expect(GYMS_TABLE_PAGE_SIZE).toBe(10);
    expect(GYMS_SEARCH_MIN_LENGTH).toBeGreaterThan(0);
  });
  it('defines labels for every supported gym status', () => {
    expect(new Set(Object.keys(GYMS_STATUS_LABELS))).toEqual(new Set(Object.values(SUPERADMIN_GYM_STATUS_CODES)));
  });
  it('keeps the local status schema vocabulary and status label registry aligned', () => {
    expect(new Set(SUPERADMIN_GYM_STATUS_VALUES)).toEqual(new Set(Object.values(SUPERADMIN_GYM_STATUS_CODES)));
    expect(SUPERADMIN_GYM_STATUS_VALUES).toContain('EXPIRED');
  });
  it('keeps BASIC as one supported plan filter and gives it a semantic color class', async () => {
    const { SUPERADMIN_GYMS_PLAN_FILTER_OPTIONS } = await import('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory_filter.constants');
    expect(SUPERADMIN_GYMS_PLAN_FILTER_OPTIONS.filter((option) => option.value === 'BASIC')).toHaveLength(1);
    expect(GYMS_PLAN_COLORS.BASIC).toContain('bg-success-bg');
  });
  it('maps canonical statuses to semantic badge tokens', () => {
    expect(getSuperadminGymStatusBadgeClasses(SUPERADMIN_GYM_STATUS_CODES.ACTIVE)).toContain('bg-success-bg');
    expect(getSuperadminGymStatusBadgeClasses(SUPERADMIN_GYM_STATUS_CODES.SUSPENDED)).toContain('bg-danger-bg');
  });
});
