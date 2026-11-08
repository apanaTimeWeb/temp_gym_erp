import { renderHook } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';

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
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client: queryClient }, children);
    const { result } = renderHook(() => useManagerMembersDirectoryLogic(), { wrapper });
    
    expect(result.current.search).toBe('');
    expect(result.current.statusFilter).toBe('All');
    expect(result.current.sortColumn).toBe('name');
    expect(result.current.sortDirection).toBe('asc');
    expect(result.current.showAddModal).toBe(false);
  });
});
