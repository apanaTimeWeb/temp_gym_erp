import { afterEach, describe, expect, it, vi } from 'vitest';
import { isValidPublicLandingBookingDate, serializePublicLandingDateToUtc } from '@/app/frontend_public/public_landing/landing_experience/utils/PublicLandingExperienceDateUtils';

describe('PublicLanding booking date utilities', () => {
  afterEach(() => vi.useRealTimers());

  it('serializes the selected calendar day deterministically at UTC midnight', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-01T12:00:00.000Z'));
    expect(serializePublicLandingDateToUtc('2026-09-20')).toBe('2026-09-20T00:00:00.000Z');
  });

  it('rejects impossible, malformed, and past calendar dates', () => {
    expect(isValidPublicLandingBookingDate('2026-02-30', '2026-01-01')).toBe(false);
    expect(isValidPublicLandingBookingDate('2026/09/20', '2026-01-01')).toBe(false);
    expect(isValidPublicLandingBookingDate('2026-08-31', '2026-09-01')).toBe(false);
    expect(() => serializePublicLandingDateToUtc('2026-02-30')).toThrow(RangeError);
  });

  it('accepts today and future dates', () => {
    expect(isValidPublicLandingBookingDate('2026-09-01', '2026-09-01')).toBe(true);
    expect(isValidPublicLandingBookingDate('2026-09-20', '2026-09-01')).toBe(true);
  });
});
