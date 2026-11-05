// RESPONSIBILITY: Defines regression tests for AdminDashboardOverviewFormatCurrency.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_dashboard/dashboard_overview/tests/utils/AdminDashboardOverviewFormatCurrency.test.ts)

import { describe, expect, it } from 'vitest';
import { AdminDashboardFormatCurrency } from '@/app/frontend_admin/admin_dashboard/dashboard_overview/utils/AdminDashboardOverviewFormatCurrency';

describe('AdminDashboardFormatCurrency', () => {
  it('uses the API-provided currency and correct ISO minor-unit precision', () => {
    expect(AdminDashboardFormatCurrency(123456, 'USD', 'en-US')).toContain('$1,234.56');
    expect(AdminDashboardFormatCurrency(123456, 'JPY', 'ja-JP')).toContain('￥123,456');
  });
});
