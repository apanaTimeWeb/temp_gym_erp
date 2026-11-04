// RESPONSIBILITY: Test real MSW mock boundaries; run with host Vitest, MSW v2 and DOM/fetch setup.
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { landingMockState } from '@/app/frontend_public/public_landing/landing_contact/mocks/fixtures/PublicLandingContactMockFixtures';
import { mockServer, resetMockServer, useMockScenario } from '@/app/frontend_public/public_landing/landing_contact/tests/harness/bootstrap';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_contact/config/public_landing_contact.url_config';

const endpoint = `http://localhost${PublicLandingUrlConfig.BACKEND_API.CONTACT}`;
const payload = { name: 'Member One', email: 'member@example.org', message: 'Please call me.' };
const validKey = '00000000-0000-4000-8000-000000000001';
const otherKey = '00000000-0000-4000-8000-000000000002';
const send = (key: string | null, body: unknown = payload) => fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', ...(key ? { 'Idempotency-Key': key } : {}) },
  body: JSON.stringify(body),
});

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => resetMockServer());
afterAll(() => mockServer.close());

describe('Contact contract and mock scenarios', () => {
  it('accepts valid UUIDv4 and returns a clearly local canonical success envelope', async () => {
    const response = await send(validKey);
    expect(response.status).toBe(200);
    const envelope = await response.json();
    expect(envelope).toMatchObject({ success: true, data: null });
    expect(envelope.requestId).toMatch(/^mock:[0-9a-f-]{36}$/);
    expect(landingMockState.contacts).toHaveLength(1);
  });
  it('resets mutable records and idempotency history between independent test cases', async () => {
    await send(validKey);
    expect(landingMockState.contacts).toHaveLength(1);
    resetMockServer();
    expect(landingMockState.contacts).toHaveLength(0);
    expect((await send(validKey)).status).toBe(200);
    expect(landingMockState.contacts).toHaveLength(1);
  });
  it('does not duplicate mutations when an accepted UUIDv4 is replayed', async () => {
    await send(validKey);
    await send(validKey);
    expect(landingMockState.contacts).toHaveLength(1);
    await send(otherKey);
    expect(landingMockState.contacts).toHaveLength(2);
  });
  it('does not silently accept a different payload under a previously accepted idempotency key', async () => {
    expect((await send(validKey)).status).toBe(200);
    const modified = { ...payload, name: 'A Different Intent' };
    const response = await send(validKey, modified);
    expect(response.status).toBe(409);
    expect(await response.json()).toMatchObject({ success: false, statusCode: 409, errorCode: 'IDEMPOTENCY_KEY_CONFLICT' });
    expect(landingMockState.contacts).toHaveLength(1);
    expect((await send(validKey)).status).toBe(200); // Valid exact replay remains idempotent.
    expect(landingMockState.contacts).toHaveLength(1);
  });
  it('rejects missing and malformed UUIDv4 keys with explicit error envelopes', async () => {
    for (const key of [null, 'nonsense', '00000000-0000-1000-8000-000000000001']) {
      const response = await send(key);
      const envelope = await response.json();
      expect(response.status).toBe(400);
      expect(envelope).toMatchObject({ success: false, statusCode: 400, data: null });
      expect(envelope.errorCode).toMatch(/^IDEMPOTENCY_KEY_(REQUIRED|INVALID)$/);
      expect(envelope.requestId).toMatch(/^mock:/);
    }
    expect(landingMockState.contacts).toHaveLength(0);
  });
  it('validates payloads and returns normalized 422 without mutating', async () => {
    const response = await send(validKey, {});
    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({ success: false, errorCode: 'VALIDATION_ERROR', statusCode: 422 });
    expect(landingMockState.contacts).toHaveLength(0);
  });
  it('EMPTY starts without records but accepts a valid user action', async () => {
    useMockScenario('EMPTY');
    expect(landingMockState.contacts).toHaveLength(0);
    expect((await send(validKey)).status).toBe(200);
    expect(landingMockState.contacts).toHaveLength(1);
  });
  it('SERVER_500 gives an error envelope and does not mutate', async () => {
    useMockScenario('SERVER_500');
    const response = await send(validKey);
    expect(response.status).toBe(500);
    expect(await response.json()).toMatchObject({ success: false, errorCode: 'INTERNAL_SERVER_ERROR', statusCode: 500 });
    expect(landingMockState.contacts).toHaveLength(0);
  });
  it('UNAUTHORIZED gives an error envelope and does not mutate', async () => {
    useMockScenario('UNAUTHORIZED');
    const response = await send(validKey);
    expect(response.status).toBe(401);
    expect(await response.json()).toMatchObject({ success: false, errorCode: 'UNAUTHORIZED', statusCode: 401 });
    expect(landingMockState.contacts).toHaveLength(0);
  });
  it('TIMEOUT is selectable; host integration must abort the pending request', () => {
    useMockScenario('TIMEOUT');
    // A full timeout integration check requires the host fetch-abort policy; the mock delays 15 seconds.
    expect(landingMockState.contacts).toHaveLength(0);
  });
});
