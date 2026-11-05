// RESPONSIBILITY: Regression assertions for retry identity of an ambiguous dues-payment network error.
import { describe, expect, it } from 'vitest';

// The integration suite mounts module-owned confirmation, i18n, and QueryClient providers.
// These source-contract assertions protect against clearing the intent key in the catch path.
describe('staff dues idempotency retry contract', () => {
  it('stores a stable key for a repeated intent until explicit completion', async () => {
    const { getAdminIdempotencyKey, clearAdminIdempotencyKey } = await import('@/app/frontend_admin/admin_finance/finance_staff_dues_management/utils/AdminFinanceStaffDuesManagementIdempotencyIntentStore');
    const intents = new Map<string, string>();
    const intent = 'staff-due:s1:25:';
    const first = getAdminIdempotencyKey(intents, intent);
    expect(getAdminIdempotencyKey(intents, intent)).toBe(first);
    clearAdminIdempotencyKey(intents, intent);
    expect(getAdminIdempotencyKey(intents, intent)).not.toBe(first);
  });
});
