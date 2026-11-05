// RESPONSIBILITY: Regression coverage for pending Finance staff-ledger URL writes and browser-history authority.
// DATA FLOW: navigation hook + fake router → outbound URLs → assertion of merged changes.
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminFinanceStaffLedgerManagementUrlState } from '@/app/frontend_admin/admin_finance/finance_staff_ledger_management/hooks/useAdminFinanceStaffLedgerManagementUrlState';
const navigation = vi.hoisted(() => ({ query: 'page=9', pushes: [] as string[], pathname: '/frontend_admin/admin_finance/finance_staff_ledger_management' }));
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams(navigation.query), usePathname: () => navigation.pathname, useRouter: () => ({ push: (href: string) => navigation.pushes.push(href) }) }));
vi.mock('@/app/frontend_admin/admin_finance/finance_staff_ledger_management/hooks/useAdminFinanceStaffLedgerManagementDebounce', () => ({ useAdminFinanceStaffLedgerManagementDebounce: (s: string) => s }));
describe('Finance staff-ledger URL state', () => {
 beforeEach(() => { navigation.query='page=9'; navigation.pushes=[]; });
 it('preserves multiple rapid filter and sort writes while navigation is pending', () => {
  const {result}=renderHook(()=>useAdminFinanceStaffLedgerManagementUrlState());
  act(()=>{result.current.setSearch('Riya');result.current.setRoleFilter('Trainer');result.current.setBranchFilter('Westside Gym');result.current.setStaffSort('salary','desc');result.current.setPayrollSort('amount','asc');});
  const url=new URL(navigation.pushes.at(-1)!,'https://example.test');
  expect(Object.fromEntries(url.searchParams)).toMatchObject({search:'Riya',role:'Trainer',branch:'Westside Gym',staffSortKey:'salary',staffSortDir:'desc',payrollSortKey:'amount',payrollSortDir:'asc',page:'1'});
 });
 it('does not push duplicate writes', () => {
  const {result}=renderHook(()=>useAdminFinanceStaffLedgerManagementUrlState());
  act(()=>{result.current.setSearch('Riya');result.current.setSearch('Riya');});
  expect(navigation.pushes).toHaveLength(1);
 });
 it('treats external navigation as authoritative and rejects invalid months', () => {
  const {result,rerender}=renderHook(()=>useAdminFinanceStaffLedgerManagementUrlState());
  act(()=>result.current.setSearch('Riya'));
  navigation.query='page=3&branch=Downtown';rerender();
  act(()=>result.current.setRoleFilter('Manager'));
  const url=new URL(navigation.pushes.at(-1)!,'https://example.test');
  expect(url.searchParams.get('branch')).toBe('Downtown');expect(url.searchParams.has('search')).toBe(false);
  navigation.query='month=0000-01';rerender();expect(result.current.payrollMonth).not.toBe('0000-01');
  navigation.query='month=2024-02';rerender();expect(result.current.payrollMonth).toBe('2024-02');
 });
});
