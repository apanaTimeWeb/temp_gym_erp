// RESPONSIBILITY: Defines regression tests for AdminSubscriptionsManagementApi.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_subscriptions/subscriptions_overview/tests/api/AdminSubscriptionsManagementApi.test.ts)

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AdminSubscriptionsApi } from '@/app/frontend_admin/admin_billing/billing_subscriptions_overview/api/admin_billing_subscriptions_overview_api';
import { apiFetch } from '@/lib/api';

vi.mock('@/lib/api', () => ({
  apiFetch: vi.fn(),
}));

describe('AdminSubscriptionsApi mutation request contracts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(apiFetch).mockResolvedValue({ success: true, requestId: 'admin-api-test-request', message: 'ok', data: null });
  });

  it('sends set-default-payment-method as the documented object payload with the intent key', async () => {
    await AdminSubscriptionsApi.setDefaultPaymentMethod('pm-002', 'intent-123');

    expect(apiFetch).toHaveBeenCalledWith(
      '/admin/subscriptions/setDefaultPaymentMethod',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ id: 'pm-002' }),
        headers: { 'Idempotency-Key': 'intent-123' },
      }),
    );
  });

  it('sends upgrade-plan with the documented planId payload and intent key', async () => {
    await AdminSubscriptionsApi.upgradePlan('plan-pro', 'intent-456');

    expect(apiFetch).toHaveBeenCalledWith(
      '/admin/subscriptions/upgradePlan',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ planId: 'plan-pro' }),
        headers: { 'Idempotency-Key': 'intent-456' },
      }),
    );
  });
});
