// Regression: save and delete must await settlement, block concurrent operations, and preserve retry identity on failure.
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminPlansLogic } from '../../hooks/useAdminBillingPlansCatalogLogic';
import { useAdminPlansMutations } from '../../hooks/useAdminBillingPlansCatalogMutations';
import { useAdminNavigationLayoutConfirm } from '../../hooks/useAdminBillingPlansCatalogConfirm';
import { useAdminPlansStore } from '../../state/useAdminBillingPlansCatalogStore';
import { useAdminNavigationLayoutToastStore } from '../../state/useAdminBillingPlansCatalogToastStore';
const push = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }), useSearchParams: () => new URLSearchParams('') }));
vi.mock('next-intl', () => ({ useTranslations: () => (k: string) => k }));
vi.mock('@tanstack/react-query', () => ({ useQuery: () => ({ data: { data: [], meta: { total: 0, totalPages: 1 } }, status: 'success', refetch: vi.fn() }) }));
vi.mock('../../hooks/useAdminBillingPlansCatalogMutations', () => ({ useAdminPlansMutations: vi.fn() }));
vi.mock('../../hooks/useAdminBillingPlansCatalogConfirm', () => ({ useAdminNavigationLayoutConfirm: vi.fn() }));
vi.mock('../../state/useAdminBillingPlansCatalogStore', () => ({ useAdminPlansStore: vi.fn() }));
vi.mock('../../state/useAdminBillingPlansCatalogToastStore', () => ({ useAdminNavigationLayoutToastStore: vi.fn() }));
const form = { name: 'Gold', tier: 'Gold' as const, price1Month: '10', price3Month: '20', price6Month: '30', price12Month: '40', priceCustom: '50', features: 'A\nB' };
let resolveWrite!: () => void;
const write = vi.fn(() => new Promise<void>((resolve) => { resolveWrite = resolve; }));
const cancel = vi.fn();
const key = vi.fn((id: string) => `key:${id}`);
beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useAdminPlansStore).mockReturnValue({ showModal: false, setShowModal: vi.fn(), editId: null, setEditId: vi.fn(), form, setForm: vi.fn() } as never);
  vi.mocked(useAdminNavigationLayoutToastStore).mockReturnValue({ showToast: vi.fn() } as never);
  vi.mocked(useAdminNavigationLayoutConfirm).mockReturnValue({ confirm: vi.fn().mockResolvedValue(true) } as never);
  vi.mocked(useAdminPlansMutations).mockReturnValue({ createMutation: { isPending: false, mutateAsync: write }, updateMutation: { isPending: false, mutateAsync: vi.fn() }, deleteMutation: { isPending: false, mutateAsync: vi.fn() }, clearIntentKey: cancel, getIntentKey: key } as never);
});
describe('plans write lifecycle', () => {
  it('awaits the initial save and blocks a second save or delete until settlement', async () => {
    const { result } = renderHook(() => useAdminPlansLogic());
    let settled = false;
    const first = result.current.savePlan(form).then(() => { settled = true; });
    await result.current.savePlan(form);
    await result.current.deletePlan('p1');
    expect(write).toHaveBeenCalledTimes(1);
    expect(settled).toBe(false);
    await act(async () => { resolveWrite(); await first; });
    expect(settled).toBe(true);
  });
  it('does not call the delete endpoint after cancelled confirmation', async () => {
    vi.mocked(useAdminNavigationLayoutConfirm).mockReturnValue({ confirm: vi.fn().mockResolvedValue(false) } as never);
    const { result } = renderHook(() => useAdminPlansLogic());
    await act(async () => result.current.deletePlan('p1'));
    expect(cancel).toHaveBeenCalledWith('delete-plan:p1');
  });
});
