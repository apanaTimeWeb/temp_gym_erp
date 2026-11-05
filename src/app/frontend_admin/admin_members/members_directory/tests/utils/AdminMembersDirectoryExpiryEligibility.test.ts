import { describe, expect, it } from 'vitest';
import { getAdminMembersExpiryEligibility } from '@/app/frontend_admin/admin_members/members_directory/utils/AdminMembersDirectoryExpiryEligibility';

const now = new Date('2026-02-23T10:00:00Z');
describe('Members Directory mock expiry eligibility', () => {
  it('identifies valid upcoming expirations', () => {
    expect(getAdminMembersExpiryEligibility('2026-02-25T10:00:00Z', now)).toEqual({thisWeek:true, thisMonth:true});
    expect(getAdminMembersExpiryEligibility('2026-03-02T10:00:00Z', now)).toEqual({thisWeek:true, thisMonth:false});
    expect(getAdminMembersExpiryEligibility('2026-03-15T10:00:00Z', now)).toEqual({thisWeek:false, thisMonth:false});
  });
  it.each(['2026-02-30T10:00:00Z','2025-02-29T10:00:00Z','not-a-date','2026-02-24T13:00:00+05:30','2026-13-01',''])('does not classify invalid expiry %s', (date) => {
    expect(getAdminMembersExpiryEligibility(date, now)).toEqual({thisWeek:false,thisMonth:false});
  });
  it('accepts date-only and leap-day civil dates', () => {
    expect(getAdminMembersExpiryEligibility('2026-02-24', now)).toEqual({thisWeek:true,thisMonth:true});
    expect(getAdminMembersExpiryEligibility('2024-02-29', now)).toEqual({thisWeek:false,thisMonth:false});
  });
});
