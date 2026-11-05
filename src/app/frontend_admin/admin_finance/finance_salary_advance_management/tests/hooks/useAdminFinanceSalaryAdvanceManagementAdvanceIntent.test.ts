import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminFinanceSalaryAdvanceManagementAdvanceMutation } from '@/app/frontend_admin/admin_finance/finance_salary_advance_management/hooks/useAdminFinanceSalaryAdvanceManagementAdvanceMutation';

const action = vi.hoisted(() => ({ requests: [] as {payload:Record<string,unknown>; idempotencyKey:string}[], failNext: false }));
vi.mock('@/app/frontend_admin/admin_finance/finance_salary_advance_management/api/admin_finance_salary_advance_management_api', () => ({
  AdminFinanceSalaryAdvanceManagementApi: { giveAdvance: async (payload: Record<string,unknown>, idempotencyKey: string) => {
    action.requests.push({ payload, idempotencyKey });
    if (action.failNext) { action.failNext = false; throw new Error('ambiguous network failure'); }
    return { message: 'Saved' };
  } },
}));
vi.mock('@/app/frontend_admin/admin_finance/finance_salary_advance_management/hooks/useAdminFinanceSalaryAdvanceManagementConfirm', () => ({
  useAdminNavigationLayoutConfirm: () => ({ confirm: async () => true }),
}));
vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({ invalidateQueries: async () => undefined }),
  useMutation: ({ mutationFn }: { mutationFn: (args: any) => Promise<unknown> }) => ({ mutateAsync: mutationFn, isPending: false }),
}));
vi.mock('next-intl', () => ({ useTranslations: () => (key:string) => key }));

describe('finance salary advance idempotency intent identity', () => {
  it('reuses a key for the same payload retry, but never for changed payment details', async () => {
    action.requests = []; action.failNext = true;
    const { result } = renderHook(() => useAdminFinanceSalaryAdvanceManagementAdvanceMutation(vi.fn()));
    const base = { staffId: 's1', amount: 10, paymentMode: 'UPI', notes: 'first' };
    await act(async () => { await expect(result.current.giveAdvance(base)).rejects.toThrow(); });
    await act(async () => { expect(await result.current.giveAdvance(base)).toBe(true); });
    await act(async () => { expect(await result.current.giveAdvance({ ...base, paymentMode: 'Cash' })).toBe(true); });
    await act(async () => { expect(await result.current.giveAdvance({ ...base, notes: 'changed' })).toBe(true); });
    expect(action.requests).toHaveLength(4);
    expect(action.requests[0].idempotencyKey).toBe(action.requests[1].idempotencyKey);
    expect(new Set(action.requests.slice(1).map((item) => item.idempotencyKey)).size).toBe(3);
  });
});
