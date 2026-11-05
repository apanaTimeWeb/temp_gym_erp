import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ticketsApi } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management_api_crud.api';
import { useSuperadminSupportTicketsManagementTicketMutations } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementTicketMutations';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management_api_crud.api', () => ({ ticketsApi: { closeTicket: vi.fn(), assignTicket: vi.fn() } }));

describe('useSuperadminSupportTicketsManagementTicketMutations', () => {

  it('uses a distinct idempotency key when the assignee payload changes', async () => {
    vi.mocked(ticketsApi.assignTicket).mockResolvedValue({ success: true, message: 'Assigned', data: { id: 'ticket-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSupportTicketsManagementTicketMutations(), { wrapper });
    await result.current.assignTicket({ ticketId: 'ticket-1', input: { assignee: 'Alice' } });
    await result.current.assignTicket({ ticketId: 'ticket-1', input: { assignee: 'Bob' } });
    const firstKey = vi.mocked(ticketsApi.assignTicket).mock.calls[0]?.[2];
    const secondKey = vi.mocked(ticketsApi.assignTicket).mock.calls[1]?.[2];
    expect(firstKey).toEqual(expect.any(String));
    expect(secondKey).toEqual(expect.any(String));
    expect(firstKey).not.toBe(secondKey);
  });

  it('closes a ticket through the API with a stable idempotency key', async () => {
    vi.mocked(ticketsApi.closeTicket).mockResolvedValue({ success: true, message: 'Closed', data: { id: 'ticket-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSupportTicketsManagementTicketMutations(), { wrapper });
    await result.current.closeTicket('ticket-1');
    expect(ticketsApi.closeTicket).toHaveBeenCalledWith('ticket-1', expect.any(String));
    expect(result.current.isClosing).toBe(false);
  });
});
