import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { MOCK_TICKETS } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/mocks/fixtures/SuperadminSupportTicketsManagementMockData';
import { superadminTicketsHandlers, resetSuperadminSupportTicketsMockState } from '@/app/frontend_superadmin/superadmin_support/support_tickets_management/mocks/handlers/SuperadminSupportTicketsManagementMockHandlers';


const server = setupServer(...superadminTicketsHandlers);
const base = 'http://localhost/superadmin/tickets';
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { server.resetHandlers(); resetSuperadminSupportTicketsMockState(); });
afterAll(() => server.close());
describe('ticket reply idempotency', () => {
  it('replays the same reply without appending a duplicate message', async () => {
    const ticketId = MOCK_TICKETS[0]!.id;
    const request = () => fetch(`${base}/${encodeURIComponent(ticketId)}/reply`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'reply-intent-1' }, body: JSON.stringify({ replyText: 'We are checking this.' }) });
    const first = await (await request()).json() as { data: { messages: unknown[] } };
    const second = await (await request()).json() as { data: { messages: unknown[] } };
    expect(second.data.messages).toHaveLength(first.data.messages.length);
  });
  it('rejects reuse of a key for a different reply payload', async () => {
    const ticketId = MOCK_TICKETS[0]!.id;
    const send = (replyText: string) => fetch(`${base}/${encodeURIComponent(ticketId)}/reply`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'reply-intent-2' }, body: JSON.stringify({ replyText }) });
    expect((await send('First reply')).status).toBe(200);
    expect((await send('Different reply')).status).toBe(409);
  });
});
