import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', () => ({ useLocale: () => 'en-IN' }));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardKpiViewModel', () => ({ useSuperadminAnalyticsDashboardKpiViewModel: vi.fn(() => [{ label: 'MRR', value: '₹1,50,000.00', deltaDirection: 'up', deltaTone: 'success' }]) }));
vi.mock('@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardChartViewModel', () => ({ useSuperadminAnalyticsDashboardChartViewModel: vi.fn(() => ({ mrrAreaOptions: {}, mrrAreaSeries: [{ data: [100] }], tenantBarOptions: {}, tenantBarSeries: [{ data: [1] }, { data: [0] }] })) }));

import { useSuperadminAnalyticsDashboardViewModel } from '@/app/frontend_superadmin/superadmin_analytics/analytics_dashboard/hooks/useSuperadminAnalyticsDashboardViewModel';

const metrics = { mrr: 10000, arr: 120000, cancellationRate: 1.5, ltv: 50000, cac: 2000, currency: 'INR', activeTenants: 8, arpu: 1250, mrrDeltaPercent: 4, arrDeltaPercent: -2 } as const;
const monthly = [{ month: 'Jan', mrr: 10000, tenantCount: 8, cancelledCount: 1 }];

describe('useSuperadminAnalyticsDashboardViewModel', () => {
  it('returns KPI, chart and currency-formatted secondary metrics from supplied data', () => {
    const { result } = renderHook(() => useSuperadminAnalyticsDashboardViewModel(metrics, monthly));
    expect(result.current.kpiCards).toHaveLength(1);
    expect(result.current.charts.mrrAreaSeries[0].data).toEqual([100]);
    expect(result.current.secondaryMetrics.map((metric) => metric.key)).toEqual(['ltv', 'cac']);
    expect(result.current.secondaryMetrics[0].value).toMatch(/₹/);
    expect(result.current.secondaryMetrics[1].value).toMatch(/₹/);
  });

  it('keeps secondary metrics empty when the API metrics are absent', () => {
    const { result } = renderHook(() => useSuperadminAnalyticsDashboardViewModel(null, []));
    expect(result.current.secondaryMetrics).toEqual([]);
    expect(result.current.kpiCards).toHaveLength(1);
  });
});
