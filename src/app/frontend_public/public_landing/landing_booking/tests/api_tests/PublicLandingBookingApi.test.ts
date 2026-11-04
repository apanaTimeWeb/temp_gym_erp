import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_booking/config/public_landing_booking.url_config';
import { createPublicLandingBooking } from '@/app/frontend_public/public_landing/landing_booking/api/PublicLandingBookingApi';
import { getPublicLandingDateInputValueDaysFromToday } from '@/app/frontend_public/public_landing/landing_booking/utils/PublicLandingBookingDateUtils';

const { apiFetchMock } = vi.hoisted(() => ({ apiFetchMock: vi.fn() }));
vi.mock('@/lib/api', () => ({ apiFetch: apiFetchMock }));

beforeEach(() => apiFetchMock.mockReset());


describe('PublicLanding booking API client', () => {
  it('serializes booking dates to UTC and sends the supplied idempotency key', async () => {
    apiFetchMock.mockResolvedValue({ success: true, message: 'ok', data: null });
    const bookingDate = getPublicLandingDateInputValueDaysFromToday(7);
    await createPublicLandingBooking({ name: 'Member One', email: 'member@example.org', phone: '9876543210', date: bookingDate, type: 'trial' }, '00000000-0000-4000-8000-000000000001');
    expect(apiFetchMock).toHaveBeenCalledWith(PublicLandingUrlConfig.BACKEND_API.BOOKING, expect.objectContaining({ method: 'POST', headers: { 'Idempotency-Key': '00000000-0000-4000-8000-000000000001' } }));
    const [, options] = apiFetchMock.mock.calls[0];
    expect(JSON.parse(options.body).date).toBe(`${bookingDate}T00:00:00.000Z`);
  });
  it('normalizes invalid booking dates into a safe module error without issuing a request', async () => {
    await expect(createPublicLandingBooking({ name: 'Member One', email: 'member@example.org', phone: '9876543210', date: '2026-02-30', type: 'trial' }, '00000000-0000-4000-8000-000000000002'))
      .rejects.toMatchObject({ errorCode: 'LANDING_BOOKING_REQUEST_FAILED', isBackendMessage: false });
    expect(apiFetchMock).not.toHaveBeenCalled();
  });

  it('rejects invalid caller-supplied UUIDv4 headers before sending any request', async () => {
    for (const key of ['', 'not-a-uuid', '00000000-0000-1000-8000-000000000001', '00000000-0000-4000-0000-000000000001']) {
      await expect(createPublicLandingBooking({ name: 'Member One', email: 'member@example.org', phone: '9876543210', date: getPublicLandingDateInputValueDaysFromToday(7), type: 'trial' }, key)).rejects.toMatchObject({
        errorCode: 'LANDING_BOOKING_REQUEST_FAILED', isBackendMessage: false,
      });
    }
    expect(apiFetchMock).not.toHaveBeenCalled();
  });
});
