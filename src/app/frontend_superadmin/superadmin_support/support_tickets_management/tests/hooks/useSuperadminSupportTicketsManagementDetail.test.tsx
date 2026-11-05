import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ticketsApi } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management_api_crud.api';
import { useSuperadminSupportTicketsManagementDetail } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementDetail';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management_api_crud.api', () => ({ ticketsApi: { fetchTicketById: vi.fn() } }));

describe('useSuperadminSupportTicketsManagementDetail', () => {
  it('preserves successful ticket response data', async () => {
    const ticket = { id: 'ticket-1', subject: 'Example ticket' };
    vi.mocked(ticketsApi.fetchTicketById).mockResolvedValue({ success: true, message: 'Loaded', data: ticket } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSupportTicketsManagementDetail('ticket-1'), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data).toEqual(ticket);
  });

  it('treats a resolved API failure envelope as a query error', async () => {
    vi.mocked(ticketsApi.fetchTicketById).mockResolvedValue({ success: false, message: 'ticket unavailable', data: null, errorCode: 'TEST_FAILURE', statusCode: 503, requestId: 'test-ticket' } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSupportTicketsManagementDetail('ticket-1'), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.data).toBeUndefined();
    expect(ticketsApi.fetchTicketById).toHaveBeenCalledWith('ticket-1');
  });
});
