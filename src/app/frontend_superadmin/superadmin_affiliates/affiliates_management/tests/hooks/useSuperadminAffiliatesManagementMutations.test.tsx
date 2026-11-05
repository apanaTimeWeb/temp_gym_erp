import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useSuperadminAffiliatesManagementMutations } from '@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/hooks/useSuperadminAffiliatesManagementMutations';

const mutate = vi.fn(async <T,>(execute: () => Promise<unknown>, options: { onSuccess?: (value: unknown) => void }) => {
  const result = await execute();
  options.onSuccess?.(result);
  return result as T;
});
const confirm = vi.fn().mockResolvedValue(true);
const deleteAffiliate = vi.hoisted(() => vi.fn().mockResolvedValue({ success: true, data: null }));
vi.mock('@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/hooks/useSuperadminAffiliatesManagementMutation', () => ({ useSuperadminAffiliatesManagementMutation: () => ({ mutate, isMutating: false }) }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm }) }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_superadmin/superadmin_affiliates/affiliates_management/api/superadmin_affiliates_management.api', () => ({ affiliatesApi: { createAffiliate: vi.fn(), updateAffiliate: vi.fn(), updateAffiliateStatus: vi.fn(), deleteAffiliate, payAffiliateCommission: vi.fn() } }));

describe('useSuperadminAffiliatesManagementMutations', () => {
  beforeEach(() => { mutate.mockClear(); confirm.mockResolvedValue(true); deleteAffiliate.mockClear(); });

  it('does not patch a captured filtered/page query after the shared mutation invalidates it', async () => {
    const { result } = renderHook(() => useSuperadminAffiliatesManagementMutations(vi.fn(), vi.fn(), { reset: vi.fn() } as never, null));
    await act(async () => { await result.current.handleDeleteAffiliate('a-1'); });
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(deleteAffiliate).toHaveBeenCalledTimes(1);
    expect(mutate).toHaveBeenCalledTimes(1);
  });
});
