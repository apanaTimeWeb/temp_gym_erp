import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminAnalyticsDashboardKpiViewModel } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardKpiViewModel';



vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en-IN' }));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardDateRangeSuffix', () => ({ useSuperadminAnalyticsDashboardDateRangeSuffix: () => '(Jan–Mar)' }));

describe('useSuperadminAnalyticsDashboardKpiViewModel', () => {
  it('builds five KPI cards and preserves missing currency as an en-dash', () => {
    const metrics = { mrr: 100000, arr: 1200000, cancellationRate: 1.5, activeTenants: 8, arpu: 12500, mrrDeltaPercent: 4, arrDeltaPercent: 5 } as never;
    const { result } = renderHook(() => useSuperadminAnalyticsDashboardKpiViewModel(metrics));
    expect(result.current).toHaveLength(5);
    expect(result.current[0].value).toBe('—');
    expect(result.current[2].value).toBe('1.5%');
    expect(result.current[2].deltaDirection).toBeUndefined();
    expect(result.current[3].value).toBe('8');
  });
  it('separates cancellation movement direction from whether the movement is favorable', () => {
    const risingCancellations = { mrr: 100000, arr: 1200000, cancellationRate: 1.5, cancellationDeltaPercent: 0.4, activeTenants: 8, arpu: 12500, mrrDeltaPercent: -2, arrDeltaPercent: 3, currency: 'INR' } as never;
    const { result } = renderHook(() => useSuperadminAnalyticsDashboardKpiViewModel(risingCancellations));
    expect(result.current[0].deltaDirection).toBe('down');
    expect(result.current[0].deltaTone).toBe('danger');
    expect(result.current[1].deltaDirection).toBe('up');
    expect(result.current[1].deltaTone).toBe('success');
    expect(result.current[2].deltaDirection).toBe('up');
    expect(result.current[2].deltaTone).toBe('danger');
  });
});
