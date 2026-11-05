import { describe, expect, it } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_finance_expenses/finance_payments_and_summary/hooks/useManagerFinancePaymentsAndSummaryMutations';

describe("useManagerFinancePaymentsAndSummaryMutations co-located hook contract", () => {
  it("exports the expected callable hook", () => {
    expect(typeof moduleUnderTest.useManagerFinancePaymentsAndSummaryMutations).toBe("function");
  });
});
