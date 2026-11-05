import { setupServer } from 'msw/node';
import { expect, beforeEach, beforeAll, afterAll, describe, it } from 'vitest';

import { SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/config/superadmin_communication_broadcasts_campaigns.url_config';
import { MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/mocks/fixtures/SuperadminCommunicationBroadcastsCampaignsMockFixtures';
import { resetSuperadminCommunicationBroadcastsMockState, superadminBroadcastsHandlers } from '@/app/frontend_superadmin/superadmin_communication/communication_broadcasts_campaigns/mocks/handlers/SuperadminCommunicationBroadcastsCampaignsMockHandlers';


const server = setupServer(...superadminBroadcastsHandlers);
const baseUrl = `http://localhost${SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.BASE}`;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
beforeEach(() => resetSuperadminCommunicationBroadcastsMockState());

const readJson = async (response: Response): Promise<unknown> => response.json();
const toRecord = (value: unknown): Record<string, unknown> => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error('Expected a JSON object');
  return value as Record<string, unknown>;
};
const toRecords = (value: unknown): Array<Record<string, unknown>> => {
  if (!Array.isArray(value)) throw new Error('Expected a JSON array');
  return value.map(toRecord);
};

describe('Superadmin Broadcasts MSW integration', () => {
  it('filters by search and status and returns pagination metadata', async () => {
    const response = await fetch(`${baseUrl}?search=maintenance&status=SENT&page=1&limit=5`);
    const body = toRecord(await readJson(response));
    expect(response.ok).toBe(true);
    expect(toRecords(body.data).map((item) => item.id)).toEqual(['b1']);
    expect(body.meta).toMatchObject({ total: 1, page: 1, limit: 5, totalPages: 1 });
  });

  it('returns an explicit empty collection for no search matches', async () => {
    const response = await fetch(`${baseUrl}?search=__no_such_broadcast__`);
    const body = toRecord(await readJson(response));
    expect(response.ok).toBe(true);
    expect(body.data).toEqual([]);
    expect(toRecord(body.meta).total).toBe(0);
  });

  it('creates mutable mock state and preserves idempotency on retries', async () => {
    const key = 'create-intent-1';
    const request = () => fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key },
      body: JSON.stringify({ title: 'Contract regression', content: 'Full end-to-end fixture', status: 'DRAFT', targetGymIds: ['t1'] }),
    });
    const firstResponse = await request();
    const firstBody = toRecord(await readJson(firstResponse));
    const retryResponse = await request();
    const retryBody = toRecord(await readJson(retryResponse));
    expect(firstResponse.ok).toBe(true);
    expect(toRecord(firstBody.data).id).toBe(toRecord(retryBody.data).id);

    const listBody = toRecord(await readJson(await fetch(`${baseUrl}?search=Contract%20regression`)));
    expect(toRecords(listBody.data)).toHaveLength(1);
  });

  it('treats each new edit intent separately while preserving the same key on its retry', async () => {
    const id = MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS[0]!.id;
    const firstKey = 'broadcast-edit-intent-1';
    const secondKey = 'broadcast-edit-intent-2';
    const edit = (key: string, title: string) => fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key },
      body: JSON.stringify({ title }),
    });
    const first = toRecord(await readJson(await edit(firstKey, 'Title X')));
    const retry = toRecord(await readJson(await edit(firstKey, 'Ignored Retry Payload')));
    const second = toRecord(await readJson(await edit(secondKey, 'Title Y')));
    expect(toRecord(first.data).title).toBe('Title X');
    expect(toRecord(retry.data).title).toBe('Title X');
    expect(toRecord(second.data).title).toBe('Title Y');
  });

  it('deletes a broadcast from mutable state and returns not-found for unknown identity', async () => {
    const id = MOCK_SUPERADMIN_COMMUNICATION_BROADCASTS[0]!.id;
    const removed = await fetch(`${baseUrl}/${id}`, { method: 'DELETE', headers: { 'Idempotency-Key': 'delete-intent-1' } });
    expect(removed.ok).toBe(true);
    const list = toRecord(await readJson(await fetch(`${baseUrl}?search=System%20Maintenance`)));
    expect(list.data).toEqual([]);
    const missing = await fetch(`${baseUrl}/not-a-real-broadcast`, { method: 'DELETE' });
    expect(missing.status).toBe(404);
  });

  it('returns not-found for updates to an unknown broadcast', async () => {
    const response = await fetch(`${baseUrl}/not-a-real-broadcast`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Idempotency-Key': 'unknown-edit' },
      body: JSON.stringify({ title: 'Not valid' }),
    });
    expect(response.status).toBe(404);
    expect(toRecord(await readJson(response)).success).toBe(false);
  });

  it('rejects a recipient outside a restricted broadcast audience', async () => {
    const response = await fetch(`${baseUrl}/b1/deliveries/t5`, {
      method: 'POST', headers: { 'Idempotency-Key': 'bad-recipient-intent' },
    });
    expect(response.status).toBe(400);
    expect(toRecord(await readJson(response)).success).toBe(false);
  });

  it('delivers to all gyms when targetGymIds is empty and does not double-count an idempotent retry', async () => {
    const key = 'all-gyms-delivery-intent';
    const firstResponse = await fetch(`${baseUrl}/b4/deliveries/t5`, { method: 'POST', headers: { 'Idempotency-Key': key } });
    const retryResponse = await fetch(`${baseUrl}/b4/deliveries/t5`, { method: 'POST', headers: { 'Idempotency-Key': key } });
    const first = toRecord(await readJson(firstResponse));
    const retry = toRecord(await readJson(retryResponse));
    expect(firstResponse.ok).toBe(true);
    expect(toRecord(first.data).deliveryStatus).toBe('DELIVERED');
    expect(toRecord(toRecord(retry.data).broadcast).deliveredCount).toBe(toRecord(toRecord(first.data).broadcast).deliveredCount);
  });

  it('keeps delivery idempotency scoped to the same recipient and key', async () => {
    const id = 'b3';
    const key = 'delivery-intent-1';
    const deliver = () => fetch(`${baseUrl}/${id}/deliveries/t3`, { method: 'POST', headers: { 'Idempotency-Key': key } });
    const first = toRecord(await readJson(await deliver()));
    const retry = toRecord(await readJson(await deliver()));
    expect(toRecord(first.data).deliveryStatus).toBe('DELIVERED');
    expect(toRecord(toRecord(retry.data).broadcast).deliveredCount).toBe(toRecord(toRecord(first.data).broadcast).deliveredCount);
  });

  it('serves the configured recipient-count endpoint', async () => {
    const response = await fetch(`http://localhost${SUPERADMIN_COMMUNICATION_BROADCASTS_CAMPAIGNS_API.RECIPIENT_COUNT}`);
    expect(response.ok).toBe(true);
    expect(toRecord(toRecord(await readJson(response)).data).count).toBeGreaterThan(0);
  });
});
