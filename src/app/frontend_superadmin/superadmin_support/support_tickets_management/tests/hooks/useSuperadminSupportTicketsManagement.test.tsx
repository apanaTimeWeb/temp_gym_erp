import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ticketsApi } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management_api_crud.api';
import { useSuperadminSupportTicketsManagement } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagement';
import { MOCK_TICKETS } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/mocks/fixtures/SuperadminSupportTicketsManagementMockData';

import type { ReactNode } from 'react';


let params: Record<string, string> = {};
vi.mock('@/hooks/useUrlState', () => ({ useUrlState: () => ({ getParam: (key: string, fallback: string) => params[key] ?? fallback, setParam: vi.fn() }) }));
vi.mock('@/hooks/useDebouncedValue', () => ({ useDebouncedValue: (value: string) => value }));
vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/state/useSuperadminSupportTicketsManagementStore', () => ({ useSuperadminSupportTicketsManagementStore: () => ({ search: '', statusFilter: 'ALL', priorityFilter: 'ALL', currentPage: 1 }) }));
vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management_api_crud.api', () => ({ ticketsApi: { fetchTickets: vi.fn() } }));

describe('useSuperadminSupportTicketsManagement', () => {
  beforeEach(() => { params = {}; });
  it('propagates list query state to the ticket API and exposes paginated results', async () => {
    vi.mocked(ticketsApi.fetchTickets).mockResolvedValue({ success: true, message: 'Loaded', data: MOCK_TICKETS, meta: { total: MOCK_TICKETS.length } } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminSupportTicketsManagement(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(ticketsApi.fetchTickets).toHaveBeenCalledWith({ page: '1', limit: '10' });
    expect(result.current.paginatedTickets).toHaveLength(MOCK_TICKETS.length);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.refetch).toBeTypeOf('function');
  });
});
