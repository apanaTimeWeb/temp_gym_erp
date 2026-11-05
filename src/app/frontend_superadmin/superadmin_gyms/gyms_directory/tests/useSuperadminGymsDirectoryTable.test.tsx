import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api';
import { useSuperadminGymsDirectoryTable } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryTable';

import type { ReactNode } from 'react';

const setParam = vi.fn();
const routerPush = vi.fn();
const confirmProgrammaticNavigation = vi.fn().mockResolvedValue(true);
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUrlState', () => ({ useSuperadminGymsDirectoryUrlState: () => ({ getParam: (_k: string, fallback: string) => fallback, setParam }) }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: routerPush }) }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUnsavedChangesGuard', () => ({ useSuperadminGymsDirectoryUnsavedChangesGuard: vi.fn(), confirmSuperadminGymsDirectoryProgrammaticNavigation: () => confirmProgrammaticNavigation() }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/state/useSuperadminGymsDirectoryStore', () => ({
  useSuperadminGymsDirectoryStore: (selector: (state: { openDeleteModal: () => void; openWhatsappModal: () => void }) => unknown) => selector({ openDeleteModal: vi.fn(), openWhatsappModal: vi.fn() }),
}));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryGymMutations', () => ({
  useSuperadminGymsDirectoryGymMutations: () => ({ actionLoadingId: null, onGhostLoginClick: vi.fn(), onSuspendClick: vi.fn() }),
}));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/gyms_directory/api/superadmin_gyms_directory.api', () => ({ gymsApi: { fetchGyms: vi.fn() } }));

describe('useSuperadminGymsDirectoryTable', () => {
  it('passes URL-backed pagination and sort parameters to the API and returns the response rows', async () => {
    vi.mocked(gymsApi.fetchGyms).mockResolvedValue({ success: true, message: 'Loaded', data: [{ id: 'gym-1', name: 'Gym Alpha' }], meta: { total: 1 } , requestId: 'test-request-id'} as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminGymsDirectoryTable(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(gymsApi.fetchGyms).toHaveBeenCalledWith({ sortBy: 'createdAt', order: 'desc', page: '1', limit: '20' });
    expect(result.current.filteredGyms).toHaveLength(1);
    act(() => result.current.setCurrentPage(2));
    expect(setParam).toHaveBeenCalledWith('page', '2');
  });
});


it('guards programmatic row navigation when a form has unsaved changes', async () => {
  vi.mocked(gymsApi.fetchGyms).mockResolvedValue({ success: true, message: 'Loaded', data: [{ id: 'gym-2', name: 'Gym Beta' }], meta: { total: 1 } , requestId: 'test-request-id'} as never);
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
  const { result } = renderHook(() => useSuperadminGymsDirectoryTable(), { wrapper });
  await waitFor(() => expect(result.current.isPending).toBe(false));
  confirmProgrammaticNavigation.mockResolvedValueOnce(false);
  await act(async () => { await result.current.handleRowClick({ id: 'gym-2', name: 'Gym Beta' } as never); });
  expect(routerPush).not.toHaveBeenCalled();
  confirmProgrammaticNavigation.mockResolvedValueOnce(true);
  await act(async () => { await result.current.handleRowClick({ id: 'gym-2', name: 'Gym Beta' } as never); });
  expect(routerPush).toHaveBeenCalledWith(expect.stringContaining('gym-2'));
});
