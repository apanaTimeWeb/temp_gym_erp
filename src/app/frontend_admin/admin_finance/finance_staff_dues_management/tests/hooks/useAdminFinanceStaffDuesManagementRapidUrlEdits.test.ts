import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminFinanceStaffDuesManagementUrlState } from '@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementUrlState';
const navigation = vi.hoisted(() => ({ query: 'page=6', pushes: [] as string[], pathname: '/frontend_admin/admin_finance/finance_staff_dues_management' }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams(navigation.query), usePathname: () => navigation.pathname, useRouter: () => ({ push: (href: string) => navigation.pushes.push(href) }) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_staff_dues_management/hooks/useAdminFinanceStaffDuesManagementDebounce', () => ({ useAdminFinanceStaffDuesManagementDebounce: (s: string) => s }));
describe('staff dues URL-state writes', () => {
 beforeEach(() => {navigation.query='page=6'; navigation.pushes=[];});
 it('preserves consecutive filters and sort changes while router navigation is pending', () => {
  const {result} = renderHook(() => useAdminFinanceStaffDuesManagementUrlState());
  act(() => {result.current.setSearch('Ana');result.current.setRoleFilter('Trainer');result.current.setBranchFilter('Westside Gym');result.current.setStaffSort('salary','desc');});
  const query=new URL(navigation.pushes.at(-1)!, 'https://example.test').searchParams;
  expect(query.get('search')).toBe('Ana');expect(query.get('role')).toBe('Trainer');expect(query.get('branch')).toBe('Westside Gym');expect(query.get('staffSortKey')).toBe('salary');expect(query.get('staffSortDir')).toBe('desc');expect(query.get('page')).toBe('1');
 });
 it('suppresses duplicate outgoing writes', () => {
  const {result}=renderHook(()=>useAdminFinanceStaffDuesManagementUrlState());
  act(()=>{result.current.setSearch('Kim');result.current.setSearch('Kim');});
  expect(navigation.pushes).toHaveLength(1);
 });
 it('rejects invalid and noncanonical month values', () => {
  navigation.query='month=0000-01';const {result,rerender}=renderHook(()=>useAdminFinanceStaffDuesManagementUrlState());expect(result.current.payrollMonth).not.toBe('0000-01');
  navigation.query='month=2026-13';rerender();expect(result.current.payrollMonth).not.toBe('2026-13');
  navigation.query='month=2024-02';rerender();expect(result.current.payrollMonth).toBe('2024-02');
 });
});
