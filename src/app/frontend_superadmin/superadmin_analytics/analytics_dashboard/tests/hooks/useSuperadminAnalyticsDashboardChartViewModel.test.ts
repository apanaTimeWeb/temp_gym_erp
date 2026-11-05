import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminAnalyticsDashboardChartViewModel } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardChartViewModel';



vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key, useLocale: () => 'en-IN' }));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardTheme', () => ({ useSuperadminAnalyticsDashboardTheme: () => ({ theme: 'dark' }) }));

describe('useSuperadminAnalyticsDashboardChartViewModel', () => {
  it('maps each monthly record into chart categories and both series', () => {
    const monthly = [
      { month: 'Jan', mrr: 100, tenantCount: 10, cancelledCount: 2 },
      { month: 'Feb', mrr: 120, tenantCount: 12, cancelledCount: 1 },
    ] as never;
    const { result } = renderHook(() => useSuperadminAnalyticsDashboardChartViewModel(monthly, 'INR'));
    expect(result.current.mrrAreaOptions.xaxis.categories).toEqual(['Jan', 'Feb']);
    expect(result.current.mrrAreaSeries[0].data).toEqual([100, 120]);
    expect(result.current.tenantBarSeries[0].data).toEqual([10, 12]);
    expect(result.current.tenantBarSeries[1].data).toEqual([2, 1]);
    expect(result.current.mrrAreaOptions.yaxis.labels.formatter(10000)).toMatch(/₹/);
    expect(result.current.mrrAreaOptions.tooltip.y.formatter(10000)).toMatch(/₹/);
  });

  it('does not fabricate a currency label when the response omits currency', () => {
    const { result } = renderHook(() => useSuperadminAnalyticsDashboardChartViewModel([{ month: 'Jan', mrr: 10000, tenantCount: 2, cancelledCount: 1 }] as never));
    expect(result.current.mrrAreaOptions.yaxis.labels.formatter(10000)).toBe('—');
  });
});
