import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_contact/config/public_landing_contact.url_config';
import { createPublicLandingContactMessage } from '@/app/frontend_public/public_landing/landing_contact/api/PublicLandingContactApi';
import { getPublicLandingDateInputValueDaysFromToday } from '@/app/frontend_public/public_landing/landing_contact/utils/PublicLandingContactDateUtils';

const { apiFetchMock } = vi.hoisted(() => ({ apiFetchMock: vi.fn() }));
vi.mock('@/lib/api', () => ({ apiFetch: apiFetchMock }));

beforeEach(() => apiFetchMock.mockReset());


describe('PublicLanding contact API client', () => {
  it('uses the contact endpoint and idempotency key without exposing the backend transport', async () => {
    apiFetchMock.mockResolvedValue({ success: true, message: 'ok', data: null });
    await createPublicLandingContactMessage({ name: 'Member One', email: 'member@example.org', message: 'hello' }, '00000000-0000-4000-8000-000000000003');
    expect(apiFetchMock).toHaveBeenCalledWith(PublicLandingUrlConfig.BACKEND_API.CONTACT, expect.objectContaining({ method: 'POST', headers: { 'Idempotency-Key': '00000000-0000-4000-8000-000000000003' } }));
  });
  it('normalizes invalid contact input into a safe module error without issuing a request', async () => {
    await expect(createPublicLandingContactMessage({ name: ' ', email: 'not-an-email', message: '' }, 'intent-contact-invalid'))
      .rejects.toMatchObject({ errorCode: 'LANDING_CONTACT_REQUEST_FAILED', isBackendMessage: false });
    expect(apiFetchMock).not.toHaveBeenCalled();
  });
  it('normalizes malformed responses into a safe machine-readable error', async () => {
    apiFetchMock.mockResolvedValue({ nope: true });
    await expect(createPublicLandingContactMessage({ name: 'Member One', email: 'member@example.org', message: 'hello' }, '00000000-0000-4000-8000-000000000023')).rejects.toMatchObject({ errorCode: 'LANDING_INVALID_RESPONSE', isBackendMessage: false });
  });

  it('rejects invalid caller-supplied UUIDv4 headers before sending any request', async () => {
    for (const key of ['', 'not-a-uuid', '00000000-0000-1000-8000-000000000001', '00000000-0000-4000-0000-000000000001']) {
      await expect(createPublicLandingContactMessage({ name: 'Member One', email: 'member@example.org', message: 'hello' }, key)).rejects.toMatchObject({
        errorCode: 'LANDING_CONTACT_REQUEST_FAILED', isBackendMessage: false,
      });
    }
    expect(apiFetchMock).not.toHaveBeenCalled();
  });
});
