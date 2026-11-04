import { describe, expect, it } from 'vitest';
import { PublicLandingNullApiResponseSchema } from '@/app/frontend_public/public_landing/landing_experience/schemas/PublicLandingExperienceApiResponseSchema';

const validEnvelope = { success: true, message: 'ok', data: null };

describe('PublicLanding null API response contract', () => {
  it('accepts the documented null data envelope', () => {
    expect(PublicLandingNullApiResponseSchema.safeParse(validEnvelope).success).toBe(true);
  });

  it('rejects inconsistent success/failure discriminants', () => {
    expect(PublicLandingNullApiResponseSchema.safeParse({ success: false, message: 'error', data: null, validationErrors: [{ field: 'email', message: 'invalid' }] }).success).toBe(true);
    expect(PublicLandingNullApiResponseSchema.safeParse({ success: 'sometimes', message: 'ok', data: null }).success).toBe(false);
  });

  it('rejects arbitrary payloads rather than allowing an unbounded data shape', () => {
    expect(PublicLandingNullApiResponseSchema.safeParse({ ...validEnvelope, data: { id: 'unexpected' } }).success).toBe(false);
    expect(PublicLandingNullApiResponseSchema.safeParse({ ...validEnvelope, data: 'unexpected' }).success).toBe(false);
  });

  it('rejects unexpected envelope keys', () => {
    expect(PublicLandingNullApiResponseSchema.safeParse({ ...validEnvelope, debug: true }).success).toBe(false);
  });
});
