// RESPONSIBILITY: Defines regression tests for useAdminBillingUsageAnalyticsAlert.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_usage/usage_analytics/tests/hooks/useAdminBillingUsageAnalyticsAlert.test.ts)

import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminUsageAlert } from '@/app/frontend_admin/admin_billing/billing_usage_analytics/hooks/useAdminBillingUsageAnalyticsAlert';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_billing/billing_usage_analytics/api/admin_billing_usage_analytics_api', () => ({ AdminUsageApi: { fetchMyUsage: vi.fn() } }));

describe('useAdminUsageAlert', () => {
  it('derives the highest usage ratio and alert visibility from server usage data', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: { data: { smsSent: 90, smsLimit: 100, databaseGb: 1, mediaGb: 2, storageLimitGb: 10, activeMembers: 20, memberLimit: 100, staffCount: 2, staffLimit: 10 } },
      isPending: false,
      isError: false,
    } as never);

    const { result } = renderHook(() => useAdminUsageAlert());
    expect(result.current.maxRatio).toBe(0.9);
    expect(result.current.shouldShow).toBe(true);
    expect(result.current.isLimitReached).toBe(false);
  });
});
