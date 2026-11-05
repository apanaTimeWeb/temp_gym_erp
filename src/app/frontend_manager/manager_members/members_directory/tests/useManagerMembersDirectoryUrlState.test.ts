import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import * as moduleUnderTest from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryUrlState';

const { queryConfigs, mutationConfigs } = vi.hoisted(() => ({ queryConfigs: [] as unknown[], mutationConfigs: [] as unknown[] }));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ replace: vi.fn(), push: vi.fn(), back: vi.fn(), refresh: vi.fn() })),
  usePathname: vi.fn(() => '/manager'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));


describe('useManagerMembersDirectoryUrlState co-located hook contract', () => {
  it('exports the expected callable hook', () => {
    expect(typeof moduleUnderTest.useManagerMembersDirectoryUrlState).toBe('function');
  });

  it('can initialize its public hook contract without executing a real backend request', () => {
    const hook = moduleUnderTest.useManagerMembersDirectoryUrlState as (...args: never[]) => unknown;
    const { result } = renderHook(() => hook());
    expect(result.current).toBeDefined();
  });
});
