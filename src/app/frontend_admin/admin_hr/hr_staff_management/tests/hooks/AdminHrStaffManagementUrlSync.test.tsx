import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAdminHrUrlState } from '@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementUrlState';

const navigation = vi.hoisted(() => ({ query: new URLSearchParams('page=4'), push: vi.fn() }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: navigation.push }), usePathname: () => '/frontend_admin/admin_hr/hr_staff_management', useSearchParams: () => navigation.query }));
vi.mock('@/app/frontend_admin/admin_hr/hr_staff_management/hooks/useAdminHrStaffManagementDebounce', () => ({ useAdminHrDebounce: (value: string) => value }));

describe('RBG128 HR staff URL pending-navigation safety', () => {
 beforeEach(() => { navigation.query = new URLSearchParams('page=4'); navigation.push.mockReset(); });
 it('merges two rapid edits instead of using the stale searchParams snapshot', () => {
  const { result } = renderHook(() => useAdminHrUrlState());
  act(() => { result.current.setRoleFilter('Trainer'); result.current.setBranchFilter('Downtown Main'); });
  const sent = new URL(navigation.push.mock.lastCall![0], 'https://test.local');
  expect(sent.searchParams.get('role')).toBe('Trainer');
  expect(sent.searchParams.get('branch')).toBe('Downtown Main');
  expect(sent.searchParams.get('page')).toBe('1');
 });
 it('keeps staff sort key and direction together after pending filters', () => {
  const { result } = renderHook(() => useAdminHrUrlState());
  act(() => { result.current.setSearch('Riya'); result.current.setStaffSort('salary', 'desc'); });
  const sent = new URL(navigation.push.mock.lastCall![0], 'https://test.local');
  expect(sent.searchParams.get('search')).toBe('Riya');
  expect(sent.searchParams.get('staffSortKey')).toBe('salary');
  expect(sent.searchParams.get('staffSortDir')).toBe('desc');
 });
 it('does not navigate when the requested state is already active', () => {
  const { result } = renderHook(() => useAdminHrUrlState());
  act(() => result.current.setCurrentPage(4));
  expect(navigation.push).not.toHaveBeenCalled();
 });
});
