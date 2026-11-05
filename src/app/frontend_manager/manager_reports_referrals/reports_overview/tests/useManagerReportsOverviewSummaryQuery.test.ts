import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_reports_referrals/reports_overview/hooks/useManagerReportsOverviewSummaryQuery';

describe("useManagerReportsOverviewSummaryQuery co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerReportsOverviewSummaryQuery).toBe("function");
  });
});
