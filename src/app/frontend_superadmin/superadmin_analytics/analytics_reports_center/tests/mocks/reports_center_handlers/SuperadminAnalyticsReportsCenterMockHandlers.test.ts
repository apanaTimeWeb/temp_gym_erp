import { describe, expect, it } from 'vitest';

import { superadminReportsHandlers } from '@/app/frontend_superadmin/superadmin_analytics/analytics_reports_center/mocks/handlers/SuperadminAnalyticsReportsCenterMockHandlers';

describe('superadminReportsHandlers', () => {
  it('declares a module-owned handler for the existing export POST contract', () => {
    const exportHandler = superadminReportsHandlers.find((handler) => handler.info.method === 'POST');
    expect(exportHandler).toBeDefined();
    expect(String(exportHandler?.info.path)).toContain('/export-data');
  });
});
