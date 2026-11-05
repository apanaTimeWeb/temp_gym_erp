// Regression: malformed query pages/limits must never produce impossible mock response metadata.
import { describe, expect, it } from 'vitest';
import { normalizeAdminBillingPlansCatalogMockPagination } from '../../utils/AdminBillingPlansCatalogMockPagination';
import { normalizeAdminBillingPlansCatalogUrlPage } from '../../utils/AdminBillingPlansCatalogUrlPage';
import { buildAdminPlansQueryString } from '../../utils/AdminBillingPlansCatalogUrlState';
describe('plans pagination boundaries', () => {
  it('rejects malformed pages and noninteger input', () => {
    expect(normalizeAdminBillingPlansCatalogMockPagination('Infinity', 10)).toBe(10);
    expect(normalizeAdminBillingPlansCatalogMockPagination('-1', 10)).toBe(10);
    expect(normalizeAdminBillingPlansCatalogMockPagination('2.2', 10)).toBe(10);
    expect(normalizeAdminBillingPlansCatalogUrlPage('NaN')).toBe(1);
    expect(normalizeAdminBillingPlansCatalogUrlPage('100001')).toBe(100000);
  });
  it('preserves unrelated query parameters when editing filters', () => {
    expect(buildAdminPlansQueryString(new URLSearchParams('ref=keep&page=9') as never, { search: 'Gold' })).toContain('ref=keep');
    expect(buildAdminPlansQueryString(new URLSearchParams('ref=keep&page=9') as never, { search: 'Gold' })).toContain('page=1');
  });
});
