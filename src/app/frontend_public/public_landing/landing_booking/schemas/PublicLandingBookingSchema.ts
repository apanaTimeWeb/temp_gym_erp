// RESPONSIBILITY: Validates PublicLanding booking form input and its API-bound request shape.
import { z } from 'zod';
import { LANDING_BOOKING_TYPE_VALUES } from '@/app/frontend_public/public_landing/landing_booking/constants/PublicLandingBookingFormConstants';
import type { PublicLandingBookingApiPayload } from '@/app/frontend_public/public_landing/landing_booking/types/PublicLandingBookingTypes';
import { isValidPublicLandingBookingDate } from '@/app/frontend_public/public_landing/landing_booking/utils/PublicLandingBookingDateUtils';

export const PublicLandingBookingSchema = z.object({
  name: z.string().trim().min(1, 'validation.name'),
  email: z.string().trim().email('validation.email'),
  phone: z.string().regex(/^\d{10}$/, 'validation.phone'),
  date: z.string().refine((value) => isValidPublicLandingBookingDate(value), 'validation.date'),
  type: z.enum(LANDING_BOOKING_TYPE_VALUES),
});

export const PublicLandingBookingApiPayloadSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().regex(/^\d{10}$/),
  date: z.string().datetime({ offset: true }),
  type: z.enum(LANDING_BOOKING_TYPE_VALUES),
}) satisfies z.ZodType<PublicLandingBookingApiPayload>;

/** Restricts each public mutation request header to RFC-4122 UUIDv4 syntax. */
export const PublicLandingBookingIdempotencyKeySchema = z.string().regex(
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
);
