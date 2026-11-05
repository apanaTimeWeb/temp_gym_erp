"use client";
// RESPONSIBILITY: Defines regression tests for useAdminDashboardOverviewDateRangeSuffix.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_dashboard/dashboard_overview/tests/hooks/useAdminDashboardOverviewDateRangeSuffix.test.ts)

import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminDashboardDateRangeSuffix } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/hooks/useAdminDashboardOverviewDateRangeSuffix';

vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams('range=last_3_months') }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

describe('useAdminDashboardDateRangeSuffix', () => {
  it('renders the localized suffix for the URL range state', () => {
    const { result } = renderHook(() => useAdminDashboardDateRangeSuffix());
    expect(result.current).toBe(' — last3Months');
  });
});
