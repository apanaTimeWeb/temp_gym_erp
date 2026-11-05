// DATA FLOW: API / URL state / module client state → useSearchParams → superadmin_analytics view components.
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminAnalyticsDashboardDateRangeSuffix } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardDateRangeSuffix';


vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));


describe('useSuperadminAnalyticsDashboardDateRangeSuffix', () => {
  it('returns an empty suffix for the default range', () => {
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams('range=this_month') as never);
    vi.mocked(useTranslations).mockReturnValue(((key: string) => key) as never);
    expect(useSuperadminAnalyticsDashboardDateRangeSuffix()).toBe('');
  });

  it('returns the translated suffix for a selected non-default range', () => {
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams('range=last_3_months') as never);
    vi.mocked(useTranslations).mockReturnValue(((key: string) => key) as never);
    expect(useSuperadminAnalyticsDashboardDateRangeSuffix()).toBe(' (ui.date_last_3_months)');
  });
});
