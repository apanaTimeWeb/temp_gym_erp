import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useManagerMembersDirectoryLogic } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryLogic';


// Mock useRouter and useSearchParams
const { queryConfigs, mutationConfigs } = vi.hoisted(() => ({ queryConfigs: [] as unknown[], mutationConfigs: [] as unknown[] }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/manager/members',
  useSearchParams: () => new URLSearchParams() }));

// Mock mutations
vi.mock('./useManagerMembersDirectoryMutations', () => ({
  useManagerMembersDirectoryMutations: () => ({
    saveMember: vi.fn(),
    deleteMember: vi.fn() }) }));

describe('useManagerMembersDirectoryLogic', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useManagerMembersDirectoryLogic());
    
    expect(result.current.search).toBe('');
    expect(result.current.statusFilter).toBe('All');
    expect(result.current.sortColumn).toBe('name');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.showAddModal).toBe(false);
  });
});
