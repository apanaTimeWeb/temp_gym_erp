import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminNavigationLayoutUrlQuerySync } from '@/app/frontend_admin/admin_finance/finance_payouts_management/hooks/useAdminFinancePayoutsManagementUrlQuerySync';
const route = vi.hoisted(() => ({ query: 'month=2026-10&gym=gym-1&status=pending&page=4' }));
const replaced = vi.hoisted(() => vi.fn());
vi.mock('next/navigation', () => ({useRouter: () => ({ replace: replaced }), usePathname: () => '/frontend_admin/admin_finance/finance_payouts_management', useSearchParams: () => new URLSearchParams(route.query)}));
describe('RBG119 payouts URL binding', () => {
  beforeEach(() => { route.query = 'month=2026-10&gym=gym-1&status=pending&page=4'; replaced.mockReset(); });
  it('hydrates URL without replacing it, merges rapid edits, and restores missing defaults after browser navigation', () => {
    const values = {month:'all',gym:'all',status:'all',page:'1'};
    const bindings = () => (Object.keys(values) as (keyof typeof values)[]).map(key => ({key,value:values[key],defaultValue:key==='page'?'1':'all',setValue:(value:unknown)=>{values[key]=String(value)}}));
    const {rerender} = renderHook(() => useAdminNavigationLayoutUrlQuerySync(bindings()));
    expect(values).toEqual({month:'2026-10',gym:'gym-1',status:'pending',page:'4'});
    rerender(); expect(replaced).not.toHaveBeenCalled();
    act(()=>{values.month='2026-09';values.page='1';});rerender();
    act(()=>{values.status='paid';});rerender();
    const latest = new URL(replaced.mock.lastCall![0], 'https://example.test');
    expect(latest.searchParams.get('month')).toBe('2026-09');
    expect(latest.searchParams.get('status')).toBe('paid');
    expect(latest.searchParams.get('gym')).toBe('gym-1');
    act(()=>{route.query='gym=gym-2';});rerender();
    expect(values).toEqual({month:'all',gym:'gym-2',status:'all',page:'1'});
  });
});
