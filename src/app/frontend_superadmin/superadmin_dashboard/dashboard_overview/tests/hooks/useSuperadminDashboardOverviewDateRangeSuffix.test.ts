vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => ({ 'ui.date_last_3_months': 'Last 3 Months', 'ui.from_ad82f63': 'from', 'ui.to_ad82f63': 'to' }[key] ?? key), useLocale: () => 'en-IN' }));
import { renderHook } from '@testing-library/react';
import { useSearchParams } from 'next/navigation';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useSuperadminDashboardOverviewDateRangeSuffix } from '@/app/frontend_superadmin/superadmin_dashboard/dashboard_overview/hooks/useSuperadminDashboardOverviewDateRangeSuffix';


vi.mock('next/navigation', () => ({ useSearchParams: vi.fn() }));

describe('useSuperadminDashboardOverviewDateRangeSuffix', () => {
  beforeEach(() => vi.clearAllMocks());
  it('formats a preset range and preserves custom date boundaries', () => {
    vi.mocked(useSearchParams).mockReturnValue({ get: (key: string) => ({ 'ui.date_last_3_months': 'Last 3 Months', 'ui.from_ad82f63': 'from', 'ui.to_ad82f63': 'to' }[key] ?? key) === 'range' ? 'last_3_months' : null } as ReturnType<typeof useSearchParams>);
    const { result: preset } = renderHook(() => useSuperadminDashboardOverviewDateRangeSuffix());
    expect(preset.current).toBe(' LAST 3 MONTHS');

    vi.mocked(useSearchParams).mockReturnValue({ get: (key: string) => ({ range: 'custom', startDate: '2026-10-01', endDate: '2026-10-05' } as Record<string, string | null>)[key] ?? null } as ReturnType<typeof useSearchParams>);
    const { result: custom } = renderHook(() => useSuperadminDashboardOverviewDateRangeSuffix(false));
    expect(custom.current).toBe(' from 01 Oct 2026 to 05 Oct 2026');
  });
});
