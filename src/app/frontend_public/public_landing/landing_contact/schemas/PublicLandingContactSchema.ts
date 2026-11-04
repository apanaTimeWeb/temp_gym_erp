// RESPONSIBILITY: Validates PublicLanding contact form input and its API-bound request shape.
import { z } from 'zod';
import type { PublicLandingContactApiPayload } from '@/app/frontend_public/public_landing/landing_contact/types/PublicLandingContactTypes';

export const PublicLandingContactSchema = z.object({
  name: z.string().trim().min(1, 'validation.name'),
  email: z.string().trim().email('validation.email'),
  message: z.string().trim().min(1, 'validation.message'),
});

export const PublicLandingContactApiPayloadSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(1),
}) satisfies z.ZodType<PublicLandingContactApiPayload>;

/** Restricts each public mutation request header to RFC-4122 UUIDv4 syntax. */
export const PublicLandingContactIdempotencyKeySchema = z.string().regex(
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
);
