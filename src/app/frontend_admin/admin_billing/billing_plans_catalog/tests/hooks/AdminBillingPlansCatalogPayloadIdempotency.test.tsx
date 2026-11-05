// RESPONSIBILITY: Verifies Plans Catalog retries retain keys but changed normalized plan payloads do not.
// DATA FLOW: useAdminPlansMutations → module-local idempotency map → request identity.
import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminPlansMutations } from '@/app/frontend_admin/admin_billing/billing_plans_catalog/hooks/useAdminBillingPlansCatalogMutations';

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
  useMutation: () => ({ mutate: vi.fn(), isPending: false }),
}));
vi.mock('@/app/frontend_admin/admin_billing/billing_plans_catalog/state/useAdminBillingPlansCatalogStore', () => ({
  useAdminPlansStore: () => ({ setShowModal: vi.fn() }),
}));
vi.mock('@/app/frontend_admin/admin_billing/billing_plans_catalog/state/useAdminBillingPlansCatalogToastStore', () => ({
  useAdminNavigationLayoutToastStore: () => ({ showToast: vi.fn() }),
}));

describe('Plans Catalog write idempotency', () => {
  it('keeps the key for a same-payload retry but rotates it when price changes', () => {
    const { result } = renderHook(() => useAdminPlansMutations());
    const intent = 'create-plan';
    const first = result.current.getIntentKey(intent, JSON.stringify({ price1Month: 115 }));
    expect(result.current.getIntentKey(intent, JSON.stringify({ price1Month: 115 }))).toBe(first);
    const changed = result.current.getIntentKey(intent, JSON.stringify({ price1Month: 255 }));
    expect(changed).not.toBe(first);
    expect(result.current.getIntentKey(intent, JSON.stringify({ price1Month: 255 }))).toBe(changed);
    act(() => result.current.clearIntentKey(intent));
    expect(result.current.getIntentKey(intent, JSON.stringify({ price1Month: 255 }))).not.toBe(changed);
  });
  it('isolates update intents by plan ID and payload', () => {
    const { result } = renderHook(() => useAdminPlansMutations());
    const a = result.current.getIntentKey('update-plan:a', JSON.stringify({ name: 'A' }));
    const b = result.current.getIntentKey('update-plan:b', JSON.stringify({ name: 'A' }));
    expect(a).not.toBe(b);
  });
});
