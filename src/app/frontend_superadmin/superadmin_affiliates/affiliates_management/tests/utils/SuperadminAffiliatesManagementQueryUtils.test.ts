import { describe, expect, it } from 'vitest';

import { buildSuperadminAffiliatesQueryParams, normalizeSuperadminAffiliatesUrlState } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/utils/SuperadminAffiliatesManagementQueryUtils';



describe('buildSuperadminAffiliatesQueryParams', () => {
  it('includes pagination and active filters explicitly', () => {
    expect(buildSuperadminAffiliatesQueryParams({ searchQuery: 'fit', statusFilter: 'ACTIVE' as never, startDate: '2026-10-01', endDate: '2026-10-02', currentPage: 2, pageLimit: 25 })).toEqual({ page: '2', limit: '25', search: 'fit', status: 'ACTIVE', startDate: '2026-10-01', endDate: '2026-10-02' });
  });

  it('omits the canonical ALL status filter', () => {
    expect(buildSuperadminAffiliatesQueryParams({ searchQuery: '', statusFilter: 'ALL' as never, startDate: '', endDate: '', currentPage: 1, pageLimit: 20 })).toEqual({ page: '1', limit: '20' });
  });
});


describe('normalizeSuperadminAffiliatesUrlState', () => {
  it('falls back safely for unknown status and invalid pagination values', () => {
    expect(normalizeSuperadminAffiliatesUrlState({ status: 'ADMIN', page: '-2', limit: 'NaN', startDate: '', endDate: '' })).toEqual({
      statusFilter: 'ALL', currentPage: 1, pageLimit: 10, startDate: '', endDate: '',
    });
  });

  it('keeps valid calendar dates and removes malformed or inverted date ranges', () => {
    expect(normalizeSuperadminAffiliatesUrlState({ status: 'ACTIVE', page: '3', limit: '25', startDate: '2026-10-02', endDate: '2026-10-01' })).toEqual({
      statusFilter: 'ACTIVE', currentPage: 3, pageLimit: 25, startDate: '2026-10-02', endDate: '',
    });
    expect(normalizeSuperadminAffiliatesUrlState({ status: 'INACTIVE', page: '0', limit: '10', startDate: '2026-02-30', endDate: 'not-a-date' })).toEqual({
      statusFilter: 'INACTIVE', currentPage: 1, pageLimit: 10, startDate: '', endDate: '',
    });
  });
});
