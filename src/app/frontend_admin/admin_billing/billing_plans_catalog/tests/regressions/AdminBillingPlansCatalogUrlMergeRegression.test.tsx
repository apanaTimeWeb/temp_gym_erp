// Regression: rapid search + tier updates merge against optimistic URL, while external history resets the base.
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminPlansLogic } from '../../hooks/useAdminBillingPlansCatalogLogic';
const pushes: string[] = []; let physical = new URLSearchParams('ref=source');
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: (url: string) => pushes.push(url) }), useSearchParams: () => physical }));
vi.mock('next-intl', () => ({ useTranslations: () => (k: string) => k }));
vi.mock('@tanstack/react-query', () => ({ useQuery: () => ({ data: { data: [], meta: { total: 0, totalPages: 1 } }, status: 'success', refetch: vi.fn() }) }));
vi.mock('../../hooks/useAdminBillingPlansCatalogMutations', () => ({ useAdminPlansMutations: () => ({ createMutation: { isPending: false }, updateMutation: { isPending: false }, deleteMutation: { isPending: false }, getIntentKey: () => 'k', clearIntentKey: () => {} }) }));
vi.mock('../../hooks/useAdminBillingPlansCatalogConfirm', () => ({ useAdminNavigationLayoutConfirm: () => ({ confirm: async () => false }) }));
vi.mock('../../state/useAdminBillingPlansCatalogStore', () => ({ useAdminPlansStore: () => ({ showModal: false, editId: null, form: {}, setShowModal: () => {}, setEditId: () => {}, setForm: () => {} }) }));
vi.mock('../../state/useAdminBillingPlansCatalogToastStore', () => ({ useAdminNavigationLayoutToastStore: () => ({ showToast: () => {} }) }));
describe('plans URL transitions', () => {
  it('merges consecutive edits and respects browser history', () => {
    physical = new URLSearchParams('ref=source'); pushes.length = 0;
    const { result, rerender } = renderHook(() => useAdminPlansLogic());
    act(() => { result.current.setSearch('Gold'); result.current.setTierFilter('Gold'); });
    expect(pushes.at(-1)).toContain('search=Gold');
    expect(pushes.at(-1)).toContain('tier=Gold');
    physical = new URLSearchParams('ref=history&search=Silver'); rerender();
    act(() => result.current.setTierFilter('Basic'));
    expect(pushes.at(-1)).toContain('ref=history');
    expect(pushes.at(-1)).toContain('search=Silver');
    expect(pushes.at(-1)).not.toContain('search=Gold');
  });
});
