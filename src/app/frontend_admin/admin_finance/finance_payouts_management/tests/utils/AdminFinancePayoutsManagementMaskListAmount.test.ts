// RESPONSIBILITY: Defines regression tests for AdminFinancePayoutsManagementMaskListAmount.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_finance/finance_payouts_management/tests/utils/AdminFinancePayoutsManagementMaskListAmount.test.ts)

import { describe, expect, it } from 'vitest';
import { maskAdminPayoutsListAmount } from '@/app/frontend_admin/admin_finance/finance_payouts_management/utils/AdminFinancePayoutsManagementMaskListAmount';

describe('maskAdminPayoutsListAmount', () => {
  it('does not expose the supplied amount in a bulk-list surface', () => {
    expect(maskAdminPayoutsListAmount()).toBe('••••');
  });
});
