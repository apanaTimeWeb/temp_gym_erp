import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { replyToTicket } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management_api_crud.api';
import { useSuperadminSupportTicketsManagementTicketReply } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/hooks/useSuperadminSupportTicketsManagementTicketReply';

import type { ReactNode } from 'react';

vi.mock('@/app/frontend_superadmin/superadmin_support/support_tickets_management/api/superadmin_support_tickets_management_api_crud.api', () => ({ replyToTicket: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
}

beforeEach(() => vi.clearAllMocks());

describe('useSuperadminSupportTicketsManagementTicketReply', () => {
  it('validates reply data, sends the mutation, and reconciles ticket queries', async () => {
    vi.mocked(replyToTicket).mockResolvedValue({ success: true, message: 'Replied', data: { id: 'reply-1' } } as never);
    const { result } = renderHook(() => useSuperadminSupportTicketsManagementTicketReply(), { wrapper: createWrapper() });
    await act(async () => {
      await result.current.sendReply({ id: 'ticket-1', values: { replyText: 'Thanks for contacting support.' } });
    });
    await waitFor(() => expect(replyToTicket).toHaveBeenCalledWith('ticket-1', 'Thanks for contacting support.', expect.any(String)));
  });

  it('reuses the idempotency key for a retry of the same ticket and message', async () => {
    vi.mocked(replyToTicket)
      .mockResolvedValueOnce({ success: false, message: 'Retry this reply', data: null } as never)
      .mockResolvedValueOnce({ success: true, message: 'Replied', data: { id: 'reply-2' } } as never);
    const { result } = renderHook(() => useSuperadminSupportTicketsManagementTicketReply(), { wrapper: createWrapper() });
    const input = { id: 'ticket-1', values: { replyText: 'The fix is deployed.' } };

    await act(async () => {
      await expect(result.current.sendReply(input)).rejects.toThrow('Retry this reply');
    });
    await act(async () => {
      await result.current.sendReply(input);
    });

    const firstKey = vi.mocked(replyToTicket).mock.calls[0]?.[2];
    const retryKey = vi.mocked(replyToTicket).mock.calls[1]?.[2];
    expect(firstKey).toEqual(expect.any(String));
    expect(retryKey).toBe(firstKey);
  });

  it('starts a new idempotency intent when the ticket or reply text changes', async () => {
    vi.mocked(replyToTicket)
      .mockResolvedValueOnce({ success: false, message: 'Retry this reply', data: null } as never)
      .mockResolvedValueOnce({ success: false, message: 'Retry edited reply', data: null } as never)
      .mockResolvedValueOnce({ success: true, message: 'Replied', data: { id: 'reply-3' } } as never);
    const { result } = renderHook(() => useSuperadminSupportTicketsManagementTicketReply(), { wrapper: createWrapper() });

    await act(async () => {
      await expect(result.current.sendReply({ id: 'ticket-1', values: { replyText: 'Initial message.' } })).rejects.toThrow('Retry this reply');
    });
    await act(async () => {
      await expect(result.current.sendReply({ id: 'ticket-2', values: { replyText: 'Edited message.' } })).rejects.toThrow('Retry edited reply');
    });
    await act(async () => {
      await result.current.sendReply({ id: 'ticket-2', values: { replyText: 'Edited message.' } });
    });

    const calls = vi.mocked(replyToTicket).mock.calls;
    expect(calls[0]?.[2]).not.toBe(calls[1]?.[2]);
    expect(calls[1]?.[2]).toBe(calls[2]?.[2]);
  });
});
